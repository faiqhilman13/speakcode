import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
  console.log("Generating cohesive agentic coding assets...\n");

  // Unified style: Editorial brutalism with cream background, geometric shapes, warm colors

  // Scene 1: Hook - The Future of Coding (0-5s)
  await generateImage(
    `Minimalist editorial illustration showing the concept of AI coding assistants. Composition: Clean cream background (#FDF6E3) with abstract geometric shapes in coral (#FF5E5B), teal (#2A9D8F), and yellow (#F4A261). Left side shows traditional coding symbols (brackets, semicolons) in monochromatic black (#1a1a1a). Right side shows AI code generation represented by flowing coral lines and geometric patterns. Style: Modern flat vector illustration, editorial brutalism aesthetic, clean lines, no text. Warm, confident, minimal.`,
    "scene1-future-coding"
  );

  await sleep(5000);

  // Scene 2: The Problem - Manual Coding (5-10s)
  await generateImage(
    `Minimalist editorial illustration of coding frustration. Composition: Cream background (#FDF6E3). Shows abstract representation of developer struggling - tangled black lines representing code, gray geometric shapes representing complexity, small coral accent shapes. Style: Monochromatic grays and blacks (#6B705C, #1a1a1a) with single coral (#FF5E5B) accent. Clean, flat vector illustration, editorial style, no text. Expressive but minimal.`,
    "scene2-coding-struggle"
  );

  await sleep(5000);

  // Scene 3: The Solution - AI Agents (10-15s)
  await generateImage(
    `Minimalist editorial illustration of AI agents as coding partners. Composition: Cream background (#FDF6E3) with teal accents (#2A9D8F). Shows abstract representation of AI agent assistance - coral lines connecting geometric shapes, teal circles representing AI intelligence, flow of code as elegant curves. Style: Cool, confident, modern flat vector illustration. No text. Clean geometric patterns, harmonious.`,
    "scene3-ai-agents"
  );

  await sleep(5000);

  // Scene 4: Multi-Agent Collaboration (15-20s)
  await generateImage(
    `Minimalist editorial illustration of AI team collaboration. Composition: Cream background (#FDF6E3). Shows multiple geometric shapes (circles, triangles, squares) in coral (#FF5E5B), teal (#2A9D8F), and yellow (#F4A261) connected by elegant lines. Represents different AI agents working together. Style: Clean, modern flat vector, editorial layout. No text. Harmonious color palette, balanced composition.`,
    "scene4-ai-collaboration"
  );

  await sleep(5000);

  // Scene 5: Results - What You Build (20-25s)
  await generateImage(
    `Minimalist editorial illustration of building products with AI. Composition: Cream background (#FDF6E3) with teal accents (#2A9D8F). Shows abstract representations of success - ascending geometric shapes, clean lines, glowing coral accents. Three elegant product mockups as flat shapes: one dashboard, one mobile app, one landing page. Style: Confident, accomplished, editorial flat vector. No text. Premium, refined aesthetic.`,
    "scene5-build-products"
  );

  await sleep(5000);

  // Scene 6: CTA - Start Today (25-30s)
  await generateImage(
    `Minimalist editorial illustration of starting the journey. Composition: Cream background (#FDF6E3) with dramatic accents. Central focus: open abstract laptop screen as flat shape with warm glow. Surrounding: coral and yellow geometric accents suggesting opportunity. Style: Inviting, confident, clean flat vector illustration. Editorial brutalism aesthetic. No text. Warm, optimistic, ready.`,
    "scene6-start-today"
  );

  console.log("\nDone generating cohesive assets!");
}

main();
