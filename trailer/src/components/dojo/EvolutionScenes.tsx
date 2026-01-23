import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

/*
 * EVOLUTION SCENES - The Founder Journey Arc
 *
 * Scene 4: OriginScene - The Struggle (relatable dev frustrations)
 * Scene 5: CatalystScene - The Realization (agents are REAL)
 * Scene 6: PeakScene - The Proof (animated achievements)
 *
 * DESIGN UPDATES 2026-01-10:
 * - Updated fonts to Satoshi/Playfair/JetBrains Mono
 * - Enhanced glitch and chromatic aberration effects
 * - Added asymmetric layouts
 * - Improved parallax and camera movement
 */

// ============================================
// SHARED COMPONENTS
// ============================================

const AnimatedCounter = ({ target, delay, frame, fps, suffix = "", prefix = "" }: {
    target: number, delay: number, frame: number, fps: number, suffix?: string, prefix?: string
}) => {
    const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 80 } });
    // Ensure we reach the exact target value (clamp at 0.99 progress)
    const value = progress >= 0.99 ? target : Math.floor(target * progress);
    const shake = frame > delay && frame < delay + 20 ? Math.sin(frame * 2) * 3 : 0;

    return (
        <span style={{
            display: 'inline-block',
            transform: `translateX(${shake}px)`,
            fontVariantNumeric: 'tabular-nums'
        }}>
            {prefix}{value.toLocaleString()}{suffix}
        </span>
    );
};

// Frustration bar - replaces abstract error bars
const FrustrationBar = ({ text, delay, frame, fps, top, rotation }: {
    text: string, delay: number, frame: number, fps: number, top: string | number, rotation: number
}) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12 } });
    const glitch = Math.sin((frame - delay) * 0.5) * 2;

    return (
        <div style={{
            position: 'absolute',
            top,
            left: '-5%',
            width: '110%',
            background: 'linear-gradient(90deg, #cc0000 0%, #990000 50%, #cc0000 100%)',
            color: 'white',
            padding: '22px 50px',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '0.1em',
            transform: `rotate(${rotation}deg) scaleX(${s}) translateX(${glitch}px)`,
            opacity: s * 0.95,
            zIndex: 10,
            boxShadow: '0 15px 40px rgba(204, 0, 0, 0.5)',
            textAlign: 'center',
            textTransform: 'uppercase'
        }}>
            {text}
        </div>
    );
};

// Background with drowning code effect
const DrowningCodeWall = ({ frame }: { frame: number }) => {
    const frustrations = [
        "// TODO: fix this later (6 months ago)",
        "npm install... 847 vulnerabilities found",
        "Stack Overflow: Question closed as duplicate",
        "git merge conflict in 47 files",
        "TypeError: undefined is not a function",
        "Build failed. Exit code 1.",
        "// Why does this work???",
        "Cannot read property 'x' of null",
        "CORS policy blocked request",
        "Module not found: 'react'",
        "Segmentation fault (core dumped)",
        "// This is temporary (2019)",
        "Warning: Each child should have unique key",
        "Connection refused: ECONNREFUSED",
        "Maximum call stack size exceeded",
    ];

    const scroll = frame * 0.8;

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.28,
            zIndex: 0,
            overflow: 'hidden',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 13,
            color: '#1a1a1a',
            lineHeight: 2.2,
            padding: '20px 40px',
            transform: `translateY(${-scroll % 400}px)`
        }}>
            {[...Array(8)].map((_, col) => (
                <div key={col} style={{ marginBottom: 20 }}>
                    {frustrations.map((f, i) => (
                        <div key={i} style={{ opacity: 0.4 + Math.random() * 0.6 }}>{f}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// Agent icon (abstract, no logos)
const AgentIcon = ({ delay, frame, fps, x, y, size = 80 }: {
    delay: number, frame: number, fps: number, x: number, y: number, size?: number
}) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
    const pulse = 1 + Math.sin((frame - delay) * 0.15) * 0.08;
    const glow = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            width: size,
            height: size,
            opacity: s,
            transform: `scale(${s * pulse})`,
        }}>
            {/* Outer glow ring */}
            <div style={{
                position: 'absolute',
                inset: -10,
                borderRadius: '50%',
                border: '2px solid rgba(204, 0, 0, 0.3)',
                opacity: glow,
                boxShadow: `0 0 ${30 * glow}px rgba(204, 0, 0, 0.4)`,
            }} />
            {/* Core */}
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #cc0000 0%, #660000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 40px rgba(204, 0, 0, 0.5)',
            }}>
                {/* Inner symbol - represents autonomous agent */}
                <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="#fdfcf8" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#fdfcf8" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="#fdfcf8" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>
            </div>
        </div>
    );
};

