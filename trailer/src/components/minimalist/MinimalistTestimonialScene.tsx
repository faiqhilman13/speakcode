import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Testimonial/Founder Scene: Personal journey
 * Style: Clean stats grid, geometric achievement visualization
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

const achievements = [
  { stat: "100K+", label: "Lines of Code", sublabel: "Enterprise AI Platform" },
  { stat: "30K+", label: "Users Served", sublabel: "Across the organization" },
  { stat: "4", label: "Production Agents", sublabel: "Weeks to Days deployment" },
  { stat: "2 Weeks", label: "Ahead of Schedule", sublabel: "Fastest UAT approval" },
];

export const MinimalistTestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Journey intro (frames 0-160)
  const showJourney = frame < 160;
  const journeyOpacity = showJourney
    ? interpolate(frame, [0, 20, 130, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  // Phase 2: Stats grid (frames 140+)
  const showStats = frame >= 140;
  const statsOpacity = showStats
    ? interpolate(frame - 140, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const showHeader = frame >= 5;
  const headerOpacity = showHeader
    ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Main text animation
  const showMainText = frame >= 20;
  const mainTextY = showMainText ? spring({ frame: frame - 20, fps, config: { damping: 18 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#0A0A0A" }}>
      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(10,10,10,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: headerOpacity,
          }}
        >
          My Story
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 500,
            color: "#0066FF",
            opacity: headerOpacity,
          }}
        >
          Zero to Lead Engineer
        </div>
      </div>

      {/* Phase 1: Journey visualization */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: journeyOpacity,
        }}
      >
        {/* Geometric journey representation */}
        <div
          style={{
            width: 600,
            height: 300,
            position: "relative",
            marginBottom: 60,
          }}
        >
          {/* Path line */}
          <svg
            width="600"
            height="300"
            viewBox="0 0 600 300"
            style={{ position: "absolute", inset: 0 }}
          >
            <path
              d="M 50 250 C 150 250, 200 100, 300 150 C 400 200, 450 50, 550 50"
              fill="none"
              stroke="#0066FF"
              strokeWidth="3"
              strokeDasharray={interpolate(frame, [30, 100], [0, 600], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}
              strokeDashoffset="0"
            />
            {/* Start point */}
            <circle cx="50" cy="250" r="12" fill="#FFFFFF" />
            {/* End point */}
            <circle
              cx="550"
              cy="50"
              r="16"
              fill="#0066FF"
              opacity={frame >= 100 ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0}
            />
          </svg>

          {/* Labels */}
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 0,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            No CS degree
          </div>
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 0,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#0066FF",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              opacity: frame >= 100 ? 1 : 0,
            }}
          >
            App Lead
          </div>
        </div>

        {/* Main text */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 32,
            fontWeight: 300,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            opacity: mainTextY,
            transform: `translateY(${(1 - mainTextY) * 20}px)`,
          }}
        >
          No CS degree. No SWE experience.{" "}
          <span style={{ color: "#0066FF", fontWeight: 500 }}>Just agentic coding.</span>
        </div>
      </div>

      {/* Phase 2: Achievement stats grid */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 80px",
          opacity: statsOpacity,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 42,
            fontWeight: 300,
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          Became{" "}
          <span style={{ color: "#0066FF", fontWeight: 600 }}>App Lead</span> on an Enterprise AI Platform
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 165 + i * 12;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 10], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const itemScale = frame >= itemDelay
              ? spring({ frame: frame - itemDelay, fps, config: { damping: 15 } })
              : 0;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  padding: "32px 24px",
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${0.95 + itemScale * 0.05})`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 48,
                    fontWeight: 600,
                    color: "#0066FF",
                    marginBottom: 8,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: 4,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.4)",
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
            marginTop: 50,
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            opacity: frame >= 240 ? interpolate(frame - 240, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          Solo rebuilt mobile app . Led executive demos . Shipped 2 weeks early
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#0066FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: "#FFFFFF",
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          These are the exact skills I teach inside{" "}
          <span style={{ fontWeight: 600 }}>SpeakCode.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
