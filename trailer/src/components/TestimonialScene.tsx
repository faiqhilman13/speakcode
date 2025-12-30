import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Founder Story Scene: Personal journey from zero to lead engineer
 * Layout: Split visual with achievement highlights
 */

const achievements = [
  { stat: "100K+", label: "Lines of Code", sublabel: "Enterprise AI Platform" },
  { stat: "30K+", label: "Users Served", sublabel: "Across the organization" },
  { stat: "4", label: "Production Agents", sublabel: "Weeks → Days deployment" },
  { stat: "2 Weeks", label: "Ahead of Schedule", sublabel: "Fastest UAT approval" },
];

export const TestimonialScene: React.FC = () => {
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

  // Header animation
  const showTitle = frame >= 5;
  const titleOpacity = showTitle ? interpolate(frame - 5, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Main text animation
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
          height: 100,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
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
            fontSize: 28,
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
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: journeyOpacity,
          transform: `scale(${journeyScale})`,
        }}
      >
        <div style={{ position: "relative" }}>
          <Img
            src={staticFile("founder-journey-warm.png")}
            style={{
              width: 1000,
              height: "auto",
              borderRadius: 16,
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            }}
          />

          {/* Overlay text */}
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Georgia, serif",
              fontSize: 36,
              fontStyle: "italic",
              color: "#FDF6E3",
              textAlign: "center",
              opacity: mainTextY,
            }}
          >
            No CS degree. No SWE experience. Just agentic coding.
          </div>
        </div>
      </div>

      {/* Phase 2: Achievement stats grid */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 60px",
          opacity: statsOpacity,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 50,
            lineHeight: 1.2,
          }}
        >
          Became <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>App Lead</span> on an Enterprise AI Platform
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 30,
            width: "100%",
            maxWidth: 1400,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 170 + i * 15;
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
                  background: "rgba(253,246,227,0.05)",
                  borderRadius: 16,
                  padding: "35px 25px",
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${0.9 + itemScale * 0.1})`,
                  border: "1px solid rgba(253,246,227,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 56,
                    fontWeight: 400,
                    color: "#FF5E5B",
                    marginBottom: 8,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 24,
                    color: "#FDF6E3",
                    marginBottom: 6,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 14,
                    color: "rgba(253,246,227,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 45,
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            color: "rgba(253,246,227,0.6)",
            textAlign: "center",
            opacity: frame >= 250 ? interpolate(frame - 250, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          Solo rebuilt mobile app • Led executive demos • Shipped 2 weeks early
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 26,
            fontStyle: "italic",
            color: "#FDF6E3",
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          These are the exact skills I teach inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
