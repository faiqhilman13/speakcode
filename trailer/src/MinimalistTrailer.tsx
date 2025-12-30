import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  MinimalistHookScene,
  MinimalistOldWayScene,
  MinimalistShiftScene,
  MinimalistBeforeAfterScene,
  MinimalistNewWayScene,
  MinimalistWhatYouLearnScene,
  MinimalistTestimonialScene,
  MinimalistShowcaseScene,
  MinimalistCTAScene,
} from "./components/minimalist";

/*
 * CREATIVE DIRECTION: "Minimalist Tech"
 *
 * Typography: Inter / SF Pro Display (clean sans-serif)
 * Colors: Pure white (#FFFFFF), Rich black (#0A0A0A), Electric blue (#0066FF)
 * Motion: Subtle fades, clean transitions, breathing animations
 * Layout: Swiss design grid, lots of whitespace, geometric precision
 *
 * 1 MINUTE+ TRAILER (1950 frames @ 30fps = 65 seconds)
 * Same scene timing as original Trailer for audio sync
 */

export const MinimalistTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* Background music - lower volume to not overpower voiceover */}
      <Audio src={staticFile("background-music.mp3")} volume={0.12} />

      {/* Voiceover - starts at beginning */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover.mp3")} volume={1} />
      </Sequence>

      {/* Scene 1: Hook (0-4s) - 120 frames */}
      <Sequence from={0} durationInFrames={120}>
        <MinimalistHookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4s-8s) - 120 frames */}
      <Sequence from={120} durationInFrames={120}>
        <MinimalistOldWayScene />
      </Sequence>

      {/* Scene 3: The Shift (8s-11s) - 90 frames */}
      <Sequence from={240} durationInFrames={90}>
        <MinimalistShiftScene />
      </Sequence>

      {/* Scene 4: Before/After (11s-16s) - 150 frames */}
      <Sequence from={330} durationInFrames={150}>
        <MinimalistBeforeAfterScene />
      </Sequence>

      {/* Scene 5: The New Way (16s-41s) - 750 frames */}
      <Sequence from={480} durationInFrames={750}>
        <MinimalistNewWayScene />
      </Sequence>

      {/* Scene 6: What You'll Learn (41s-45s) - 120 frames */}
      <Sequence from={1230} durationInFrames={120}>
        <MinimalistWhatYouLearnScene />
      </Sequence>

      {/* Scene 7: Testimonials/Founder Story (45s-56s) - 330 frames */}
      <Sequence from={1350} durationInFrames={330}>
        <MinimalistTestimonialScene />
      </Sequence>

      {/* Scene 8: Showcase (56s-60s) - 120 frames */}
      <Sequence from={1680} durationInFrames={120}>
        <MinimalistShowcaseScene />
      </Sequence>

      {/* Scene 9: CTA (60s-65s) - 150 frames */}
      <Sequence from={1800} durationInFrames={150}>
        <MinimalistCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
