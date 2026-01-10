import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/*
 * EMPOWERMENT SCENE - Your Turn
 *
 * CINEMATOGRAPHY NOTES:
 * - Mirrors viewer's state
 * - Visual callback to Torii gate
 * - Bridge to curriculum
 * - Rising energy feeling
 *
 * DESIGN UPDATES 2026-01-10:
 * - Updated fonts to Satoshi/Playfair
 * - Shortened duration (now 120 frames, was 150)
 * - Compressed animation timings
 * - Enhanced particle effects
 * - Improved phase badge animations
 */

// Torii gate silhouette for visual callback
const ToriiSilhouette = ({ opacity, scale }: { opacity: number, scale: number }) => (
    <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        style={{
            opacity,
            transform: `scale(${scale})`,
        }}
    >
        {/* Main pillars */}
        <rect x="60" y="80" width="25" height="220" fill="#cc0000" />
        <rect x="315" y="80" width="25" height="220" fill="#cc0000" />
        {/* Top beam */}
        <rect x="30" y="50" width="340" height="20" rx="3" fill="#cc0000" />
        <rect x="40" y="35" width="320" height="12" rx="2" fill="#cc0000" />
        {/* Cross beam */}
        <rect x="50" y="100" width="300" height="15" fill="#cc0000" />
        {/* Decorative ends */}
        <rect x="20" y="45" width="30" height="30" rx="2" fill="#cc0000" />
        <rect x="350" y="45" width="30" height="30" rx="2" fill="#cc0000" />
    </svg>
);

