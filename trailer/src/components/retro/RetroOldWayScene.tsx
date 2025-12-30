import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/**
 * RetroOldWayScene - The painful traditional path with 80s aesthetic
 * Style: VHS degradation, static, retro computer graphics
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  black: "#0a0a0f",
  darkPurple: "#1a0a2e",
};

const timelineItems = [
  { text: "LEARN SYNTAX", time: "6 MONTHS", icon: ">" },
  { text: "BUILD TOY PROJECTS", time: "6 MONTHS", icon: ">" },
  { text: "UNDERSTAND FRAMEWORKS", time: "1 YEAR", icon: ">" },
  { text: "DEBUG ENDLESSLY", time: "FOREVER", icon: "X" },
];

// VHS Static effect
const VHSStatic: React.FC<{ intensity?: number }> = ({ intensity = 0.1 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: intensity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  />
);

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
        rgba(0, 0, 0, 0.2) 2px,
        rgba(0, 0, 0, 0.2) 4px
      )`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

export const RetroOldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 3;
  const showImage = frame >= 10;
  const showTimeline = frame >= 25;

  const imageScale = showImage ? spring({ frame: frame - 10, fps, config: { damping: 15 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 10, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const getStrikeProgress = (index: number) => {
    const startFrame = 75 + index * 8;
    if (frame < startFrame) return 0;
    return interpolate(frame - startFrame, [0, 8], [0, 100], { extrapolateRight: "clamp" });
  };

  const showX = frame >= 105;
  const xScale = showX ? spring({ frame: frame - 105, fps, config: { damping: 8, stiffness: 150 } }) : 0;

  // VHS tracking glitch
  const trackingOffset = Math.sin(frame * 0.3) * 3;

  return (
    <AbsoluteFill style={{ background: COLORS.darkPurple }}>
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, ${COLORS.purple}11 1px, transparent 1px),
            linear-gradient(0deg, ${COLORS.purple}11 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: COLORS.black,
          borderBottom: `4px solid ${COLORS.pink}`,
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
            color: COLORS.cyan,
            textShadow: `2px 2px 0 ${COLORS.pink}`,
            opacity: showTitle ? 1 : 0,
          }}
        >
          [ THE TRADITIONAL PATH ]
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 36,
            color: COLORS.pink,
            textShadow: `0 0 20px ${COLORS.pink}`,
            opacity: showTitle ? interpolate(frame - 3, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          THE HARD WAY
        </div>
      </div>

      <div style={{ display: "flex", height: "100%", paddingTop: 100 }}>
        {/* Left: Retro computer image */}
        <div
          style={{
            flex: 1.2,
            padding: "30px 20px 30px 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              opacity: imageOpacity,
              transform: `scale(${0.9 + imageScale * 0.1}) translateY(${trackingOffset}px)`,
              border: `6px solid ${COLORS.cyan}`,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: `
                0 0 30px ${COLORS.cyan}44,
                inset 0 0 60px ${COLORS.pink}22
              `,
              position: "relative",
            }}
          >
            <Img
              src={staticFile("frustrated-developer.png")}
              style={{
                width: 680,
                height: "auto",
                display: "block",
                filter: "saturate(1.3) contrast(1.1)",
              }}
            />
            {/* CRT overlay effect */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at center, transparent 60%, ${COLORS.black}88 100%)`,
              }}
            />
          </div>
        </div>

        {/* Right: Timeline */}
        <div
          style={{
            width: 520,
            padding: "40px 50px 40px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 28,
              color: COLORS.yellow,
              marginBottom: 30,
              opacity: showTimeline ? 1 : 0,
              textShadow: `0 0 10px ${COLORS.yellow}`,
              letterSpacing: "0.1em",
            }}
          >
            {">> TIME INVESTMENT:"}
          </div>

          {timelineItems.map((item, i) => {
            const itemDelay = 30 + i * 10;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 8], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const strikeProgress = getStrikeProgress(i);
            const isLast = i === timelineItems.length - 1;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                  opacity: itemOpacity,
                  position: "relative",
                  background: isLast ? `${COLORS.pink}22` : "transparent",
                  padding: "14px 18px",
                  marginLeft: -18,
                  borderRadius: 4,
                  border: isLast ? `2px solid ${COLORS.pink}` : "2px solid transparent",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 20,
                    color: isLast ? COLORS.pink : COLORS.cyan,
                    marginRight: 16,
                    textShadow: `0 0 10px ${isLast ? COLORS.pink : COLORS.cyan}`,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontFamily: "'Impact', sans-serif",
                      fontSize: 26,
                      color: "#fff",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.text}
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 20,
                    color: isLast ? COLORS.pink : COLORS.yellow,
                    fontWeight: 700,
                    textShadow: `0 0 10px ${isLast ? COLORS.pink : COLORS.yellow}`,
                  }}
                >
                  {item.time}
                </span>

                {/* Strike through */}
                <div
                  style={{
                    position: "absolute",
                    left: 50,
                    right: 16,
                    top: "50%",
                    height: 4,
                    background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.yellow})`,
                    width: `${strikeProgress}%`,
                    boxShadow: `0 0 10px ${COLORS.pink}`,
                  }}
                />
              </div>
            );
          })}

          {/* Total */}
          <div
            style={{
              marginTop: 25,
              paddingTop: 25,
              borderTop: `3px solid ${COLORS.purple}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: frame >= 65 ? interpolate(frame - 65, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 24,
                color: COLORS.cyan,
                letterSpacing: "0.1em",
              }}
            >
              TOTAL:
            </span>
            <span
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 42,
                color: COLORS.pink,
                textShadow: `
                  0 0 20px ${COLORS.pink},
                  3px 3px 0 ${COLORS.yellow}
                `,
              }}
            >
              2+ YEARS
            </span>
          </div>
        </div>
      </div>

      {/* Big X */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          fontSize: 180,
          fontFamily: "'Impact', sans-serif",
          fontWeight: 900,
          color: COLORS.pink,
          transform: `scale(${xScale}) rotate(-10deg)`,
          opacity: xScale,
          textShadow: `
            0 0 40px ${COLORS.pink},
            5px 5px 0 ${COLORS.yellow}
          `,
          lineHeight: 1,
        }}
      >
        X
      </div>

      {/* VHS effects */}
      <VHSStatic intensity={0.08} />
      <Scanlines />
    </AbsoluteFill>
  );
};
