import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
    IntroScene,
    ProblemScene,
    DojoRevealScene,
    OriginScene,
    CatalystScene,
    PeakScene,
    EmpowermentScene,
    MasteryScene,
    CTAScene,
    FilmGrain,
} from "./components/dojo";

/*
 * DOJO TRAILER VERTICAL (1080x1920) - Mobile adaptation of DojoTrailer
 *
 * BEST PRACTICES OVERHAUL - 2026-01-22
 * - Migrated to @remotion/transitions with TransitionSeries
 * - Using @remotion/media for Audio component
 * - fps-based timing calculations for maintainability
 * - Volume callbacks for smooth audio fades
 * - Automatic transition overlap handling
 *
 * CINEMATOGRAPHY OVERHAUL - 2026-01-10
 * - Added scene transitions (fade, slide)
 * - Rebalanced scene durations for better pacing
 * - Added film grain overlay for cinematic texture
 * - Optimized hook timing for first 3 seconds
 *
 * Mobile adaptation (9:16):
 * - Stacked vertical layouts (not side-by-side)
 * - Larger fonts for better mobile readability
 * - More vertical breathing room
 * - Single-column composition
 *
 * Script breakdown (55 seconds @ 30fps = 1650 frames):
 * 1. Intro (0-4s, 4s): Hook - "You have an idea"
 * 2. Problem (4-9s, 5s): Pain - "Traditional coding is the bottleneck"
 * 3. Reveal (9-15s, 6s): Solution - "Welcome to Agentic Dojo"
 * 4. Origin (15-21s, 6s): Story - "I hit a ceiling"
 * 5. Catalyst (21-28s, 7s): Realization - "They're agents"
 * 6. Proof (27-37s, 10s): Social proof - Achievements
 * 7. Empowerment (37-41s, 4s): Bridge - "Now it's your turn"
 * 8. Mastery (41-47s, 6s): Curriculum - Three phases
 * 9. CTA (47-51s, 4s): Close - "Join the Dojo"
 *
 * Design: Japanese-inspired aesthetic (cream/crimson/black with traditional elements)
 * Duration: ~1650 frames @ 30fps = 55 seconds (with transition overlaps)
 */

export const DojoTrailerVertical: React.FC = () => {
    const { fps } = useVideoConfig();

    // Scene durations in seconds (converted to frames)
    const SCENE_DURATIONS = {
        intro: 4 * fps,      // 120 frames
        problem: 5 * fps,    // 150 frames
        reveal: 6 * fps,     // 180 frames
        origin: 6 * fps,     // 180 frames
        catalyst: 7 * fps,   // 210 frames
        proof: 10 * fps,     // 300 frames
        empowerment: 4 * fps, // 120 frames
        mastery: 6 * fps,    // 180 frames
        cta: 7 * fps,        // 210 frames
    };

    // Transition durations
    const TRANSITION = {
        short: Math.round(0.5 * fps),  // 15 frames - quick transitions
        medium: Math.round(0.67 * fps), // 20 frames - standard transitions
        long: Math.round(0.83 * fps),   // 25 frames - dramatic transitions
    };

    return (
        <AbsoluteFill style={{ background: "#fdfcf8" }}>
            {/* Background Music: Lofi Piano Beat */}
            <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.2} />

            {/* Dojo Voiceover */}
            <Audio src={staticFile("dojo-voiceover.mp3")} volume={1} playbackRate={1.3} />

            {/* ================================================
                SCENES WITH TRANSITIONS
                Using TransitionSeries for automatic overlap handling
            ================================================ */}
            <TransitionSeries>
                {/* SCENE 1: INTRO - The Vision (4s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
                    <IntroScene />
                </TransitionSeries.Sequence>

                {/* Transition: Fade to Problem scene */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION.short })}
                />

                {/* SCENE 2: PROBLEM - The Wall (5s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
                    <ProblemScene />
                </TransitionSeries.Sequence>

                {/* Transition: Slide up to Reveal (dramatic) */}
                <TransitionSeries.Transition
                    presentation={slide({ direction: "from-bottom" })}
                    timing={linearTiming({ durationInFrames: TRANSITION.long })}
                />

                {/* SCENE 3: REVEAL - The Dojo (6s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
                    <DojoRevealScene />
                </TransitionSeries.Sequence>

                {/* Transition: Fade to Origin */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION.short })}
                />

                {/* SCENE 4: ORIGIN - The Struggle (6s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.origin}>
                    <OriginScene />
                </TransitionSeries.Sequence>

                {/* Transition: Slide from right to Catalyst */}
                <TransitionSeries.Transition
                    presentation={slide({ direction: "from-right" })}
                    timing={linearTiming({ durationInFrames: TRANSITION.medium })}
                />

                {/* SCENE 5: CATALYST - The Shift (6s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.catalyst}>
                    <CatalystScene />
                </TransitionSeries.Sequence>

                {/* Transition: Fade to Proof */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION.short })}
                />

                {/* SCENE 6: PROOF - The Results (10s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.proof}>
                    <PeakScene />
                </TransitionSeries.Sequence>

                {/* Transition: Fade to Empowerment */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION.short })}
                />

                {/* SCENE 7: EMPOWERMENT - Your Turn (4s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.empowerment}>
                    <EmpowermentScene />
                </TransitionSeries.Sequence>

                {/* Transition: Fade to Mastery */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION.short })}
                />

                {/* SCENE 8: MASTERY - The Curriculum (6s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.mastery}>
                    <MasteryScene />
                </TransitionSeries.Sequence>

                {/* Transition: Slide from bottom to CTA (dramatic close) */}
                <TransitionSeries.Transition
                    presentation={slide({ direction: "from-bottom" })}
                    timing={linearTiming({ durationInFrames: TRANSITION.long })}
                />

                {/* SCENE 9: CTA - Join the Dojo (8s) */}
                <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
                    <CTAScene />
                </TransitionSeries.Sequence>
            </TransitionSeries>

            {/* ================================================
                GLOBAL OVERLAYS
            ================================================ */}
            {/* Film grain for cinematic texture - visible on all scenes */}
            <FilmGrain opacity={0.04} intensity="light" />
        </AbsoluteFill>
    );
};