// Phase badge component with enhanced animations
const PhaseBadge = ({ phase, title, delay, frame, fps, isMobile }: {
    phase: string, title: string, delay: number, frame: number, fps: number, isMobile: boolean
}) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 120 } });
    const pulse = 1 + Math.sin((frame - delay) * 0.2) * 0.06;
    const glow = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    return (
        <div style={{
            opacity: s,
            transform: `scale(${s * pulse})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
        }}>
            <div style={{
                width: isMobile ? 95 : 85,
                height: isMobile ? 95 : 85,
                borderRadius: '50%',
                background: 'rgba(204, 0, 0, 0.12)',
                border: '3px solid #cc0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? 30 : 26,
                fontWeight: 900,
                color: '#cc0000',
                boxShadow: `0 0 ${30 * glow}px rgba(204, 0, 0, 0.4)`,
            }}>
                {phase}
            </div>
            <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: isMobile ? 26 : 22,
                fontStyle: 'italic',
                color: 'rgba(253, 252, 248, 0.85)',
            }}>
                {title}
            </div>
        </div>
    );
};

export const EmpowermentScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width, durationInFrames } = useVideoConfig();
    const isMobile = height > width;

    // Animation springs
    const getSpring = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 14 } });

    const toriiOpacity = interpolate(frame, [0, 25], [0, 0.18], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const toriiScale = interpolate(frame, [0, 50], [0.75, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    const s1 = getSpring(2);   // "NOW IT'S YOUR TURN"
    const s2 = getSpring(10);  // "You have the vision"
    const s3 = getSpring(22);  // "The idea. The drive."
    const s4 = getSpring(34);  // Divider
    const s5 = getSpring(44);  // "The only thing missing?"
    const s6 = getSpring(54);  // "THE METHOD"
    const s7 = getSpring(68);  // Phase badges

    // Background pulse
    const bgPulse = Math.sin(frame * 0.05) * 0.35 + 0.65;

    // Enhanced particle animation
    const particles = [...Array(35)].map((_, i) => ({
        x: (i * 67) % (isMobile ? 1000 : 1800) + 40,
        y: height - ((frame * 2.5 + i * 45) % (height + 150)),
        size: 3 + (i % 5) * 2,
        opacity: 0.25 + (i % 4) * 0.15,
    }));

    return (
        <AbsoluteFill style={{
            background: "#080808",
            overflow: 'hidden'
        }}>
            {/* Radial gradient background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, rgba(204, 0, 0, ${0.14 * bgPulse}) 0%, transparent 55%)`,
            }} />

            {/* Dot grid pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.07,
                backgroundImage: 'radial-gradient(#cc0000 1.5px, transparent 1.5px)',
                backgroundSize: '45px 45px',
                transform: `scale(${1 + frame * 0.0004})`,
            }} />

            {/* Rising particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: '#cc0000',
                        opacity: p.opacity * interpolate(frame, [0, 35], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                        boxShadow: '0 0 10px rgba(204, 0, 0, 0.7)',
                    }}
                />
            ))}

            {/* Torii gate silhouette (visual callback) */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '3%' : '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
            }}>
                <ToriiSilhouette opacity={toriiOpacity} scale={toriiScale} />
            </div>

            {/* Main content */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: isMobile ? '60px 45px' : '100px',
                zIndex: 10,
            }}>
                {/* Label */}
                <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isMobile ? 34 : 30,
                    color: '#cc0000',
                    letterSpacing: '0.35em',
                    fontWeight: 900,
                    marginBottom: 45,
                    opacity: s1,
                    transform: `translateY(${(1 - s1) * 25}px)`,
                }}>
                    NOW IT'S YOUR TURN
                </div>

                {/* Mirror the viewer's state */}
                <h1 style={{
                    fontSize: isMobile ? 95 : 105,
                    fontWeight: 900,
                    fontFamily: "'Satoshi', sans-serif",
                    color: '#fdfcf8',
                    lineHeight: 1.02,
                    letterSpacing: '-0.04em',
                    margin: 0,
                    marginBottom: 12,
                    opacity: s2,
                    transform: `translateY(${(1 - s2) * 20}px)`,
                }}>
                    You have the <span style={{ color: '#cc0000' }}>vision.</span>
                </h1>

                <h2 style={{
                    fontSize: isMobile ? 58 : 66,
                    fontWeight: 700,
                    fontFamily: "'Satoshi', sans-serif",
                    color: 'rgba(253, 252, 248, 0.65)',
                    lineHeight: 1.15,
                    margin: 0,
                    opacity: s3,
                    transform: `translateY(${(1 - s3) * 18}px)`,
                }}>
                    The idea. The drive.
                </h2>

                {/* Divider */}
                <div style={{
                    width: isMobile ? 130 : 160,
                    height: 5,
                    background: '#cc0000',
                    margin: '50px 0',
                    opacity: s4,
                    transform: `scaleX(${s4})`,
                    boxShadow: '0 0 25px rgba(204, 0, 0, 0.6)',
                }} />

                {/* The hook */}
                <div style={{
                    opacity: s5,
                    transform: `translateY(${(1 - s5) * 18}px)`,
                }}>
                    <p style={{
                        fontSize: isMobile ? 40 : 42,
                        color: 'rgba(253, 252, 248, 0.55)',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: 'italic',
                        margin: 0,
                        marginBottom: 22,
                    }}>
                        The only thing missing?
                    </p>
                </div>

                <div style={{
                    opacity: s6,
                    transform: `scale(${0.88 + s6 * 0.12})`,
                }}>
                    <h2 style={{
                        fontSize: isMobile ? 115 : 115,
                        fontWeight: 900,
                        fontFamily: "'Satoshi', sans-serif",
                        color: '#cc0000',
                        lineHeight: 1,
                        margin: 0,
                        textShadow: '0 0 70px rgba(204, 0, 0, 0.45)',
                    }}>
                        THE METHOD.
                    </h2>
                </div>

                {/* Bridge to curriculum - 3 phases */}
                <div style={{
                    display: 'flex',
                    gap: isMobile ? 35 : 65,
                    marginTop: 55,
                    opacity: s7,
                    transform: `translateY(${(1 - s7) * 30}px)`,
                }}>
                    <PhaseBadge phase="01" title="Mind" delay={72} frame={frame} fps={fps} isMobile={isMobile} />
                    <PhaseBadge phase="02" title="Blade" delay={80} frame={frame} fps={fps} isMobile={isMobile} />
                    <PhaseBadge phase="03" title="Strike" delay={88} frame={frame} fps={fps} isMobile={isMobile} />
                </div>

                {/* Subtext */}
                <div style={{
                    marginTop: 40,
                    opacity: interpolate(frame, [95, 110], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isMobile ? 22 : 20,
                    color: 'rgba(253, 252, 248, 0.35)',
                    letterSpacing: '0.25em',
                }}>
                    3 PHASES TO MASTERY
                </div>
            </div>

            {/* Cinematic scanline */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'rgba(204, 0, 0, 0.6)',
                boxShadow: '0 0 35px #cc0000',
                transform: `translateY(${interpolate(frame, [0, durationInFrames], [0, height])}px)`,
                zIndex: 20,
            }} />

            {/* Corner accents */}
            {[
                { top: 35, left: 35, borderTop: true, borderLeft: true },
                { top: 35, right: 35, borderTop: true, borderRight: true },
                { bottom: 35, left: 35, borderBottom: true, borderLeft: true },
                { bottom: 35, right: 35, borderBottom: true, borderRight: true },
            ].map((pos, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    ...pos,
                    width: 65,
                    height: 65,
                    borderTop: pos.borderTop ? '3px solid rgba(204, 0, 0, 0.35)' : 'none',
                    borderBottom: pos.borderBottom ? '3px solid rgba(204, 0, 0, 0.35)' : 'none',
                    borderLeft: pos.borderLeft ? '3px solid rgba(204, 0, 0, 0.35)' : 'none',
                    borderRight: pos.borderRight ? '3px solid rgba(204, 0, 0, 0.35)' : 'none',
                    opacity: s1,
                }} />
            ))}

            {/* Vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};
