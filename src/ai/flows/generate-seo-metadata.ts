'use server';

/**
 * @fileOverview An SEO metadata generation AI agent.
 *
 * - generateSEOMetadata - A function that handles the SEO metadata generation process.
 * - GenerateSEOMetadataInput - The input type for the generateSEOMetadata function.
 * - GenerateSEOMetadataOutput - The return type for the generateSEOMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSEOMetadataInputSchema = z.object({
  domainName: z.string().describe('The domain name of the landing page.'),
  landingPageContent: z.string().describe('The content of the landing page.'),
});
export type GenerateSEOMetadataInput = z.infer<typeof GenerateSEOMetadataInputSchema>;

const GenerateSEOMetadataOutputSchema = z.object({
  title: z.string().describe('The SEO title for the landing page.'),
  description: z.string().describe('The SEO description for the landing page.'),
  openGraphPreview: z.string().describe('The OpenGraph preview image URL for the landing page.'),
  structuredSchema: z.string().describe('The structured schema (JSON-LD) for the landing page.'),
});
export type GenerateSEOMetadataOutput = z.infer<typeof GenerateSEOMetadataOutputSchema>;

export async function generateSEOMetadata(input: GenerateSEOMetadataInput): Promise<GenerateSEOMetadataOutput> {
  return generateSEOMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSEOMetadataPrompt',
  input: {schema: GenerateSEOMetadataInputSchema},
  output: {schema: GenerateSEOMetadataOutputSchema},
  prompt: `You are an SEO expert specializing in generating metadata for landing pages.

  Based on the domain name and landing page content provided, generate the following SEO metadata:

  - title: A concise and compelling title for the landing page (max 60 characters).
  - description: A brief and engaging description of the landing page (max 160 characters).
  - openGraphPreview: A URL to a relevant OpenGraph preview image for social media sharing.
  - structuredSchema: A JSON-LD structured schema for search engines to understand the page content.

  Domain Name: {{{domainName}}}
  Landing Page Content: {{{landingPageContent}}}

  Ensure the generated metadata is optimized for search engine visibility and accurately reflects the content of the landing page.

  Here is an example of a JSON-LD structured schema:
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Example Domain",
    "description": "Example description.",
    "url": "https://example.com"
  }

  Make use of a relevant OpenGraph image URL. Note that a real URL needs to be returned.
  `,
});

const generateSEOMetadataFlow = ai.defineFlow(
  {
    name: 'generateSEOMetadataFlow',
    inputSchema: GenerateSEOMetadataInputSchema,
    outputSchema: GenerateSEOMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
