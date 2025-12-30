#!/usr/bin/env node
/**
 * Generate Minimalist Tech style assets using Gemini's image generation API
 * Style: Swiss design, geometric precision, clean lines, minimal color palette
 * Colors: Pure white (#FFFFFF), Rich black (#0A0A0A), Electric blue (#0066FF)
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const assets = [
  {
    name: "minimalist-hook",
    prompt: `Minimalist Swiss design illustration of a single lightbulb made from clean geometric shapes.
    Pure white background.
    The lightbulb is constructed from simple black lines and one electric blue (#0066FF) circle for the glow.
    Bauhaus-inspired, grid-aligned, lots of negative space.
    No gradients, no shadows, only flat geometric shapes.
    16:9 aspect ratio, ultra clean, professional.`,
  },
  {
    name: "minimalist-old-way",
    prompt: `Minimalist Swiss design illustration showing the concept of complexity and frustration.
    Pure white background with rich black (#0A0A0A) geometric elements.
    A tangled maze or knot made of clean black lines representing complexity.
    One small electric blue (#0066FF) geometric accent.
    Grid-based composition, no textures, no gradients, just clean lines and shapes.
    Bauhaus typography influence, extreme negative space.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-shift",
    prompt: `Minimalist Swiss design illustration showing transformation.
    Pure white background transitioning to bold electric blue (#0066FF).
    Clean geometric shapes: a circle transforming into a square, or an arrow pointing right.
    Rich black (#0A0A0A) accent lines.
    Grid precision, mathematical beauty, Helvetica-inspired aesthetic.
    No gradients, no textures - pure flat design.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-before-after",
    prompt: `Minimalist Swiss design split composition.
    Left side: scattered chaotic black geometric shapes on white.
    Right side: perfectly aligned geometric shapes in electric blue (#0066FF) on white.
    Clean vertical dividing line.
    The contrast between disorder and order through pure geometry.
    Grid-based, Bauhaus-inspired, extreme simplicity.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-conversation",
    prompt: `Minimalist Swiss design illustration of human-AI conversation.
    Pure white background with two speech bubbles: one in rich black (#0A0A0A), one in electric blue (#0066FF).
    Clean geometric shapes only, no icons inside bubbles.
    Bubbles are connected by a simple line or arrow.
    Grid-aligned, mathematical precision, lots of whitespace.
    No gradients, purely flat geometric design.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-modules",
    prompt: `Minimalist Swiss design grid layout showing 5 numbered squares.
    Pure white background with rich black (#0A0A0A) numbered boxes (01, 02, 03, 04, 05) in a clean grid.
    One box highlighted in electric blue (#0066FF).
    Helvetica-style numbers, perfect geometric squares, mathematical spacing.
    Bauhaus-inspired, modular grid system, extreme negative space.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-achievement",
    prompt: `Minimalist Swiss design illustration of success/achievement.
    Pure white background with a single geometric trophy or star shape in electric blue (#0066FF).
    Clean black (#0A0A0A) accent lines radiating outward.
    No gradients, no shadows - pure flat geometric shapes.
    Grid-aligned, mathematical precision, Bauhaus aesthetic.
    Celebratory but restrained and elegant.
    16:9 aspect ratio.`,
  },
  {
    name: "minimalist-cta",
    prompt: `Minimalist Swiss design call-to-action composition.
    Bold electric blue (#0066FF) geometric arrow or chevron pointing right on pure white background.
    Rich black (#0A0A0A) accent line below.
    Clean, commanding, simple geometry that draws the eye forward.
    Grid-based composition, lots of whitespace, no gradients.
    Helvetica/Bauhaus inspired, extremely clean.
    16:9 aspect ratio.`,
  },
];

async function generateImage(asset) {
  console.log(`Generating: ${asset.name}...`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: asset.prompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    // Extract image data from response
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No parts in response");
    }

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const outputPath = path.join("public", `${asset.name}.png`);
        fs.writeFileSync(outputPath, buffer);
        console.log(`  Saved: ${outputPath}`);
        return true;
      }
    }

    throw new Error("No image data in response");
  } catch (error) {
    console.error(`  Error generating ${asset.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("Generating Minimalist Tech style assets...\n");
  console.log("Style: Swiss design, geometric precision, clean lines");
  console.log("Colors: White (#FFFFFF), Black (#0A0A0A), Blue (#0066FF)\n");

  let successCount = 0;
  for (const asset of assets) {
    const success = await generateImage(asset);
    if (success) successCount++;
    // Rate limiting pause
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log(`\nCompleted: ${successCount}/${assets.length} assets generated`);
}

main().catch(console.error);
