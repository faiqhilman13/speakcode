import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  BuildAnythingHookScene,
  CapabilitiesScene,
  LimitScene,
  FounderStoryScene,
  WhatYouLearnScene,
  AntiHypeCTAScene,
} from "./components/build-anything";

/*
 * BUILD ANYTHING TRAILER
 *
 * New script focus: Possibility-driven, anti-hype positioning
 *
 * Script breakdown (60 seconds):
 * 1. Hook (0-2s): "What if you could build anything?"
 * 2. Capabilities (2-8s): "Apps. Dashboards. AI agents. Research systems. Mobile apps."
 * 3. Limit (8-12s): "The only question: can AI access it? If yes, you can build it."
 * 4. Founder Story (12-34s): Credentials + Hackathon (5s) + "AI won't replace you..." (7s, ends earlier)
 * 5. What You'll Learn (34-51s): 3 modules: Mental Model, Framework, Live Build (17s, extended)
 * 6. CTA (51-60s): "Master agentic coding. The skill of the decade."
 *
 * Design: Warm editorial brutalism (cream/coral/black)
 * Duration: 1800 frames @ 30fps = 60 seconds
 */

export const BuildAnythingTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background music - lower volume to not overpower voiceover */}
      <Audio src={staticFile("background-music.mp3")} volume={0.15} />

      {/* Voiceover - sped up 1.3x */}
      <Audio src={staticFile("voiceover.mp3")} volume={1} playbackRate={1.3} />

      {/* Scene 1: Hook (0-2s = 60 frames)
          "What if you could build anything?"
      */}
      <Sequence from={0} durationInFrames={60}>
        <BuildAnythingHookScene />
      </Sequence>

      {/* Scene 2: Capabilities (2-8s = 180 frames)
          "Apps. Dashboards. AI agents. Research systems. Mobile apps."
      */}
      <Sequence from={60} durationInFrames={180}>
        <CapabilitiesScene />
      </Sequence>

      {/* Scene 3: The Limit (8-12s = 120 frames)
          "The only question: can AI access it? If yes, you can build it."
      */}
      <Sequence from={240} durationInFrames={120}>
        <LimitScene />
      </Sequence>

      {/* Scene 4: Founder Story (12-34s = 660 frames)
          Credentials + Hackathon (5s) + "AI won't replace you..." (7s, ends earlier)
      */}
      <Sequence from={360} durationInFrames={660}>
        <FounderStoryScene />
      </Sequence>

      {/* Scene 5: What You'll Learn (34-51s = 510 frames)
          "In this course, you'll learn the mental model..."
      */}
      <Sequence from={1020} durationInFrames={510}>
        <WhatYouLearnScene />
      </Sequence>

      {/* Scene 6: Anti-Hype CTA (51-60s = 270 frames)
          "Master agentic coding. The skill of the decade."
      */}
      <Sequence from={1530} durationInFrames={270}>
        <AntiHypeCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
