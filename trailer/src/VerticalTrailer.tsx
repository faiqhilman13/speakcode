import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  VerticalBuildAnythingHookScene,
  VerticalCapabilitiesScene,
  VerticalLimitScene,
  VerticalFounderStoryScene,
  VerticalWhatYouLearnScene,
  VerticalAntiHypeCTAScene,
} from "./components/vertical";

/*
 * VERTICAL TRAILER (1080x1920) - Mobile adaptation of BuildAnythingTrailer
 *
 * Mobile adaptation (9:16):
 * - Stacked vertical layouts (not side-by-side)
 * - Larger fonts for better mobile readability
 * - More vertical breathing room
 * - Single-column composition
 * - Same 60-second timing as BuildAnythingTrailer
 *
 * Script breakdown (60 seconds):
 * 1. Hook (0-2s): "What if you could build anything?"
 * 2. Capabilities (2-8s): "Apps. Dashboards. AI agents. Research systems. Mobile apps."
 * 3. Limit (8-12s): "The only question: can AI access it? If yes, you can build it."
 * 4. Founder Story (12-34s): Credentials + Hackathon (5s) + "AI won't replace you..." (7s)
 * 5. What You'll Learn (34-51s): 3 modules: Mental Model, Framework, Live Build (17s)
 * 6. CTA (51-60s): "Master agentic coding. The skill of the decade."
 *
 * Design: Warm editorial brutalism (cream/coral/black)
 * Duration: 1800 frames @ 30fps = 60 seconds
 */

export const VerticalTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background music - lofi piano beat */}
      <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.15} />

      {/* Voiceover - sped up 1.3x */}
      <Audio src={staticFile("voiceover.mp3")} volume={1} playbackRate={1.3} />

      {/* Scene 1: Hook (0-2s = 60 frames)
          "What if you could build anything?"
      */}
      <Sequence from={0} durationInFrames={60}>
        <VerticalBuildAnythingHookScene />
      </Sequence>

      {/* Scene 2: Capabilities (2-8s = 180 frames)
          "Apps. Dashboards. AI agents. Research systems. Mobile apps."
      */}
      <Sequence from={60} durationInFrames={180}>
        <VerticalCapabilitiesScene />
      </Sequence>

      {/* Scene 3: The Limit (8-12s = 120 frames)
          "The only question: can AI access it? If yes, you can build it."
      */}
      <Sequence from={240} durationInFrames={120}>
        <VerticalLimitScene />
      </Sequence>

      {/* Scene 4: Founder Story (12-34s = 660 frames)
          Credentials + Hackathon (5s) + "AI won't replace you..." (7s)
      */}
      <Sequence from={360} durationInFrames={660}>
        <VerticalFounderStoryScene />
      </Sequence>

      {/* Scene 5: What You'll Learn (34-51s = 510 frames)
          "In this course, you'll learn mental model..."
      */}
      <Sequence from={1020} durationInFrames={510}>
        <VerticalWhatYouLearnScene />
      </Sequence>

      {/* Scene 6: Anti-Hype CTA (51-60s = 270 frames)
          "Master agentic coding. The skill of the decade."
      */}
      <Sequence from={1530} durationInFrames={270}>
        <VerticalAntiHypeCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
