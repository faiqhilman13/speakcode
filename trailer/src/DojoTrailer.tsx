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

export const DojoTrailer: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: "#fdfcf8" }}>
            {/* Background Music: Lofi Piano Beat */}
            <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.2} />

            {/* Dojo Voiceover */}
            <Audio src={staticFile("dojo-voiceover.mp3")} volume={1} playbackRate={1.3} />

            {/* Dynamic Scenes */}

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

            {/* 4. The Origin: The Professional Ceiling (15-21s) */}
            <Sequence from={450} durationInFrames={180}>
                <OriginScene />
            </Sequence>

            {/* 5. The Catalyst: Agentic Shift (21-25s) */}
            <Sequence from={630} durationInFrames={120}>
                <CatalystScene />
            </Sequence>

            {/* 6. The Proof: The Battle Record (25-33s) */}
            <Sequence from={750} durationInFrames={240}>
                <PeakScene />
            </Sequence>

            {/* 7. Empowerment: Your Turn (33-38s) */}
            <Sequence from={990} durationInFrames={150}>
                <EmpowermentScene />
            </Sequence>

            {/* 8. The Mastery: Curriculum (38-44s) */}
            <Sequence from={1140} durationInFrames={180}>
                <MasteryScene />
            </Sequence>

            {/* 9. CTA: Join the Protocol (44-49s) */}
            <Sequence from={1320} durationInFrames={150}>
                <CTAScene />
            </Sequence>
        </AbsoluteFill>
    );
};
