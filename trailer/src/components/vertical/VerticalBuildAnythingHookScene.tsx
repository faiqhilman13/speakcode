import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical Hook Scene: "What if you could build anything?" (MOBILE)
 *
 * LITERAL mobile adaptation of BuildAnythingHookScene:
 * - Same content and animations
 * - Stacked vertical layout instead of side-by-side
 * - Larger fonts for mobile readability
 * - 9:16 portrait format (1080x1920)
 */

export const VerticalBuildAnythingHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered timing for word reveals (2 seconds = 60 frames)
  const showWhat = frame >= 2;
  const showIf = frame >= 5;
  const showYou = frame >= 8;
  const showCould = frame >= 11;
  const showBuild = frame >= 18;
  const showAnything = frame >= 28;
  const showFinalAnything = frame >= 40;
  const showAccents = frame >= 45;

  // Spring configs
  const wordSpring = (startFrame: number) =>
    frame >= startFrame ? spring({ frame: frame - startFrame, fps, config: { damping: 18, stiffness: 350 } }) : 0;

  const buildSpring = wordSpring(18);
  const anythingSpring = wordSpring(28);
  const finalAnythingSpring = wordSpring(40);

  // Geometric accent animations
  const verticalBarHeight = showAccents
    ? interpolate(frame - 45, [0, 10], [0, 500], { extrapolateRight: "clamp" })
    : 0;
  const horizontalBarWidth = showAccents
    ? interpolate(frame - 47, [0, 8], [0, 400], { extrapolateRight: "clamp" })
    : 0;

  // Background pattern subtle animation
  const patternOffset = frame * 0.3;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3", overflow: "hidden" }}>
      {/* Animated diagonal lines background pattern */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          opacity: 0.015,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #1a1a1a 0px,
            #1a1a1a 2px,
            transparent 2px,
            transparent 80px
          )`,
          transform: `translateX(${patternOffset}px)`,
        }}
      />

      {/* Large decorative "?" bleeding off top-right */}
      <div
        style={{
          position: "absolute",
          top: -150,
          right: -100,
          fontSize: 900,
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          color: "rgba(26,26,26,0.025)",
          lineHeight: 0.75,
          opacity: showAnything ? 1 : 0,
          transform: `scale(${0.9 + anythingSpring * 0.1})`,
        }}
      >
        ?
      </div>

      {/* Top header bar - GREATLY ENLARGED */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 130, // MUCH TALLER - 90 → 130
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 70px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            opacity: showWhat ? 1 : 0,
          }}
        >
          <div
            style={{
              width: 12, // LARGER - 8 → 12
              height: 12,
              background: "#FF5E5B",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 28, // MUCH BIGGER - 16 → 28
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(253,246,227,0.6)",
            }}
          >
            AgenticDojo
          </div>
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 40, // MUCH BIGGER - 22 → 40
            fontStyle: "italic",
            color: "rgba(253,246,227,0.5)",
          }}
        >
          Build anything you can imagine
        </div>
      </div>

      {/* Main content area - stacked vertically for mobile */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Staggered word reveals - MOBILE VERSION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          {/* "what if you could" */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 120,
              fontWeight: 400,
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ opacity: showWhat ? 1 : 0, transform: `scale(${0.9 + wordSpring(2) * 0.1})`, display: "inline-block" }}>what</span>
            {" "}
            <span style={{ opacity: showIf ? 1 : 0, transform: `scale(${0.9 + wordSpring(5) * 0.1})`, display: "inline-block" }}>if</span>
            {" "}
            <span style={{ opacity: showYou ? 1 : 0, transform: `scale(${0.9 + wordSpring(8) * 0.1})`, display: "inline-block" }}>you</span>
            {" "}
            <span style={{ opacity: showCould ? 1 : 0, transform: `scale(${0.9 + wordSpring(11) * 0.1})`, display: "inline-block" }}>could</span>
          </div>

          {/* "build anything?" */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 120,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#FF5E5B",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              transform: `scale(${0.85 + buildSpring * 0.15})`,
            }}
          >
            <span style={{ opacity: showBuild ? 1 : 0, transform: `scale(${0.9 + wordSpring(18) * 0.1})`, display: "inline-block" }}>build</span>
            {" "}
            <span style={{ opacity: showAnything ? 1 : 0, transform: `scale(${0.9 + wordSpring(28) * 0.1})`, display: "inline-block" }}>anything</span>
          </div>
        </div>
      </div>

      {/* Geometric accents - animated */}
      {showAccents && (
        <>
          {/* Vertical bar */}
          <div
            style={{
              position: "absolute",
              left: 50,
              bottom: 150,
              width: 6,
              height: verticalBarHeight,
              background: "linear-gradient(180deg, transparent 0%, rgba(255,94,91,0.4) 50%, rgba(255,94,91,0.8) 100%)",
              borderRadius: 3,
            }}
          />

          {/* Horizontal bar */}
          <div
            style={{
              position: "absolute",
              bottom: 150,
              left: 50,
              width: horizontalBarWidth,
              height: 6,
              background: "rgba(255,94,91,0.8)",
              borderRadius: 3,
            }}
          />

          {/* Corner brackets */}
          <div
            style={{
              position: "absolute",
              bottom: 140,
              right: 50,
              width: 60,
              height: 60,
              borderRight: "4px solid rgba(255,94,91,0.3)",
              borderBottom: "4px solid rgba(255,94,91,0.3)",
            }}
          />
        </>
      )}

      {/* Floating decorative elements */}
      {[
        { x: 100, y: 400, size: 40, rotation: 0 },
        { x: 900, y: 500, size: 30, rotation: 45 },
        { x: 200, y: 1200, size: 25, rotation: -30 },
      ].map((shape, i) => {
        const shapeOpacity = interpolate(frame, [20 + i * 10, 40 + i * 10], [0, 0.08], { extrapolateRight: "clamp" });
        const shapeRotation = shape.rotation + Math.sin((frame + i * 20) * 0.03) * 10;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              border: "2px solid rgba(255,94,91,0.3)",
              borderRadius: i % 2 === 0 ? "50%" : "8px",
              opacity: shapeOpacity,
              transform: `rotate(${shapeRotation}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
