import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/**
 * RetroTestimonialScene - Founder story with 80s achievement board
 * Style: Arcade high score aesthetic, neon stats, retro achievement unlocks
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
};

const achievements = [
  { stat: "100K+", label: "LINES OF CODE", sublabel: "Enterprise AI Platform" },
  { stat: "30K+", label: "USERS SERVED", sublabel: "Across the organization" },
  { stat: "4", label: "PRODUCTION AGENTS", sublabel: "Weeks > Days deployment" },
  { stat: "2 WKS", label: "AHEAD OF SCHEDULE", sublabel: "Fastest UAT approval" },
];

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
        rgba(0, 0, 0, 0.15) 2px,
        rgba(0, 0, 0, 0.15) 4px
      )`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

export const RetroTestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Journey image (0-160)
  const showJourney = frame < 160;
  const journeyOpacity = showJourney
    ? interpolate(frame, [0, 20, 130, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  const journeyScale = interpolate(frame, [0, 30], [0.95, 1], { extrapolateRight: "clamp" });

  // Phase 2: Stats (140+)
  const showStats = frame >= 140;
  const statsOpacity = showStats ? interpolate(frame - 140, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Header animation
  const showTitle = frame >= 5;
  const titleOpacity = showTitle ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Main text animation
  const showMainText = frame >= 15;
  const mainTextY = showMainText ? spring({ frame: frame - 15, fps, config: { damping: 15 } }) : 0;

  // Animated grid
  const gridOffset = frame * 0.5;

  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, ${COLORS.purple}15 1px, transparent 1px),
            linear-gradient(0deg, ${COLORS.purple}15 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: `${gridOffset}px 0`,
        }}
      />

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.cyan})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: titleOpacity,
          }}
        >
          {"<< MY STORY >>"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 32,
            color: COLORS.yellow,
            textShadow: `3px 3px 0 ${COLORS.black}`,
            opacity: titleOpacity,
          }}
        >
          ZERO TO LEAD ENGINEER
        </div>
      </div>

      {/* Phase 1: Journey image */}
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
          {/* CRT monitor frame */}
          <div
            style={{
              padding: 20,
              background: `linear-gradient(135deg, #444 0%, #222 100%)`,
              borderRadius: 24,
              border: `5px solid ${COLORS.cyan}`,
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.5),
                0 0 50px ${COLORS.cyan}44,
                inset 0 0 30px rgba(0,0,0,0.5)
              `,
            }}
          >
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `3px solid ${COLORS.pink}`,
              }}
            >
              <Img
                src={staticFile("founder-journey-warm.png")}
                style={{
                  width: 900,
                  height: "auto",
                  filter: "saturate(1.3) hue-rotate(320deg)",
                }}
              />
            </div>
          </div>

          {/* Overlay text */}
          <div
            style={{
              position: "absolute",
              bottom: -70,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Courier New', monospace",
              fontSize: 28,
              color: COLORS.yellow,
              textAlign: "center",
              opacity: mainTextY,
              textShadow: `0 0 15px ${COLORS.yellow}`,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            {">> NO CS DEGREE // NO SWE EXPERIENCE // JUST AGENTIC CODING <<"}
          </div>
        </div>
      </div>

      {/* Phase 2: Achievement stats - arcade high score style */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          bottom: 90,
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
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 52,
            color: "#fff",
            textAlign: "center",
            marginBottom: 50,
            lineHeight: 1.2,
            textShadow: `4px 4px 0 ${COLORS.purple}`,
          }}
        >
          BECAME{" "}
          <span
            style={{
              color: COLORS.pink,
              textShadow: `0 0 30px ${COLORS.pink}, 4px 4px 0 ${COLORS.cyan}`,
            }}
          >
            APP LEAD
          </span>{" "}
          ON AN ENTERPRISE AI PLATFORM
        </div>

        {/* Stats grid - arcade style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 25,
            width: "100%",
            maxWidth: 1500,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 170 + i * 15;
            const itemOpacity =
              frame >= itemDelay
                ? interpolate(frame - itemDelay, [0, 12], [0, 1], { extrapolateRight: "clamp" })
                : 0;
            const itemScale =
              frame >= itemDelay
                ? spring({ frame: frame - itemDelay, fps, config: { damping: 12 } })
                : 0;

            return (
              <div
                key={i}
                style={{
                  background: `linear-gradient(180deg, ${COLORS.purple}33, ${COLORS.black})`,
                  borderRadius: 12,
                  padding: "30px 20px",
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${0.85 + itemScale * 0.15})`,
                  border: `4px solid ${COLORS.cyan}`,
                  boxShadow: `
                    0 0 30px ${COLORS.cyan}33,
                    inset 0 0 30px ${COLORS.purple}22
                  `,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Impact', sans-serif",
                    fontSize: 54,
                    fontWeight: 900,
                    color: COLORS.pink,
                    marginBottom: 8,
                    textShadow: `
                      0 0 20px ${COLORS.pink},
                      3px 3px 0 ${COLORS.yellow}
                    `,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Impact', sans-serif",
                    fontSize: 22,
                    color: "#fff",
                    marginBottom: 6,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 12,
                    color: COLORS.yellow,
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
            marginTop: 40,
            fontFamily: "'Courier New', monospace",
            fontSize: 20,
            color: COLORS.cyan,
            textAlign: "center",
            opacity:
              frame >= 250
                ? interpolate(frame - 250, [0, 15], [0, 1], { extrapolateRight: "clamp" })
                : 0,
            textShadow: `0 0 15px ${COLORS.cyan}`,
            letterSpacing: "0.1em",
          }}
        >
          {">>> SOLO REBUILT MOBILE APP // LED EXECUTIVE DEMOS // SHIPPED 2 WEEKS EARLY <<<"}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.cyan})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 28,
            color: COLORS.black,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          THESE ARE THE EXACT SKILLS I TEACH INSIDE SPEAKCODE
        </div>
      </div>

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
