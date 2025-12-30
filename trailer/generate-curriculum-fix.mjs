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
  console.log("Generating curriculum assets with correct filenames...\n");

  // Module 1: New Mental Model
  await generateImage(
    `Minimalist editorial illustration for "New Mental Model" curriculum module. Cream (#FDF6E3) background with teal (#2A9D8F) geometric accent. Central icon showing brain/mind with AI agents as smaller nodes orbiting around it. Clean, educational flat vector. Simple and clear.`,
    "curriculum-mental-model"
  );

  await sleep(5000);

  // Module 2: Fundamentals
  await generateImage(
    `Minimalist editorial illustration for "Fundamentals" curriculum module. Cream (#FDF6E3) background with coral (#FF5E5B) geometric accent. Central icon showing three elements: model icon, context/document icon, and prompt/speech icon. Clean, educational flat vector. Simple and clear.`,
    "curriculum-fundamentals"
  );

  await sleep(5000);

  // Module 3: Agent Harnesses
  await generateImage(
    `Minimalist editorial illustration for "Agent Harnesses" curriculum module. Cream (#FDF6E3) background with yellow (#F4A261) geometric accent. Split composition showing IDE/code editor on left and terminal/TUI on right, with connected flow between them. Clean, educational flat vector. Simple and clear.`,
    "curriculum-agent-harnesses"
  );

  await sleep(5000);

  // Module 4: Skills & MCPs
  await generateImage(
    `Minimalist editorial illustration for "Skills & MCPs" curriculum module. Cream (#FDF6E3) background with teal (#2A9D8F) geometric accent. Central icon showing modular plugins represented as puzzle pieces or connecting blocks, with AGENTS.md document icon. Clean, educational flat vector. Simple and clear.`,
    "curriculum-skills-mcp"
  );

  await sleep(5000);

  // Module 5: Build Real Projects
  await generateImage(
    `Minimalist editorial illustration for "Build Real Projects" curriculum module. Cream (#FDF6E3) background with coral (#FF5E5B) geometric accent. Central icon showing completed product/application interface with rocket ship launching upward. Clean, educational flat vector. Simple and clear.`,
    "curriculum-build-projects"
  );

  console.log("\nDone! Files generated with correct names.");
}

main();
