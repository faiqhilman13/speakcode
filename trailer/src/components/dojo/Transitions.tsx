import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/*
 * SCENE TRANSITIONS
 * Reusable transition components for cinematic scene changes
 */

// ============================================
// CROSS DISSOLVE - Smooth blend between scenes
// ============================================
export const CrossDissolve: React.FC<{
    children: React.ReactNode;
    durationFrames?: number;
    direction?: 'in' | 'out' | 'both';
}> = ({ children, durationFrames = 15, direction = 'both' }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    let opacity = 1;

    if (direction === 'in' || direction === 'both') {
        opacity = Math.min(opacity, interpolate(frame, [0, durationFrames], [0, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.quad),
        }));
    }

    if (direction === 'out' || direction === 'both') {
        opacity = Math.min(opacity, interpolate(
            frame,
            [durationInFrames - durationFrames, durationInFrames],
            [1, 0],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.inOut(Easing.quad),
            }
        ));
    }

    return (
        <AbsoluteFill style={{ opacity }}>
            {children}
        </AbsoluteFill>
    );
};

// ============================================
// ZOOM TRANSITION - Dramatic zoom reveal
// ============================================
export const ZoomTransition: React.FC<{
    children: React.ReactNode;
    durationFrames?: number;
    direction?: 'in' | 'out';
    zoomFrom?: number;
    zoomTo?: number;
}> = ({ children, durationFrames = 20, direction = 'in', zoomFrom = 1.3, zoomTo = 1 }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    let scale: number;
    let opacity: number;

    if (direction === 'in') {
        scale = interpolate(frame, [0, durationFrames], [zoomFrom, zoomTo], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
            easing: Easing.out(Easing.quad),
        });
        opacity = interpolate(frame, [0, durationFrames * 0.6], [0, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
        });
    } else {
        scale = interpolate(
            frame,
            [durationInFrames - durationFrames, durationInFrames],
            [zoomTo, zoomFrom],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.in(Easing.quad),
            }
        );
        opacity = interpolate(
            frame,
            [durationInFrames - durationFrames * 0.6, durationInFrames],
            [1, 0],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.in(Easing.quad),
            }
        );
    }

    return (
        <AbsoluteFill style={{
            opacity,
            transform: `scale(${scale})`,
        }}>
            {children}
        </AbsoluteFill>
    );
};

// ============================================
// FADE THROUGH BLACK - Cinematic chapter break
// ============================================
export const FadeThrough: React.FC<{
    children: React.ReactNode;
    durationFrames?: number;
    color?: string;
}> = ({ children, durationFrames = 20, color = '#000000' }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Fade in from color
    const fadeInOpacity = interpolate(frame, [0, durationFrames], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });

    // Fade out to color
    const fadeOutOpacity = interpolate(
        frame,
        [durationInFrames - durationFrames, durationInFrames],
        [1, 0],
        {
            extrapolateLeft: 'clamp',
            easing: Easing.in(Easing.quad),
        }
    );

    const contentOpacity = Math.min(fadeInOpacity, fadeOutOpacity);

    // Color overlay (inverse of content)
    const overlayOpacity = 1 - contentOpacity;

    return (
        <AbsoluteFill>
            <AbsoluteFill style={{ opacity: contentOpacity }}>
                {children}
            </AbsoluteFill>
            <AbsoluteFill style={{
                background: color,
                opacity: overlayOpacity,
                pointerEvents: 'none',
            }} />
        </AbsoluteFill>
    );
};

// ============================================
// PUSH SLIDE - One scene pushes another
// ============================================
export const PushSlide: React.FC<{
    children: React.ReactNode;
    durationFrames?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    type?: 'enter' | 'exit';
}> = ({ children, durationFrames = 15, direction = 'left', type = 'enter' }) => {
    const frame = useCurrentFrame();
    const { durationInFrames, width, height } = useVideoConfig();

    const getOffset = () => {
        if (direction === 'left') return { x: -width, y: 0 };
        if (direction === 'right') return { x: width, y: 0 };
        if (direction === 'up') return { x: 0, y: -height };
        return { x: 0, y: height };
    };

    const offset = getOffset();
    let translateX = 0;
    let translateY = 0;
    let opacity = 1;

    if (type === 'enter') {
        translateX = interpolate(frame, [0, durationFrames], [offset.x, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
        });
        translateY = interpolate(frame, [0, durationFrames], [offset.y, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
        });
        opacity = interpolate(frame, [0, durationFrames * 0.5], [0.5, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
        });
    } else {
        translateX = interpolate(
            frame,
            [durationInFrames - durationFrames, durationInFrames],
            [0, -offset.x],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.in(Easing.quad),
            }
        );
        translateY = interpolate(
            frame,
            [durationInFrames - durationFrames, durationInFrames],
            [0, -offset.y],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.in(Easing.quad),
            }
        );
        opacity = interpolate(
            frame,
            [durationInFrames - durationFrames * 0.5, durationInFrames],
            [1, 0.5],
            {
                extrapolateLeft: 'clamp',
                easing: Easing.in(Easing.quad),
            }
        );
    }

    return (
        <AbsoluteFill style={{
            transform: `translate(${translateX}px, ${translateY}px)`,
            opacity,
        }}>
            {children}
        </AbsoluteFill>
    );
};

// ============================================
// FILM GRAIN OVERLAY - Cinematic texture
// ============================================
export const FilmGrain: React.FC<{
    opacity?: number;
    intensity?: 'light' | 'medium' | 'heavy';
}> = ({ opacity = 0.08, intensity = 'light' }) => {
    const frame = useCurrentFrame();

    // Animate grain position for realistic effect
    const offsetX = (frame * 7) % 100;
    const offsetY = (frame * 11) % 100;

    const grainSize = intensity === 'light' ? 100 : intensity === 'medium' ? 80 : 60;

    return (
        <AbsoluteFill style={{
            opacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 ${grainSize} ${grainSize}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundPosition: `${offsetX}px ${offsetY}px`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 1000,
        }} />
    );
};

// ============================================
// SCANLINE EFFECT - Cinematic horizontal sweep
// ============================================
export const Scanline: React.FC<{
    color?: string;
    speed?: number;
    thickness?: number;
}> = ({ color = 'rgba(204, 0, 0, 0.5)', speed = 1, thickness = 3 }) => {
    const frame = useCurrentFrame();
    const { height, durationInFrames } = useVideoConfig();

    const progress = (frame * speed) / durationInFrames;
    const y = progress * (height + 100) - 50;

    return (
        <div style={{
            position: 'absolute',
            top: y,
            left: 0,
            right: 0,
            height: thickness,
            background: color,
            boxShadow: `0 0 30px ${color}`,
            pointerEvents: 'none',
            zIndex: 999,
        }} />
    );
};

// ============================================
// VIGNETTE - Subtle edge darkening
// ============================================
export const Vignette: React.FC<{
    intensity?: number;
    color?: string;
}> = ({ intensity = 0.4, color = 'rgba(0,0,0,1)' }) => {
    return (
        <AbsoluteFill style={{
            background: `radial-gradient(ellipse at center, transparent 40%, ${color.replace('1)', `${intensity})`)} 100%)`,
            pointerEvents: 'none',
            zIndex: 998,
        }} />
    );
};
