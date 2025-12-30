import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Shift Scene: The dramatic pivot moment
 * Style: Bold contrast, geometric transformation
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

export const MinimalistShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash transition from black
  const blackOverlay = interpolate(frame, [0, 5, 12, 18], [1, 1, 0, 0], { extrapolateRight: "clamp" });

  // Background color shift
  const bgProgress = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });

  // Text animations
  const showLine1 = frame >= 25;
  const showLine2 = frame >= 45;

  const line1Scale = showLine1 ? spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 100 } }) : 0;
  const line2Scale = showLine2 ? spring({ frame: frame - 45, fps, config: { damping: 15, stiffness: 100 } }) : 0;

  // Geometric shapes animation
  const showShapes = frame >= 20;
  const shapeRotation = interpolate(frame, [20, 90], [0, 45], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #FFFFFF ${(1 - bgProgress) * 100}%, #0A0A0A ${100 - bgProgress * 50}%)`,
      }}
    >
      {/* Animated geometric shapes */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${shapeRotation}deg)`,
          opacity: showShapes ? interpolate(frame - 20, [0, 15], [0, 0.1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800">
          <rect
            x="200"
            y="200"
            width="400"
            height="400"
            fill="none"
            stroke="#0066FF"
            strokeWidth="2"
          />
          <circle
            cx="400"
            cy="400"
            r="280"
            fill="none"
            stroke="#0066FF"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "90%",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 72,
            fontWeight: 300,
            color: bgProgress > 0.5 ? "#FFFFFF" : "#0A0A0A",
            letterSpacing: "-0.02em",
            opacity: showLine1 ? 1 : 0,
            transform: `scale(${0.9 + line1Scale * 0.1})`,
            transition: "color 0.3s ease",
          }}
        >
          Then AI happened.
        </div>

        {/* Line 2 - the punch */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 108,
            fontWeight: 600,
            color: "#0066FF",
            letterSpacing: "-0.03em",
            marginTop: 24,
            opacity: showLine2 ? 1 : 0,
            transform: `scale(${0.9 + line2Scale * 0.1})`,
          }}
        >
          Everything changed.
        </div>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 80,
          height: 80,
          borderLeft: "3px solid #0066FF",
          borderTop: "3px solid #0066FF",
          opacity: showLine2 ? interpolate(frame - 55, [0, 10], [0, 0.8], { extrapolateRight: "clamp" }) : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 80,
          height: 80,
          borderRight: "3px solid #0066FF",
          borderBottom: "3px solid #0066FF",
          opacity: showLine2 ? interpolate(frame - 55, [0, 10], [0, 0.8], { extrapolateRight: "clamp" }) : 0,
        }}
      />

      {/* Horizontal accent lines */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 60,
          width: interpolate(frame, [50, 70], [0, 120], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          height: 2,
          background: "#0066FF",
          transform: "translateY(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 60,
          width: interpolate(frame, [50, 70], [0, 120], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          height: 2,
          background: "#0066FF",
          transform: "translateY(-50%)",
        }}
      />

      {/* Black flash overlay */}
      <AbsoluteFill
        style={{
          background: "#0A0A0A",
          opacity: blackOverlay,
        }}
      />
    </AbsoluteFill>
  );
};
