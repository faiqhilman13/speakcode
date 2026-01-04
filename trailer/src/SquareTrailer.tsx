import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  SquareHookScene,
  SquareOldWayScene,
  SquareShiftScene,
  SquareBeforeAfterScene,
  SquareNewWayScene,
  SquareWhatYouLearnScene,
  SquareTestimonialScene,
  SquareShowcaseScene,
  SquareCTAScene,
} from "./components/square";

/*
 * SQUARE TRAILER (1080x1080) - Optimized for Instagram Reels, TikTok, LinkedIn
 *
 * Same creative direction as main Trailer but with:
 * - Smaller fonts (reduced ~40%)
 * - Vertical/stacked layouts instead of side-by-side
 * - Compact header bars (60-70px vs 100-110px)
 * - Reduced padding throughout
 * - 2x2 grids instead of 4-column
 *
 * Total: 1950 frames @ 30fps = 65 seconds
 */

export const SquareTrailer: React.FC = () => {
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
        <SquareHookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4s) */}
      <Sequence from={120} durationInFrames={120}>
        <SquareOldWayScene />
      </Sequence>

      {/* Scene 3: The Shift */}
      <Sequence from={240} durationInFrames={90}>
        <SquareShiftScene />
      </Sequence>

      {/* Scene 4: Before/After */}
      <Sequence from={330} durationInFrames={150}>
        <SquareBeforeAfterScene />
      </Sequence>

      {/* Scene 5: The New Way (25s) */}
      <Sequence from={480} durationInFrames={750}>
        <SquareNewWayScene />
      </Sequence>

      {/* Scene 6: What You'll Learn (4s) */}
      <Sequence from={1230} durationInFrames={120}>
        <SquareWhatYouLearnScene />
      </Sequence>

      {/* Scene 7: Testimonials (11s) */}
      <Sequence from={1350} durationInFrames={330}>
        <SquareTestimonialScene />
      </Sequence>

      {/* Scene 8: Showcase (4s) */}
      <Sequence from={1680} durationInFrames={120}>
        <SquareShowcaseScene />
      </Sequence>

      {/* Scene 9: CTA (5s) */}
      <Sequence from={1800} durationInFrames={150}>
        <SquareCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
