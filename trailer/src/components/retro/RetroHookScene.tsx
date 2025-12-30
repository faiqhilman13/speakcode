import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from "remotion";

/**
 * RetroHookScene - Bold 80s/90s intro with neon grid and VHS effects
 * Style: Hot pink, cyan, yellow, scanlines, chromatic aberration
 */

// Retro color palette
const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  black: "#0a0a0f",
};

// VHS Scanlines component
const Scanlines: React.FC<{ opacity?: number }> = ({ opacity = 0.15 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, ${opacity}) 2px,
        rgba(0, 0, 0, ${opacity}) 4px
      )`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

// Neon Grid Background
const NeonGrid: React.FC<{ frame: number }> = ({ frame }) => {
  const gridOffset = frame * 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        perspective: "500px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-50%",
          right: "-50%",
          height: "60%",
          background: `
            linear-gradient(90deg, ${COLORS.cyan}33 1px, transparent 1px),
            linear-gradient(0deg, ${COLORS.pink}33 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `rotateX(60deg) translateY(${gridOffset % 80}px)`,
          transformOrigin: "center top",
        }}
      />
    </div>
  );
};

// Glitch text effect
const GlitchText: React.FC<{ children: string; frame: number; style?: React.CSSProperties }> = ({
  children,
  frame,
  style,
}) => {
  const glitchOffset = Math.sin(frame * 0.5) * 2;
  const showGlitch = frame % 30 < 3;

  return (
    <div style={{ position: "relative", ...style }}>
      {/* Cyan shadow */}
      <span
        style={{
          position: "absolute",
          left: showGlitch ? -3 : 0,
          color: COLORS.cyan,
          opacity: 0.7,
          clipPath: showGlitch ? "inset(10% 0 80% 0)" : "none",
        }}
      >
        {children}
      </span>
      {/* Pink shadow */}
      <span
        style={{
          position: "absolute",
          left: showGlitch ? 3 : 0,
          color: COLORS.pink,
          opacity: 0.7,
          clipPath: showGlitch ? "inset(80% 0 10% 0)" : "none",
        }}
      >
        {children}
      </span>
      {/* Main text */}
      <span style={{ position: "relative" }}>{children}</span>
    </div>
  );
};

export const RetroHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLine1 = frame >= 5;
  const showLine2 = frame >= 20;
  const showLine3 = frame >= 40;
  const showAccent = frame >= 60;

  const line1Scale = showLine1 ? spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const line2Scale = showLine2 ? spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const line3Scale = showLine3 ? spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 80 } }) : 0;

  // Chromatic aberration intensity
  const chromaticOffset = Math.sin(frame * 0.1) * 2;

  // Floating Memphis shapes
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    x: random(`shape-x-${i}`) * 100,
    y: random(`shape-y-${i}`) * 100,
    size: 20 + random(`shape-size-${i}`) * 60,
    rotation: random(`shape-rot-${i}`) * 360,
    type: Math.floor(random(`shape-type-${i}`) * 3),
    color: [COLORS.pink, COLORS.cyan, COLORS.yellow][Math.floor(random(`shape-color-${i}`) * 3)],
  }));

  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {/* Neon grid floor */}
      <NeonGrid frame={frame} />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${COLORS.black} 0%, transparent 40%, ${COLORS.purple}22 100%)`,
        }}
      />

      {/* Floating Memphis shapes */}
      {shapes.map((shape, i) => {
        const floatY = Math.sin(frame * 0.05 + i) * 15;
        const rotation = shape.rotation + frame * 0.5;
        const shapeOpacity = interpolate(frame, [10 + i * 3, 25 + i * 3], [0, 0.3], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform: `translateY(${floatY}px) rotate(${rotation}deg)`,
              opacity: shapeOpacity,
              border: `3px solid ${shape.color}`,
              borderRadius: shape.type === 0 ? "50%" : shape.type === 1 ? "0" : "0",
              clipPath: shape.type === 2 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            }}
          />
        );
      })}

      {/* Top bar with retro styling */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(90deg, ${COLORS.pink} 0%, ${COLORS.purple} 50%, ${COLORS.cyan} 100%)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: showLine1 ? 1 : 0,
          }}
        >
          SPEAKCODE
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.yellow,
            textShadow: `2px 2px 0 ${COLORS.black}`,
            opacity: showLine1 ? 1 : 0,
          }}
        >
          // A NEW WAY TO BUILD
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingTop: 50,
          textAlign: "center",
        }}
      >
        {/* Line 1 */}
        <GlitchText
          frame={frame}
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 90,
            fontWeight: 900,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: showLine1 ? 1 : 0,
            transform: `scale(${0.8 + line1Scale * 0.2})`,
            textShadow: `
              ${chromaticOffset}px 0 ${COLORS.cyan},
              ${-chromaticOffset}px 0 ${COLORS.pink},
              0 0 20px ${COLORS.pink}
            `,
            marginBottom: 10,
          }}
        >
          WHAT IF YOU COULD
        </GlitchText>

        {/* Line 2 */}
        <GlitchText
          frame={frame}
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.cyan,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: showLine2 ? 1 : 0,
            transform: `scale(${0.8 + line2Scale * 0.2})`,
            textShadow: `
              0 0 30px ${COLORS.cyan},
              0 0 60px ${COLORS.cyan}44
            `,
            marginBottom: 10,
          }}
        >
          BUILD SOFTWARE
        </GlitchText>

        {/* Line 3 - Punch line */}
        <GlitchText
          frame={frame}
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 120,
            fontWeight: 900,
            color: COLORS.pink,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            opacity: showLine3 ? 1 : 0,
            transform: `scale(${0.8 + line3Scale * 0.2})`,
            textShadow: `
              0 0 40px ${COLORS.pink},
              0 0 80px ${COLORS.pink}66,
              4px 4px 0 ${COLORS.yellow}
            `,
          }}
        >
          JUST BY DESCRIBING IT?
        </GlitchText>

        {/* Accent bar */}
        <div
          style={{
            width: interpolate(frame, [60, 80], [0, 600], { extrapolateRight: "clamp" }),
            height: 6,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.pink}, ${COLORS.yellow})`,
            marginTop: 40,
            boxShadow: `0 0 20px ${COLORS.pink}`,
          }}
        />

        {/* Subtext */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            color: COLORS.yellow,
            marginTop: 30,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: showAccent ? interpolate(frame - 70, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
            textShadow: `0 0 10px ${COLORS.yellow}`,
          }}
        >
          NO SYNTAX // NO DEBUGGING // NO YEARS OF PRACTICE
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `repeating-linear-gradient(
            90deg,
            ${COLORS.pink} 0px,
            ${COLORS.pink} 30px,
            ${COLORS.cyan} 30px,
            ${COLORS.cyan} 60px,
            ${COLORS.yellow} 60px,
            ${COLORS.yellow} 90px
          )`,
        }}
      />

      {/* VHS Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
