import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { ToriiGate } from "./Assets";

export const CTAScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const finalSpring = spring({ frame, fps, config: { damping: 15 } });
    const coreSpring = spring({ frame: frame - 20, fps, config: { damping: 12 } });

    // Subtle hover, NO spinning
    const coreHover = Math.sin(frame * 0.04) * 5;

    return (
        <AbsoluteFill style={{
            background: "#1a1a1a",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            padding: isMobile ? '0 40px' : '0'
        }}>
            {/* Background Torii - More prominent now */}
            <div style={{
                position: 'absolute',
                opacity: 0.2,
                transform: isMobile ? 'scale(2.2) translateY(-20px)' : 'scale(1.8) translateY(-40px)',
                zIndex: 1
            }}>
                <ToriiGate color="#fdfcf8" />
            </div>



            {/* Branding - Shifted down to give space to the "Gate + Jewel" look */}
            <div style={{ zIndex: 10, textAlign: 'center', marginTop: isMobile ? 350 : 250 }}>
                <h2 style={{
                    color: 'rgba(253, 252, 248, 0.6)',
                    fontSize: isMobile ? 16 : 22,
                    letterSpacing: '0.5em',
                    marginBottom: 20,
                    opacity: finalSpring,
                    transform: `translateY(${(1 - finalSpring) * 10}px)`
                }}>
                    INITIALIZE PROTOCOL
                </h2>
                <h1 style={{
                    color: '#fdfcf8',
                    fontSize: isMobile ? 84 : 96,
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    opacity: finalSpring,
                    lineHeight: 1,
                    transform: `scale(${0.95 + finalSpring * 0.05})`
                }}>
                    AGENTIC <br /> <span style={{ color: '#cc0000' }}>DOJO</span>
                </h1>

                <div style={{
                    marginTop: 60,
                    padding: isMobile ? '20px 25px' : '20px 40px',
                    border: '1px solid #cc0000',
                    display: 'inline-block',
                    opacity: spring({ frame: frame - 40, fps }),
                    background: 'rgba(204, 0, 0, 0.05)',
                    transform: `translateY(${(1 - spring({ frame: frame - 40, fps })) * 20}px)`
                }}>
                    <span style={{
                        color: '#fdfcf8',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 24 : 32,
                        letterSpacing: '0.1em',
                        fontWeight: 600
                    }}>
                        AGENTICDOJO.COM
                    </span>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: 80,
                color: 'rgba(253, 252, 248, 0.4)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 14,
                letterSpacing: '0.2em',
                textAlign: 'center'
            }}>
                PROTOCOL 01 // 2026 <br />
                NO CS DEGREE REQUIRED.
            </div>
        </AbsoluteFill>
    );
};
