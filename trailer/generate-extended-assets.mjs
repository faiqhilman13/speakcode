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
  console.log("Generating assets for 9 scenes (10s each)...\n");
  console.log("Design direction: Warm editorial brutalism");
  console.log("Style: Consistent with existing AgenticCodingTrailer\n");

  // Scene 3: Problem - The Struggle
  await generateImage(
    `Minimalist editorial illustration showing coding frustration and overwhelm. Cream (#FDF6E3) background with coral (#FF5E5B) geometric accents. Shows developer figure buried under mountains of code files, looking exhausted. Clock icon showing midnight. Red stress indicators. Clean flat vector illustration. Warm but conveying struggle. No text overlay in image.`,
    "problem-struggle"
  );

  await sleep(5000);

  // Scene 4: Solution - Agentic Coding Intro
  await generateImage(
    `Minimalist editorial illustration showing the breakthrough of agentic coding. Cream (#FDF6E3) background with teal (#2A9D8F) geometric accents. Shows clean, organized system where developer is orchestrating, not coding. Lightbulb glowing bright. Multiple agents working together represented as connected nodes. Relief and clarity. Clean flat vector. Warm and hopeful.`,
    "solution-agentic-intro"
  );

  await sleep(5000);

  // Scene 6: Credentials - Authority
  await generateImage(
    `Minimalist editorial illustration showing professional authority and credibility. Cream (#FDF6E3) background with yellow (#F4A261) and teal (#2A9D8F) accents. Shows achievement badges, certificates, and corporate logos in elegant arrangement. Professional trust markers. Clean flat vector illustration. Sophisticated and accomplished feel. No text overlay in image.`,
    "credentials-authority"
  );

  await sleep(5000);

  // Scene 7: Curriculum - Multi-Agent (Single Card)
  await generateImage(
    `Minimalist editorial illustration for multi-agent orchestration curriculum card. Cream (#FDF6E3) background with teal (#2A9D8F) accent. Central icon showing 3 agent nodes connected by flowing arrows in circular pattern. Represents Planner, Retriever, Executor working together. Clean, elegant, educational flat vector. Simple and clear icon.`,
    "curriculum-multiagent"
  );

  await sleep(5000);

  // Scene 8: Curriculum - RAG & MCP (Single Card)
  await generateImage(
    `Minimalist editorial illustration for RAG and MCP curriculum card. Cream (#FDF6E3) background with coral (#FF5E5B) and yellow (#F4A261) accents. Split composition showing document retrieval system on left (documents, database, magnifying glass) and modular connections on right (puzzle pieces, plug icons). Clean, educational flat vector. Two concepts unified.`,
    "curriculum-rag-mcp"
  );

  console.log("\nDone generating extended assets!");
}

main();
