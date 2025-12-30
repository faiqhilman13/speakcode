import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyDnSgpBxhL5mGuPEW6fxAG3N9Gt-tWGdJ4");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image",
    generationConfig: {
      responseModalities: ["image", "text"],
    },
  });

  try {
    const result = await model.generateContent(prompt);

    for (const part of result.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        const outputPath = `public/${filename}.png`;
        fs.writeFileSync(outputPath, imageData);
        console.log(`  ✓ Saved: ${outputPath} (${Math.round(imageData.length/1024)}KB)`);
        return true;
      }
    }
  } catch (error) {
    console.log(`  ✗ Error: ${error.message.substring(0, 100)}`);
    return false;
  }
  return false;
}

async function main() {
  console.log("Generating agentic coding video assets...\n");

  // Scene 1: Hook - The Future of Coding (0-5s)
  await generateImage(
    `Modern editorial illustration showing the evolution from traditional coding to AI agents. Split composition: Left shows traditional developer struggling with complex codebase (monochromatic, muted tones). Right shows AI agent assistant interface with glowing elements, code flowing effortlessly, developer smiling (warm coral accent colors, vibrant). Background: clean cream (#FDF6E3) with subtle geometric patterns. Style: Modern vector art, editorial, clean lines. No text.`,
    "agentic-hook"
  );

  await sleep(4000);

  // Scene 2: The Problem - Manual Coding (5-10s)
  await generateImage(
    `Frustrated developer at a messy desk, old monitor showing wall of code with red error highlights, multiple browser tabs open, coffee cup, tangled cables. Dark muted colors, sense of overwhelm. Editorial vector style, desaturated grays and muted blues. Background: slightly darker, conveying stress. No text.`,
    "agentic-problem"
  );

  await sleep(4000);

  // Scene 3: The Solution - AI Agents (10-15s)
  await generateImage(
    `Futuristic AI coding interface on a clean modern monitor. Glowing cyan and coral elements representing AI agents. Code being written and refactored automatically. The AI agent appears as a subtle holographic companion. Developer looking confident and relaxed. Background: clean, minimal, with warm lighting. Style: Modern tech illustration with warmth, not too cold/cyberpunk. No text.`,
    "agentic-solution"
  );

  await sleep(4000);

  // Scene 4: Multi-Agent Collaboration (15-20s)
  await generateImage(
    `Abstract visualization showing multiple AI agents working together. Each agent represented by distinct glowing colors (cyan, coral, purple, teal) collaborating on a codebase. Code blocks, documentation, tests being generated simultaneously. Flowchart-style composition showing agents coordinating. Clean, modern aesthetic with warm undertones. No text.`,
    "agentic-collaboration"
  );

  await sleep(4000);

  // Scene 5: Result - What You Build (20-25s)
  await generateImage(
    `Success montage: Three sleek mockups floating in editorial layout. 1) Beautiful SaaS dashboard, 2) Modern mobile app, 3) Professional website landing page. All showing clean, production-ready interfaces. Warm, inviting colors (cream background, coral accents, black text). Style: High-quality product mockups, editorial magazine layout. No text.`,
    "agentic-results"
  );

  await sleep(4000);

  // Scene 6: CTA - Start Today (25-30s)
  await generateImage(
    `Minimalist editorial composition. Clean open laptop on a pristine desk. Screen showing a welcoming "Get Started" interface with warm colors. Plants, natural light, sense of possibility and beginning. Style: Clean, inviting, warm editorial illustration. Background: cream color (#FDF6E3). No text visible on screen, just welcoming UI elements.`,
    "agentic-cta"
  );

  console.log("\nDone generating agentic coding assets!");
}

main();
