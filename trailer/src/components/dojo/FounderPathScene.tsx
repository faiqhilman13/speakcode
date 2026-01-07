import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

export const FounderPathScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const getSpring = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ background: "#fdfcf8", padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Background Blueprint */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0 }}>
                <Img src={staticFile("dojo-blueprint.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ zIndex: 10 }}>
                <h3 style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 16, color: '#cc0000', letterSpacing: '0.4em', marginBottom: 30 }}>THE PATH TAKEN</h3>

                <div style={{ marginBottom: 60 }}>
                    <h2 style={{
                        fontSize: 64,
                        fontWeight: 900,
                        color: '#1a1a1a',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        opacity: getSpring(0),
                        transform: `translateX(${(1 - getSpring(0)) * 50}px)`
                    }}>
                        Start at <br /> <span style={{ color: '#cc0000' }}>Zero.</span>
                    </h2>
                    <p style={{
                        marginTop: 30,
                        fontSize: 22,
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        color: '#5a5a5a',
                        lineHeight: 1.5,
                        opacity: getSpring(20),
                        transform: `translateX(${(1 - getSpring(20)) * 50}px)`
                    }}>
                        I had no CS degree. No tech background. No "mentor" to clear the way.
                    </p>
                </div>

                <div style={{
                    background: '#1a1a1a',
                    padding: '40px',
                    color: '#fdfcf8',
                    opacity: getSpring(60),
                    transform: `scale(${0.9 + getSpring(60) * 0.1})`
                }}>
                    <h4 style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#cc0000', marginBottom: 15 }}>THE PIVOT</h4>
                    <p style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>
                        I replaced "Learning to Code" with <span style={{ color: '#cc0000' }}>"Learning to Orchestrate."</span>
                    </p>
                    <p style={{ marginTop: 20, fontSize: 18, color: 'rgba(253, 252, 248, 0.6)' }}>
                        That small shift changed everything.
                    </p>
                </div>
            </div>

            {/* Sumi-e Accent */}
            <div style={{ position: 'absolute', bottom: -100, right: -100, opacity: 0.2, transform: 'rotate(-45deg)', width: 600 }}>
                <Img src={staticFile("dojo-sumie.png")} style={{ width: '100%' }} />
            </div>
        </AbsoluteFill>
    );
};
