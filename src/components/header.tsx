"use client";

import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { VoiceButton } from './voice-button';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const NavLink = ({ href, children, onLinkClick }: { href: string; children: React.ReactNode, onLinkClick?: () => void }) => {
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
    <a href={href} onClick={onLinkClick} className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {children}
    </a>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        isScrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#home" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <span className="font-bold font-headline">Voicefolio</span>
        </a>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <VoiceButton />
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <a href="#home" className="flex items-center gap-2 text-lg font-semibold mb-6">
                <span className="font-bold font-headline">Voicefolio</span>
              </a>
              <nav className="grid gap-4">
                 <NavLink href="#home" onLinkClick={closeMenu}>Home</NavLink>
                 <NavLink href="#projects" onLinkClick={closeMenu}>Projects</NavLink>
                 <NavLink href="#skills" onLinkClick={closeMenu}>Skills</NavLink>
                 <NavLink href="#education" onLinkClick={closeMenu}>Education</NavLink>
                 <NavLink href="#contact" onLinkClick={closeMenu}>Contact</NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
