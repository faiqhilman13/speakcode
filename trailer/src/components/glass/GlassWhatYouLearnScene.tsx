import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from "remotion";

/*
 * Glass What You Learn Scene: Course curriculum with floating glass cards
 * Style: Staggered glass modules, gradient accents, depth layers
 */

const modules = [
  { num: "01", title: "The AI Mental Model", desc: "Think AI as a collaborator", color: "#8B5CF6" },
  { num: "02", title: "Prompt Engineering", desc: "Get what you want, every time", color: "#EC4899" },
  { num: "03", title: "Context is Everything", desc: "CLAUDE.md, skills, project setup", color: "#3B82F6" },
  { num: "04", title: "Agentic Patterns", desc: "Sub-agents, tools, workflows", color: "#10B981" },
  { num: "05", title: "Real Projects", desc: "Build and ship actual apps", color: "#F59E0B" },
];

// Background particles
const particles = Array.from({ length: 25 }, (_, i) => ({
  x: random(`learn-x-${i}`) * 1920,
  y: random(`learn-y-${i}`) * 1080,
  size: 2 + random(`learn-size-${i}`) * 6,
  speed: 0.2 + random(`learn-speed-${i}`) * 0.4,
  hue: 260 + random(`learn-hue-${i}`) * 60,
}));

export const GlassWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 8;
  const titleY = showTitle ? spring({ frame: frame - 8, fps, config: { damping: 18 } }) * 30 : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0815 0%, #120a20 50%, #0a0815 100%)",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.12)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
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
            top: ((frame * p.speed * 0.25) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `hsla(${p.hue}, 60%, 50%, 0.3)`,
          }}
        />
      ))}

      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 50,
          transform: "translateY(-50%)",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontSize: 500,
          fontWeight: 200,
          color: "rgba(255, 255, 255, 0.02)",
          lineHeight: 0.9,
        }}
      >
        5
      </div>

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
          opacity: showTitle ? 1 : 0,
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
          Curriculum
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 26,
            fontWeight: 300,
            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          5 modules
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "140px 60px 50px 60px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 64,
              fontWeight: 200,
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "-0.02em",
              opacity: showTitle ? 1 : 0,
              transform: `translateY(${30 - titleY}px)`,
            }}
          >
            What you'll learn
          </div>
        </div>

        {/* Modules - glass cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          {modules.map((mod, i) => {
            const delay = 25 + i * 12;
            const show = frame >= delay;
            const cardSpring = show ? spring({ frame: frame - delay, fps, config: { damping: 16 } }) : 0;
            const itemOpacity = show ? interpolate(frame - delay, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

            // Subtle float
            const floatY = Math.sin((frame * 0.03) + i * 0.5) * 3;

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${(1 - cardSpring) * 40}px) translateY(${floatY}px)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 25,
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    padding: "20px 28px",
                    borderRadius: 18,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderLeft: `3px solid ${mod.color}`,
                    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${mod.color}30, ${mod.color}15)`,
                      border: `1px solid ${mod.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 18,
                      fontWeight: 600,
                      color: mod.color,
                      flexShrink: 0,
                    }}
                  >
                    {mod.num}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 28,
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.95)",
                        marginBottom: 4,
                      }}
                    >
                      {mod.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 16,
                        fontWeight: 300,
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {mod.desc}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    style={{
                      fontSize: 24,
                      color: mod.color,
                      opacity: 0.6,
                    }}
                  >
                    {'->'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 25,
            opacity: frame >= 100 ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 22,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            From zero to shipping in weeks, not years
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
