
'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BuilderState } from '@/app/page';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateProps extends BuilderState {
  domain: string;
}

export function ModernTemplate({
  headline,
  description,
  ctaType,
  ctaPrice,
  primaryColor,
  logoIcon,
  secondaryCtaText,
  secondaryCtaLink,
  domain,
}: TemplateProps) {
  const image = PlaceHolderImages.find(img => img.id === 'template-modern');
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
    <div className="bg-background text-foreground min-h-screen">
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
      <main className="container mx-auto px-6 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {image && (
            <div className="rounded-lg overflow-hidden mb-8 aspect-video shadow-2xl" style={{boxShadow: `0 20px 50px -10px hsl(${primaryColor} / 0.2)`}}>
              <Image 
                src={image.imageUrl} 
                alt={image.description} 
                data-ai-hint={image.imageHint}
                width={1440} 
                height={900} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <h1 className="font-headline text-5xl md:text-7xl mb-4" style={{color: `hsl(${primaryColor})`}}>{headline}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="flex items-center justify-center gap-4">
            <CtaButton />
            <SecondaryCtaButton />
          </div>
        </div>
      </main>
    </div>
  );
}