// ============================================
// SCENE 4: ORIGIN SCENE - THE STRUGGLE
// ============================================

export const OriginScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width } = useVideoConfig();
    const isMobile = height > width;

    const mainSpring = spring({ frame, fps, config: { damping: 15 } });
    const credentialsSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
    const punchSpring = spring({ frame: frame - 90, fps, config: { damping: 12 } });

    // Animated hours counter
    const hoursWasted = Math.floor(interpolate(frame, [40, 120], [0, 847], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }));

    return (
        <AbsoluteFill style={{ background: "#fdfcf8", overflow: 'hidden' }}>
            {/* Architectural Underlay - Enhanced Ken Burns */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.2, // Increased as requested
                transform: `scale(${1.05 + frame * 0.0003}) translateX(${frame * 0.02}px)`,
                filter: 'grayscale(1)'
            }}>
                <Img src={staticFile("dojo-blueprint.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Drowning code background */}
            <DrowningCodeWall frame={frame} />

            {/* Frustration bars with relatable text - SPREAD across safe zone */}
            <FrustrationBar text="Stack Overflow: 47 tabs open" delay={8} frame={frame} fps={fps} top={isMobile ? "12%" : "18%"} rotation={-4} />
            <FrustrationBar text="Tutorial: Day 73. Still confused." delay={20} frame={frame} fps={fps} top={isMobile ? "24%" : "38%"} rotation={2.5} />
            <FrustrationBar text="Deadline: Yesterday" delay={32} frame={frame} fps={fps} top={isMobile ? "45%" : "58%"} rotation={-1.5} />
            <FrustrationBar text="Dependencies: Broken. Again." delay={44} frame={frame} fps={fps} top={isMobile ? "57%" : "78%"} rotation={3} />

            {/* Main content - USE FULL SAFE ZONE (top 75% of viewport) */}
            <div style={{
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                height: isMobile ? '78%' : '100%',
                padding: isMobile ? '50px 40px 0' : '80px 60px',
                justifyContent: 'space-between',
            }}>
                {/* Header */}
                <div style={{ opacity: mainSpring, transform: `translateY(${(1 - mainSpring) * -30}px)` }}>
                    <div style={{
                        background: '#1a1a1a',
                        padding: '12px 30px',
                        display: 'inline-block',
                        marginBottom: 20
                    }}>
                        <h3 style={{
                            fontFamily: 'IBM Plex Mono, monospace',
                            fontSize: isMobile ? 20 : 20,
                            color: '#fdfcf8',
                            letterSpacing: '0.35em',
                            margin: 0,
                            fontWeight: 800
                        }}>
                            MY STORY
                        </h3>
                    </div>
                    <h1 style={{
                        fontSize: isMobile ? 72 : 100,
                        fontWeight: 900,
                        color: '#1a1a1a',
                        lineHeight: 0.9,
                        letterSpacing: '-0.05em',
                        margin: 0
                    }}>
                        I HIT A <br /> <span style={{ color: '#cc0000' }}>WALL.</span>
                    </h1>
                </div>

                {/* Hours wasted counter - PUSHED UP to avoid frustration bar overlap */}
                <div style={{
                    textAlign: 'center',
                    opacity: credentialsSpring,
                    transform: `scale(${0.9 + credentialsSpring * 0.1})`,
                    marginTop: isMobile ? -60 : 0,
                    marginBottom: isMobile ? 40 : 0,
                }}>
                    <div style={{
                        fontSize: isMobile ? 140 : 200,
                        fontWeight: 900,
                        color: '#cc0000',
                        lineHeight: 1,
                        textShadow: '0 10px 40px rgba(204, 0, 0, 0.3)',
                    }}>
                        ∞
                    </div>
                    <div style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 22 : 24,
                        color: '#5a5a5a',
                        letterSpacing: '0.3em',
                        marginTop: 10,
                    }}>
                        HOURS ON BOILERPLATE
                    </div>
                </div>

                {/* Credentials + Punch - BOTTOM of safe zone */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: isMobile ? '40px 35px' : '40px',
                    borderLeft: '10px solid #1a1a1a',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                    opacity: punchSpring,
                    transform: `translateY(${(1 - punchSpring) * 40}px) translateX(${isMobile ? '-15px' : '-30px'}) rotate(-0.5deg)`,
                    marginRight: isMobile ? '30px' : '80px',
                }}>
                    <div style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 26 : 14,
                        color: '#cc0000',
                        letterSpacing: '0.25em',
                        fontWeight: 800,
                        marginBottom: 20,
                    }}>
                        THE_REALITY
                    </div>
                    <h3 style={{
                        fontSize: isMobile ? 48 : 36,
                        fontWeight: 900,
                        color: '#1a1a1a',
                        lineHeight: 1.1,
                        margin: 0,
                        marginBottom: 16,
                    }}>
                        No CS degree. Just Python notebooks.
                    </h3>
                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: isMobile ? 32 : 20,
                        fontStyle: 'italic',
                        color: '#5a5a5a',
                        lineHeight: 1.4,
                        margin: 0,
                        marginBottom: 16,
                    }}>
                        Then I got thrown into a 100K+ LOC codebase.
                    </p>
                    <p style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 28 : 18,
                        fontWeight: 700,
                        color: '#cc0000',
                        lineHeight: 1.4,
                        margin: 0,
                    }}>
                        Drowning in boilerplate. Deadlines piling up.
                    </p>
                </div>
            </div>

            {/* Corner status */}
            <div style={{
                position: 'absolute',
                top: 30,
                right: 30,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 11,
                color: 'rgba(0,0,0,0.25)',
                textAlign: 'right',
                lineHeight: 1.8
            }}>
                STATUS: [STAGNATED] <br />
                EST. 2024 // AD-OP-01 <br />
                NO CS DEGREE REQUIRED.
            </div>
        </AbsoluteFill>
    );
};

