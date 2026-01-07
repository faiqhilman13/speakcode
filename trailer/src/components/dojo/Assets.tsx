import { interpolate, useCurrentFrame } from "remotion";

export const ToriiGate = ({ color = "#cc0000", opacity = 1, scale = 1 }) => {
    return (
        <div style={{ transform: `scale(${scale})`, opacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Top Bar */}
            <div style={{ width: 140, height: 10, background: color, borderRadius: '2px 2px 0 0' }} />
            {/* Second Bar */}
            <div style={{ width: 110, height: 6, background: color, marginTop: 10 }} />
            {/* Pillars */}
            <div style={{ display: 'flex', gap: 60, marginTop: 0 }}>
                <div style={{ width: 10, height: 100, background: color }} />
                <div style={{ width: 10, height: 100, background: color }} />
            </div>
        </div>
    );
};

export const SakuraPetal = ({ color = "#cc0000", size = 10, x = 0, y = 0, rotation = 0 }) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                left: x,
                top: y,
                background: color,
                borderRadius: '50% 0 50% 50%',
                transform: `rotate(${rotation}deg)`,
                opacity: 0.8
            }}
        />
    );
};

export const DojoAssets = {
    ToriiGate,
    SakuraPetal
};
