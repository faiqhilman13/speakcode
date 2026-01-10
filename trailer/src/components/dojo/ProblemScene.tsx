import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/*
 * PROBLEM SCENE - The Pain Point
 *
 * CINEMATOGRAPHY NOTES:
 * - Dark, tense atmosphere
 * - Glitch effects for digital frustration
 * - Quick word cycling for urgency
 *
 * DESIGN UPDATES 2026-01-10:
 * - Increased glitch intensity (2px → 6px)
 * - Added screen shake effect
 * - Updated fonts to Satoshi/Playfair
 * - Added chromatic aberration effect
 */

export const ProblemScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const textOpacity = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0]);

    // INCREASED glitch intensity (was 2, now 6)
    const glitch = Math.sin(frame * 2.5) * 6;
    const glitchY = Math.cos(frame * 1.8) * 2;

    // Screen shake effect
    const shake = frame < 30 ? Math.sin(frame * 4) * 3 : 0;

    const bottomTextOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    // Chromatic aberration offset
    const chromaOffset = Math.sin(frame * 0.3) * 2;

    return (
        <AbsoluteFill style={{
            background: "#0f0f0f",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0 40px' : '0',
            transform: `translate(${shake}px, 0)`,
        }}>
            {/* Scan lines overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                pointerEvents: 'none',
                zIndex: 100,
            }} />

            {/* Chromatic aberration layer (red) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.15,
                transform: `translateX(${chromaOffset}px)`,
                mixBlendMode: 'screen',
            }}>
                <h2 style={{
                    color: '#ff0000',
                    fontSize: isMobile ? 72 : 68,
                    fontWeight: 700,
                    fontFamily: "'Satoshi', 'SF Pro Display', sans-serif",
                    textAlign: 'center',
                }}>
                    Traditional coding <br /> is the bottleneck.
                </h2>
            </div>

            {/* Main content */}
            <div style={{ opacity: textOpacity, textAlign: 'center', zIndex: 10 }}>
                <h2 style={{
                    color: '#fdfcf8',
                    fontSize: isMobile ? 76 : 72,
                    fontWeight: 700,
                    fontFamily: "'Satoshi', 'SF Pro Display', sans-serif",
                    lineHeight: 1.15,
                    margin: 0,
                    transform: `translateX(${glitch * 0.3}px)`,
                }}>
                    Traditional <span style={{ color: '#cc0000' }}>coding</span> <br /> is the bottleneck.
                </h2>

                {/* Cycling words with glitch effect */}
                <div style={{ position: 'relative', marginTop: 55, height: 80 }}>
                    {['Too slow', 'Too complex', 'Too technical', 'Old protocols'].map((word, i) => {
                        const wordOpacity = interpolate(
                            frame,
                            [30 + i * 20, 40 + i * 20, 50 + i * 20, 60 + i * 20],
                            [0, 1, 1, 0],
                            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                        );
                        const wordGlitch = Math.sin((frame + i * 10) * 3) * 4;

                        return (
                            <div key={word} style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: `translateX(-50%) translateX(${glitch + wordGlitch}px) translateY(${glitchY}px)`,
                                color: 'rgba(253, 252, 248, 0.5)',
                                fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                                fontSize: isMobile ? 40 : 36,
                                fontWeight: 700,
                                opacity: wordOpacity,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                width: '100%',
                                textShadow: `${chromaOffset}px 0 #ff0000, ${-chromaOffset}px 0 #00ffff`,
                            }}>
                                {word}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom message */}
                <p style={{
                    marginTop: 50,
                    fontSize: isMobile ? 44 : 38,
                    color: 'rgba(253, 252, 248, 0.85)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    opacity: bottomTextOpacity,
                    lineHeight: 1.3,
                }}>
                    Your best ideas stay trapped <br /> in boilerplate.
                </p>
            </div>

            {/* Animated glitch bars */}
            {[...Array(3)].map((_, i) => {
                const barOpacity = interpolate(
                    frame,
                    [20 + i * 30, 25 + i * 30, 35 + i * 30, 40 + i * 30],
                    [0, 0.3, 0.3, 0],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                );
                const barY = 200 + i * 400 + Math.sin(frame * 0.5 + i) * 50;

                return (
                    <div key={i} style={{
                        position: 'absolute',
                        top: barY,
                        left: 0,
                        right: 0,
                        height: 3 + Math.random() * 5,
                        background: `linear-gradient(90deg, transparent, rgba(204, 0, 0, ${barOpacity}), transparent)`,
                        opacity: barOpacity,
                        transform: `translateX(${Math.sin(frame * 2 + i * 2) * 20}px)`,
                    }} />
                );
            })}

            {/* Vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};
