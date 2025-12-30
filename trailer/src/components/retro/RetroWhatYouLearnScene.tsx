import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/**
 * RetroWhatYouLearnScene - Course curriculum with 80s arcade style
 * Style: Pixel fonts, neon modules, arcade game menu aesthetic
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
};

const modules = [
  { num: "01", title: "THE AI MENTAL MODEL", desc: "Think AI as a collaborator", icon: ">" },
  { num: "02", title: "PROMPT ENGINEERING", desc: "Get what you want, every time", icon: ">" },
  { num: "03", title: "CONTEXT IS EVERYTHING", desc: "CLAUDE.md, skills, project setup", icon: ">" },
  { num: "04", title: "AGENTIC PATTERNS", desc: "Sub-agents, tools, workflows", icon: ">" },
  { num: "05", title: "REAL PROJECTS", desc: "Build and ship actual apps", icon: "!" },
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

export const RetroWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 8;
  const titleY = showTitle ? spring({ frame: frame - 8, fps, config: { damping: 18 } }) * 30 : 0;

  // Animated grid
  const gridOffset = frame * 0.8;

  // Pulsing effect for the big 5
  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;

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
          backgroundSize: "50px 50px",
          backgroundPosition: `0 ${gridOffset}px`,
        }}
      />

      {/* Top header bar */}
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
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: showTitle ? 1 : 0,
          }}
        >
          {"<< CURRICULUM >>"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 36,
            color: COLORS.yellow,
            textShadow: `3px 3px 0 ${COLORS.black}`,
            opacity: showTitle ? 1 : 0,
          }}
        >
          5 MODULES
        </div>
      </div>

      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 50,
          transform: `translateY(-50%) scale(${pulse})`,
          fontFamily: "'Impact', sans-serif",
          fontSize: 550,
          fontWeight: 900,
          color: COLORS.purple,
          opacity: 0.15,
          textShadow: `0 0 60px ${COLORS.purple}`,
          lineHeight: 0.85,
        }}
      >
        5
      </div>

      {/* Content */}
      <div
        style={{
          padding: "120px 60px 50px 60px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <div
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 72,
              color: "#fff",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              opacity: showTitle ? 1 : 0,
              transform: `translateY(${30 - titleY}px)`,
              textShadow: `
                4px 4px 0 ${COLORS.cyan},
                -2px -2px 0 ${COLORS.pink},
                0 0 30px ${COLORS.purple}
              `,
            }}
          >
            WHAT YOU'LL LEARN
          </div>
        </div>

        {/* Modules - arcade menu style */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          {modules.map((mod, i) => {
            const delay = 25 + i * 12;
            const show = frame >= delay;
            const itemX = show ? spring({ frame: frame - delay, fps, config: { damping: 15 } }) * 40 : 0;
            const itemOpacity = show
              ? interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const isLast = i === modules.length - 1;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: itemOpacity,
                  transform: `translateX(${40 - itemX}px)`,
                  background: isLast
                    ? `linear-gradient(90deg, ${COLORS.pink}33, transparent)`
                    : `linear-gradient(90deg, ${COLORS.purple}22, transparent)`,
                  padding: "18px 25px",
                  borderRadius: 8,
                  borderLeft: `6px solid ${isLast ? COLORS.yellow : COLORS.cyan}`,
                  boxShadow: isLast
                    ? `0 0 30px ${COLORS.pink}33`
                    : `0 0 20px ${COLORS.purple}22`,
                }}
              >
                {/* Module number */}
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 28,
                    fontWeight: 700,
                    color: isLast ? COLORS.yellow : COLORS.cyan,
                    width: 50,
                    flexShrink: 0,
                    textShadow: `0 0 15px ${isLast ? COLORS.yellow : COLORS.cyan}`,
                  }}
                >
                  {mod.num}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Impact', sans-serif",
                      fontSize: 32,
                      color: "#fff",
                      marginBottom: 4,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {mod.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 18,
                      color: COLORS.yellow,
                      opacity: 0.8,
                    }}
                  >
                    // {mod.desc}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    fontSize: 30,
                    color: isLast ? COLORS.yellow : COLORS.purple,
                    textShadow: `0 0 10px ${isLast ? COLORS.yellow : COLORS.purple}`,
                  }}
                >
                  {mod.icon}
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
            gap: 20,
            marginTop: 25,
            opacity: frame >= 100 ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              width: 80,
              height: 6,
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.pink})`,
              boxShadow: `0 0 15px ${COLORS.pink}`,
            }}
          />
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 22,
              color: COLORS.cyan,
              textShadow: `0 0 10px ${COLORS.cyan}`,
              letterSpacing: "0.1em",
            }}
          >
            {">> FROM ZERO TO SHIPPING IN WEEKS, NOT YEARS <<"}
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `repeating-linear-gradient(
            90deg,
            ${COLORS.pink} 0px,
            ${COLORS.pink} 20px,
            ${COLORS.cyan} 20px,
            ${COLORS.cyan} 40px,
            ${COLORS.yellow} 40px,
            ${COLORS.yellow} 60px
          )`,
        }}
      />

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
