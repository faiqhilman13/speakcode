import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

const RecordStat = ({ label, value, delay, frame, fps, color = "#fdfcf8" }: { label: string, value: string, delay: number, frame: number, fps: number, color?: string }) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
    return (
        <div style={{
            opacity: s,
            transform: `translateX(${(1 - s) * 30}px)`,
            marginBottom: '45px',
        }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#cc0000', letterSpacing: '0.4em', fontWeight: 800, marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 62, fontWeight: 900, color, lineHeight: 1, letterSpacing: '-0.04em' }}>{value}</div>
        </div>
    );
};

export const BattleRecordsScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Background movement
    const bgScale = interpolate(frame, [0, 180], [1, 1.1]);
    const bgOpacity = interpolate(frame, [0, 40], [0, 0.4]);

    return (
        <AbsoluteFill style={{ background: "#fdfcf8", overflow: 'hidden' }}>

            {/* 1. Tactical Blueprint Backdrop: AI Swarm Orchestration */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: bgOpacity,
                transform: `scale(${bgScale})`,
                filter: 'contrast(1.2)'
            }}>
                <Img src={staticFile("dojo-swarm.jpg")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 2. Glass Panel for Stats */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                padding: '100px 50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'linear-gradient(to right, rgba(253, 252, 248, 0.95) 40%, transparent)'
            }}>
                <div style={{ marginBottom: 60 }}>
                    <h3 style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#cc0000', letterSpacing: '0.5em', fontWeight: 800 }}>PROVEN_PRODUCTION_STATS</h3>
                    <h1 style={{ fontSize: 42, fontWeight: 900, color: '#1a1a1a', marginTop: 15 }}>My Personal <br /> <span style={{ color: '#cc0000' }}>Battle Record.</span></h1>
                </div>

                <div style={{ borderLeft: '2px solid #cc0000', paddingLeft: '30px' }}>
                    <RecordStat label="USER_TRAFFIC" value="30,000+" delay={20} frame={frame} fps={fps} color="#1a1a1a" />
                    <RecordStat label="CODEBASE_VOLUME" value="100,000+" delay={50} frame={frame} fps={fps} color="#1a1a1a" />
                    <RecordStat label="REVENUE_RECOVERY" value="$25,492" delay={80} frame={frame} fps={fps} color="#cc0000" />
                </div>
            </div>

            {/* 3. The 'Impact' Asset: Marble Obsidian Core */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                right: '-5%',
                width: 500,
                height: 500,
                opacity: spring({ frame: frame - 100, fps }),
                transform: `scale(${interpolate(spring({ frame: frame - 100, fps }), [0, 1], [0.5, 1])}) rotate(${frame * 0.2}deg)`,
            }}>
                <Img
                    src={staticFile("dojo-impact.png")}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 50px rgba(204, 0, 0, 0.3))'
                    }}
                />
            </div>

            {/* Authentication Footer */}
            <div style={{
                position: 'absolute',
                bottom: 40,
                left: 50,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 12,
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: '0.2em'
            }}>
                TIMESTAMP: 2024.01 // ACCESS: [LEVEL_ZERO]
            </div>
        </AbsoluteFill>
    );
};
