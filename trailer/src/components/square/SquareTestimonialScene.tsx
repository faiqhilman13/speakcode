import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Square Founder Story Scene: Personal journey - fuller layout
 */

const achievements = [
  { stat: "100K+", label: "Lines of Code" },
  { stat: "30K+", label: "Users Served" },
  { stat: "4", label: "Production Agents" },
  { stat: "2 Weeks", label: "Ahead of Schedule" },
];

export const SquareTestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Journey image (frames 0-160)
  const showJourney = frame < 160;
  const journeyOpacity = showJourney
    ? interpolate(frame, [0, 20, 130, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  const journeyScale = interpolate(frame, [0, 30], [0.95, 1], { extrapolateRight: "clamp" });

  // Phase 2: Achievement stats (frames 140+)
  const showStats = frame >= 140;
  const statsOpacity = showStats ? interpolate(frame - 140, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const showTitle = frame >= 5;
  const titleOpacity = showTitle ? interpolate(frame - 5, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const showMainText = frame >= 15;
  const mainTextY = showMainText ? spring({ frame: frame - 15, fps, config: { damping: 15 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a" }}>
      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 16,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.7)",
            opacity: titleOpacity,
          }}
        >
          My Story
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: titleOpacity,
          }}
        >
          Zero to Lead Engineer
        </div>
      </div>

      {/* Phase 1: Journey visualization */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: journeyOpacity,
          transform: `scale(${journeyScale})`,
        }}
      >
        <Img
          src={staticFile("founder-journey-warm.png")}
          style={{
            width: 650,
            height: "auto",
            borderRadius: 14,
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontFamily: "Georgia, serif",
            fontSize: 26,
            fontStyle: "italic",
            color: "#FDF6E3",
            textAlign: "center",
            opacity: mainTextY,
            padding: "0 40px",
          }}
        >
          No CS degree. No SWE experience. Just agentic coding.
        </div>
      </div>

      {/* Phase 2: Achievement stats */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px 30px",
          opacity: statsOpacity,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 38,
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 35,
            lineHeight: 1.15,
            padding: "0 15px",
          }}
        >
          Became <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>App Lead</span> on an Enterprise AI Platform
        </div>

        {/* Stats grid - 2x2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 18,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 170 + i * 10;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 12], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const itemScale = frame >= itemDelay
              ? spring({ frame: frame - itemDelay, fps, config: { damping: 12 } })
              : 0;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(253,246,227,0.06)",
                  borderRadius: 14,
                  padding: "28px 20px",
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${0.9 + itemScale * 0.1})`,
                  border: "1px solid rgba(253,246,227,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 44,
                    fontWeight: 400,
                    color: "#FF5E5B",
                    marginBottom: 6,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 18,
                    color: "#FDF6E3",
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 30,
            fontFamily: "'SF Mono', monospace",
            fontSize: 15,
            color: "rgba(253,246,227,0.6)",
            textAlign: "center",
            opacity: frame >= 250 ? interpolate(frame - 250, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          Solo rebuilt mobile app • Shipped 2 weeks early
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 18,
            fontStyle: "italic",
            color: "#FDF6E3",
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          The exact skills I teach inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
