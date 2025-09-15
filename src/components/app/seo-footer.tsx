'use client';

import * as React from 'react';
import Image from 'next/image';
import { Braces, CheckCircle2, Bot } from 'lucide-react';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';
import { GlassCard } from './glass-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SeoFooterProps {
  seoData: GenerateSEOMetadataOutput | null;
  isVisible: boolean;
}

export function SeoFooter({ seoData, isVisible }: SeoFooterProps) {

  return (
    <footer 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md transition-all duration-700 ease-out-quart"
      style={{
        opacity: isVisible && seoData ? 1 : 0,
        transform: isVisible && seoData ? 'translate(-50%, 0)' : 'translate(-50%, 150%)',
        pointerEvents: isVisible && seoData ? 'auto' : 'none',
      }}
    >
      <GlassCard className="flex items-center justify-between p-2 rounded-lg">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Bot className="size-5 text-accent" />
          <span className="hidden sm:inline">AI SEO</span>
        </div>
        <TooltipProvider>
          <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-9 w-16 rounded-md overflow-hidden ring-1 ring-border">
                    {seoData?.openGraphPreview && (
                      <Image
                        src={seoData.openGraphPreview}
                        alt="OpenGraph Preview"
                        data-ai-hint="tech branding"
                        width={64}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>OpenGraph Preview</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center size-9 rounded-md bg-card ring-1 ring-border">
                    <Braces className="size-5 text-accent" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>JSON-LD Schema</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                   <div className="flex items-center justify-center size-9 rounded-md bg-card ring-1 ring-border">
                    <CheckCircle2 className="size-5 text-accent" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lighthouse Score: 100</p>
                </TooltipContent>
              </Tooltip>
          </div>
        </TooltipProvider>
      </GlassCard>
    </footer>
  );
}
