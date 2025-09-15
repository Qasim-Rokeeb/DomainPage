'use client';

import * as React from 'react';
import type { BuilderState } from '@/app/page';

interface BuilderPreviewProps {
  builderState: BuilderState;
  domain: string;
}

export function BuilderPreview({ builderState, domain }: BuilderPreviewProps) {
  const [iframeSrc, setIframeSrc] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams({
      ...builderState,
      domain
    });
    setIframeSrc(`/preview?${params.toString()}`);
  }, [builderState, domain]);

  return (
    <div className="sticky top-8">
      <div className="relative mx-auto border-border/50 border-8 bg-card shadow-2xl rounded-2xl w-full h-[70vh]">
        <div className="rounded-lg overflow-hidden w-full h-full">
          <iframe
            key={iframeSrc}
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
