import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Hook Scene: Clean, bold opening question
 * Style: Swiss design, geometric precision, breathing animations
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

export const MinimalistHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered text reveals
  const showLine1 = frame >= 8;
  const showLine2 = frame >= 25;
  const showLine3 = frame >= 42;
  const showAccent = frame >= 65;

  // Smooth spring animations
  const line1Y = showLine1 ? spring({ frame: frame - 8, fps, config: { damping: 25, stiffness: 120 } }) : 0;
  const line2Y = showLine2 ? spring({ frame: frame - 25, fps, config: { damping: 25, stiffness: 120 } }) : 0;
  const line3Y = showLine3 ? spring({ frame: frame - 42, fps, config: { damping: 22, stiffness: 100 } }) : 0;

  // Subtle breathing animation for accent
  const breathe = 1 + Math.sin(frame * 0.05) * 0.02;

  // Accent line width animation
  const accentWidth = showAccent
    ? interpolate(frame - 65, [0, 20], [0, 180], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* Grid overlay - subtle Swiss design element */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Geometric accent - top right */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 120,
          height: 120,
          border: "2px solid #0066FF",
          opacity: showLine1 ? interpolate(frame - 8, [0, 15], [0, 0.4], { extrapolateRight: "clamp" }) : 0,
          transform: `scale(${breathe})`,
        }}
      />

      {/* Small geometric circle - decorative */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#0066FF",
          opacity: showLine2 ? interpolate(frame - 25, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      />

      {/* Main content - centered with Swiss grid alignment */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 84,
            fontWeight: 300,
            color: "#0A0A0A",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            opacity: showLine1 ? 1 : 0,
            transform: `translateY(${(1 - line1Y) * 30}px)`,
          }}
        >
          What if you could
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 84,
            fontWeight: 300,
            color: "#0A0A0A",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            opacity: showLine2 ? 1 : 0,
            transform: `translateY(${(1 - line2Y) * 30}px)`,
          }}
        >
          build software
        </div>

        {/* Line 3 - the punch with blue accent */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 96,
            fontWeight: 500,
            color: "#0066FF",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginTop: 20,
            opacity: showLine3 ? 1 : 0,
            transform: `translateY(${(1 - line3Y) * 30}px)`,
          }}
        >
          just by describing it?
        </div>

        {/* Accent line */}
        <div
          style={{
            width: accentWidth,
            height: 3,
            background: "#0A0A0A",
            marginTop: 50,
          }}
        />

        {/* Subtext */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(10,10,10,0.5)",
            marginTop: 24,
            letterSpacing: "0.02em",
            opacity: showAccent ? interpolate(frame - 75, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          No syntax. No debugging. No years of practice.
        </div>
      </div>

      {/* Bottom left - brand mark */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 120,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: showAccent ? interpolate(frame - 80, [0, 10], [0, 0.6], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "#0066FF",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#0A0A0A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          SpeakCode
        </div>
      </div>
    </AbsoluteFill>
  );
};
