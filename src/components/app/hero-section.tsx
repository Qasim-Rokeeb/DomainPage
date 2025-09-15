'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from './glass-card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';

const FormSchema = z.object({
  domain: z.string().refine((val) => val.includes('.'), {
    message: "Please enter a valid domain.",
  }),
});

interface HeroSectionProps {
  domain: string;
  setDomain: (domain: string) => void;
  seoData: GenerateSEOMetadataOutput | null;
  onGenerate: (domain: string, headline: string, description: string) => Promise<void>;
  loading: boolean;
  step: 'input_domain' | 'build';
}

function useTypewriter(text: string, speed = 60) {
  const [displayText, setDisplayText] = React.useState('');

  React.useEffect(() => {
    setDisplayText('');
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  return displayText;
}


export function HeroSection({ domain, setDomain, seoData, onGenerate, loading, step }: HeroSectionProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { domain: "" },
  });

  const typedDomain = useTypewriter(domain);
  const showBuilder = step === 'build';

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setDomain(data.domain);
    await onGenerate(data.domain, '', '');
  }
  
  const initialHeadline = 'yourdomain.com';
  const displayedHeadline = showBuilder ? typedDomain : initialHeadline;

  return (
    <section className="relative w-full h-screen flex items-center justify-center -mt-[5vh] animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="container px-6">
        <GlassCard className="w-full max-w-2xl mx-auto p-8 md:p-12 text-center transition-all duration-700 ease-out-quart">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tighter break-words h-[104px] text-foreground/80">
            <span className={!showBuilder ? 'opacity-20' : ''}>{displayedHeadline}</span>
            {!showBuilder && <span className="animate-pulse">|</span>}
          </h1>

          {showBuilder && (
            <div className="w-full max-w-md mx-auto mt-4">
              <div className="relative h-px w-full bg-border">
                <div className="absolute top-0 left-0 h-px bg-accent animate-in fade-in duration-1000" style={{ width: '100%' }}></div>
              </div>
            </div>
          )}

          <div className="mt-8 min-h-[24px] flex flex-wrap items-center justify-center gap-2 animate-in fade-in-0 delay-1000 duration-500">
            {seoData && showBuilder && !loading && (
              <>
                <Badge variant="secondary" className="font-code text-xs">{seoData.title.substring(0, 60)}</Badge>
                <Badge variant="secondary" className="font-code text-xs hidden sm:inline-flex">{seoData.description.substring(0, 50)}...</Badge>
              </>
            )}
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-md mx-auto">
              {!showBuilder && (
                 <div className="flex w-full items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="e.g., premium.com" 
                            className="text-center bg-card h-12 text-base focus-ring"
                            {...field}
                          />
                        </FormControl>
                         <FormMessage className="text-accent/80" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="icon" className="h-12 w-12 bg-accent text-accent-foreground hover:bg-accent/90 focus-ring" disabled={loading}>
                    {loading ? <Loader className="animate-spin" /> : <ArrowRight />}
                  </Button>
                </div>
              )}
            </form>
          </Form>

        </GlassCard>
      </div>
    </section>
  );
}
