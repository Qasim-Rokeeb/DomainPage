'use server';

import { generateSEOMetadata, GenerateSEOMetadataInput, GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';

export async function getSeoMetadataAction(input: GenerateSEOMetadataInput): Promise<{ success: boolean; data?: GenerateSEOMetadataOutput, error?: string }> {
  try {
    const result = await generateSEOMetadata(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getSeoMetadataAction:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate SEO metadata: ${errorMessage}` };
  }
}
