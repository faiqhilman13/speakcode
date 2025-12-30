import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass Testimonial Scene: Founder journey with achievement stats
 * Style: Layered glass cards, gradient highlights, premium feel
 */

const achievements = [
  { stat: "100K+", label: "Lines of Code", sublabel: "Enterprise AI Platform", color: "#8B5CF6" },
  { stat: "30K+", label: "Users Served", sublabel: "Across the organization", color: "#EC4899" },
  { stat: "4", label: "Production Agents", sublabel: "Weeks to Days deployment", color: "#3B82F6" },
  { stat: "2 Weeks", label: "Ahead of Schedule", sublabel: "Fastest UAT approval", color: "#10B981" },
];

// Floating particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  x: random(`test-x-${i}`) * 1920,
  y: random(`test-y-${i}`) * 1080,
  size: 2 + random(`test-size-${i}`) * 5,
  speed: 0.2 + random(`test-speed-${i}`) * 0.4,
}));

export const GlassTestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Journey image (frames 0-160)
  const showJourney = frame < 160;
  const journeyOpacity = showJourney
    ? interpolate(frame, [0, 25, 130, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  const journeyScale = interpolate(frame, [0, 35], [0.95, 1], { extrapolateRight: "clamp" });

  // Phase 2: Achievement stats (frames 140+)
  const showStats = frame >= 140;
  const statsOpacity = showStats ? interpolate(frame - 140, [0, 25], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Header animation
  const showTitle = frame >= 5;
  const titleOpacity = showTitle ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Main text animation
  const showMainText = frame >= 18;
  const mainTextY = showMainText ? spring({ frame: frame - 18, fps, config: { damping: 15 } }) : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0815 0%, #0f0a1a 50%, #0a0815 100%)",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.1)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.08)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: ((frame * p.speed * 0.3) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
      ))}

      {/* Glass header */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          right: 40,
          height: 80,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 10,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          My Story
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 24,
            fontWeight: 300,
            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Zero to Lead Engineer
        </div>
      </div>

      {/* Phase 1: Journey visualization */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          bottom: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: journeyOpacity,
          transform: `scale(${journeyScale})`,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Glass frame around image */}
          <div
            style={{
              padding: 14,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 28,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4), 0 0 60px rgba(139, 92, 246, 0.1)",
            }}
          >
            <Img
              src={staticFile("founder-journey-warm.png")}
              style={{
                width: 900,
                height: "auto",
                borderRadius: 18,
                display: "block",
              }}
            />
          </div>

          {/* Overlay text in glass panel */}
          <div
            style={{
              position: "absolute",
              bottom: -70,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: mainTextY,
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "18px 40px",
                borderRadius: 30,
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                  fontSize: 28,
                  fontWeight: 300,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                No CS degree. No SWE experience.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 500,
                  }}
                >
                  Just agentic coding.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 2: Achievement stats */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          bottom: 100,
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
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 48,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.95)",
            textAlign: "center",
            marginBottom: 50,
            lineHeight: 1.2,
          }}
        >
          Became{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 500,
            }}
          >
            App Lead
          </span>{" "}
          on an Enterprise AI Platform
        </div>

        {/* Stats grid with glass cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 1400,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 165 + i * 15;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 15], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const itemScale = frame >= itemDelay
              ? spring({ frame: frame - itemDelay, fps, config: { damping: 14 } })
              : 0;

            // Subtle float
            const floatY = Math.sin((frame * 0.03) + i * 0.7) * 4;

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `scale(${0.9 + itemScale * 0.1}) translateY(${floatY}px)`,
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    borderRadius: 20,
                    padding: "35px 25px",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderTop: `3px solid ${item.color}`,
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px ${item.color}10`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      fontSize: 48,
                      fontWeight: 600,
                      color: item.color,
                      marginBottom: 8,
                    }}
                  >
                    {item.stat}
                  </div>
                  <div
                    style={{
                      fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                      fontSize: 20,
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.9)",
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 40,
            opacity: frame >= 245 ? interpolate(frame - 245, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "14px 30px",
              borderRadius: 25,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Solo rebuilt mobile app . Led executive demos . Shipped 2 weeks early
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 24,
            fontWeight: 400,
            color: "#fff",
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          These are the exact skills I teach inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
