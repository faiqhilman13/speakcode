import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import {
  GlassHookScene,
  GlassOldWayScene,
  GlassShiftScene,
  GlassBeforeAfterScene,
  GlassNewWayScene,
  GlassWhatYouLearnScene,
  GlassTestimonialScene,
  GlassShowcaseScene,
  GlassCTAScene,
} from "./components/glass";

/*
 * CREATIVE DIRECTION: "Gradient Glass"
 *
 * A dreamy, premium glassmorphism aesthetic:
 *
 * Colors: Soft gradient palette
 *   - Primary gradient: Purple #8B5CF6 -> Pink #EC4899 -> Blue #3B82F6
 *   - Frosted whites: rgba(255, 255, 255, 0.05-0.15)
 *   - Deep backgrounds: #0a0815, #0f0a1a, #120a20
 *
 * Typography:
 *   - Headers: SF Pro Display (light/medium weights)
 *   - Code/Labels: SF Mono
 *   - Soft shadows, gradient text for emphasis
 *
 * Motion:
 *   - Smooth spring animations with high damping
 *   - Gentle floating effects (sin/cos waves)
 *   - Parallax depth with layered elements
 *   - Glass panel reveals with blur
 *
 * Layout:
 *   - Layered glass cards with backdrop-filter blur
 *   - Floating elements creating depth illusion
 *   - Soft gradient mesh backgrounds
 *   - Rounded corners (16-40px radius)
 *
 * Effects:
 *   - backdrop-filter: blur(10-30px)
 *   - Subtle particle systems
 *   - Gradient glow shadows
 *   - Soft color transitions
 *
 * TIMING: 65 second trailer (1950 frames @ 30fps)
 * Same scene structure as original Trailer
 */

export const GlassmorphismTrailer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0815 0%, #0f0a1a 50%, #0a0815 100%)",
      }}
    >
      {/* Background music - ethereal electronic */}
      <Audio src={staticFile("background-music.mp3")} volume={0.12} />

      {/* Voiceover - synced with scenes */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover-with-pause.mp3")} volume={1} />
      </Sequence>

      {/* ========================================
          SCENE 1: HOOK (0-4s / frames 0-120)
          "What if you could build software just by describing it?"
          ======================================== */}
      <Sequence from={0} durationInFrames={120}>
        <GlassHookScene />
      </Sequence>

      {/* ========================================
          SCENE 2: THE OLD WAY (4-8s / frames 120-240)
          The painful traditional path to learning to code
          ======================================== */}
      <Sequence from={120} durationInFrames={120}>
        <GlassOldWayScene />
      </Sequence>

      {/* ========================================
          SCENE 3: THE SHIFT (8-11s / frames 240-330)
          "Then AI happened. Everything changed."
          ======================================== */}
      <Sequence from={240} durationInFrames={90}>
        <GlassShiftScene />
      </Sequence>

      {/* ========================================
          SCENE 4: BEFORE/AFTER (11-16s / frames 330-480)
          Visual transformation - Years to Weeks
          ======================================== */}
      <Sequence from={330} durationInFrames={150}>
        <GlassBeforeAfterScene />
      </Sequence>

      {/* ========================================
          SCENE 5: THE NEW WAY (16-41s / frames 480-1230)
          5 examples of conversational AI coding
          Each example: 150 frames (5 seconds)
          ======================================== */}
      <Sequence from={480} durationInFrames={750}>
        <GlassNewWayScene />
      </Sequence>

      {/* ========================================
          SCENE 6: WHAT YOU'LL LEARN (41-45s / frames 1230-1350)
          Course curriculum preview - 5 modules
          ======================================== */}
      <Sequence from={1230} durationInFrames={120}>
        <GlassWhatYouLearnScene />
      </Sequence>

      {/* ========================================
          SCENE 7: TESTIMONIALS (45-56s / frames 1350-1680)
          Founder story - Zero to Lead Engineer
          Phase 1: Journey image (frames 0-160)
          Phase 2: Achievement stats (frames 140+)
          ======================================== */}
      <Sequence from={1350} durationInFrames={330}>
        <GlassTestimonialScene />
      </Sequence>

      {/* ========================================
          SCENE 8: SHOWCASE (56-60s / frames 1680-1800)
          What students can build - floating mockups
          ======================================== */}
      <Sequence from={1680} durationInFrames={120}>
        <GlassShowcaseScene />
      </Sequence>

      {/* ========================================
          SCENE 9: CTA (60-65s / frames 1800-1950)
          Final call to action with celebration
          ======================================== */}
      <Sequence from={1800} durationInFrames={150}>
        <GlassCTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
