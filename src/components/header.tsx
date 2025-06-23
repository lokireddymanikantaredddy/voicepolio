"use client";

import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { VoiceButton } from './voice-button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    
    const element = document.querySelector(href);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [href]);

  return (
    <a href={href} className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {children}
    </a>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        isScrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent"
    )}>
      <div className="container flex h-16 items-center px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#home" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <span className="font-bold font-headline">Voicefolio</span>
          </a>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="flex w-full items-center justify-end gap-2 md:ml-auto">
          <VoiceButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
