import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { SakuraPetal } from "./Assets";

const CurriculumCard = ({ phase, title, items, delay, fps, frame, isMobile }: { phase: string, title: string, items: string[], delay: number, fps: number, frame: number, isMobile: boolean }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: isMobile ? '38px 42px' : '42px 34px',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
            opacity: s,
            transform: `translateY(${(1 - s) * 40}px)`,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 17, right: 30, fontSize: isMobile ? 100 : 62, fontFamily: 'Satoshi, sans-serif', fontWeight: 900, color: 'rgba(0,0,0,0.04)' }}>{phase.split(' ')[1]}</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#cc0000', fontSize: isMobile ? 30 : 20, letterSpacing: '0.25em', fontWeight: 700 }}>{phase}</div>
            <h3 style={{ fontSize: isMobile ? 66 : 41, fontWeight: 900, color: '#1a1a1a', marginTop: 12, marginBottom: isMobile ? 18 : 22, letterSpacing: '-0.02em' }}>{title}</h3>
            {/* 2-column grid for items */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
                gap: isMobile ? '16px 25px' : '12px 30px',
            }}>
                {items.map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: isMobile ? 16 : 13,
                        opacity: spring({ frame: frame - (delay + 15 + i * 4), fps })
                    }}>
                        <div style={{ width: isMobile ? 13 : 10, height: isMobile ? 4 : 2, background: '#cc0000', flexShrink: 0, marginTop: isMobile ? 17 : 12 }} />
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 35 : 23, fontStyle: 'italic', color: '#5a5a5a', lineHeight: 1.35 }}>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const MasteryScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const headerSpring = spring({ frame, fps, config: { damping: 15 } });

    const petals = Array.from({ length: 20 }).map((_, i) => ({
        x: (i * 200 + 50) % (isMobile ? 1080 : 1920),
        y: interpolate(frame, [0, 180], [-100, 2200]) + (i * 30),
        rotation: frame * (0.3 + i * 0.05),
        size: 15 + (i % 6) * 4
    }));

    const bgZoom = interpolate(frame, [0, 180], [1.05, 1.18]);
    const bgPanX = interpolate(frame, [0, 180], [0, -15]);

    return (
        <AbsoluteFill style={{ background: "#fdfcf8", padding: isMobile ? '60px 40px 140px' : '80px', overflow: 'hidden' }}>
            {/* Background Asset: Pagoda Blueprint - Enhanced Ken Burns */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.4,
                transform: `scale(${bgZoom}) translateX(${bgPanX}px)`,
            }}>
                <Img src={staticFile("dojo-blueprint.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {petals.map((p, i) => (
                <SakuraPetal key={i} x={p.x} y={p.y} rotation={p.rotation} size={p.size} />
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', zIndex: 10 }}>
                {/* Header - Compact for mobile */}
                <div style={{
                    opacity: headerSpring,
                    transform: `translateY(${(1 - headerSpring) * -20}px)`,
                    textAlign: 'center',
                    marginBottom: isMobile ? '15px' : '50px'
                }}>
                    <h3 style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 20 : 22,
                        color: '#cc0000',
                        letterSpacing: '0.25em',
                        fontWeight: 800,
                        margin: 0,
                        marginBottom: 12,
                        background: 'rgba(204, 0, 0, 0.08)',
                        padding: isMobile ? '12px 20px' : '14px 28px',
                        display: 'inline-block',
                    }}>
                        THE CURRICULUM
                    </h3>
                    <h2 style={{ fontSize: isMobile ? 56 : 64, fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: 8 }}>
                        Path to <span style={{ color: '#cc0000' }}>Mastery</span>
                    </h2>
                </div>

                {/* Curriculum Grid - auto-sized cards */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 18 : 14,
                }}>
                    <CurriculumCard
                        phase="PHASE 01"
                        title="The Mind"
                        items={[
                            'How AI can actually build for you',
                            'The tools that change everything',
                            'Why most people use AI wrong'
                        ]}
                        delay={18} fps={fps} frame={frame} isMobile={isMobile}
                    />
                    <CurriculumCard
                        phase="PHASE 02"
                        title="The Blade"
                        items={[
                            'Choose the best AI stack for you',
                            'The exact setup I use daily',
                            'State of the art workflows'
                        ]}
                        delay={42} fps={fps} frame={frame} isMobile={isMobile}
                    />
                    <CurriculumCard
                        phase="PHASE 03"
                        title="The Strike"
                        items={[
                            'Create a real project with me',
                            'Watch the full workflow',
                            'From idea to live app'
                        ]}
                        delay={66} fps={fps} frame={frame} isMobile={isMobile}
                    />
                </div>

                {/* Bottom Banner - compact for mobile */}
                <div style={{
                    marginTop: isMobile ? 15 : 50,
                    textAlign: 'center',
                    opacity: spring({ frame: frame - 100, fps }),
                    fontFamily: 'Playfair Display, serif',
                    fontSize: isMobile ? 28 : 24,
                    color: '#1a1a1a',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    paddingTop: isMobile ? '12px' : '30px',
                    marginBottom: isMobile ? 80 : 0,
                }}>
                    "No coding experience needed. Just follow along."
                </div>
            </div>
        </AbsoluteFill>
    );
};
