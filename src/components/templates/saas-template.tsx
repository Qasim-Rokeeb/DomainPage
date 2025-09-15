'use client';
import React from 'react';
import type { BuilderState } from '@/app/page';
import { icons } from 'lucide-react';

interface TemplateProps extends BuilderState {
  domain: string;
}

export function SaasTemplate({
  headline,
  description,
  ctaType,
  ctaPrice,
  domain,
  primaryColor,
  logoIcon,
  secondaryCtaText,
  secondaryCtaLink,
}: TemplateProps) {
  
  const LogoComponent = (icons as any)[logoIcon] || null;

  const CtaButton = () => {
    if (ctaType === 'none') return null;
    return (
      <button className="template-button primary">
        {ctaType === 'buy' ? `Buy for $${ctaPrice}` : 'Make an Offer'}
      </button>
    );
  };

  const SecondaryCtaButton = () => {
    if (!secondaryCtaText) return null;
    return (
      <a href={secondaryCtaLink} className="template-button secondary">
        {secondaryCtaText}
      </a>
    );
  };
  
  return (
    <div className="bg-background text-foreground min-h-screen font-body">
      <style>{`
        :root { --primary-template: ${primaryColor}; }
        .template-button {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
          display: inline-block;
          border: 1px solid transparent;
        }
        .template-button.primary {
          background-color: hsl(var(--primary-template));
          color: hsl(var(--accent-foreground));
        }
        .template-button.primary:hover {
          filter: brightness(0.9);
        }
        .template-button.secondary {
          background-color: transparent;
          color: hsl(var(--foreground));
          border-color: hsl(var(--border));
        }
        .template-button.secondary:hover {
          background-color: hsl(var(--muted));
        }
      `}</style>

      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
            {LogoComponent && <LogoComponent style={{color: `hsl(${primaryColor})`}} />}
            <span className="font-semibold text-lg">{domain}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
        </nav>
        <div className="flex items-center gap-2">
            <SecondaryCtaButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl mb-4 tracking-tighter" style={{color: `hsl(${primaryColor})`}}>{headline}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">{description}</p>
          <div className="flex items-center justify-center gap-4">
            <CtaButton />
            {secondaryCtaText && <SecondaryCtaButton />}
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-6 border-t border-border">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} {domain}. All rights reserved.</p>
              <div className="flex gap-4">
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
              </div>
          </div>
      </footer>
    </div>
  );
}
