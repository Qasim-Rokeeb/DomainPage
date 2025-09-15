'use client';

import * as React from 'react';
import type { Template } from '@/app/page';

interface BuilderPreviewProps {
  template: Template;
  headline: string;
  description: string;
  ctaType: 'buy' | 'offer';
  ctaPrice: string;
  domain: string;
}

export function BuilderPreview({ template, headline, description, ctaType, ctaPrice, domain }: BuilderPreviewProps) {
  const [iframeSrc, setIframeSrc] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams({
      template,
      headline,
      description,
      ctaType,
      ctaPrice,
      domain
    });
    setIframeSrc(`/preview?${params.toString()}`);
  }, [template, headline, description, ctaType, ctaPrice, domain]);

  return (
    <div className="sticky top-8">
      <div className="relative mx-auto border-border/50 border-8 bg-card shadow-2xl rounded-2xl w-full h-[70vh]">
        <div className="rounded-lg overflow-hidden w-full h-full">
          <iframe
            src={iframeSrc}
            title="Live Preview"
            className="w-full h-full bg-background"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
