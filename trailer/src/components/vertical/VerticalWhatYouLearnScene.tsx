import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical What You'll Learn Scene: Full width module list
 * Stack all 5 modules with larger fonts
 */

const modules = [
  { num: "01", title: "The AI Mental Model", desc: "Think AI as a collaborator" },
  { num: "02", title: "Prompt Engineering", desc: "Get what you want, every time" },
  { num: "03", title: "Context is Everything", desc: "CLAUDE.md, skills, project setup" },
  { num: "04", title: "Agentic Patterns", desc: "Sub-agents, tools, workflows" },
  { num: "05", title: "Real Projects", desc: "Build and ship actual apps" },
];

export const VerticalWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 8;
  const titleY = showTitle ? spring({ frame: frame - 8, fps, config: { damping: 20 } }) * 30 : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a" }}>
      {/* Top header bar - taller */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 32,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.6)",
            opacity: showTitle ? 1 : 0,
          }}
        >
          Curriculum
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 48,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showTitle ? 1 : 0,
          }}
        >
          5 modules
        </div>
      </div>

      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 40,
          transform: "translateY(-50%)",
          fontFamily: "Georgia, serif",
          fontSize: 500,
          fontWeight: 400,
          color: "rgba(255,255,255,0.02)",
          lineHeight: 0.85,
        }}
      >
        5
      </div>

      {/* Content - middle aligned, MUCH bigger modules */}
      <div style={{ padding: "0 40px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* Header - compact at top */}
        <div style={{ position: "absolute", top: 140, left: 40, right: 40 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 70,
              color: "#FDF6E3",
              letterSpacing: "-0.02em",
              opacity: showTitle ? 1 : 0,
              transform: `translateY(${30 - titleY}px)`,
            }}
          >
            What you'll learn
          </div>
        </div>

        {/* Modules - HUGE, middle aligned */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          {modules.map((mod, i) => {
            const delay = 25 + i * 15;
            const show = frame >= delay;
            const itemX = show ? spring({ frame: frame - delay, fps, config: { damping: 18 } }) * 40 : 0;
            const itemOpacity = show ? interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 40,
                  opacity: itemOpacity,
                  transform: `translateX(${40 - itemX}px)`,
                  background: "rgba(255,255,255,0.07)",
                  padding: "42px 48px",
                  borderRadius: 20,
                  borderLeft: "10px solid #FF5E5B",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 38,
                    color: "#FF5E5B",
                    width: 60,
                    flexShrink: 0,
                  }}
                >
                  {mod.num}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 54,
                      color: "#FDF6E3",
                      marginBottom: 10,
                    }}
                  >
                    {mod.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 30,
                      color: "rgba(253,246,227,0.5)",
                      fontStyle: "italic",
                    }}
                  >
                    {mod.desc}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ fontSize: 48, color: "rgba(253,246,227,0.25)" }}>
                  →
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent - at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 40,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 30,
            opacity: frame >= 160 ? interpolate(frame - 160, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div style={{ width: 140, height: 10, background: "#FF5E5B" }} />
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 38,
              color: "rgba(253,246,227,0.6)",
              fontStyle: "italic",
            }}
          >
            From zero to shipping in weeks, not years
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
