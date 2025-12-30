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
  console.log("Generating trailer assets (Extended 90s version)...\n");
  console.log("Design direction: Warm editorial brutalism");
  console.log("Style: Consistent with existing AgenticCodingTrailer\n");

  // Scene 1: Hook - Emotional question
  await generateImage(
    `Minimalist editorial illustration showing creative frustration. Cream (#FDF6E3) background with abstract geometric shapes in coral (#FF5E5B) and yellow (#F4A261). Shows person with thought bubble containing question marks and lightbulb that's dimmed. Clean flat vector illustration. Warm, inviting, editorial style. No text overlay in image.`,
    "hook-emotional-question"
  );

  await sleep(5000);

  // Scene 2: Career Journey Timeline
  await generateImage(
    `Horizontal timeline abstract illustration for career journey. Cream (#FDF6E3) background with teal (#2A9D8F) and coral (#FF5E5B) geometric accents. Shows 3 milestone dots connected by flowing line. Left to right flow. Includes abstract representations: code brackets, AI nodes, lightning bolt. Clean, professional, editorial flat vector style. Warm aesthetic.`,
    "career-timeline"
  );

  await sleep(5000);

  // Scene 3: Before/After Split Comparison
  await generateImage(
    `Split screen comparison illustration. Cream (#FDF6E3) background. Left side: Traditional coding - stressed figure, monochrome scrolling code, red X marks, dark gray tones. Right side: Agentic coding - relaxed orchestrator, clean flow diagram (arrows), green checkmarks, warm coral and teal tones. Vertical divider line down middle that's subtle. Editorial brutalism flat vector style.`,
    "before-after-split"
  );

  await sleep(5000);

  // Scene 4: Curriculum Icons (Multi-Agent)
  await generateImage(
    `Minimalist flat icon for multi-agent orchestration. Cream (#FDF6E3) background. Central illustration showing 3-4 agent nodes connected by flowing arrows in teal (#2A9D8F). Shows Planner → Retriever → Response flow. Geometric circles with icons inside. Clean, modern, editorial style. Simple and clear.`,
    "curriculum-agents"
  );

  await sleep(5000);

  // Scene 4: Curriculum Icons (RAG)
  await generateImage(
    `Minimalist flat icon for private RAG pipelines. Cream (#FDF6E3) background. Central illustration showing document retrieval system - stack of documents, magnifying glass, and database icon in coral (#FF5E5B). Flow arrow showing retrieval process. Clean, modern, editorial style. Simple and clear.`,
    "curriculum-rag"
  );

  await sleep(5000);

  // Scene 4: Curriculum Icons (MCP)
  await generateImage(
    `Minimalist flat icon for MCP integration. Cream (#FDF6E3) background. Central illustration showing modular plug-and-play connections - puzzle pieces fitting together in yellow (#F4A261). Shows endpoints and connectors. Clean, modern, editorial style. Simple and clear.`,
    "curriculum-mcp"
  );

  await sleep(5000);

  // Scene 4: Curriculum Icons (Speed)
  await generateImage(
    `Minimalist flat icon for speed and efficiency. Cream (#FDF6E3) background. Central lightning bolt icon in teal (#2A9D8F) with motion lines showing velocity. Clock or hourglass melting away. Clean, energetic, editorial style. Simple and clear.`,
    "curriculum-speed"
  );

  await sleep(5000);

  // Scene 5: CTA Background
  await generateImage(
    `Minimalist dramatic background for CTA. Deep cream/warm tone (#FDF6E3) with subtle coral (#FF5E5B) and teal (#2A9D8F) geometric accent lines and particles floating. Dramatic, bold, confident. Space for text overlay "Unlock Your Agency". Clean, premium, editorial brutalism aesthetic.`,
    "cta-background"
  );

  console.log("\nDone generating trailer assets!");
}

main();
