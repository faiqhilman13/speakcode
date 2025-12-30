import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * NEURAL INTERFACE WHAT YOU'LL LEARN SCENE
 * "Inside SpeakCode: prompt engineering, agentic workflows, real projects"
 *
 * Aesthetic: Clean skill modules interface - like a curriculum dashboard
 */

// SVG Icons (larger)
const PromptIcon = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="22" height="18" rx="2" />
    <path d="M7 11l3 3-3 3" />
    <path d="M13 17h8" />
  </svg>
);

const AgentIcon = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="14" cy="8" r="4" />
    <path d="M8 24v-4a6 6 0 0 1 12 0v4" />
    <circle cx="14" cy="8" r="1" fill="currentColor" />
    <path d="M10 14l-3 3M18 14l3 3" />
  </svg>
);

const ShipIcon = () => (
  <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 4v16M14 4l-6 6M14 4l6 6" />
    <path d="M6 24h16" />
    <path d="M8 20l6-6 6 6" fill="currentColor" opacity="0.15" />
  </svg>
);

const skills = [
  {
    name: "Prompt Engineering",
    description: "Master the art of AI communication",
    details: ["Context crafting", "Chain-of-thought", "Output formatting"],
    icon: PromptIcon,
    color: "#00fff2",
  },
  {
    name: "Agentic Workflows",
    description: "Build autonomous AI systems",
    details: ["Multi-step agents", "Tool orchestration", "Feedback loops"],
    icon: AgentIcon,
    color: "#ff0080",
  },
  {
    name: "Ship Real Projects",
    description: "From idea to deployed product",
    details: ["Full-stack apps", "Production pipelines", "Live deployment"],
    icon: ShipIcon,
    color: "#00ff88",
  },
];

export const CyberWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const showHeader = frame >= 5;
  const headerOpacity = showHeader
    ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Subtle pulse
  const glowPulse = 0.4 + Math.sin(frame * 0.08) * 0.1;

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,242,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,242,0.015) 1px, transparent 1px)
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
          background: "linear-gradient(180deg, rgba(0,255,242,0.05), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 18,
            color: "#00fff2",
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
              background: "#00fff2",
              boxShadow: "0 0 10px #00fff2",
            }}
          />
          CURRICULUM.MODULES
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            opacity: headerOpacity,
          }}
        >
          3 CORE SKILLS
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "100px 60px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 68,
            fontWeight: 600,
            color: "#e8e8e8",
            textAlign: "center",
            opacity: headerOpacity,
            textShadow: `0 0 40px rgba(0,255,242,${glowPulse * 0.3})`,
            marginBottom: 70,
          }}
        >
          Inside <span style={{ color: "#00fff2" }}>SpeakCode</span>
        </div>

        {/* Skills grid */}
        <div style={{ display: "flex", gap: 40, width: "100%", maxWidth: 1400, justifyContent: "center" }}>
          {skills.map((skill, i) => {
            const delay = 20 + i * 18;
            const show = frame >= delay;
            const opacity = show
              ? interpolate(frame - delay, [0, 15], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const scale = show
              ? spring({ frame: frame - delay, fps, config: { damping: 18 } })
              : 0;

            const Icon = skill.icon;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${skill.color}30`,
                  padding: "40px 35px",
                  opacity,
                  transform: `scale(${0.92 + scale * 0.08})`,
                }}
              >
                {/* Icon and title */}
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      background: `${skill.color}12`,
                      border: `1px solid ${skill.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: skill.color,
                    }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                        fontSize: 14,
                        color: skill.color,
                        letterSpacing: "0.1em",
                        marginBottom: 6,
                      }}
                    >
                      MODULE {i + 1}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#e8e8e8",
                      }}
                    >
                      {skill.name}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                    fontSize: 18,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 28,
                    lineHeight: 1.5,
                  }}
                >
                  {skill.description}
                </div>

                {/* Details list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {skill.details.map((detail, j) => {
                    const detailDelay = delay + 25 + j * 8;
                    const detailOpacity = frame >= detailDelay
                      ? interpolate(frame - detailDelay, [0, 8], [0, 1], { extrapolateRight: "clamp" })
                      : 0;

                    return (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          opacity: detailOpacity,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            background: skill.color,
                            boxShadow: `0 0 8px ${skill.color}`,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                            fontSize: 16,
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {detail}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status */}
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 22,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    STATUS
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                      fontSize: 15,
                      color: "#00ff88",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: "#00ff88",
                        boxShadow: "0 0 8px #00ff88",
                      }}
                    />
                    INCLUDED
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "linear-gradient(0deg, rgba(0,255,242,0.03), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 18,
            color: "rgba(0,255,242,0.5)",
            letterSpacing: "0.2em",
            opacity: frame > 90 ? interpolate(frame - 90, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          ALL SKILLS INCLUDED IN COURSE
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 25, left: 25, width: 40, height: 40, borderTop: "2px solid rgba(0,255,242,0.4)", borderLeft: "2px solid rgba(0,255,242,0.4)" }} />
      <div style={{ position: "absolute", top: 25, right: 25, width: 40, height: 40, borderTop: "2px solid rgba(0,255,242,0.4)", borderRight: "2px solid rgba(0,255,242,0.4)" }} />
      <div style={{ position: "absolute", bottom: 25, left: 25, width: 40, height: 40, borderBottom: "2px solid rgba(255,0,128,0.4)", borderLeft: "2px solid rgba(255,0,128,0.4)" }} />
      <div style={{ position: "absolute", bottom: 25, right: 25, width: 40, height: 40, borderBottom: "2px solid rgba(255,0,128,0.4)", borderRight: "2px solid rgba(255,0,128,0.4)" }} />
    </AbsoluteFill>
  );
};
