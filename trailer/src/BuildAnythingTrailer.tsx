import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  BuildAnythingHookScene,
  CapabilitiesScene,
  LimitScene,
  FounderStoryScene,
  MentalModelScene,
  AntiHypeCTAScene,
} from "./components/build-anything";

/*
 * BUILD ANYTHING TRAILER
 *
 * New script focus: Possibility-driven, anti-hype positioning
 *
 * Script breakdown (estimated ~48 seconds):
 * 1. Hook (0-7s): "What if you could build anything? Not faster coding..."
 * 2. Capabilities (7-13s): "Landing pages. Dashboards. Video editors..."
 * 3. Limit (13-18s): "The only limit: can an AI agent access it?"
 * 4. Founder Story (18-33s): Credentials + "That's the actual superpower"
 * 5. Mental Model (33-41s): "In this course, you'll learn the mental model..."
 * 6. CTA (41-48s): "Not coding tutorials. Not AI hype..."
 *
 * Design: Warm editorial brutalism (cream/coral/black)
 * Duration: ~1500 frames @ 30fps = 50 seconds
 *
 * NOTE: Timing will need adjustment once new voiceover is generated
 */

export const BuildAnythingTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background music - lower volume to not overpower voiceover */}
      <Audio src={staticFile("background-music.mp3")} volume={0.15} />

      {/* Voiceover - sped up 1.2x */}
      <Audio src={staticFile("voiceover.mp3")} volume={1} playbackRate={1.2} />

      {/* Scene 1: Hook (0-2s = 60 frames)
          "What if you could build anything?"
      */}
      <Sequence from={0} durationInFrames={60}>
        <BuildAnythingHookScene />
      </Sequence>

      {/* Scene 2: Capabilities (2-9s = 210 frames)
          "Apps. Dashboards. AI agents. Research systems. Mobile apps."
      */}
      <Sequence from={60} durationInFrames={210}>
        <CapabilitiesScene />
      </Sequence>

      {/* Scene 3: The Limit (9-14s = 150 frames)
          "The only question: can AI access it? If yes, you can build it."
      */}
      <Sequence from={270} durationInFrames={150}>
        <LimitScene />
      </Sequence>

      {/* Scene 4: Founder Story (14-29s = 450 frames)
          Credentials + "AI won't replace you..."
      */}
      <Sequence from={420} durationInFrames={450}>
        <FounderStoryScene />
      </Sequence>

      {/* Scene 5: Mental Model (29-37s = 240 frames)
          "In this course, you'll learn the mental model..."
      */}
      <Sequence from={870} durationInFrames={240}>
        <MentalModelScene />
      </Sequence>

      {/* Scene 6: Anti-Hype CTA (37-46s = 270 frames)
          "Master agentic coding. The skill of the decade."
      */}
      <Sequence from={1110} durationInFrames={270}>
        <AntiHypeCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
