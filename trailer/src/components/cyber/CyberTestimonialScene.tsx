import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * NEURAL INTERFACE FOUNDER STORY SCENE
 * Personal journey: Zero experience → App Lead on enterprise AI platform
 *
 * Aesthetic: Clean metrics dashboard - achievement visualization
 */

// SVG Icons (larger)
const CodeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const UsersIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="19" cy="8" r="3" />
    <path d="M21 21v-2a3 3 0 0 0-3-3h-1" />
  </svg>
);

const BotIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <circle cx="9" cy="14" r="2" />
    <circle cx="15" cy="14" r="2" />
    <path d="M12 2v4M8 4h8" />
  </svg>
);

const RocketIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const achievements = [
  { stat: "100K+", label: "Lines of Code", sub: "Enterprise AI Platform", icon: CodeIcon, color: "#00fff2" },
  { stat: "30K+", label: "Users Served", sub: "Organization-wide", icon: UsersIcon, color: "#ff0080" },
  { stat: "4", label: "Production Agents", sub: "Weeks → Days", icon: BotIcon, color: "#00ff88" },
  { stat: "2 Weeks", label: "Early Delivery", sub: "Fastest UAT", icon: RocketIcon, color: "#ffaa00" },
];

export const CyberTestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Journey image (frames 0-160)
  const showJourney = frame < 160;
  const journeyOpacity = showJourney
    ? interpolate(frame, [0, 20, 130, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  // Phase 2: Achievement stats (frames 140+)
  const showStats = frame >= 140;
  const statsOpacity = showStats
    ? interpolate(frame - 140, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Header animation
  const showHeader = frame >= 5;
  const headerOpacity = showHeader
    ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Subtle pulse
  const glowPulse = 0.4 + Math.sin(frame * 0.1) * 0.1;

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,0,128,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,128,0.01) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(180deg, rgba(255,0,128,0.05), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 18,
            color: "#ff0080",
            letterSpacing: "0.15em",
            opacity: headerOpacity,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              background: "#ff0080",
              boxShadow: "0 0 10px #ff0080",
            }}
          />
          FOUNDER.CREDENTIALS
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            opacity: headerOpacity,
          }}
        >
          VERIFIED
        </div>
      </div>

      {/* Phase 1: Journey visualization */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: journeyOpacity,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -15,
              border: "1px solid rgba(0,255,242,0.3)",
            }}
          />
          <Img
            src={staticFile("founder-journey.png")}
            style={{
              width: 850,
              height: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          />

          {/* Caption */}
          <div
            style={{
              position: "absolute",
              bottom: -70,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
              fontSize: 34,
              color: "#e8e8e8",
              textAlign: "center",
              textShadow: `0 0 30px rgba(0,255,242,${glowPulse * 0.4})`,
              whiteSpace: "nowrap",
            }}
          >
            No CS degree. No SWE background. Just{" "}
            <span style={{ color: "#00fff2" }}>agentic coding</span>.
          </div>
        </div>
      </div>

      {/* Phase 2: Achievement stats */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          bottom: 0,
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
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 58,
            fontWeight: 600,
            color: "#e8e8e8",
            textAlign: "center",
            marginBottom: 60,
            textShadow: `0 0 40px rgba(0,255,242,${glowPulse * 0.3})`,
          }}
        >
          Became <span style={{ color: "#ff0080" }}>App Lead</span> on Enterprise AI Platform
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 30,
            width: "100%",
            maxWidth: 1500,
          }}
        >
          {achievements.map((item, i) => {
            const itemDelay = 170 + i * 12;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 12], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const itemScale = frame >= itemDelay
              ? spring({ frame: frame - itemDelay, fps, config: { damping: 15 } })
              : 0;

            const Icon = item.icon;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${item.color}30`,
                  padding: "36px 30px",
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${0.92 + itemScale * 0.08})`,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 22px",
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  <Icon />
                </div>

                {/* Stat */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                    fontSize: 54,
                    fontWeight: 700,
                    color: item.color,
                    textShadow: `0 0 25px ${item.color}60`,
                    marginBottom: 10,
                  }}
                >
                  {item.stat}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                    fontSize: 20,
                    color: "#e8e8e8",
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </div>

                {/* Sub */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 50,
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
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
          height: 70,
          background: "linear-gradient(90deg, #ff0080, #00fff2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 20,
            fontWeight: 600,
            color: "#0a0a0f",
            letterSpacing: "0.15em",
            opacity: frame >= 20 ? 1 : 0,
          }}
        >
          THESE ARE THE EXACT SKILLS I TEACH INSIDE SPEAKCODE
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 25, left: 25, width: 40, height: 40, borderTop: "2px solid rgba(255,0,128,0.4)", borderLeft: "2px solid rgba(255,0,128,0.4)" }} />
      <div style={{ position: "absolute", top: 25, right: 25, width: 40, height: 40, borderTop: "2px solid rgba(255,0,128,0.4)", borderRight: "2px solid rgba(255,0,128,0.4)" }} />
    </AbsoluteFill>
  );
};
