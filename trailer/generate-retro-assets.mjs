/**
 * Generate Bold Retro (80s/90s) style assets for the Retro Trailer
 *
 * Uses Gemini's Nano Banana image generation API
 * Style: Hot pink, electric cyan, bright yellow, VHS aesthetic, neon grids, Memphis design
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ASSETS = [
  {
    name: "retro-hero-bg.png",
    prompt: "80s retro synthwave background, neon grid perspective floor stretching to horizon, hot pink and electric cyan gradient sky, glowing sun on horizon, VHS scan lines overlay, chromatic aberration effect, Memphis design triangles floating, no text, 4K quality"
  },
  {
    name: "retro-computer.png",
    prompt: "Retro 1980s computer terminal, glowing cyan CRT monitor with green text, pixel art style, neon pink glow around edges, VHS static effect, vintage tech aesthetic, isometric view, clean background, no text"
  },
  {
    name: "retro-transformation.png",
    prompt: "80s style before and after transformation split screen, left side showing frustrated person in grayscale, right side showing happy empowered person with neon colors, synthwave aesthetic, Memphis design elements, geometric shapes, hot pink cyan yellow color scheme"
  },
  {
    name: "retro-rocket.png",
    prompt: "Retro pixel art rocket ship launching with neon exhaust trail, 80s video game style, hot pink and electric cyan colors, star field background, VHS glitch effect, geometric Memphis shapes around, clean isolated design"
  },
  {
    name: "retro-brain-chip.png",
    prompt: "Cyberpunk 80s style brain with circuit board patterns, neon pink and cyan glowing neural pathways, retro futuristic aesthetic, pixel art elements, geometric shapes, Memphis design triangles, dark background"
  },
  {
    name: "retro-celebration.png",
    prompt: "80s celebration scene with geometric confetti, neon party aesthetic, hot pink electric cyan bright yellow colors, Memphis design patterns, VHS aesthetic, abstract joyful composition, synthwave style"
  },
  {
    name: "retro-code-flow.png",
    prompt: "Abstract visualization of code flowing as neon streams, 80s synthwave style, hot pink and cyan light trails on dark grid background, retro computer aesthetic, pixel elements, geometric shapes, data visualization"
  },
  {
    name: "retro-lightning.png",
    prompt: "Retro 80s style lightning bolt icon, neon hot pink with cyan glow, synthwave aesthetic, geometric Memphis design elements around it, pixel art style, VHS grain texture, isolated on dark background"
  }
];

async function generateImage(prompt, filename) {
  try {
    console.log(`Generating: ${filename}...`);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const response = result.response;
    const imagePart = response.candidates[0].content.parts.find(
      (part) => part.inlineData
    );

    if (imagePart && imagePart.inlineData) {
      const imageData = imagePart.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      const outputPath = path.join("public", filename);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Saved: ${outputPath}`);
      return true;
    } else {
      console.error(`No image generated for ${filename}`);
      return false;
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("=================================");
  console.log("Bold Retro Asset Generator");
  console.log("80s/90s VHS Synthwave Style");
  console.log("=================================\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable not set");
    console.log("Usage: GEMINI_API_KEY=your_key node generate-retro-assets.mjs");
    process.exit(1);
  }

  // Ensure public directory exists
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }

  let successCount = 0;
  let failCount = 0;

  for (const asset of ASSETS) {
    const success = await generateImage(asset.prompt, asset.name);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("\n=================================");
  console.log(`Generation complete!`);
  console.log(`Success: ${successCount}/${ASSETS.length}`);
  console.log(`Failed: ${failCount}/${ASSETS.length}`);
  console.log("=================================");
}

main();
