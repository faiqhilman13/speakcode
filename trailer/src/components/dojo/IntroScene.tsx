import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isMobile = height > width;

    const titleSpring = spring({ frame, fps, config: { damping: 15 } });
    const subtitleSpring = spring({ frame: frame - 20, fps, config: { damping: 15 } });
    const imgSpring = spring({ frame: frame - 10, fps, config: { damping: 12 } });

    const moveUp = interpolate(frame, [0, 120], [0, -20]);

    return (
        <AbsoluteFill style={{
            background: "#fdfcf8",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0 60px' : '0',
            fontFamily: 'Inter, sans-serif'
        }}>
            {/* Background Asset: Sumi-e Stroke */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${0.8 + imgSpring * 0.2})`,
                opacity: imgSpring * 0.4,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Img
                    src={staticFile("dojo-sumie.png")}
                    style={{ width: '120%', height: 'auto', filter: 'grayscale(0.2)' }}
                />
            </div>

            <div style={{ opacity: titleSpring, transform: `translateY(${moveUp}px)`, zIndex: 10 }}>
                <h1 style={{
                    fontSize: isMobile ? 80 : 80,
                    color: '#1a1a1a',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    textAlign: 'center',
                    lineHeight: 1.1
                }}>
                    You have an <br />
                    <span style={{ color: '#cc0000', fontStyle: 'italic' }}>idea.</span>
                </h1>
            </div>
            <div style={{
                opacity: subtitleSpring,
                marginTop: 40,
                transform: `translateY(${moveUp}px)`,
                textAlign: 'center',
                zIndex: 10
            }}>
                <p style={{
                    fontSize: isMobile ? 32 : 28,
                    color: '#5a5a5a',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    lineHeight: 1.4
                }}>
                    A vision of what you <br /> want to build.
                </p>
            </div>

            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/creme-paper.png")',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
