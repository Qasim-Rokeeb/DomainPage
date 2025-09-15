import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TemplateProps {
  headline: string;
  description: string;
  ctaType: 'buy' | 'offer';
  ctaPrice: string;
  domain: string;
}

export function PortfolioTemplate({ headline, description, ctaType, ctaPrice }: TemplateProps) {
  const image = PlaceHolderImages.find(img => img.id === 'template-portfolio');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <style>{`
        .template-button {
          background-color: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .template-button:hover {
          background-color: hsl(var(--accent) / 0.9);
        }
      `}</style>
      <header className="container mx-auto px-6 py-12 text-center">
        <h1 className="font-headline text-5xl md:text-7xl mb-4 text-primary">{headline}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
        <button className="template-button">
          {ctaType === 'buy' ? `Buy This Domain for $${ctaPrice}` : 'Make an Offer'}
        </button>
      </header>
      <main className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden aspect-square bg-card">
                     <Image 
                        src={`https://picsum.photos/seed/portfolio${i}/600/600`}
                        alt={`Portfolio item ${i}`}
                        data-ai-hint="portfolio work"
                        width={600} 
                        height={600} 
                        className="w-full h-full object-cover" 
                      />
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
