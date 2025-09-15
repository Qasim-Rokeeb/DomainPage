'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModernTemplate } from '@/components/templates/modern-template';
import { MinimalTemplate } from '@/components/templates/minimal-template';
import { PortfolioTemplate } from '@/components/templates/portfolio-template';
import { SaasTemplate } from '@/components/templates/saas-template';
import type { Template, BuilderState } from '@/app/page';

function PreviewContent() {
  const searchParams = useSearchParams();

  const props: BuilderState & { domain: string } = {
    template: searchParams.get('template') as Template || 'saas',
    headline: searchParams.get('headline') || 'Your Headline Here',
    description: searchParams.get('description') || 'A compelling description of your offer.',
    ctaType: searchParams.get('ctaType') as BuilderState['ctaType'] || 'buy',
    ctaPrice: searchParams.get('ctaPrice') || '999',
    logoIcon: searchParams.get('logoIcon') || 'LayoutDashboard',
    secondaryCtaText: searchParams.get('secondaryCtaText') || '',
    secondaryCtaLink: searchParams.get('secondaryCtaLink') || '#',
    primaryColor: searchParams.get('primaryColor') || '158 100% 47.6%',
    domain: searchParams.get('domain') || 'yourdomain.com',
  };

  const templateMap = {
    minimal: MinimalTemplate,
    portfolio: PortfolioTemplate,
    modern: ModernTemplate,
    saas: SaasTemplate,
  };
  
  const TemplateComponent = templateMap[props.template] || SaasTemplate;

  return <TemplateComponent {...props} />;
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-background" />}>
      <PreviewContent />
    </Suspense>
  );
}
