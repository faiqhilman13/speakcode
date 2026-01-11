import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ToriiGate } from "./Assets";

/*
 * CTA SCENE - Join the Dojo
 *
 * CINEMATOGRAPHY NOTES:
 * - Final scene, maximum impact
 * - Clear call to action
 * - Memorable closing
 *
 * DESIGN UPDATES 2026-01-10:
 * - Updated fonts to Satoshi/Playfair
 * - Fixed safe zone violations (moved footer up)
 * - Added pulsing glow on URL
 * - Enhanced dramatic entrance
 * - Extended duration (now 240 frames)
 */

export const CTAScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const finalSpring = spring({ frame, fps, config: { damping: 14 } });
    const coreSpring = spring({ frame: frame - 25, fps, config: { damping: 12 } });

    // Subtle hover animation
    const coreHover = Math.sin(frame * 0.04) * 5;

    // Pulsing glow for URL
    const urlPulse = 0.8 + Math.sin(frame * 0.12) * 0.2;
    const urlGlow = 20 + Math.sin(frame * 0.15) * 15;

    // Dramatic light beam
    const beamOpacity = interpolate(frame, [0, 40, 80], [0, 0.15, 0.08], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            background: "#0a0a0a",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Satoshi', sans-serif",
            padding: isMobile ? '0 45px' : '0'
        }}>
            {/* Radial gradient background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center top, rgba(204, 0, 0, 0.12) 0%, transparent 50%)',
            }} />

            {/* Dramatic light beam from top */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '60%',
                background: 'linear-gradient(180deg, rgba(253, 252, 248, 0.1) 0%, transparent 100%)',
                opacity: beamOpacity,
                clipPath: 'polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)',
            }} />

            {/* Background Torii - More prominent */}
            <div style={{
                position: 'absolute',
                opacity: 0.22,
                transform: isMobile
                    ? `scale(2.4) translateY(${-20 + coreHover}px)`
                    : `scale(2) translateY(${-40 + coreHover}px)`,
                zIndex: 1
            }}>
                <ToriiGate color="#fdfcf8" />
            </div>

            {/* Main content - positioned with safe zones in mind */}
            <div style={{
                zIndex: 10,
                textAlign: 'center',
                marginTop: isMobile ? 320 : 220,
            }}>
                {/* Label */}
                <h2 style={{
                    color: 'rgba(253, 252, 248, 0.75)',
                    fontSize: isMobile ? 34 : 30,
                    letterSpacing: '0.45em',
                    marginBottom: 28,
                    opacity: finalSpring,
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    transform: `translateY(${(1 - finalSpring) * 15}px)`
                }}>
                    JOIN THE DOJO
                </h2>

                {/* Main title */}
                <h1 style={{
                    color: '#fdfcf8',
                    fontSize: isMobile ? 90 : 105,
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    opacity: finalSpring,
                    lineHeight: 0.98,
                    margin: 0,
                    transform: `scale(${0.94 + finalSpring * 0.06})`
                }}>
                    AGENTIC <br /> <span style={{ color: '#cc0000' }}>DOJO</span>
                </h1>

                {/* Tagline */}
                <p style={{
                    fontSize: isMobile ? 38 : 34,
                    color: 'rgba(253, 252, 248, 0.88)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    opacity: spring({ frame: frame - 35, fps }),
                    margin: 0,
                    marginTop: 38,
                }}>
                    Build anything. <span style={{ color: '#cc0000', fontStyle: 'normal', fontWeight: 700 }}>No CS degree required.</span>
                </p>

                {/* CTA Button with pulsing glow */}
                <div style={{
                    marginTop: 45,
                    padding: isMobile ? '22px 30px' : '22px 45px',
                    border: '3px solid #cc0000',
                    display: 'inline-block',
                    opacity: spring({ frame: frame - 55, fps }),
                    background: `rgba(204, 0, 0, ${0.12 * urlPulse})`,
                    transform: `translateY(${(1 - spring({ frame: frame - 55, fps })) * 25}px) scale(${urlPulse})`,
                    boxShadow: `0 0 ${urlGlow}px rgba(204, 0, 0, 0.5)`,
                }}>
                    <span style={{
                        color: '#fdfcf8',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: isMobile ? 30 : 34,
                        letterSpacing: '0.12em',
                        fontWeight: 700
                    }}>
                        AGENTICDOJO.COM
                    </span>
                </div>
            </div>

            {/* Footer - MOVED UP for safe zone (above bottom 450px on mobile) */}
            <div style={{
                position: 'absolute',
                bottom: isMobile ? 480 : 120,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'rgba(253, 252, 248, 0.35)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? 16 : 15,
                letterSpacing: '0.2em',
                opacity: spring({ frame: frame - 80, fps }),
            }}>
                PROTOCOL 01 // 2026 <br />
                FROM ZERO CODE TO SENIOR ENGINEER.
            </div>

            {/* Corner accents */}
            {[
                { top: 40, left: 40, borderTop: true, borderLeft: true },
                { top: 40, right: 40, borderTop: true, borderRight: true },
            ].map((pos, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    ...pos,
                    width: 70,
                    height: 70,
                    borderTop: pos.borderTop ? '3px solid rgba(204, 0, 0, 0.25)' : 'none',
                    borderLeft: pos.borderLeft ? '3px solid rgba(204, 0, 0, 0.25)' : 'none',
                    borderRight: pos.borderRight ? '3px solid rgba(204, 0, 0, 0.25)' : 'none',
                    opacity: finalSpring,
                }} />
            ))}

            {/* Vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Scan lines for cinematic feel */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};
