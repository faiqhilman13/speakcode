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

// Scene timing (30fps) - Build Anything Trailer (Total: 54s / 1620 frames):
// Scene 1 (Hook): 0-2s - "What if you could build anything?"
// Scene 2 (Capabilities): 2-8s - Apps, dashboards, agents...
// Scene 3 (The Limit): 8-13s - "The only question: can AI access it?"
// Scene 4 (Founder Story): 13-37s - Credentials, Hackathon, Insight
// Scene 5 (What You'll Learn): 37-45s - 3 modules: Mental Model, Framework, Live Build
// Scene 6 (CTA): 45-54s - Master agentic coding

const voiceoverScript = `
What if you could build anything?

Apps. Dashboards. AI agents. Research systems. Mobile apps.
Whatever your project needs.

The only question: can AI access it?
If yes — you can build it.

I used this approach to become a top 3 contributor on a 100,000-line enterprise AI platform.
Serving 30,000 users. Leading a 40-person engineering team.

Then I placed Top 5 in a national AI hackathon.
Against 150 participants. As a solo developer.

Here's the truth:
AI won't replace you.
But someone who knows how to work with AI will.
That person could be you.

In this course, you'll learn the mental model for AI development.
Then master the 5-step framework to orchestrate agents effectively.
And watch me build a real project from scratch.

100 minutes of HD video. Real-world projects. Framework templates.
Everything you need to start shipping faster today.

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
