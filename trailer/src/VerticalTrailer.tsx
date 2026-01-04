import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  VerticalHookScene,
  VerticalOldWayScene,
  VerticalShiftScene,
  VerticalBeforeAfterScene,
  VerticalNewWayScene,
  VerticalWhatYouLearnScene,
  VerticalTestimonialScene,
  VerticalShowcaseScene,
  VerticalCTAScene,
} from "./components/vertical";

/*
 * VERTICAL TRAILER (1080x1920) - Optimized for Instagram Reels, TikTok, Stories
 *
 * Same creative direction as main Trailer but adapted for 9:16 portrait format:
 * - Stacked vertical layouts (not side-by-side)
 * - Larger fonts for better mobile readability
 * - More vertical breathing room
 * - Images fill horizontal space better
 * - Before/After panels stacked (top/bottom)
 *
 * Total: 1950 frames @ 30fps = 65 seconds
 */

export const VerticalTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background music */}
      <Audio src={staticFile("background-music.mp3")} volume={0.15} />

      {/* Voiceover */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover-with-pause.mp3")} volume={1} />
      </Sequence>

      {/* Scene 1: Hook (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <VerticalHookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4s) */}
      <Sequence from={120} durationInFrames={120}>
        <VerticalOldWayScene />
      </Sequence>

      {/* Scene 3: The Shift */}
      <Sequence from={240} durationInFrames={90}>
        <VerticalShiftScene />
      </Sequence>

      {/* Scene 4: Before/After */}
      <Sequence from={330} durationInFrames={150}>
        <VerticalBeforeAfterScene />
      </Sequence>

      {/* Scene 5: The New Way (25s) */}
      <Sequence from={480} durationInFrames={750}>
        <VerticalNewWayScene />
      </Sequence>

      {/* Scene 6: What You'll Learn (4s) */}
      <Sequence from={1230} durationInFrames={120}>
        <VerticalWhatYouLearnScene />
      </Sequence>

      {/* Scene 7: Testimonials (11s) */}
      <Sequence from={1350} durationInFrames={330}>
        <VerticalTestimonialScene />
      </Sequence>

      {/* Scene 8: Showcase (4s) */}
      <Sequence from={1680} durationInFrames={120}>
        <VerticalShowcaseScene />
      </Sequence>

      {/* Scene 9: CTA (5s) */}
      <Sequence from={1800} durationInFrames={150}>
        <VerticalCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
