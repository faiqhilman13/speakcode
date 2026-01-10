import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ToriiGate } from "./Assets";

/*
 * DOJO REVEAL SCENE - The Solution
 *
 * CINEMATOGRAPHY NOTES:
 * - Dramatic zoom reveal
 * - Torii gate as central visual
 * - Clean, aspirational feeling after dark problem scene
 *
 * DESIGN UPDATES 2026-01-10:
 * - Updated fonts to Satoshi/Playfair
 * - Added dramatic lighting pulse
 * - Enhanced parallax on gate
 * - Type-on effect for "INTRODUCING"
 */

export const DojoRevealScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const revealSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
    const gateScale = interpolate(frame, [0, 180], [isMobile ? 1.4 : 0.8, isMobile ? 1.8 : 1.2]);

    const textOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

    // Type-on effect for "INTRODUCING"
    const introText = "INTRODUCING";
    const typedChars = Math.floor(interpolate(frame, [15, 45], [0, introText.length], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }));

    // Dramatic light pulse
    const lightPulse = interpolate(frame, [0, 30, 60], [0, 0.3, 0.1], { extrapolateRight: 'clamp' });

    // Parallax for depth
    const gateParallax = interpolate(frame, [0, 180], [0, -20]);

    return (
        <AbsoluteFill style={{
            background: "#fdfcf8",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Light burst overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, rgba(255,255,255,${lightPulse}) 0%, transparent 60%)`,
                pointerEvents: 'none',
                zIndex: 5,
            }} />

            {/* Torii Gate with parallax */}
            <div style={{
                transform: `scale(${revealSpring}) translateY(${gateParallax}px)`,
                opacity: revealSpring
            }}>
                <ToriiGate scale={gateScale} />
            </div>

            {/* Text content */}
            <div style={{
                marginTop: isMobile ? 100 : 60,
                textAlign: 'center',
                opacity: textOpacity,
                fontFamily: "'Satoshi', 'SF Pro Display', sans-serif",
                padding: isMobile ? '0 40px' : '0',
                zIndex: 10,
            }}>
                {/* Type-on "INTRODUCING" */}
                <h2 style={{
                    fontSize: isMobile ? 24 : 26,
                    letterSpacing: '0.5em',
                    color: '#5a5a5a',
                    marginBottom: 18,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                }}>
                    {introText.slice(0, typedChars)}
                    <span style={{
                        opacity: frame % 30 < 15 ? 1 : 0,
                        color: '#cc0000',
                    }}>|</span>
                </h2>

                {/* Main title */}
                <h1 style={{
                    fontSize: isMobile ? 80 : 80,
                    fontWeight: 900,
                    color: '#1a1a1a',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    margin: 0,
                    transform: `scale(${0.95 + revealSpring * 0.05})`,
                }}>
                    AGENTIC <br /> <span style={{ color: '#cc0000' }}>DOJO</span>
                </h1>

                {/* Tagline */}
                <p style={{
                    marginTop: 40,
                    fontSize: isMobile ? 40 : 34,
                    color: '#5a5a5a',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    lineHeight: 1.35,
                }}>
                    Learn to build software by <br />
                    <span style={{
                        color: '#cc0000',
                        fontWeight: 700,
                        fontStyle: 'normal',
                        fontFamily: "'Satoshi', sans-serif",
                    }}>
                        describing what you want.
                    </span>
                </p>

                {/* Punch line */}
                <p style={{
                    marginTop: 30,
                    fontSize: isMobile ? 34 : 30,
                    color: '#1a1a1a',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                    transform: `translateY(${interpolate(frame, [80, 100], [20, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })}px)`,
                }}>
                    AI agents do the coding for you.
                </p>
            </div>

            {/* Corner accents */}
            <div style={{
                position: 'absolute',
                top: 40,
                left: 40,
                width: 60,
                height: 60,
                borderTop: '3px solid rgba(204, 0, 0, 0.2)',
                borderLeft: '3px solid rgba(204, 0, 0, 0.2)',
                opacity: revealSpring,
            }} />
            <div style={{
                position: 'absolute',
                top: 40,
                right: 40,
                width: 60,
                height: 60,
                borderTop: '3px solid rgba(204, 0, 0, 0.2)',
                borderRight: '3px solid rgba(204, 0, 0, 0.2)',
                opacity: revealSpring,
            }} />

            {/* Subtle vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.05) 100%)',
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};
