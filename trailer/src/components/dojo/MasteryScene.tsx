import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { SakuraPetal } from "./Assets";

const CurriculumCard = ({ phase, title, items, delay, fps, frame, isMobile }: { phase: string, title: string, items: string[], delay: number, fps: number, frame: number, isMobile: boolean }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: isMobile ? '45px 40px' : '40px 30px',
            border: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
            opacity: s,
            transform: `translateY(${(1 - s) * 40}px)`,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: isMobile ? '20px' : '0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 20, right: 30, fontSize: isMobile ? 70 : 40, fontFamily: 'Satoshi, sans-serif', fontWeight: 900, color: 'rgba(0,0,0,0.03)' }}>{phase.split(' ')[1]}</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#cc0000', fontSize: isMobile ? 24 : 14, letterSpacing: '0.25em', fontWeight: 700 }}>{phase}</div>
            <h3 style={{ fontSize: isMobile ? 52 : 26, fontWeight: 900, color: '#1a1a1a', marginTop: 15, marginBottom: isMobile ? 25 : 25, letterSpacing: '-0.02em' }}>{title}</h3>
            <div style={{ flex: 1 }}>
                {items.map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? 20 : 15,
                        marginBottom: isMobile ? 18 : 12,
                        opacity: spring({ frame: frame - (delay + 22 + i * 7), fps })
                    }}>
                        <div style={{ width: isMobile ? 12 : 8, height: isMobile ? 3 : 2, background: '#cc0000' }} />
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 32 : 17, fontStyle: 'italic', color: '#5a5a5a', lineHeight: 1.4 }}>{item}</span>
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
                {/* Header */}
                <div style={{
                    opacity: headerSpring,
                    transform: `translateY(${(1 - headerSpring) * -20}px)`,
                    textAlign: 'center',
                    marginBottom: isMobile ? '20px' : '50px'
                }}>
                    <h3 style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: isMobile ? 24 : 22,
                        color: '#cc0000',
                        letterSpacing: '0.25em',
                        fontWeight: 800,
                        margin: 0,
                        marginBottom: 15,
                        background: 'rgba(204, 0, 0, 0.08)',
                        padding: isMobile ? '14px 24px' : '14px 28px',
                        display: 'inline-block',
                    }}>
                        WHAT YOU'LL LEARN
                    </h3>
                    <h2 style={{ fontSize: isMobile ? 72 : 64, fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: 10 }}>
                        The Path to <span style={{ color: '#cc0000' }}>Mastery</span>
                    </h2>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: isMobile ? 16 : 16, color: '#5a5a5a', marginTop: 15, letterSpacing: '0.3em', fontWeight: 600 }}>
                        THREE PHASES
                    </p>
                </div>

                {/* Curriculum Grid */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    flex: 1
                }}>
                    <CurriculumCard
                        phase="PHASE 01"
                        title="THE MIND"
                        items={['Think in systems, not syntax', 'Problem decomposition protocols', 'From notebooks to enterprise codebases']}
                        delay={22} fps={fps} frame={frame} isMobile={isMobile}
                    />
                    <CurriculumCard
                        phase="PHASE 02"
                        title="THE BLADE"
                        items={['Master MCPs, skills & workflows', 'Ship features without learning new languages', 'Agent orchestration & LLM patterns']}
                        delay={45} fps={fps} frame={frame} isMobile={isMobile}
                    />
                    <CurriculumCard
                        phase="PHASE 03"
                        title="THE STRIKE"
                        items={['Production-ready in days, not months', 'Handle 100K+ LOC codebases', 'The live build: idea to deployed']}
                        delay={68} fps={fps} frame={frame} isMobile={isMobile}
                    />
                </div>

                {/* Bottom Banner */}
                <div style={{
                    marginTop: isMobile ? 40 : 50,
                    textAlign: 'center',
                    opacity: spring({ frame: frame - 112, fps }),
                    fontFamily: 'Playfair Display, serif',
                    fontSize: isMobile ? 28 : 24,
                    color: '#1a1a1a',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    borderTop: '2px solid rgba(0,0,0,0.05)',
                    paddingTop: isMobile ? '20px' : '30px'
                }}>
                    "By the end, you'll be building complex <br /> systems in record time."
                </div>
            </div>
        </AbsoluteFill>
    );
};
