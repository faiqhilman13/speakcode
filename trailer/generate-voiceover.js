import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";

const client = new ElevenLabsClient({
  apiKey: "sk_7740754f1b9d6421d71d4213f3a35dc4851769c4e9517a66"
});

// Voice options:
// CwhRBWXzGAHq8TQ4Fs17 - Roger (Laid-Back, Casual)
// EXAVITQu4vr4xnSDxMaL - Sarah (Mature, Reassuring)
// FGY2WhTYpPnrIDTdsKH5 - Laura (Enthusiast)
// IKne3meq5aSn9XLyUdCD - Charlie (Deep, Confident, Energetic)
// JBFqnCBsd6RMkjVDRZzb - George (Warm, Captivating)
// TX3LPaxmHKxFdv7VOQHJ - Liam (Energetic, Social Media)

const VOICE_ID = "alFofuDn3cOwyoz1i44T"; // New voice

// Scene timing (30fps) - Build Anything Trailer:
// Scene 1 (Hook): 0-5s - "What if you could build anything?"
// Scene 2 (Capabilities): 5-12s - Apps, dashboards, agents...
// Scene 3 (The Framework): 12-17s - "Can AI access it?"
// Scene 4 (Credentials): 17-27s - Personal story
// Scene 5 (Insight): 27-37s - "AI won't replace you..."
// Scene 6 (Mental Model): 37-45s - What you'll learn
// Scene 7 (CTA): 45-53s - Master agentic coding

const voiceoverScript = `
What if you could build anything?

Apps. Dashboards. AI agents. Research systems. Mobile apps.
Whatever your project needs.

The only question: can AI access it?
If yes — you can build it.

I used this approach to become App Lead on a 100,000-line enterprise platform.
Serving 30,000 users. No CS degree. No engineering background.

Here's the truth:
AI won't replace you.
But someone who knows how to work with AI will.
That person could be you.

In this course, you'll learn the mental model.
How to think about what's possible.
How to break problems down so AI can execute your vision.

Master agentic coding.
The skill of the decade.
Build whatever you want.
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
