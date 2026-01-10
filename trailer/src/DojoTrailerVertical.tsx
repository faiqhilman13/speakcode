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
    CTAScene,
    CrossDissolve,
    ZoomTransition,
    FadeThrough,
    PushSlide,
    FilmGrain,
} from "./components/dojo";

/*
 * DOJO TRAILER VERTICAL (1080x1920) - Mobile adaptation of DojoTrailer
 *
 * CINEMATOGRAPHY OVERHAUL - 2026-01-10
 * - Added scene transitions (CrossDissolve, ZoomTransition, FadeThrough, PushSlide)
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
 * NEW Script breakdown (55 seconds @ 30fps = 1650 frames):
 * 1. Intro (0-4s, 120f): Hook - "You have an idea"
 * 2. Problem (4-9s, 150f): Pain - "Traditional coding is the bottleneck"
 * 3. Reveal (9-15s, 180f): Solution - "Welcome to Agentic Dojo"
 * 4. Origin (15-21s, 180f): Story - "I hit a ceiling"
 * 5. Catalyst (21-27s, 180f): Realization - "They're agents"
 * 6. Proof (27-37s, 300f): Social proof - Achievements
 * 7. Empowerment (37-41s, 120f): Bridge - "Now it's your turn" [SHORTENED -30f]
 * 8. Mastery (41-47s, 180f): Curriculum - Three phases [SHORTENED -60f]
 * 9. CTA (47-55s, 240f): Close - "Join the Dojo"
 *
 * Design: Japanese-inspired aesthetic (cream/crimson/black with traditional elements)
 * Duration: 1650 frames @ 30fps = 55 seconds
 */

export const DojoTrailerVertical: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: "#fdfcf8" }}>
            {/* Background Music: Lofi Piano Beat */}
            <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.2} />

            {/* Dojo Voiceover - generated specifically for DojoTrailerVertical */}
            <Audio src={staticFile("dojo-voiceover.mp3")} volume={1} playbackRate={1.2} />

            {/* ================================================
                SCENE 1: INTRO - The Vision (0-4s, 120 frames)
                Transition: None (opening) → CrossDissolve out
                SFX: None (let music establish)
            ================================================ */}
            <Sequence from={0} durationInFrames={120}>
                <CrossDissolve direction="out" durationFrames={15}>
                    <IntroScene />
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 2: PROBLEM - The Wall (4-9s, 150 frames)
                Transition: CrossDissolve in → ZoomTransition out
                SFX: Glitch sounds on word reveals
            ================================================ */}
            <Sequence from={120} durationInFrames={150}>
                <CrossDissolve direction="in" durationFrames={15}>
                    <ZoomTransition direction="out" durationFrames={20} zoomFrom={1} zoomTo={0.8}>
                        <ProblemScene />
                    </ZoomTransition>
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 3: REVEAL - The Dojo (9-15s, 180 frames)
                Transition: ZoomTransition in (dramatic reveal)
                SFX: Whoosh + impact on Torii gate reveal
            ================================================ */}
            <Sequence from={270} durationInFrames={180}>
                <ZoomTransition direction="in" durationFrames={25} zoomFrom={1.4} zoomTo={1}>
                    <DojoRevealScene />
                </ZoomTransition>
            </Sequence>

            {/* ================================================
                SCENE 4: ORIGIN - The Struggle (15-21s, 180 frames)
                Transition: CrossDissolve both
                SFX: Counter tick sounds, frustration bar impacts
            ================================================ */}
            <Sequence from={450} durationInFrames={180}>
                <CrossDissolve durationFrames={12}>
                    <OriginScene />
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 5: CATALYST - The Shift (21-27s, 180 frames)
                Transition: PushSlide in → CrossDissolve out
                SFX: Revelation sound, energy pulse
            ================================================ */}
            <Sequence from={630} durationInFrames={180}>
                <PushSlide direction="up" type="enter" durationFrames={18}>
                    <CrossDissolve direction="out" durationFrames={15}>
                        <CatalystScene />
                    </CrossDissolve>
                </PushSlide>
            </Sequence>

            {/* ================================================
                SCENE 6: PROOF - The Results (27-37s, 300 frames)
                Transition: CrossDissolve in
                SFX: Counter impacts, stat reveal whooshes
            ================================================ */}
            <Sequence from={810} durationInFrames={300}>
                <CrossDissolve direction="in" durationFrames={15}>
                    <PeakScene />
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 7: EMPOWERMENT - Your Turn (37-41s, 120 frames) [SHORTENED -30f]
                Transition: CrossDissolve both
                SFX: Rising energy, phase badge pops
            ================================================ */}
            <Sequence from={1110} durationInFrames={120}>
                <CrossDissolve durationFrames={15}>
                    <EmpowermentScene />
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 8: MASTERY - The Curriculum (41-47s, 180 frames) [SHORTENED -60f]
                Transition: CrossDissolve in → FadeThrough out
                SFX: Card reveal sounds
            ================================================ */}
            <Sequence from={1230} durationInFrames={180}>
                <CrossDissolve direction="in" durationFrames={15}>
                    <FadeThrough durationFrames={25} color="#1a1a1a">
                        <MasteryScene />
                    </FadeThrough>
                </CrossDissolve>
            </Sequence>

            {/* ================================================
                SCENE 9: CTA - Join the Dojo (47-55s, 240 frames)
                Transition: FadeThrough in from black
                SFX: Final impact, URL pulse
            ================================================ */}
            <Sequence from={1410} durationInFrames={240}>
                <FadeThrough durationFrames={25} color="#1a1a1a">
                    <CTAScene />
                </FadeThrough>
            </Sequence>

            {/* ================================================
                GLOBAL OVERLAYS
            ================================================ */}
            {/* Film grain for cinematic texture - visible on all scenes */}
            <FilmGrain opacity={0.04} intensity="light" />
        </AbsoluteFill>
    );
};
