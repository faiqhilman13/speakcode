import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ToriiGate } from "./Assets";

export const DojoRevealScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const revealSpring = spring({ frame, fps, config: { damping: 20 } });
    const gateScale = interpolate(frame, [0, 180], [isMobile ? 1.4 : 0.8, isMobile ? 1.8 : 1.2]);

    const textOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            background: "#fdfcf8",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ transform: `scale(${revealSpring})`, opacity: revealSpring }}>
                <ToriiGate scale={gateScale} />
            </div>

            <div style={{
                marginTop: isMobile ? 100 : 60,
                textAlign: 'center',
                opacity: textOpacity,
                fontFamily: 'Inter, sans-serif',
                padding: isMobile ? '0 40px' : '0'
            }}>
                <h2 style={{ fontSize: isMobile ? 22 : 24, letterSpacing: '0.4em', color: '#5a5a5a', marginBottom: 15 }}>INTRODUCING</h2>
                <h1 style={{ fontSize: isMobile ? 72 : 72, fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    AGENTIC <br /> <span style={{ color: '#cc0000' }}>DOJO</span>
                </h1>
                <p style={{
                    marginTop: 30,
                    fontSize: isMobile ? 24 : 22,
                    color: '#5a5a5a',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    lineHeight: 1.4
                }}>
                    Not a coding class. <br /> An orchestration masterclass.
                </p>
            </div>
        </AbsoluteFill>
    );
};
