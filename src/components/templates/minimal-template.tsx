interface TemplateProps {
  headline: string;
  description: string;
  ctaType: 'buy' | 'offer';
  ctaPrice: string;
  domain: string;
}

export function MinimalTemplate({ headline, description, ctaType, ctaPrice, domain }: TemplateProps) {
  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
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
      <main className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-headline text-6xl md:text-8xl mb-6 text-primary tracking-tighter">{headline}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">{description}</p>
          <button className="template-button">
            {ctaType === 'buy' ? `Buy Now for $${ctaPrice}` : 'Make an Offer'}
          </button>
           <p className="text-sm text-muted-foreground/50 mt-24">{domain}</p>
        </div>
      </main>
    </div>
  );
}
