import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
    IntroScene,
    ProblemScene,
    DojoRevealScene,
    OriginScene,
    CatalystScene,
    PeakScene,
    EmpowermentScene,
    MasteryScene,
    CTAScene
} from "./components/dojo";

/*
 * DOJO TRAILER VERTICAL (1080x1920) - Mobile adaptation of DojoTrailer
 *
 * Mobile adaptation (9:16):
 * - Stacked vertical layouts (not side-by-side)
 * - Larger fonts for better mobile readability
 * - More vertical breathing room
 * - Single-column composition
 * - New 44-second timing with dojo-specific script
 *
 * Script breakdown (44 seconds):
 * 1. Intro (0-4s): "You have an idea. A vision for a system that could change everything. But there's a wall."
 * 2. Problem (4-8s): "Traditional coding. It's slow, it's complex, and it's keeping your best ideas trapped in the boilerplate."
 * 3. Reveal (8-12s): "Welcome to the Agentic Dojo. This isn't just a course. It's a total shift in how software is built."
 * 4. Origin (12-17s): "I had the MSc and the Big 4 consultant job, but I was still hitting a technical ceiling."
 * 5. Catalyst (17-22s): "Then I discovered Agentic Coding. Tools like Claude Code aren't just autocomplete..."
 * 6. Proof (22-28s): "Using these protocols, I secured a Top 5 ASEAN AI win as a solo dev..."
 * 7. Empowerment (28-33s): "Now, it's your turn. The ceiling has been removed."
 * 8. Mastery (33-39s): "Master the Mind, the Blade, and the Strike. Go from zero to Master Architect in record cycles."
 * 9. CTA (39-44s): "Initialize the protocol. Join the Agentic Dojo today at AgenticDojo.com."
 *
 * Design: Japanese-inspired aesthetic (cream/crimson/black with traditional elements)
 * Duration: 1320 frames @ 30fps = 44 seconds
 */

export const DojoTrailerVertical: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: "#fdfcf8" }}>
            {/* Background Music: Lofi Piano Beat */}
            <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.2} />

            {/* Dojo Voiceover - generated specifically for DojoTrailerVertical */}
            <Audio src={staticFile("dojo-voiceover.mp3")} volume={1} playbackRate={1.2} />

            {/* 1. Intro: The Vision (0-4s) */}
            <Sequence from={0} durationInFrames={120}>
                <IntroScene />
            </Sequence>

            {/* 2. Problem: The Wall of Code (4-9s) */}
            <Sequence from={120} durationInFrames={150}>
                <ProblemScene />
            </Sequence>

            {/* 3. Reveal: The Dojo (9-15s) */}
            <Sequence from={270} durationInFrames={180}>
                <DojoRevealScene />
            </Sequence>

            {/* 4. The Origin: The Professional Ceiling (15-21s) - Reduced 2s */}
            <Sequence from={450} durationInFrames={180}>
                <OriginScene />
            </Sequence>

            {/* 5. The Catalyst: Agentic Shift (21-27s) - 6s */}
            <Sequence from={630} durationInFrames={180}>
                <CatalystScene />
            </Sequence>

            {/* 6. The Proof: The Battle Record (27-37s) - 10s */}
            <Sequence from={810} durationInFrames={300}>
                <PeakScene />
            </Sequence>

            {/* 7. Empowerment: Your Turn (37-41s) - 4s */}
            <Sequence from={1110} durationInFrames={120}>
                <EmpowermentScene />
            </Sequence>

            {/* 8. The Mastery: Curriculum (41-47s) - 6s */}
            <Sequence from={1230} durationInFrames={180}>
                <MasteryScene />
            </Sequence>

            {/* 9. CTA: Join the Protocol (47-54s) - 7s */}
            <Sequence from={1410} durationInFrames={210}>
                <CTAScene />
            </Sequence>
        </AbsoluteFill>
    );
};
