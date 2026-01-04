import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical Hook Scene: Big, bold question optimized for 1080x1920 (9:16)
 * Layout: Stacked vertically, larger fonts for mobile viewing
 */

export const VerticalHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLine1 = frame >= 5;
  const showLine2 = frame >= 18;
  const showLine3 = frame >= 35;
  const showAccent = frame >= 55;

  const line1Y = showLine1 ? spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 200 } }) : 0;
  const line2Y = showLine2 ? spring({ frame: frame - 18, fps, config: { damping: 20, stiffness: 200 } }) : 0;
  const line3Y = showLine3 ? spring({ frame: frame - 35, fps, config: { damping: 18, stiffness: 180 } }) : 0;

  const accentWidth = showAccent
    ? interpolate(frame - 55, [0, 12], [0, 450], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar - taller for vertical */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 150,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 28,
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
            fontSize: 34,
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
          top: 120,
          right: 30,
          fontSize: 500,
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
          top: 150,
          bottom: 150,
          width: 10,
          background: "#FF5E5B",
          opacity: showLine1 ? 1 : 0,
        }}
      />

      {/* Main text block - centered vertically with more space */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        paddingLeft: 50,
        paddingTop: 100,
        paddingRight: 40,
      }}>
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 95,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            opacity: showLine1 ? 1 : 0,
            transform: `translateY(${(1 - line1Y) * -30}px)`,
          }}
        >
          What if you could
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 95,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginTop: 15,
            opacity: showLine2 ? 1 : 0,
            transform: `translateY(${(1 - line2Y) * -30}px)`,
          }}
        >
          build software
        </div>

        {/* Line 3 - the punch */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 105,
            fontWeight: 400,
            fontStyle: "italic",
            color: "#FF5E5B",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginTop: 20,
            opacity: showLine3 ? 1 : 0,
            transform: `translateY(${(1 - line3Y) * -30}px)`,
          }}
        >
          just by describing it?
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: accentWidth,
            height: 6,
            background: "#1a1a1a",
            marginTop: 40,
          }}
        />

        {/* Descriptor text */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
            color: "rgba(26,26,26,0.5)",
            marginTop: 30,
            letterSpacing: "0.05em",
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
          bottom: 40,
          right: 35,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: showAccent ? 1 : 0,
        }}
      >
        <div style={{ width: 55, height: 4, background: "#FF5E5B" }} />
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 15,
          color: "rgba(26,26,26,0.4)",
          letterSpacing: "0.1em",
        }}>
          SPEAKCODE
        </div>
      </div>
    </AbsoluteFill>
  );
};
