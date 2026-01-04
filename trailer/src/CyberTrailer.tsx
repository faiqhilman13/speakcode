import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  CyberHookScene,
  CyberOldWayScene,
  CyberShiftScene,
  CyberNewWayScene,
  CyberWhatYouLearnScene,
  CyberTestimonialScene,
  CyberShowcaseScene,
  CyberCTAScene,
} from "./components/cyber";

/*
 * CREATIVE DIRECTION: "Neural Interface Terminal"
 *
 * Aesthetic: Clean cyberpunk inspired by Ghost in the Shell, Blade Runner 2049
 * NOT generic neon chaos - geometric precision, purposeful data visualizations
 *
 * Typography: JetBrains Mono / SF Mono - clean, technical
 * Colors: Deep black (#0a0a0f), Electric cyan (#00fff2), Hot magenta (#ff0080), Acid green (#00ff88)
 * Motion: Subtle data streams, measured glow pulses, typewriter reveals
 * Layout: Terminal interfaces, clean dashboards, functional UI elements
 *
 * Scene breakdown (matching original voiceover timing):
 * - Hook: 0-4s (120 frames) - "What if you could build anything..."
 * - Old Way: 4-8s (120 frames) - "Years of tutorials..."
 * - Shift: 8-11s (90 frames) - "Then AI changed everything"
 * - Before/After + New Way: 11-36s (750 frames) - 5 examples @ 5s each
 * - What You Learn: 36-40s (120 frames) - Course overview
 * - Founder Story: 40-51s (330 frames) - Personal journey
 * - Showcase: 51-56s (150 frames) - What students build
 * - CTA: 56-61s (150 frames) - Call to action
 *
 * Total: 1830 frames @ 30fps = 61 seconds
 */

export const CyberTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Cyberpunk background music - energetic but not overpowering */}
      <Audio src={staticFile("cyberpunk-music.mp3")} volume={0.2} />

      {/* Voiceover - same script as original */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover-with-pause.mp3")} volume={1} />
      </Sequence>

      {/* Scene 1: Hook (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <CyberHookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4s-11s) */}
      <Sequence from={120} durationInFrames={210}>
        <CyberOldWayScene />
      </Sequence>

      {/* Scene 3: The Shift (11s-15s) - extended +1s */}
      <Sequence from={330} durationInFrames={120}>
        <CyberShiftScene />
      </Sequence>

      {/* Scene 4: The New Way - 5 examples (15s-40s) */}
      <Sequence from={450} durationInFrames={750}>
        <CyberNewWayScene />
      </Sequence>

      {/* Scene 5: What You'll Learn (40s-44s) */}
      <Sequence from={1200} durationInFrames={120}>
        <CyberWhatYouLearnScene />
      </Sequence>

      {/* Scene 6: Founder Story (44s-55s) */}
      <Sequence from={1320} durationInFrames={330}>
        <CyberTestimonialScene />
      </Sequence>

      {/* Scene 7: Showcase (55s-60s) */}
      <Sequence from={1650} durationInFrames={150}>
        <CyberShowcaseScene />
      </Sequence>

      {/* Scene 8: CTA (60s-65s) */}
      <Sequence from={1800} durationInFrames={150}>
        <CyberCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
