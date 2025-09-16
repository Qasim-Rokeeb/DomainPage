
'use client';
import type { BuilderState } from '@/app/page';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateProps extends BuilderState {
  domain: string;
}

export function MinimalTemplate({ 
  headline, 
  description, 
  ctaType, 
  ctaPrice, 
  domain, 
  primaryColor,
  logoIcon,
  secondaryCtaText,
  secondaryCtaLink 
}: TemplateProps) {
  
  const LogoComponent = (icons as any)[logoIcon] || null;

  const CtaButton = () => {
    if (ctaType === 'none') return null;
    return (
      <button className="template-button primary">
        {ctaType === 'buy' ? `Buy Now for $${ctaPrice}` : 'Make an Offer'}
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
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <style>{`
        :root { 
          --primary-template: ${primaryColor};
          --border-template: ${primaryColor};
        }
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
          border-color: hsl(var(--border-template), 0.3);
        }
        .template-button.secondary:hover {
          background-color: hsl(var(--border-template), 0.1);
          border-color: hsl(var(--border-template), 0.5);
        }
      `}</style>
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
            {LogoComponent && <LogoComponent style={{color: `hsl(${primaryColor})`}} />}
            <span className="font-semibold text-lg">{domain}</span>
        </div>
      </header>
      <main className="container mx-auto px-6 py-24 text-center flex-grow flex items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-headline text-6xl md:text-8xl mb-6 tracking-tighter" style={{color: `hsl(${primaryColor})`}}>{headline}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">{description}</p>
          <div className="flex items-center justify-center gap-4">
            <CtaButton />
            <SecondaryCtaButton />
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm text-muted-foreground/50">{domain}</p>
      </footer>
    </div>
  );
}
