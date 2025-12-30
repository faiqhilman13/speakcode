import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/**
 * RetroShiftScene - The dramatic AI pivot with maximum 80s impact
 * Style: Neon burst, VHS glitch transition, synthwave explosion
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  black: "#0a0a0f",
};

// Scanlines
const Scanlines: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.2) 2px,
        rgba(0, 0, 0, 0.2) 4px
      )`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

export const RetroShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash transition
  const flashOverlay = interpolate(frame, [0, 5, 12, 18], [1, 1, 0, 0], { extrapolateRight: "clamp" });

  // Image and text timing
  const showImage = frame >= 18;
  const imageOpacity = showImage ? interpolate(frame - 18, [0, 15], [0, 0.4], { extrapolateRight: "clamp" }) : 0;
  const imageScale = showImage ? 1 + interpolate(frame - 18, [0, 90], [0, 0.1], { extrapolateRight: "clamp" }) : 1;

  const showLine1 = frame >= 30;
  const showLine2 = frame >= 50;

  const line1Scale = showLine1 ? spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 80 } }) : 0;
  const line2Scale = showLine2 ? spring({ frame: frame - 50, fps, config: { damping: 10, stiffness: 80 } }) : 0;

  // Chromatic aberration
  const chromatic = Math.sin(frame * 0.15) * 4;

  // Pulsing glow
  const pulseGlow = 1 + Math.sin(frame * 0.2) * 0.3;

  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {/* Background grid with perspective */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "800px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-50%",
            right: "-50%",
            bottom: "-50%",
            background: `
              linear-gradient(90deg, ${COLORS.purple}33 1px, transparent 1px),
              linear-gradient(0deg, ${COLORS.cyan}33 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `rotateX(70deg) translateY(${frame * 3}px)`,
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Radial burst effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1200,
          height: 1200,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.pink}22 0%, transparent 50%)`,
          opacity: pulseGlow * 0.6,
        }}
      />

      {/* Background image */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
        }}
      >
        <Img
          src={staticFile("code-to-product.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "hue-rotate(280deg) saturate(1.5)",
          }}
        />
      </div>

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, ${COLORS.black}ee 80%),
            linear-gradient(180deg, ${COLORS.black}aa 0%, transparent 40%, ${COLORS.black}aa 100%)
          `,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "95%",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 100,
            fontWeight: 900,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: showLine1 ? 1 : 0,
            transform: `scale(${0.8 + line1Scale * 0.2})`,
            textShadow: `
              ${chromatic}px 0 ${COLORS.cyan},
              ${-chromatic}px 0 ${COLORS.pink},
              0 0 30px ${COLORS.purple}
            `,
            marginBottom: 20,
          }}
        >
          THEN AI HAPPENED.
        </div>

        {/* Line 2 - Big impact */}
        <div
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 140,
            fontWeight: 900,
            color: COLORS.pink,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            opacity: showLine2 ? 1 : 0,
            transform: `scale(${0.8 + line2Scale * 0.2})`,
            textShadow: `
              0 0 40px ${COLORS.pink},
              0 0 80px ${COLORS.pink}66,
              5px 5px 0 ${COLORS.cyan},
              -5px -5px 0 ${COLORS.yellow}
            `,
          }}
        >
          EVERYTHING CHANGED.
        </div>

        {/* Decorative underline */}
        <div
          style={{
            width: interpolate(frame, [60, 80], [0, 800], { extrapolateRight: "clamp" }),
            height: 8,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.pink}, ${COLORS.yellow}, ${COLORS.pink}, ${COLORS.cyan})`,
            margin: "40px auto 0",
            boxShadow: `0 0 30px ${COLORS.pink}`,
          }}
        />
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 120,
          height: 120,
          borderLeft: `6px solid ${COLORS.cyan}`,
          borderTop: `6px solid ${COLORS.cyan}`,
          opacity: showLine2 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          boxShadow: `-10px -10px 30px ${COLORS.cyan}44`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 120,
          height: 120,
          borderRight: `6px solid ${COLORS.pink}`,
          borderBottom: `6px solid ${COLORS.pink}`,
          opacity: showLine2 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          boxShadow: `10px 10px 30px ${COLORS.pink}44`,
        }}
      />

      {/* Neon zigzag decorations */}
      <svg
        style={{
          position: "absolute",
          top: 150,
          right: 80,
          width: 150,
          height: 80,
          opacity: showLine1 ? 0.6 : 0,
        }}
      >
        <path
          d="M0,40 L30,10 L60,40 L90,10 L120,40 L150,10"
          stroke={COLORS.yellow}
          strokeWidth="4"
          fill="none"
          style={{ filter: `drop-shadow(0 0 10px ${COLORS.yellow})` }}
        />
      </svg>

      <svg
        style={{
          position: "absolute",
          bottom: 150,
          left: 80,
          width: 150,
          height: 80,
          opacity: showLine1 ? 0.6 : 0,
        }}
      >
        <path
          d="M0,10 L30,40 L60,10 L90,40 L120,10 L150,40"
          stroke={COLORS.cyan}
          strokeWidth="4"
          fill="none"
          style={{ filter: `drop-shadow(0 0 10px ${COLORS.cyan})` }}
        />
      </svg>

      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          background: COLORS.cyan,
          opacity: flashOverlay,
        }}
      />

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
