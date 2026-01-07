import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { SakuraPetal } from "./Assets";

const DataGrid = ({ opacity = 0.05, frame }: { opacity?: number, frame: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, opacity, zIndex: 0, pointerEvents: 'none' }}>
            <div style={{
                width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(#cc0000 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: `translateY(${frame * 0.5}px)`
            }} />
        </div>
    );
};

export const IdentityScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, height, width } = useVideoConfig();
    const isMobile = height > width;

    const imgSpring = spring({ frame, fps, config: { damping: 15 } });
    const textSpring = spring({ frame: frame - 20, fps, config: { damping: 12 } });

    const bgZoom = interpolate(frame, [0, 300], [1, 1.15]);

    return (
        <AbsoluteFill style={{ background: "#1a1a1a", overflow: 'hidden' }}>
            {/* New Tactical Founder Asset */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.7,
                transform: `scale(${bgZoom})`,
                filter: 'contrast(1.2)'
            }}>
                <Img src={staticFile("dojo-identity.png")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <DataGrid frame={frame} opacity={0.1} />

            {/* Identity Card - Floating glass/slate for extra 'DAMN' factor */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: isMobile ? '7%' : '10%',
                right: isMobile ? '7%' : '10%',
                background: 'rgba(26, 26, 26, 0.9)',
                backdropFilter: 'blur(20px)',
                padding: '60px 40px',
                border: '1px solid rgba(204, 0, 0, 0.4)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                opacity: imgSpring,
                transform: `translateY(${(1 - imgSpring) * 100}px)`,
                zIndex: 50
            }}>
                <div style={{ position: 'absolute', top: 20, right: 30, fontSize: 60, fontWeight: 900, color: 'rgba(204,0,0,0.05)' }}>ID</div>
                <h4 style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#cc0000', letterSpacing: '0.4em', marginBottom: 20, fontWeight: 800 }}>SUBJECT ID: ALPHA_ARCHITECT</h4>
                <h1 style={{ fontSize: isMobile ? 52 : 64, fontWeight: 900, color: '#fdfcf8', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 40 }}>
                    MUHAMMAD <br /> <span style={{ color: '#cc0000' }}>FAIQ HILMAN.</span>
                </h1>

                <div style={{ borderLeft: '4px solid #cc0000', paddingLeft: '25px', opacity: textSpring }}>
                    <p style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: '#fdfcf8', lineHeight: 1.4, letterSpacing: '0.02em' }}>
                        "Built from Zero. Now architecting at scale. <br /> This is my playbook."
                    </p>
                </div>
            </div>

            {/* Minimal Digital Scanner Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'rgba(204, 0, 0, 0.5)',
                boxShadow: '0 0 30px #cc0000',
                transform: `translateY(${interpolate(frame, [0, 120], [0, height])}px)`,
                zIndex: 60
            }} />
        </AbsoluteFill>
    );
};
