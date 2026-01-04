import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Square Hook Scene: Big, bold question optimized for 1080x1080
 */

export const SquareHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLine1 = frame >= 5;
  const showLine2 = frame >= 18;
  const showLine3 = frame >= 35;
  const showAccent = frame >= 55;

  const line1X = showLine1 ? spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 200 } }) : 0;
  const line2X = showLine2 ? spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 200 } }) : 0;
  const line3X = showLine3 ? spring({ frame: frame - 35, fps, config: { damping: 18, stiffness: 180 } }) : 0;

  const accentWidth = showAccent
    ? interpolate(frame - 55, [0, 12], [0, 400], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 35px",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.7)",
            opacity: showLine1 ? 1 : 0,
          }}
        >
          SpeakCode
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showLine1 ? 1 : 0,
          }}
        >
          A new way to build
        </div>
      </div>

      {/* Large decorative quotation mark */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 15,
          fontSize: 450,
          fontFamily: "Georgia, serif",
          color: "rgba(26,26,26,0.04)",
          lineHeight: 0.8,
        }}
      >
        "
      </div>

      {/* Vertical accent bar on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 130,
          bottom: 60,
          width: 8,
          background: "#FF5E5B",
          opacity: showLine1 ? 1 : 0,
        }}
      />

      {/* Main text block - centered vertically */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        paddingLeft: 45,
        paddingTop: 40,
        paddingRight: 35,
      }}>
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 78,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            opacity: showLine1 ? 1 : 0,
            transform: `translateX(${(1 - line1X) * -30}px)`,
          }}
        >
          What if you could
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 78,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginTop: 5,
            opacity: showLine2 ? 1 : 0,
            transform: `translateX(${(1 - line2X) * -30}px)`,
          }}
        >
          build software
        </div>

        {/* Line 3 - the punch */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 82,
            fontWeight: 400,
            fontStyle: "italic",
            color: "#FF5E5B",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginTop: 10,
            opacity: showLine3 ? 1 : 0,
            transform: `translateX(${(1 - line3X) * -30}px)`,
          }}
        >
          just by describing it?
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: accentWidth,
            height: 5,
            background: "#1a1a1a",
            marginTop: 30,
          }}
        />

        {/* Descriptor text */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            color: "rgba(26,26,26,0.5)",
            marginTop: 20,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: showAccent ? interpolate(frame - 70, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          No syntax. No debugging. No years of practice.
        </div>
      </div>

      {/* Bottom right decorative element */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          right: 25,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: showAccent ? 1 : 0,
        }}
      >
        <div style={{ width: 45, height: 3, background: "#FF5E5B" }} />
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 14,
          color: "rgba(26,26,26,0.4)",
          letterSpacing: "0.1em",
        }}>
          SPEAKCODE
        </div>
      </div>
    </AbsoluteFill>
  );
};
