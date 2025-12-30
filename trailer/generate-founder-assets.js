import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI("AIzaSyDnSgpBxhL5mGuPEW6fxAG3N9Gt-tWGdJ4");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: { responseModalities: ["image", "text"] },
    });

    const response = await model.generateContent(prompt);

    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        const outputPath = path.join("public", `${filename}.png`);
        fs.writeFileSync(outputPath, imageData);
        console.log(`  ✓ Saved: ${outputPath} (${Math.round(imageData.length / 1024)}KB)`);
        return true;
      }
    }
    console.log(`  ✗ No image data in response`);
    return false;
  } catch (error) {
    console.log(`  ✗ Error: ${error.message.substring(0, 150)}`);
    return false;
  }
}

async function main() {
  console.log("Generating founder story assets...\n");

  // Asset 1: Enterprise codebase visual
  await generateImage(
    `Professional illustration of a complex IDE/code editor showing a massive enterprise codebase. Dark theme VS Code-style editor with:
    - File tree on left showing 100+ folders and files (nested deeply)
    - Multiple open file tabs at top
    - Main editor showing syntax-highlighted TypeScript/React code
    - Terminal panel at bottom with build output
    - Minimap on right side
    Modern vector illustration style, slightly stylized but recognizable as a real development environment. Shows the overwhelming scale of a 100,000+ line codebase. Clean lines, professional feel. No text labels.`,
    "enterprise-codebase"
  );

  await sleep(3000);

  // Asset 2: Founder achievement/success visual
  await generateImage(
    `Celebratory professional illustration showing career success and achievement. A confident person at a modern standing desk setup with:
    - Multiple large monitors showing dashboards, analytics, and code
    - Floating abstract icons around them: mobile phone app icon, AI/robot brain icon, team/people icons, rocket ship, checkmark badges
    - Warm glowing atmosphere suggesting success and accomplishment
    Modern minimalist vector illustration style. Color palette: dark background (#1a1a1a), warm cream accents (#FDF6E3), coral highlights (#FF5E5B). Professional, inspiring, aspirational feel. No text.`,
    "founder-achievement"
  );

  await sleep(3000);

  // Asset 3: Zero to lead journey visual
  await generateImage(
    `Split illustration showing transformation journey. LEFT side (darker, muted): A person looking overwhelmed at a complex codebase on screen, question marks floating around, confused expression. RIGHT side (brighter, warmer): Same person now confident, leading a team meeting, multiple screens showing successful deployments, trophy/star icons floating.
    Arrow or gradient transition in the middle connecting both sides.
    Modern vector illustration, editorial style. Colors: left side grayscale/muted, right side warm cream (#FDF6E3) and coral (#FF5E5B) accents. Shows the "zero experience to lead engineer" journey. No text.`,
    "founder-journey"
  );

  console.log("\nDone!");
}

main();
