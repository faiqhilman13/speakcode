import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/*
 * SCENE 7: EMPOWERMENT SCENE - YOUR TURN
 *
 * The powerful invitation - mirrors viewer's state,
 * adds visual callback, and bridges to curriculum
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

// Phase badge component
const PhaseBadge = ({ phase, title, delay, frame, fps, isMobile }: {
    phase: string, title: string, delay: number, frame: number, fps: number, isMobile: boolean
}) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
    const pulse = 1 + Math.sin((frame - delay) * 0.2) * 0.05;

    return (
        <div style={{
            opacity: s,
            transform: `scale(${s * pulse})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
        }}>
            <div style={{
                width: isMobile ? 50 : 60,
                height: isMobile ? 50 : 60,
                borderRadius: '50%',
                background: 'rgba(204, 0, 0, 0.15)',
                border: '2px solid #cc0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: isMobile ? 14 : 18,
                fontWeight: 900,
                color: '#cc0000',
            }}>
                {phase}
            </div>
            <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? 14 : 16,
                fontStyle: 'italic',
                color: 'rgba(253, 252, 248, 0.8)',
            }}>
                {title}
            </div>
        </div>
    );
};

export const EmpowermentScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width } = useVideoConfig();
    const isMobile = height > width;

    // Animation springs
    const getSpring = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 15 } });

    const toriiOpacity = interpolate(frame, [0, 30], [0, 0.15], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const toriiScale = interpolate(frame, [0, 60], [0.8, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    const s1 = getSpring(10);  // "You have the vision"
    const s2 = getSpring(30);  // "The idea. The drive."
    const s3 = getSpring(55);  // Divider
    const s4 = getSpring(70);  // "The only thing missing?"
    const s5 = getSpring(90);  // "The method."
    const s6 = getSpring(110); // Phase badges

    // Background pulse
    const bgPulse = Math.sin(frame * 0.05) * 0.3 + 0.7;

    // Particle animation
    const particles = [...Array(30)].map((_, i) => ({
        x: (i * 67) % (isMobile ? 1000 : 1800) + 40,
        y: height - ((frame * 2 + i * 40) % (height + 100)),
        size: 3 + (i % 4) * 2,
        opacity: 0.3 + (i % 3) * 0.2,
    }));

    return (
        <AbsoluteFill style={{
            background: "#0a0a0a",
            overflow: 'hidden'
        }}>
            {/* Radial gradient background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, rgba(204, 0, 0, ${0.12 * bgPulse}) 0%, transparent 60%)`,
            }} />

            {/* Subtle grid pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.06,
                backgroundImage: 'radial-gradient(#cc0000 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: `scale(${1 + frame * 0.0003})`,
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
                        opacity: p.opacity * interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                        boxShadow: '0 0 8px rgba(204, 0, 0, 0.6)',
                    }}
                />
            ))}

            {/* Torii gate silhouette (visual callback) */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '5%' : '10%',
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
                padding: isMobile ? '60px 40px' : '100px',
                zIndex: 10,
            }}>
                {/* Label */}
                <div style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: isMobile ? 12 : 14,
                    color: '#cc0000',
                    letterSpacing: '0.4em',
                    fontWeight: 800,
                    marginBottom: 30,
                    opacity: s1,
                    transform: `translateY(${(1 - s1) * 20}px)`,
                }}>
                    THE_INVITATION
                </div>

                {/* Mirror the viewer's state */}
                <h1 style={{
                    fontSize: isMobile ? 56 : 80,
                    fontWeight: 900,
                    color: '#fdfcf8',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    margin: 0,
                    marginBottom: 10,
                    opacity: s1,
                    transform: `translateY(${(1 - s1) * 20}px)`,
                }}>
                    You have the <span style={{ color: '#cc0000' }}>vision.</span>
                </h1>

                <h2 style={{
                    fontSize: isMobile ? 36 : 52,
                    fontWeight: 700,
                    color: 'rgba(253, 252, 248, 0.7)',
                    lineHeight: 1.2,
                    margin: 0,
                    opacity: s2,
                    transform: `translateY(${(1 - s2) * 20}px)`,
                }}>
                    The idea. The drive.
                </h2>

                {/* Divider */}
                <div style={{
                    width: isMobile ? 80 : 120,
                    height: 4,
                    background: '#cc0000',
                    margin: '40px 0',
                    opacity: s3,
                    transform: `scaleX(${s3})`,
                    boxShadow: '0 0 20px rgba(204, 0, 0, 0.5)',
                }} />

                {/* The hook */}
                <div style={{
                    opacity: s4,
                    transform: `translateY(${(1 - s4) * 20}px)`,
                }}>
                    <p style={{
                        fontSize: isMobile ? 24 : 32,
                        color: 'rgba(253, 252, 248, 0.6)',
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        margin: 0,
                        marginBottom: 15,
                    }}>
                        The only thing missing?
                    </p>
                </div>

                <div style={{
                    opacity: s5,
                    transform: `scale(${0.9 + s5 * 0.1})`,
                }}>
                    <h2 style={{
                        fontSize: isMobile ? 64 : 90,
                        fontWeight: 900,
                        color: '#cc0000',
                        lineHeight: 1,
                        margin: 0,
                        textShadow: '0 0 60px rgba(204, 0, 0, 0.4)',
                    }}>
                        THE METHOD.
                    </h2>
                </div>

                {/* Bridge to curriculum - 3 phases */}
                <div style={{
                    display: 'flex',
                    gap: isMobile ? 30 : 60,
                    marginTop: 50,
                    opacity: s6,
                    transform: `translateY(${(1 - s6) * 30}px)`,
                }}>
                    <PhaseBadge phase="01" title="Mind" delay={115} frame={frame} fps={fps} isMobile={isMobile} />
                    <PhaseBadge phase="02" title="Blade" delay={125} frame={frame} fps={fps} isMobile={isMobile} />
                    <PhaseBadge phase="03" title="Strike" delay={135} frame={frame} fps={fps} isMobile={isMobile} />
                </div>

                {/* Subtext */}
                <div style={{
                    marginTop: 30,
                    opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: isMobile ? 12 : 14,
                    color: 'rgba(253, 252, 248, 0.4)',
                    letterSpacing: '0.2em',
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
                background: 'rgba(204, 0, 0, 0.5)',
                boxShadow: '0 0 30px #cc0000',
                transform: `translateY(${interpolate(frame, [0, 150], [0, height])}px)`,
                zIndex: 20,
            }} />

            {/* Secondary scanline (slower) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'rgba(253, 252, 248, 0.2)',
                transform: `translateY(${interpolate(frame, [0, 150], [height * 0.3, height * 1.3])}px)`,
                zIndex: 20,
            }} />

            {/* Corner accents */}
            <div style={{
                position: 'absolute',
                top: 30,
                left: 30,
                width: 60,
                height: 60,
                borderTop: '3px solid rgba(204, 0, 0, 0.3)',
                borderLeft: '3px solid rgba(204, 0, 0, 0.3)',
                opacity: s1,
            }} />
            <div style={{
                position: 'absolute',
                top: 30,
                right: 30,
                width: 60,
                height: 60,
                borderTop: '3px solid rgba(204, 0, 0, 0.3)',
                borderRight: '3px solid rgba(204, 0, 0, 0.3)',
                opacity: s1,
            }} />
            <div style={{
                position: 'absolute',
                bottom: 30,
                left: 30,
                width: 60,
                height: 60,
                borderBottom: '3px solid rgba(204, 0, 0, 0.3)',
                borderLeft: '3px solid rgba(204, 0, 0, 0.3)',
                opacity: s1,
            }} />
            <div style={{
                position: 'absolute',
                bottom: 30,
                right: 30,
                width: 60,
                height: 60,
                borderBottom: '3px solid rgba(204, 0, 0, 0.3)',
                borderRight: '3px solid rgba(204, 0, 0, 0.3)',
                opacity: s1,
            }} />
        </AbsoluteFill>
    );
};
