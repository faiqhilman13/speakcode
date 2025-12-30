import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  RetroHookScene,
  RetroOldWayScene,
  RetroShiftScene,
  RetroBeforeAfterScene,
  RetroNewWayScene,
  RetroWhatYouLearnScene,
  RetroTestimonialScene,
  RetroShowcaseScene,
  RetroCTAScene,
} from "./components/retro";

/**
 * RETRO TRAILER - Bold 80s/90s Aesthetic
 *
 * CREATIVE DIRECTION: "Neon Arcade Synthwave"
 *
 * Typography: Impact, Arial Black (bold condensed), Courier New (pixel/terminal)
 * Colors: Hot pink (#FF1493), Electric cyan (#00FFFF), Bright yellow (#FFFF00), Purple (#9D00FF)
 * Motion: VHS glitch effects, scan lines, chromatic aberration, bouncy springs
 * Layout: Neon grids, Memphis design elements, geometric patterns
 * Assets: Retro computer graphics, neon signs, VHS aesthetic
 *
 * 65 SECOND TRAILER (1950 frames @ 30fps)
 * Same timing structure as original trailer
 */

export const RetroTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Background music - retro synth vibe works great with this */}
      <Audio src={staticFile("background-music.mp3")} volume={0.18} />

      {/* Voiceover - starts at beginning */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover.mp3")} volume={1} />
      </Sequence>

      {/* Scene 1: Hook (0-4s / 0-120 frames)
          Bold neon intro with glitch text and Memphis shapes */}
      <Sequence from={0} durationInFrames={120}>
        <RetroHookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4-8s / 120-240 frames)
          VHS degradation, retro computer showing frustration */}
      <Sequence from={120} durationInFrames={120}>
        <RetroOldWayScene />
      </Sequence>

      {/* Scene 3: The Shift (8-11s / 240-330 frames)
          Neon burst transition, "AI happened" impact */}
      <Sequence from={240} durationInFrames={90}>
        <RetroShiftScene />
      </Sequence>

      {/* Scene 4: Before/After (11-16s / 330-480 frames)
          Split screen with neon comparison panels */}
      <Sequence from={330} durationInFrames={150}>
        <RetroBeforeAfterScene />
      </Sequence>

      {/* Scene 5: The New Way (16-41s / 480-1230 frames)
          Terminal-style conversation, CRT monitor results */}
      <Sequence from={480} durationInFrames={750}>
        <RetroNewWayScene />
      </Sequence>

      {/* Scene 6: What You'll Learn (41-45s / 1230-1350 frames)
          Arcade menu style curriculum */}
      <Sequence from={1230} durationInFrames={120}>
        <RetroWhatYouLearnScene />
      </Sequence>

      {/* Scene 7: Testimonials (45-56s / 1350-1680 frames)
          High score achievement board style */}
      <Sequence from={1350} durationInFrames={330}>
        <RetroTestimonialScene />
      </Sequence>

      {/* Scene 8: Showcase (56-60s / 1680-1800 frames)
          Cascading CRT monitors gallery */}
      <Sequence from={1680} durationInFrames={120}>
        <RetroShowcaseScene />
      </Sequence>

      {/* Scene 9: CTA (60-65s / 1800-1950 frames)
          Neon victory screen, pulsing enroll button */}
      <Sequence from={1800} durationInFrames={150}>
        <RetroCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
