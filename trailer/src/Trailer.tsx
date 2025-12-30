import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { HookScene } from "./components/HookScene";
import { OldWayScene } from "./components/OldWayScene";
import { ShiftScene } from "./components/ShiftScene";
import { BeforeAfterScene } from "./components/BeforeAfterScene";
import { NewWayScene } from "./components/NewWayScene";
import { WhatYouLearnScene } from "./components/WhatYouLearnScene";
import { TestimonialScene } from "./components/TestimonialScene";
import { ShowcaseScene } from "./components/ShowcaseScene";
import { CTAScene } from "./components/CTAScene";

/*
 * CREATIVE DIRECTION: "Conversational Brutalism"
 *
 * Typography: Georgia serif (editorial) + SF Mono (code)
 * Colors: Warm cream (#FDF6E3), Rich black (#1a1a1a), Electric coral (#FF5E5B)
 * Motion: Snappy, intentional - quick cuts, bold reveals
 * Layout: Asymmetric, editorial spreads
 *
 * 1 MINUTE TRAILER (1800 frames @ 30fps)
 * OPTIMIZED: Reduced hang time, added 2 new scenes
 */

export const Trailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background music - lower volume to not overpower voiceover */}
      <Audio src={staticFile("background-music.mp3")} volume={0.15} />

      {/* Voiceover - starts at beginning */}
      <Sequence from={0}>
        <Audio src={staticFile("voiceover.mp3")} volume={1} />
      </Sequence>

      {/* Scene 1: Hook (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <HookScene />
      </Sequence>

      {/* Scene 2: The Old Way (4s) */}
      <Sequence from={120} durationInFrames={120}>
        <OldWayScene />
      </Sequence>

      {/* Scene 3: The Shift */}
      <Sequence from={240} durationInFrames={90}>
        <ShiftScene />
      </Sequence>

      {/* Scene 4: Before/After */}
      <Sequence from={330} durationInFrames={150}>
        <BeforeAfterScene />
      </Sequence>

      {/* Scene 5: The New Way (25s) */}
      <Sequence from={480} durationInFrames={750}>
        <NewWayScene />
      </Sequence>

      {/* Scene 6: What You'll Learn (4s) */}
      <Sequence from={1230} durationInFrames={120}>
        <WhatYouLearnScene />
      </Sequence>

      {/* Scene 7: Testimonials (11s) - extended for founder story */}
      <Sequence from={1350} durationInFrames={330}>
        <TestimonialScene />
      </Sequence>

      {/* Scene 8: Showcase (4s) */}
      <Sequence from={1680} durationInFrames={120}>
        <ShowcaseScene />
      </Sequence>

      {/* Scene 9: CTA (5s) */}
      <Sequence from={1800} durationInFrames={150}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
