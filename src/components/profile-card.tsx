
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div id="profile-card-container" className="group w-full max-w-sm h-[450px] [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsFlipped(!isFlipped)} aria-pressed={isFlipped}>
      <div
        className={cn(
          "relative w-full h-full rounded-xl shadow-xl transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Image
            src="https://placehold.co/400x450.png"
            data-ai-hint="man portrait"
            alt="Profile portrait"
            width={400}
            height={450}
            className="object-cover w-full h-full rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white font-headline">LOKIREDDY MANIKANTA REDDY</h3>
            <p className="text-white/90">Click to flip for more info</p>
          </div>
          <div className="absolute top-4 right-4">
              <Button size="icon" variant="ghost" className="text-white pointer-events-none hover:bg-white/20 hover:text-white">
                  <ArrowRight />
              </Button>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-card text-card-foreground rounded-xl overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background/80 backdrop-blur-sm">
            <h4 className="text-2xl font-bold font-headline">About Me</h4>
            <p className="mt-4 text-muted-foreground">
              I'm a developer and designer who loves creating intuitive and dynamic user interfaces. I believe in the power of voice to make technology more accessible for everyone.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary" />
                <span>lokireddymanikanta12@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary" />
                <span>6302646861</span>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">Click again to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}
