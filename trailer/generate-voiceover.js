import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";

const client = new ElevenLabsClient({
  apiKey: "sk_48c373bc8d55113357b020265dec6339480a77355c4b2a66"
});

// Voice options:
// CwhRBWXzGAHq8TQ4Fs17 - Roger (Laid-Back, Casual)
// EXAVITQu4vr4xnSDxMaL - Sarah (Mature, Reassuring)
// FGY2WhTYpPnrIDTdsKH5 - Laura (Enthusiast)
// IKne3meq5aSn9XLyUdCD - Charlie (Deep, Confident, Energetic)
// JBFqnCBsd6RMkjVDRZzb - George (Warm, Captivating)
// TX3LPaxmHKxFdv7VOQHJ - Liam (Energetic, Social Media)

const VOICE_ID = "2ajXGJNYBR0iNHpS4VZb"; // User's preferred voice

// Scene timing (30fps):
// Scene 1 (Hook): 0-4s
// Scene 2 (Old Way): 4-12s
// Scene 3 (Shift): 12-15s
// Scene 4 (Before/After): 15-20s
// Scene 5 (New Way): 20-36.7s (5 examples @ 3.3s each)
// Scene 6 (What You Learn): 36.7-41.7s
// Scene 7 (Testimonials): 41.7-47.7s
// Scene 8 (Showcase): 47.7-50.7s
// Scene 9 (CTA): 50.7-60s

const voiceoverScript = `
What if you could build anything, just by describing it?

The old path? Years of tutorials. Endless debugging. Pure frustration.

Then AI changed everything.

What used to take years, now takes weeks.

Watch this. Need a landing page? You'll learn to prompt it. Shipped. Want an analytics dashboard? You'll build it in minutes. Creating a video? Master the workflow. Done. Need a pitch deck? You'll create it. Easy. Market research? You'll automate it. Complete. All skills you'll master.

Inside SpeakCode, you'll learn prompt engineering, agentic workflows, and ship real projects.

I used these skills to become app lead on a hundred thousand line enterprise platform. No CS degree. No engineering background. Just agentic coding.

Apps, dashboards, videos, documents. You'll build them all.

SpeakCode. Master agentic coding. The skill of the decade.
`;

async function generateVoiceover() {
  console.log("Generating voiceover with ElevenLabs...");
  console.log("Voice: Liam (Energetic, Social Media Creator)");
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
      speed: 0.65
    });

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Save to public folder
    const outputPath = "public/voiceover.mp3";
    fs.writeFileSync(outputPath, buffer);

    console.log("✓ Voiceover saved to:", outputPath);
    console.log("  Size:", Math.round(buffer.length / 1024), "KB");

  } catch (error) {
    console.error("Error generating voiceover:", error.message);
  }
}

generateVoiceover();
