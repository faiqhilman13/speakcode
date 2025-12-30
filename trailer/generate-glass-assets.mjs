#!/usr/bin/env node

/**
 * Glassmorphism Asset Generator
 *
 * Generates dreamy, frosted glass UI assets for the Glassmorphism trailer
 * using Google's Gemini image generation API (Nano Banana).
 *
 * Run: node generate-glass-assets.mjs
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GLASS_STYLE_PREFIX = `Dreamy glassmorphic UI design with soft gradients (purple #8B5CF6 to pink #EC4899 to blue #3B82F6), frosted glass panels with blur effects, soft white overlays, modern rounded sans-serif typography, subtle glow effects, floating elements with depth illusion, premium aesthetic, dark background with colorful gradient blobs, high quality digital art, 4K resolution`;

const assets = [
  {
    name: 'glass-hook-bg.png',
    prompt: `${GLASS_STYLE_PREFIX}. Abstract background with large soft gradient mesh blobs floating in space, purple and pink and blue colors blending together, dreamy atmosphere with subtle particle effects, perfect for a video hook scene, minimalist but visually striking`
  },
  {
    name: 'glass-coding-journey.png',
    prompt: `${GLASS_STYLE_PREFIX}. Split illustration showing coding journey transformation - left side shows frustrated developer with complex code, right side shows same person happy with AI assistant, glass cards with frosted blur effect showing before/after, gradient background with flowing shapes`
  },
  {
    name: 'glass-ai-interface.png',
    prompt: `${GLASS_STYLE_PREFIX}. Futuristic AI chat interface mockup with glassmorphic message bubbles, frosted glass panels, conversation between human and AI about building an app, glowing accent elements, floating UI cards with blur backdrop, modern minimal design`
  },
  {
    name: 'glass-dashboard-mockup.png',
    prompt: `${GLASS_STYLE_PREFIX}. Beautiful analytics dashboard mockup with glassmorphic cards, frosted glass widgets showing charts and graphs, gradient accents purple to pink, floating data visualization elements, premium SaaS aesthetic, dark mode with colorful highlights`
  },
  {
    name: 'glass-curriculum-modules.png',
    prompt: `${GLASS_STYLE_PREFIX}. Course curriculum visualization with 5 floating glassmorphic cards in a row, each card has frosted glass effect with number and title, connected by subtle gradient lines, representing learning modules, clean modern educational design`
  },
  {
    name: 'glass-success-celebration.png',
    prompt: `${GLASS_STYLE_PREFIX}. Celebratory scene with glassmorphic achievement badges floating, confetti particles with gradient colors, frosted glass trophy or medal centerpiece, glowing success elements, triumphant mood with dreamy soft aesthetic`
  },
  {
    name: 'glass-showcase-apps.png',
    prompt: `${GLASS_STYLE_PREFIX}. Showcase of multiple app mockups floating in 3D space with glassmorphic frames - includes web dashboard, mobile app, landing page - all with frosted glass borders, gradient mesh background, premium portfolio display`
  },
  {
    name: 'glass-cta-background.png',
    prompt: `${GLASS_STYLE_PREFIX}. Epic call-to-action background with large central glassmorphic panel ready for text, dramatic gradient lighting purple pink blue, floating decorative elements around edges, cinematic feel, perfect for final scene of video trailer`
  }
];

async function generateImage(prompt, filename) {
  console.log(`\nGenerating: ${filename}`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '16:9'
        }
      }
    });

    // Extract image from response
    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find(p => p.inlineData);

    if (imagePart?.inlineData?.data) {
      const outputPath = path.join('public', filename);
      const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Saved: ${outputPath}`);
      return true;
    } else {
      console.error(`No image data in response for ${filename}`);
      console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));
      return false;
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('=== Glassmorphism Asset Generator ===\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable not set');
    console.log('Set it with: export GEMINI_API_KEY=your_api_key');
    process.exit(1);
  }

  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const asset of assets) {
    const success = await generateImage(asset.prompt, asset.name);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Rate limit pause between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${successCount}/${assets.length}`);
  console.log(`Failed: ${failCount}/${assets.length}`);
}

main().catch(console.error);