// ============================================
// SCENE 5: CATALYST SCENE - THE REALIZATION
// ============================================

export const CatalystScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width } = useVideoConfig();
    const isMobile = height > width;

    // Phase timings - EXPANDED for breathing room
    const phase1End = 45;   // "These tools aren't autocomplete..." crossed out
    const phase2End = 80;   // "They're actual AGENTS."
    const phase3End = 115;  // "They EXECUTE. They BUILD. They SHIP."
    const phase4End = 150;  // "I stopped coding. I started orchestrating."

    const bgPulse = 1 + Math.sin(frame * 0.08) * 0.02;
    const energyPulse = Math.sin(frame * 0.15) * 0.5 + 0.5;

    // Text reveals - staggered for impact
    const text1Opacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const text1Strike = interpolate(frame, [35, 48], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const text2Spring = spring({ frame: frame - phase1End, fps, config: { damping: 10, stiffness: 80 } });
    const text3Spring = spring({ frame: frame - phase2End, fps, config: { damping: 12 } });
    const text4Spring = spring({ frame: frame - phase3End, fps, config: { damping: 14 } });

    // Agent icons appear
    const agentPositions = isMobile
        ? [{ x: 150, y: 200 }, { x: 400, y: 280 }, { x: 600, y: 200 }]
        : [{ x: 300, y: 180 }, { x: 600, y: 250 }, { x: 900, y: 180 }, { x: 1200, y: 250 }, { x: 1500, y: 180 }];

    return (
        <AbsoluteFill style={{ background: "#0a0a0a", overflow: 'hidden' }}>
            {/* Dynamic background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, rgba(204, 0, 0, ${0.15 * energyPulse}) 0%, transparent 70%)`,
                transform: `scale(${bgPulse})`,
            }} />

            {/* Grid pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.08,
                backgroundImage: 'linear-gradient(rgba(204,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Agent icons appearing */}
            {agentPositions.map((pos, i) => (
                <AgentIcon
                    key={i}
                    delay={phase1End + 10 + i * 8}
                    frame={frame}
                    fps={fps}
                    x={pos.x}
                    y={pos.y}
                    size={isMobile ? 60 : 80}
                />
            ))}

            {/* Main content */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: isMobile ? '0 40px' : '0 80px',
                zIndex: 100,
            }}>
                {/* Phase 1: Crossed out text */}
                <div style={{
                    opacity: text1Opacity,
                    marginBottom: 60,
                    position: 'relative',
                }}>
                    <h2 style={{
                        fontSize: isMobile ? 52 : 56,
                        fontWeight: 700,
                        color: 'rgba(253, 252, 248, 0.5)',
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        margin: 0,
                    }}>
                        "These tools are just autocomplete..."
                    </h2>
                    {/* Strikethrough line */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        height: 6,
                        background: '#cc0000',
                        width: `${text1Strike}%`,
                        boxShadow: '0 0 20px rgba(204, 0, 0, 0.8)',
                    }} />
                </div>

                {/* Phase 2: The revelation */}
                <div style={{
                    opacity: text2Spring,
                    transform: `scale(${0.8 + text2Spring * 0.2}) translateY(${(1 - text2Spring) * 30}px)`,
                }}>
                    <div style={{
                        background: '#cc0000',
                        padding: '20px 60px',
                        display: 'inline-block',
                        marginBottom: 40,
                        boxShadow: `0 0 ${60 * energyPulse}px rgba(204, 0, 0, 0.6)`,
                    }}>
                        <span style={{
                            fontFamily: 'IBM Plex Mono, monospace',
                            fontSize: isMobile ? 22 : 20,
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '0.3em',
                        }}>
                            REALIZATION_UNLOCKED
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: isMobile ? 120 : 120,
                        fontWeight: 900,
                        color: '#fdfcf8',
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        margin: 0,
                        textShadow: '0 10px 60px rgba(204, 0, 0, 0.4)',
                    }}>
                        THEY'RE <span style={{ color: '#cc0000' }}>AGENTS.</span>
                    </h1>
                </div>

                {/* Phase 3: The triple punch - EXECUTE, BUILD, SHIP */}
                <div style={{
                    opacity: text3Spring,
                    transform: `translateY(${(1 - text3Spring) * 40}px)`,
                    marginTop: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: isMobile ? 20 : 16,
                }}>
                    {/* Three action words with staggered reveal */}
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? 30 : 40,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}>
                        {['EXECUTE', 'BUILD', 'SHIP'].map((word, i) => {
                            const wordSpring = spring({ frame: frame - (phase2End + 8 + i * 12), fps, config: { damping: 10, stiffness: 100 } });
                            const wordPulse = 1 + Math.sin((frame - phase2End - i * 12) * 0.15) * 0.05;
                            return (
                                <div
                                    key={word}
                                    style={{
                                        opacity: wordSpring,
                                        transform: `scale(${wordSpring * wordPulse}) translateY(${(1 - wordSpring) * 20}px)`,
                                        padding: isMobile ? '18px 35px' : '14px 30px',
                                        background: i === 0 ? '#cc0000' : 'rgba(204, 0, 0, 0.15)',
                                        border: `2px solid ${i === 0 ? '#cc0000' : 'rgba(204, 0, 0, 0.5)'}`,
                                    }}
                                >
                                    <span style={{
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        fontSize: isMobile ? 36 : 28,
                                        fontWeight: 900,
                                        color: i === 0 ? '#fdfcf8' : '#cc0000',
                                        letterSpacing: '0.15em',
                                    }}>
                                        {word}.
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Supporting line */}
                    <p style={{
                        fontSize: isMobile ? 32 : 26,
                        color: 'rgba(253, 252, 248, 0.6)',
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        margin: 0,
                        marginTop: 10,
                        opacity: spring({ frame: frame - (phase2End + 45), fps, config: { damping: 14 } }),
                    }}>
                        You describe. They deliver.
                    </p>
                </div>

                {/* Phase 4: The personal transformation - I stopped coding */}
                <div style={{
                    opacity: text4Spring,
                    transform: `translateY(${(1 - text4Spring) * 30}px)`,
                    marginTop: 45,
                    padding: isMobile ? '35px 45px' : '30px 50px',
                    border: '2px solid rgba(204, 0, 0, 0.4)',
                    background: 'rgba(204, 0, 0, 0.08)',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontSize: isMobile ? 38 : 32,
                        fontWeight: 700,
                        color: '#fdfcf8',
                        lineHeight: 1.4,
                        margin: 0,
                    }}>
                        I stopped <span style={{ color: 'rgba(253,252,248,0.4)', textDecoration: 'line-through' }}>coding</span>.
                    </p>
                    <p style={{
                        fontSize: isMobile ? 44 : 36,
                        fontWeight: 900,
                        color: '#cc0000',
                        lineHeight: 1.3,
                        margin: 0,
                        marginTop: 12,
                        textShadow: '0 0 40px rgba(204, 0, 0, 0.4)',
                    }}>
                        I started orchestrating.
                    </p>
                </div>
            </div>

            {/* Energy particles */}
            {[...Array(20)].map((_, i) => {
                const particleDelay = phase1End + i * 3;
                const particleOpacity = interpolate(frame, [particleDelay, particleDelay + 20], [0, 0.6], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
                const floatY = Math.sin((frame + i * 20) * 0.05) * 30;
                const x = (i * 137) % (isMobile ? 1000 : 1800) + 60;
                const y = 100 + (i * 89) % 600 + floatY;

                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: x,
                        top: y,
                        width: 4 + (i % 4) * 2,
                        height: 4 + (i % 4) * 2,
                        borderRadius: '50%',
                        background: '#cc0000',
                        opacity: particleOpacity,
                        boxShadow: '0 0 10px rgba(204, 0, 0, 0.8)',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

// ============================================
// SCENE 6: PEAK SCENE - THE PROOF (FILL VIEWPORT)
// "I haven't written a line of code in 10 months"
// Style: Matches Scene 4 & 8 (cream bg, white cards, blueprint underlay)
// UPDATED: Significantly larger text and components for mobile
// ============================================

export const PeakScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width } = useVideoConfig();
    const isMobile = height > width;

    const headerSpring = spring({ frame, fps, config: { damping: 15 } });

    // Staggered timings for dramatic reveal
    const hookDelay = 5;
    const stat1Delay = 50;
    const stat2Delay = 80;
    const stat3Delay = 110;
    const stat4Delay = 140;
    const stat5Delay = 170;
    const punchDelay = 230;

    // Ken Burns on background
    const bgZoom = interpolate(frame, [0, 300], [1.05, 1.15]);
    const bgPanX = interpolate(frame, [0, 300], [0, -20]);

    // Stats data - 5 hero achievements (last one is text-only)
    const stats: Array<{
        value?: number, prefix?: string, suffix?: string,
        textOnly?: string, label: string, sublabel: string,
        color: string, delay: number
    }> = [
        { value: 5, prefix: "TOP ", suffix: "", label: "ASEAN AI HACKATHON", sublabel: "Solo dev vs 150+ teams", color: "#cc0000", delay: stat1Delay },
        { value: 100, prefix: "", suffix: "K+", label: "LINES SHIPPED", sublabel: "Enterprise production code", color: "#1a1a1a", delay: stat2Delay },
        { value: 30, prefix: "", suffix: "K+", label: "USERS SERVED", sublabel: "Enterprise AI platform", color: "#cc0000", delay: stat3Delay },
        { value: 50, prefix: "", suffix: "+", label: "PERSON TEAM", sublabel: "App lead, delivered 90% solo", color: "#1a1a1a", delay: stat4Delay },
        { textOnly: "→", label: "SENIOR AI ENGINEER", sublabel: "Multiple competing offers", color: "#cc0000", delay: stat5Delay },
    ];

    return (
        <AbsoluteFill style={{ background: "#fdfcf8", overflow: 'hidden' }}>
            {/* Background Asset: Agent Swarm Blueprint - Ken Burns */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.35,
                transform: `scale(${bgZoom}) translateX(${bgPanX}px)`,
            }}>
                <Img src={staticFile("dojo-swarm.jpg")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Subtle grid pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(204,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
            }} />

            {/* Main content */}
            <div style={{
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: isMobile ? '70px 50px' : '60px 70px',
            }}>
                {/* THE HOOK - "Zero lines of code" revelation */}
                <div style={{
                    opacity: spring({ frame: frame - hookDelay, fps, config: { damping: 12 } }),
                    transform: `translateY(${(1 - spring({ frame: frame - hookDelay, fps, config: { damping: 12 } })) * -30}px)`,
                    marginBottom: isMobile ? 30 : 25,
                }}>
                    {/* Badge - matches Scene 4 style */}
                    <div style={{
                        background: '#1a1a1a',
                        padding: isMobile ? '16px 32px' : '10px 20px',
                        display: 'inline-block',
                        marginBottom: 25,
                    }}>
                        <span style={{
                            fontFamily: 'IBM Plex Mono, monospace',
                            fontSize: isMobile ? 26 : 14,
                            fontWeight: 800,
                            color: '#fdfcf8',
                            letterSpacing: '0.25em',
                        }}>
                            THE_PROOF
                        </span>
                    </div>

                    {/* Main hook headline - MUCH LARGER */}
                    <h1 style={{
                        fontSize: isMobile ? 76 : 64,
                        fontWeight: 900,
                        color: '#1a1a1a',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.0,
                        margin: 0,
                    }}>
                        Almost zero code by hand<br />
                        in <span style={{ color: '#cc0000' }}>10 months.</span>
                    </h1>

                    <p style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: isMobile ? 26 : 20,
                        color: '#5a5a5a',
                        margin: 0,
                        marginTop: 20,
                        letterSpacing: '0.05em',
                    }}>
                        I stopped typing code. <span style={{ color: '#cc0000', fontWeight: 700 }}>I started directing agents.</span>
                    </p>

                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: isMobile ? 42 : 28,
                        fontStyle: 'italic',
                        color: '#5a5a5a',
                        margin: 0,
                        marginTop: 20,
                    }}>
                        Yet I shipped all of this:
                    </p>
                </div>

                {/* STATS GRID - 5 achievements as cards - MUCH LARGER */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 18 : 10,
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    {stats.map((stat, i) => {
                        const s = spring({ frame: frame - stat.delay, fps, config: { damping: 15 } });
                        const isLeft = i % 2 === 0;
                        
                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobile ? 30 : 25,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    padding: isMobile ? '28px 35px' : '20px 30px',
                                    borderLeft: `10px solid ${stat.color}`,
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                                    opacity: s,
                                    transform: `translateY(${(1 - s) * 30}px) translateX(${isLeft ? '-8px' : '8px'}) rotate(${isLeft ? -0.3 : 0.3}deg)`,
                                    marginLeft: isLeft ? 0 : (isMobile ? '4%' : '10%'),
                                    marginRight: isLeft ? (isMobile ? '4%' : '10%') : 0,
                                }}
                            >
                                {/* Big number or text - MUCH LARGER */}
                                <div style={{
                                    fontSize: isMobile ? 90 : 52,
                                    fontWeight: 900,
                                    color: stat.color,
                                    lineHeight: 1,
                                    minWidth: isMobile ? 200 : 140,
                                    textShadow: stat.color === '#cc0000' ? '0 4px 20px rgba(204, 0, 0, 0.2)' : 'none',
                                }}>
                                    {stat.textOnly ? (
                                        <span style={{ opacity: spring({ frame: frame - stat.delay - 5, fps, config: { damping: 15 } }) }}>
                                            {stat.textOnly}
                                        </span>
                                    ) : (
                                        <AnimatedCounter
                                            target={stat.value!}
                                            delay={stat.delay + 5}
                                            frame={frame}
                                            fps={fps}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                        />
                                    )}
                                </div>

                                {/* Labels - MUCH LARGER */}
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        fontSize: isMobile ? 24 : 12,
                                        color: stat.color,
                                        letterSpacing: '0.12em',
                                        fontWeight: 800,
                                        marginBottom: 8,
                                    }}>
                                        {stat.label}
                                    </div>
                                    <p style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: isMobile ? 30 : 17,
                                        fontStyle: 'italic',
                                        color: '#5a5a5a',
                                        margin: 0,
                                        lineHeight: 1.2
                                    }}>
                                        {stat.sublabel}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* BOTTOM PUNCHLINE - MUCH LARGER - Pushed up for mobile safe zone */}
                <div style={{
                    opacity: spring({ frame: frame - punchDelay, fps, config: { damping: 15 } }),
                    transform: `translateY(${(1 - spring({ frame: frame - punchDelay, fps, config: { damping: 15 } })) * 20}px)`,
                    textAlign: 'center',
                    marginTop: isMobile ? 15 : 20,
                    marginBottom: isMobile ? 120 : 0,
                    borderTop: '3px solid rgba(0,0,0,0.08)',
                    paddingTop: isMobile ? '25px' : '25px',
                }}>
                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: isMobile ? 42 : 26,
                        fontStyle: 'italic',
                        color: '#1a1a1a',
                        margin: 0,
                        lineHeight: 1.3,
                    }}>
                        "Agents did the coding.<br />
                        <span style={{ color: '#cc0000', fontWeight: 700, fontStyle: 'normal' }}>I did the thinking.</span>"
                    </p>
                </div>
            </div>

            {/* Corner accents */}
            <div style={{
                position: 'absolute',
                top: 35,
                right: 35,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: isMobile ? 16 : 10,
                color: 'rgba(0,0,0,0.25)',
                textAlign: 'right',
                lineHeight: 1.8,
                opacity: headerSpring,
            }}>
                STATUS: [VERIFIED]<br />
                METHOD: AGENTIC
            </div>
        </AbsoluteFill>
    );
};
