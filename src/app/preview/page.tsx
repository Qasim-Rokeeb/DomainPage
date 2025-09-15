'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModernTemplate } from '@/components/templates/modern-template';
import { MinimalTemplate } from '@/components/templates/minimal-template';
import { PortfolioTemplate } from '@/components/templates/portfolio-template';
import type { Template } from '@/app/page';

function PreviewContent() {
  const searchParams = useSearchParams();

  const props = {
    template: searchParams.get('template') as Template || 'modern',
    headline: searchParams.get('headline') || 'Your Headline Here',
    description: searchParams.get('description') || 'A compelling description of your offer.',
    ctaType: searchParams.get('ctaType') as 'buy' | 'offer' || 'buy',
    ctaPrice: searchParams.get('ctaPrice') || '999',
    domain: searchParams.get('domain') || 'yourdomain.com',
  };

  switch (props.template) {
    case 'minimal':
      return <MinimalTemplate {...props} />;
    case 'portfolio':
      return <PortfolioTemplate {...props} />;
    default:
      return <ModernTemplate {...props} />;
  }
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-background" />}>
      <PreviewContent />
    </Suspense>
  );
}
