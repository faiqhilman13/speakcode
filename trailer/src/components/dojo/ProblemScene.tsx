import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProblemScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const textOpacity = interpolate(frame, [0, 20, 130, 150], [0, 1, 1, 0]);
    const glitch = Math.sin(frame * 2.5) * 2;

    return (
        <AbsoluteFill style={{
            background: "#1a1a1a",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0 40px' : '0'
        }}>
            <div style={{ opacity: textOpacity, textAlign: 'center' }}>
                <h2 style={{
                    color: '#fdfcf8',
                    fontSize: isMobile ? 64 : 60,
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.2
                }}>
                    But <span style={{ color: '#cc0000' }}>code</span> <br /> stands in the way.
                </h2>

                <div style={{ position: 'relative', marginTop: 60, height: 100 }}>
                    {['Too slow', 'Too complex', 'Too technical', 'Old protocols'].map((word, i) => {
                        const wordOpacity = interpolate(
                            frame,
                            [30 + i * 20, 40 + i * 20, 50 + i * 20, 60 + i * 20],
                            [0, 1, 1, 0],
                            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                        );
                        return (
                            <div key={word} style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: `translateX(-50%) translateX(${glitch}px)`,
                                color: 'rgba(253, 252, 248, 0.4)',
                                fontFamily: 'IBM Plex Mono, monospace',
                                fontSize: isMobile ? 36 : 32,
                                opacity: wordOpacity,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                width: '100%'
                            }}>
                                {word}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
