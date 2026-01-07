import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";

const client = new ElevenLabsClient({
  apiKey: "sk_7740754f1b9d6421d71d4213f3a35dc4851769c4e9517a66"
});

// Voice ID for the Dojo trailer
const VOICE_ID = "S9GPGBaMND8XWwwzxQXp";

// Scene timing (30fps) - DojoTrailerVertical (Total: 44s / 1320 frames):
// Scene 1 (Intro): 0-4s - "You have an idea..."
// Scene 2 (Problem): 4-8s - "Traditional coding..."
// Scene 3 (Reveal): 8-12s - "Welcome to the Agentic Dojo..."
// Scene 4 (Origin): 12-17s - "I had the MSc..."
// Scene 5 (Catalyst): 17-22s - "Then I discovered Agentic Coding..."
// Scene 6 (Proof): 22-28s - "Using these protocols..."
// Scene 7 (Empowerment): 28-33s - "Now, it's your turn..."
// Scene 8 (Mastery): 33-39s - "Master the Mind, the Blade, and the Strike..."
// Scene 9 (CTA): 39-44s - "Initialize the protocol..."

const voiceoverScript = `
You have an idea. A vision for a system that could change everything. But there's a wall.

Traditional coding. It's slow, it's complex, and it's keeping your best ideas trapped in the boilerplate.

Welcome to the Agentic Dojo. This isn't just a course. It's a total shift in how software is built.

I had the MSc and the Big 4 consultant job, but I was still hitting a technical ceiling. Stuck in the plumbing instead of building the vision.

Then I discovered Agentic Coding. Tools like Claude Code aren't just autocomplete—they are autonomous agents that execute your intent.

Using these protocols, I placed Top 5 in the ASEAN AI Hackathon as a solo dev and architected enterprise systems with over 100,000 lines of code.

Now, it's your turn. The ceiling has been removed. It's time to build the vision you've always had.

Master the Mind, the Blade, and the Strike. Go from zero to Master Architect in record time.

Initialize the protocol. Join the Agentic Dojo today at AgenticDojo.com.
`;

async function generateVoiceover() {
  console.log("Generating Dojo trailer voiceover with ElevenLabs...");
  console.log("Voice ID:", VOICE_ID);
  console.log("Script length:", voiceoverScript.length, "characters");

  try {
    const audio = await client.textToSpeech.convert(VOICE_ID, {
      text: voiceoverScript.trim(),
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true
      },
      speed: 0.85
    });

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Save to public folder
    const outputPath = "public/dojo-voiceover.mp3";
    fs.writeFileSync(outputPath, buffer);

    console.log("✓ Dojo voiceover saved to:", outputPath);
    console.log("  Size:", Math.round(buffer.length / 1024), "KB");

  } catch (error) {
    console.error("Error generating voiceover:", error.message);
  }
}

generateVoiceover();
