'use client';

import * as React from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, Copy, Palette, LayoutDashboard, AppWindow, GalleryVertical, Square, icons } from 'lucide-react';
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
import type { BuilderState } from '@/app/page';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface BuilderControlsProps {
  builderState: BuilderState;
  updateBuilderState: (updates: Partial<BuilderState>) => void;
  domain: string;
}

const colorPresets = [
  "158 100% 47.6%", // Green
  "221 83% 53%",   // Blue
  "346 77% 50%",   // Rose
  "48 96% 53%",    // Orange
  "262 84% 57%",   // Violet
];

export function BuilderControls({
  builderState,
  updateBuilderState,
  domain,
}: BuilderControlsProps) {
  const templates = PlaceHolderImages.filter(img => img.id.startsWith('template-'));
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isPublished, setIsPublished] = React.useState(false);

  const LucideIcon = (icons as any)[builderState.logoIcon] || LayoutDashboard;

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
    <div className="space-y-6 sticky top-8">
      <Accordion type="multiple" defaultValue={['template', 'content', 'cta', 'style']} className="w-full">
        <AccordionItem value="template">
          <AccordionTrigger className="text-xl font-semibold">1. Template</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {templates.map((template, index) => (
                  <CarouselItem key={index} className="basis-1/2">
                    <div 
                      className="p-1 cursor-pointer"
                      onClick={() => updateBuilderState({ template: template.id.replace('template-','') as BuilderState['template'] })}
                    >
                      <GlassCard className={cn(
                        "overflow-hidden transition-all duration-300 ease-out-expo",
                        builderState.template === template.id.replace('template-','')
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="content">
          <AccordionTrigger className="text-xl font-semibold">2. Content</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={builderState.headline} onChange={(e) => updateBuilderState({ headline: e.target.value })} className="bg-card mt-2 focus-ring" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={builderState.description} onChange={(e) => updateBuilderState({ description: e.target.value })} className="bg-card mt-2 min-h-[120px] focus-ring" />
            </div>
            <div>
              <Label htmlFor="logoIcon">Logo Icon</Label>
               <Select onValueChange={(value) => updateBuilderState({ logoIcon: value })} defaultValue={builderState.logoIcon}>
                <SelectTrigger className="w-full mt-2 bg-card focus-ring">
                  <div className="flex items-center gap-2">
                    <LucideIcon />
                    <SelectValue placeholder="Select an icon" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(icons).slice(0, 50).map(iconKey => (
                     <SelectItem key={iconKey} value={iconKey}>
                      <div className="flex items-center gap-2">
                        {React.createElement((icons as any)[iconKey])}
                        <span>{iconKey}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cta">
          <AccordionTrigger className="text-xl font-semibold">3. Call to Action</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <RadioGroup
              value={builderState.ctaType}
              onValueChange={(value: 'buy' | 'offer' | 'none') => updateBuilderState({ ctaType: value })}
              className="grid grid-cols-3 gap-2"
            >
              {['buy', 'offer', 'none'].map((type) => (
                <Label key={type} className={cn(
                  "glass-card p-3 rounded-md cursor-pointer text-center transition-all text-sm",
                  builderState.ctaType === type ? 'ring-2 ring-accent' : 'text-muted-foreground'
                )}>
                  <RadioGroupItem value={type} id={type} className="sr-only" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
              ))}
            </RadioGroup>
            {builderState.ctaType === 'buy' && (
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" value={builderState.ctaPrice} onChange={(e) => updateBuilderState({ ctaPrice: e.target.value })} className="bg-card mt-2 focus-ring" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="secondaryCtaText">Secondary CTA</Label>
              <Input id="secondaryCtaText" placeholder="Button Text (e.g. 'Learn More')" value={builderState.secondaryCtaText} onChange={(e) => updateBuilderState({ secondaryCtaText: e.target.value })} className="bg-card focus-ring" />
              <Input id="secondaryCtaLink" placeholder="https://..." value={builderState.secondaryCtaLink} onChange={(e) => updateBuilderState({ secondaryCtaLink: e.target.value })} className="bg-card focus-ring" />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="style">
          <AccordionTrigger className="text-xl font-semibold">4. Styling</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div>
              <Label>Primary Color</Label>
              <div className="flex gap-2 mt-2">
                {colorPresets.map(color => (
                  <button
                    key={color}
                    onClick={() => updateBuilderState({ primaryColor: color })}
                    className={cn(
                      "w-8 h-8 rounded-full transition-all",
                      builderState.primaryColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                    )}
                    style={{ backgroundColor: `hsl(${color})` }}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-4 pt-4">
         <Button 
            onClick={handlePublish}
            disabled={isPublishing || isPublished}
            className={cn(
                "w-full h-12 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-400 ease-out-quart focus-ring",
                 isPublished && "bg-green-500 hover:bg-green-600"
            )}
        >
            {isPublishing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : isPublished ? (
                <div className="flex items-center gap-2"> <Check /> Published </div>
            ) : (
                "Publish"
            )}
        </Button>
        {isPublished && (
          <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
            <CheckCircle2 className="text-green-500 size-4" />
            <span>Site is live! Copied DNS instructions.</span>
          </p>
        )}
      </div>
    </div>
  );
}
