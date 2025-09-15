'use client';

import * as React from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, Copy } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GlassCard } from './glass-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Template } from '@/app/page';

interface BuilderControlsProps {
  selectedTemplate: Template;
  setSelectedTemplate: (template: Template) => void;
  headline: string;
  setHeadline: (headline: string) => void;
  description: string;
  setDescription: (description: string) => void;
  ctaType: 'buy' | 'offer';
  setCtaType: (type: 'buy' | 'offer') => void;
  ctaPrice: string;
  setCtaPrice: (price: string) => void;
  domain: string;
}

export function BuilderControls({
  selectedTemplate,
  setSelectedTemplate,
  headline,
  setHeadline,
  description,
  setDescription,
  ctaType,
  setCtaType,
  ctaPrice,
  setCtaPrice,
  domain,
}: BuilderControlsProps) {
  const templates = PlaceHolderImages.filter(img => img.id.startsWith('template-'));
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isPublished, setIsPublished] = React.useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      toast({
        title: "Live at yourdomain.com",
        description: "Instructions to point your domain have been copied to your clipboard.",
      });
      navigator.clipboard.writeText("To host your new landing page, create an A record for your domain pointing to IP address: 76.76.21.21. Your page is now configured and will be live once DNS propagates.");
    }, 2000);
  };
  
  return (
    <div className="space-y-8 sticky top-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Select a Template</h2>
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {templates.map((template, index) => (
              <CarouselItem key={index} className="basis-1/2">
                <div 
                  className="p-1 cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id.replace('template-','') as Template)}
                >
                  <GlassCard className={cn(
                    "overflow-hidden transition-all duration-300 ease-out-expo",
                    selectedTemplate === template.id.replace('template-','')
                      ? "ring-2 ring-accent scale-105"
                      : "hover:scale-105 hover:ring-1 hover:ring-accent/50"
                  )}>
                    <Image
                      src={template.imageUrl}
                      alt={template.description}
                      data-ai-hint={template.imageHint}
                      width={320}
                      height={180}
                      className="aspect-video object-cover"
                    />
                  </GlassCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-card hover:bg-secondary focus-ring -left-4" />
          <CarouselNext className="bg-card hover:bg-secondary focus-ring -right-4" />
        </Carousel>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Add Content</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} className="bg-card mt-2 focus-ring" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-card mt-2 min-h-[120px] focus-ring" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Configure CTA</h2>
        <RadioGroup
          value={ctaType}
          onValueChange={(value: 'buy' | 'offer') => setCtaType(value)}
          className="grid grid-cols-2 gap-4"
        >
          <Label className={cn(
            "glass-card p-4 rounded-md cursor-pointer text-center transition-all",
            ctaType === 'buy' ? 'ring-2 ring-accent' : 'text-muted-foreground'
          )}>
            <RadioGroupItem value="buy" id="buy" className="sr-only" />
            Buy Now
          </Label>
          <Label className={cn(
            "glass-card p-4 rounded-md cursor-pointer text-center transition-all",
            ctaType === 'offer' ? 'ring-2 ring-accent' : 'text-muted-foreground'
          )}>
            <RadioGroupItem value="offer" id="offer" className="sr-only" />
            Make Offer
          </Label>
        </RadioGroup>
        {ctaType === 'buy' && (
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" value={ctaPrice} onChange={(e) => setCtaPrice(e.target.value)} className="bg-card mt-2 focus-ring" />
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4">
         <Button 
            onClick={handlePublish}
            disabled={isPublishing || isPublished}
            className={cn(
                "w-full h-12 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-400 ease-out-quart focus-ring animate-pulse-glow",
                (isPublishing || isPublished) && "w-12 rounded-full animate-none"
            )}
        >
            {isPublishing ? (
                <Loader className="animate-spin" />
            ) : isPublished ? (
                <Check />
            ) : (
                "Publish"
            )}
        </Button>
        {isPublished && (
          <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
            <CheckCircle2 className="text-accent size-4" />
            <span>Site is ready!</span>
          </p>
        )}
      </div>
    </div>
  );
}
