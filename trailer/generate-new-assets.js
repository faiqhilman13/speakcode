import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt, filename, retries = 3) {
  console.log(`Generating: ${filename}...`);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ["image", "text"],
    },
  });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = Buffer.from(part.inlineData.data, "base64");
          const outputPath = path.join("public", `${filename}.png`);
          fs.writeFileSync(outputPath, imageData);
          console.log(`Saved: ${outputPath}`);
          return true;
        }
      }
    } catch (error) {
      if (error.message.includes("429") && i < retries - 1) {
        console.log(`Rate limited, waiting 50s before retry ${i + 2}...`);
        await sleep(50000);
      } else {
        console.error(`Error: ${error.message.substring(0, 100)}`);
        return false;
      }
    }
  }
  return false;
}

async function main() {
  console.log("Waiting 50s for rate limit to reset...");
  await sleep(50000);

  // Before/After coding visual
  await generateImage(
    "Professional flat illustration for a coding course: Split screen comparison. LEFT side: A cluttered desk with old textbooks, coffee cups, frustrated person, tangled cables, old monitor showing error messages, dim lighting. RIGHT side: Same desk but clean and minimal, person relaxed and smiling, modern laptop showing clean code, plants, natural light. Style: Modern vector art, warm cream and coral accents on right side, desaturated grays on left. No text. Clean lines.",
    "before-after-coding"
  );

  await sleep(20000);

  // Happy successful student
  await generateImage(
    "Professional illustration of a confident young professional (diverse, modern) sitting relaxed at a minimalist desk with a large monitor showing a beautiful finished web application. The person has a satisfied, accomplished expression. Coffee cup, plant, warm natural lighting from a window. Style: Modern vector illustration, warm cream background, clean lines, subtle coral accent colors. No text.",
    "successful-student"
  );

  await sleep(20000);

  // Course completion celebration
  await generateImage(
    "Celebratory illustration: A laptop screen showing Deployed! with confetti around it. Abstract representations of web apps, mobile apps, and dashboards floating around it like achievements unlocked. Style: Playful but professional vector art, warm cream background, coral and black accents. Minimalist, editorial feel.",
    "course-celebration"
  );

  console.log("\nDone generating new assets!");
}

main();
