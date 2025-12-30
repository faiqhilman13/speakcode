import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist What You'll Learn Scene: Course curriculum preview
 * Style: Swiss grid, modular layout, clean typography
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

const modules = [
  { num: "01", title: "The AI Mental Model", desc: "Think AI as a collaborator" },
  { num: "02", title: "Prompt Engineering", desc: "Get what you want, every time" },
  { num: "03", title: "Context is Everything", desc: "CLAUDE.md, skills, project setup" },
  { num: "04", title: "Agentic Patterns", desc: "Sub-agents, tools, workflows" },
  { num: "05", title: "Real Projects", desc: "Build and ship actual apps" },
];

export const MinimalistWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showHeader = frame >= 5;
  const headerOpacity = showHeader ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: -50,
          transform: "translateY(-50%)",
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
          fontSize: 500,
          fontWeight: 700,
          color: "rgba(10,10,10,0.03)",
          lineHeight: 0.9,
        }}
      >
        5
      </div>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          opacity: headerOpacity,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(10,10,10,0.4)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Curriculum
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 56,
              fontWeight: 300,
              color: "#0A0A0A",
              letterSpacing: "-0.02em",
            }}
          >
            What you'll learn
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 48,
            fontWeight: 600,
            color: "#0066FF",
          }}
        >
          5 modules
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 100,
          right: 100,
          height: 1,
          background: "rgba(10,10,10,0.1)",
          opacity: headerOpacity,
        }}
      />

      {/* Modules grid */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 100,
          right: 100,
          bottom: 140,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {modules.map((mod, i) => {
          const delay = 18 + i * 12;
          const show = frame >= delay;
          const itemOpacity = show
            ? interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: "clamp" })
            : 0;
          const itemX = show
            ? spring({ frame: frame - delay, fps, config: { damping: 22 } }) * 40
            : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: itemOpacity,
                transform: `translateX(${40 - itemX}px)`,
                padding: "20px 0",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0066FF",
                  width: 36,
                }}
              >
                {mod.num}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 28,
                    fontWeight: 500,
                    color: "#0A0A0A",
                    marginBottom: 4,
                  }}
                >
                  {mod.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(10,10,10,0.5)",
                  }}
                >
                  {mod.desc}
                </div>
              </div>

              {/* Geometric indicator */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: i === 4 ? "#0066FF" : "transparent",
                  border: i === 4 ? "none" : "2px solid rgba(10,10,10,0.15)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: frame >= 90 ? interpolate(frame - 90, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: "#0066FF",
            }}
          />
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            From zero to shipping in weeks, not years
          </div>
          <div
            style={{
              width: 40,
              height: 2,
              background: "#0066FF",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
