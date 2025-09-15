'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { HeroSection } from '@/components/app/hero-section';
import { BuilderControls } from '@/components/app/builder-controls';
import { BuilderPreview } from '@/components/app/builder-preview';
import { Footer } from '@/components/app/footer';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';
import { getSeoMetadataAction } from './actions';
import { useToast } from "@/hooks/use-toast"
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LayoutDashboard } from 'lucide-react';

export type Template = 'modern' | 'minimal' | 'portfolio' | 'saas';
export type CtaType = 'buy' | 'offer' | 'none';
export type BuilderState = {
  template: Template;
  headline: string;
  description: string;
  ctaType: CtaType;
  ctaPrice: string;
  logoIcon: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  primaryColor: string;
};

export default function Home() {
  const [domain, setDomain] = useState('');
  const [step, setStep] = useState<'input_domain' | 'build'>('input_domain');
  const [seoData, setSeoData] = useState<GenerateSEOMetadataOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [builderState, setBuilderState] = useState<BuilderState>({
    template: 'saas',
    headline: '',
    description: '',
    ctaType: 'buy',
    ctaPrice: '999',
    logoIcon: 'LayoutDashboard',
    secondaryCtaText: '',
    secondaryCtaLink: '#',
    primaryColor: '158 100% 47.6%',
  });

  const updateBuilderState = (updates: Partial<BuilderState>) => {
    setBuilderState(prevState => ({ ...prevState, ...updates }));
  };

  const ogImage = useMemo(() => {
    return PlaceHolderImages.find(img => img.id === 'opengraph')?.imageUrl || 'https://picsum.photos/seed/og1/1200/630';
  }, []);

  const handleGenerateSeo = useCallback(async (currentDomain: string) => {
    if (!currentDomain) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a domain name first.",
      });
      return;
    }
    
    setLoading(true);
    setStep('build');

    const landingPageContent = `Headline: ${builderState.headline}\nDescription: ${builderState.description}`;

    const result = await getSeoMetadataAction({ domainName: currentDomain, landingPageContent });
    
    if (result.success && result.data) {
      setSeoData({
        ...result.data,
        openGraphPreview: ogImage,
      });
      if(!builderState.headline) updateBuilderState({ headline: result.data.title });
      if(!builderState.description) updateBuilderState({ description: result.data.description.substring(0, 150) });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || 'Could not generate SEO metadata.',
      });
      setSeoData({
        title: currentDomain,
        description: 'A premium domain.',
        openGraphPreview: ogImage,
        structuredSchema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": currentDomain,
          "description": 'A premium domain.',
          "url": `https://${currentDomain}`
        }, null, 2)
      });
    }
    setLoading(false);
  }, [toast, ogImage, builderState.headline, builderState.description]);

  useEffect(() => {
    if (domain) {
      updateBuilderState({
        headline: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
        description: 'Enter a short, captivating description for your landing page here.',
      });
    }
  }, [domain]);


  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(at_20%_20%,rgba(0,245,160,0.08)_0%,transparent_40%),radial-gradient(at_80%_70%,rgba(0,245,160,0.05)_0%,transparent_30%),radial-gradient(at_50%_90%,rgba(0,245,160,0.04)_0%,transparent_30%)]" />
      
      <main className="flex-grow">
        <HeroSection
          domain={domain}
          setDomain={setDomain}
          seoData={seoData}
          onGenerate={handleGenerateSeo}
          loading={loading}
          step={step}
        />

        <div 
          className="container mx-auto px-6 max-w-7xl transition-opacity duration-1000"
          style={{ opacity: step === 'build' ? 1 : 0, pointerEvents: step === 'build' ? 'auto' : 'none' }}
        >
          <div className="py-12 md:py-24 grid grid-cols-1 lg:grid-cols-10 gap-8">
            <div className="lg:col-span-4">
              <BuilderControls
                builderState={builderState}
                updateBuilderState={updateBuilderState}
                domain={domain}
              />
            </div>
            <div className="lg:col-span-6">
              <BuilderPreview
                builderState={builderState}
                domain={domain}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
