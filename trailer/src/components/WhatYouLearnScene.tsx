import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * What You'll Learn Scene: Course curriculum preview
 * Layout: Dense grid, minimal whitespace
 */

const modules = [
  { num: "01", title: "The AI Mental Model", desc: "Think AI as a collaborator" },
  { num: "02", title: "Prompt Engineering", desc: "Get what you want, every time" },
  { num: "03", title: "Context is Everything", desc: "CLAUDE.md, skills, project setup" },
  { num: "04", title: "Agentic Patterns", desc: "Sub-agents, tools, workflows" },
  { num: "05", title: "Real Projects", desc: "Build and ship actual apps" },
];

export const WhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 8;
  const titleY = showTitle ? spring({ frame: frame - 8, fps, config: { damping: 20 } }) * 25 : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a" }}>
      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 110,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
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
            fontSize: 32,
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
          right: 30,
          transform: "translateY(-50%)",
          fontFamily: "Georgia, serif",
          fontSize: 600,
          fontWeight: 400,
          color: "rgba(255,255,255,0.025)",
          lineHeight: 0.85,
        }}
      >
        5
      </div>

      {/* Content */}
      <div style={{ padding: "130px 60px 50px 60px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ marginBottom: 25 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 72,
              color: "#FDF6E3",
              letterSpacing: "-0.02em",
              opacity: showTitle ? 1 : 0,
              transform: `translateY(${25 - titleY}px)`,
            }}
          >
            What you'll learn
          </div>
        </div>

        {/* Modules - tighter spacing */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          {modules.map((mod, i) => {
            const delay = 25 + i * 15;
            const show = frame >= delay;
            const itemX = show ? spring({ frame: frame - delay, fps, config: { damping: 18 } }) * 35 : 0;
            const itemOpacity = show ? interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 25,
                  opacity: itemOpacity,
                  transform: `translateX(${35 - itemX}px)`,
                  background: "rgba(255,255,255,0.03)",
                  padding: "20px 25px",
                  borderRadius: 8,
                  borderLeft: "4px solid #FF5E5B",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 20,
                    color: "#FF5E5B",
                    width: 35,
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
                      fontSize: 34,
                      color: "#FDF6E3",
                      marginBottom: 3,
                    }}
                  >
                    {mod.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 20,
                      color: "rgba(253,246,227,0.5)",
                      fontStyle: "italic",
                    }}
                  >
                    {mod.desc}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ fontSize: 28, color: "rgba(253,246,227,0.25)" }}>
                  →
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
            opacity: frame >= 160 ? interpolate(frame - 160, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div style={{ width: 70, height: 4, background: "#FF5E5B" }} />
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 26,
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
