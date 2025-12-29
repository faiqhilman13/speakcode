import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// Asset prompts for the trailer
const assets = [
  {
    name: "frustrated-developer",
    prompt: "Minimalist illustration of a person sitting at a desk looking frustrated at a computer screen filled with code errors. Warm cream and coral color palette. Editorial style, clean lines, no text. Simple flat design.",
  },
  {
    name: "ai-conversation",
    prompt: "Minimalist illustration of a person casually talking with speech bubbles, representing conversation with AI. One large speech bubble with a lightbulb icon. Warm cream background, coral and black accents. Editorial flat style, clean.",
  },
  {
    name: "dashboard-mockup",
    prompt: "Clean minimalist dashboard UI mockup showing charts and analytics. Dark theme with coral accent color. Abstract representation, no real data. Flat design, modern SaaS aesthetic. Simple geometric shapes.",
  },
  {
    name: "mobile-app-mockup",
    prompt: "Minimalist mobile phone mockup showing a clean app interface. Dark screen with coral and teal accent elements. Flat illustration style, editorial aesthetic. No text, abstract UI elements.",
  },
  {
    name: "code-to-product",
    prompt: "Split illustration: left side shows messy tangled code/wires, right side shows clean polished app interface. Visual metaphor for transformation. Cream background, coral and black colors. Minimalist editorial style.",
  },
];

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  try {
    // Use gemini-2.0-flash-exp with image output
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;

    // Check for inline data (images)
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = Buffer.from(part.inlineData.data, "base64");
        const outputPath = path.join("public", `${filename}.png`);
        fs.writeFileSync(outputPath, imageData);
        console.log(`✓ Saved: ${outputPath}`);
        return true;
      }
    }

    console.log(`✗ No image in response for ${filename}`);
    return false;
  } catch (error) {
    console.log(`✗ Error generating ${filename}:`, error.message);
    if (error.message.includes("not found")) {
      console.log("  Try checking model name or API key permissions");
    }
    return false;
  }
}

async function main() {
  console.log("🎨 Generating trailer assets with Gemini...\n");

  for (const asset of assets) {
    await generateImage(asset.prompt, asset.name);
    // Rate limit protection
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log("\n✨ Done generating assets!");
  console.log("\nGenerated images are in: public/");
}

main();
