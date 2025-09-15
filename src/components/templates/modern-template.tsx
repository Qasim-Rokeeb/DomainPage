import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BuilderState } from '@/app/page';

interface TemplateProps extends BuilderState {
  domain: string;
}

export function ModernTemplate({ headline, description, ctaType, ctaPrice, primaryColor }: TemplateProps) {
  const image = PlaceHolderImages.find(img => img.id === 'template-modern');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <style>{`
        :root { --primary-template: ${primaryColor}; }
        .template-button {
          background-color: hsl(var(--primary-template));
          color: hsl(var(--accent-foreground));
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .template-button:hover {
          filter: brightness(0.9);
        }
      `}</style>
      <main className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {image && (
            <div className="rounded-lg overflow-hidden mb-8 aspect-video">
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
          {ctaType !== 'none' && (
            <button className="template-button">
              {ctaType === 'buy' ? `Buy Now for $${ctaPrice}` : 'Make an Offer'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
