import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Old Way Scene: Show the painful traditional path
 * Layout: Dense, impactful with large image
 */

const timelineItems = [
  { text: "Learn syntax", time: "6 months" },
  { text: "Build toy projects", time: "6 months" },
  { text: "Understand frameworks", time: "1 year" },
  { text: "Debug endlessly", time: "forever" },
];

export const OldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 3;
  const showImage = frame >= 8;
  const showTimeline = frame >= 25;

  const imageScale = showImage ? spring({ frame: frame - 8, fps, config: { damping: 15 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 8, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const getStrikeProgress = (index: number) => {
    const startFrame = 75 + index * 6;
    if (frame < startFrame) return 0;
    return interpolate(frame - startFrame, [0, 6], [0, 100], { extrapolateRight: "clamp" });
  };

  const showX = frame >= 100;
  const xScale = showX ? spring({ frame: frame - 100, fps, config: { damping: 8, stiffness: 150 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top bar with labels */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 110,
        background: "#1a1a1a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
      }}>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 22,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
          opacity: showTitle ? 1 : 0,
        }}>
          The Traditional Path
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 36,
          fontStyle: "italic",
          color: "#FF5E5B",
          opacity: showTitle ? interpolate(frame - 3, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}>
          The hard way
        </div>
      </div>

      <div style={{ display: "flex", height: "100%", paddingTop: 110 }}>
        {/* Left: Image - much larger */}
        <div style={{
          flex: 1.2,
          padding: "30px 20px 30px 50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div
            style={{
              opacity: imageOpacity,
              transform: `scale(${0.95 + imageScale * 0.05})`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
              border: "4px solid #1a1a1a",
            }}
          >
            <Img
              src={staticFile("frustrated-developer.png")}
              style={{
                width: 750,
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Right: Timeline - tighter spacing */}
        <div style={{
          width: 480,
          padding: "40px 50px 40px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: 36,
            color: "#1a1a1a",
            marginBottom: 30,
            opacity: showTimeline ? 1 : 0,
          }}>
            Time investment:
          </div>

          {timelineItems.map((item, i) => {
            const itemDelay = 30 + i * 8;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 6], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const strikeProgress = getStrikeProgress(i);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 22,
                  opacity: itemOpacity,
                  position: "relative",
                  background: i === 3 ? "rgba(255,94,91,0.08)" : "transparent",
                  padding: "12px 16px",
                  marginLeft: -16,
                  borderRadius: 8,
                }}
              >
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: i === 3 ? "#FF5E5B" : "#1a1a1a",
                  marginRight: 16,
                  flexShrink: 0,
                }} />

                <div style={{ flex: 1 }}>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 26,
                    color: "#1a1a1a",
                  }}>
                    {item.text}
                  </span>
                </div>

                <span style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 18,
                  color: i === 3 ? "#FF5E5B" : "rgba(26,26,26,0.5)",
                  fontWeight: i === 3 ? 700 : 400,
                }}>
                  {item.time}
                </span>

                <div style={{
                  position: "absolute",
                  left: 42,
                  right: 16,
                  top: "50%",
                  height: 3,
                  background: "#FF5E5B",
                  width: `${strikeProgress}%`,
                }} />
              </div>
            );
          })}

          {/* Total time */}
          <div style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "2px solid rgba(26,26,26,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: frame >= 62 ? interpolate(frame - 62, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <span style={{
              fontFamily: "Georgia, serif",
              fontSize: 24,
              color: "#1a1a1a",
            }}>
              Total:
            </span>
            <span style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 32,
              color: "#FF5E5B",
              fontWeight: 700,
            }}>
              2+ YEARS
            </span>
          </div>
        </div>
      </div>

      {/* Big X - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 50,
          fontSize: 200,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#FF5E5B",
          transform: `scale(${xScale})`,
          opacity: xScale,
          lineHeight: 1,
        }}
      >
        ✕
      </div>
    </AbsoluteFill>
  );
};
