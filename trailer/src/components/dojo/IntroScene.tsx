import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

/*
 * INTRO SCENE - The Hook
 *
 * CINEMATOGRAPHY NOTES:
 * - First 3 seconds are CRITICAL for social media retention
 * - Immediate visual impact at frame 0 (no delay)
 * - Bold typography with distinctive fonts
 * - Dramatic entrance animation
 *
 * DESIGN UPDATES 2026-01-10:
 * - Replaced Inter with Satoshi for sans-serif
 * - Replaced Georgia with Playfair Display for serif
 * - Faster animation timings for immediate hook
 * - Added parallax depth between layers
 * - Removed external texture URL
 */

export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    // FASTER SPRINGS - Hook optimization (reduced delay)
    const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
    const subtitleSpring = spring({ frame: frame - 12, fps, config: { damping: 14 } });
    const imgSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });

    // Parallax movement for depth
    const moveUp = interpolate(frame, [0, 120], [0, -30]);
    const bgParallax = interpolate(frame, [0, 120], [0, -10]);

    // Dramatic scale pulse on "idea"
    const ideaPulse = 1 + Math.sin(frame * 0.08) * 0.02;

    return (
        <AbsoluteFill style={{
            background: "#fdfcf8",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0 60px' : '0',
            fontFamily: "'Satoshi', 'SF Pro Display', -apple-system, sans-serif"
        }}>
            {/* Background Asset: Sumi-e Stroke with parallax */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, calc(-50% + ${bgParallax}px)) scale(${0.85 + imgSpring * 0.15})`,
                opacity: imgSpring * 0.5,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Img
                    src={staticFile("dojo-sumie.png")}
                    style={{ width: '130%', height: 'auto', filter: 'grayscale(0.15)' }}
                />
            </div>

            {/* Main headline - IMMEDIATE visibility */}
            <div style={{
                opacity: titleSpring,
                transform: `translateY(${moveUp + (1 - titleSpring) * 20}px)`,
                zIndex: 10
            }}>
                <h1 style={{
                    fontSize: isMobile ? 88 : 90,
                    color: '#1a1a1a',
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    textAlign: 'center',
                    lineHeight: 1.05,
                    margin: 0,
                }}>
                    You have an <br />
                    <span style={{
                        color: '#cc0000',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: 'italic',
                        fontWeight: 700,
                        display: 'inline-block',
                        transform: `scale(${ideaPulse})`,
                    }}>
                        idea.
                    </span>
                </h1>
            </div>

            {/* Subtitle with serif elegance */}
            <div style={{
                opacity: subtitleSpring,
                marginTop: 35,
                transform: `translateY(${moveUp + (1 - subtitleSpring) * 15}px)`,
                textAlign: 'center',
                zIndex: 10
            }}>
                <p style={{
                    fontSize: isMobile ? 34 : 30,
                    color: '#5a5a5a',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    lineHeight: 1.35,
                    margin: 0,
                }}>
                    A vision of what you <br /> want to build.
                </p>
            </div>

            {/* The wall - dramatic tension */}
            <div style={{
                opacity: spring({ frame: frame - 50, fps, config: { damping: 12 } }),
                marginTop: 55,
                transform: `translateY(${moveUp}px) scale(${spring({ frame: frame - 50, fps, config: { damping: 10, stiffness: 150 } })})`,
                textAlign: 'center',
                zIndex: 10
            }}>
                <p style={{
                    fontSize: isMobile ? 52 : 44,
                    color: '#cc0000',
                    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    margin: 0,
                    textTransform: 'uppercase',
                    textShadow: '0 4px 30px rgba(204, 0, 0, 0.2)',
                }}>
                    But there's a wall.
                </p>
            </div>

            {/* Paper texture overlay - LOCAL pattern instead of external URL */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.03) 2px,
                    rgba(0,0,0,0.03) 4px
                )`,
                pointerEvents: 'none',
                zIndex: 100,
            }} />

            {/* Subtle vignette for depth */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.08) 100%)',
                pointerEvents: 'none',
                zIndex: 99,
            }} />
        </AbsoluteFill>
    );
};
