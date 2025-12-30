import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyDnSgpBxhL5mGuPEW6fxAG3N9Gt-tWGdJ4");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: { responseModalities: ["image", "text"] },
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
  console.log("Generating cyberpunk-styled assets...\n");

  // Asset 1: Landing page mockup - cyberpunk style
  await generateImage(
    `Cyberpunk-style SaaS landing page mockup on a dark monitor screen. Neon cyan (#00fff2) and magenta (#ff0080) accent colors on deep black background. Hero section with glowing text, futuristic navigation bar with neon borders, holographic feature cards, glowing CTA button. Grid lines in background, subtle scanline effect. Dark mode UI with tech aesthetic. High-tech startup vibe. No text visible except decorative placeholder blocks.`,
    "landing-page-mockup"
  );

  await sleep(4000);

  // Asset 2: Dashboard mockup - cyberpunk style
  await generateImage(
    `Cyberpunk analytics dashboard on a futuristic monitor. Dark theme (#0a0a0f background) with electric cyan (#00fff2) and neon magenta (#ff0080) data visualizations. Holographic charts, glowing line graphs, circular progress indicators with neon borders. Sidebar with tech icons, header with status indicators. Grid overlay, subtle scanlines. Real-time data aesthetic with pulsing glow effects. Modern data visualization UI.`,
    "dashboard-mockup"
  );

  await sleep(4000);

  // Asset 3: Mobile app mockup - cyberpunk style
  await generateImage(
    `Cyberpunk mobile app interface on a sleek smartphone. Dark theme with neon cyan and magenta accents. Futuristic UI with glowing buttons, holographic cards, tech-style navigation. App shows a productivity or fintech interface. Neon border glow around phone frame. Deep black background (#0a0a0f) with subtle grid lines. Modern cyberpunk aesthetic.`,
    "mobile-app-mockup"
  );

  await sleep(4000);

  // Asset 4: Video editor mockup - cyberpunk style
  await generateImage(
    `Cyberpunk video editing software interface. Dark theme with neon cyan and magenta UI elements. Timeline at bottom with glowing playhead, preview window showing futuristic content, side panels with effects and assets. Holographic overlays, tech-style buttons with glow effects. Professional video editing aesthetic with cyberpunk color scheme. Grid background, scanline texture.`,
    "video-editor-mockup"
  );

  await sleep(4000);

  // Asset 5: Pitch deck mockup - cyberpunk style
  await generateImage(
    `Cyberpunk presentation slide on a futuristic display. Dark background with neon cyan and magenta accent colors. Modern business chart with glowing data bars, tech-style typography placeholders, geometric decorative elements. Professional investor deck aesthetic with cyberpunk styling. Holographic frame effect, subtle grid lines.`,
    "pitch-deck-mockup"
  );

  await sleep(4000);

  // Asset 6: Research report mockup - cyberpunk style
  await generateImage(
    `Cyberpunk market research dashboard interface. Dark theme with multiple data panels showing analysis. Neon cyan charts, magenta highlights, competitive analysis grids with glowing borders. AI-generated insights visualization, trend graphs with pulsing data points. Tech startup research aesthetic with cyberpunk color scheme. Grid overlay, holographic display effect.`,
    "research-mockup"
  );

  await sleep(4000);

  // Asset 7: Founder journey - cyberpunk style
  await generateImage(
    `Cyberpunk illustration of a developer's journey. Split composition: left side shows frustrated person at old computer (red warning colors, error messages), right side shows confident person at futuristic workstation with multiple holographic displays (cyan and magenta glow, success indicators). Transformation narrative from struggle to success. Dark background with neon accents, tech aesthetic, grid lines. No text.`,
    "founder-journey"
  );

  console.log("\nDone generating assets!");
}

main();
