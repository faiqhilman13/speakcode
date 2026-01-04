import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Square Old Way Scene: Show the painful traditional path - vertical layout
 */

const timelineItems = [
  { text: "Learn syntax", time: "6 months" },
  { text: "Build toy projects", time: "6 months" },
  { text: "Understand frameworks", time: "1 year" },
  { text: "Debug endlessly", time: "forever" },
];

export const SquareOldWayScene: React.FC = () => {
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
      {/* Top bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "#1a1a1a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
      }}>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 16,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
          opacity: showTitle ? 1 : 0,
        }}>
          The Traditional Path
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 26,
          fontStyle: "italic",
          color: "#FF5E5B",
          opacity: showTitle ? interpolate(frame - 3, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}>
          The hard way
        </div>
      </div>

      {/* Vertical layout for square */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 80,
      }}>
        {/* Top: Image */}
        <div style={{
          height: 420,
          padding: "15px 35px",
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
              boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
              border: "4px solid #1a1a1a",
            }}
          >
            <Img
              src={staticFile("frustrated-developer.png")}
              style={{
                width: 480,
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Bottom: Timeline */}
        <div style={{
          flex: 1,
          padding: "10px 35px 25px",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            color: "#1a1a1a",
            marginBottom: 12,
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
                  marginBottom: 8,
                  opacity: itemOpacity,
                  position: "relative",
                  background: i === 3 ? "rgba(255,94,91,0.1)" : "transparent",
                  padding: "10px 15px",
                  marginLeft: -15,
                  borderRadius: 8,
                }}
              >
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: i === 3 ? "#FF5E5B" : "#1a1a1a",
                  marginRight: 15,
                  flexShrink: 0,
                }} />

                <div style={{ flex: 1 }}>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 22,
                    color: "#1a1a1a",
                  }}>
                    {item.text}
                  </span>
                </div>

                <span style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 16,
                  color: i === 3 ? "#FF5E5B" : "rgba(26,26,26,0.5)",
                  fontWeight: i === 3 ? 700 : 400,
                }}>
                  {item.time}
                </span>

                <div style={{
                  position: "absolute",
                  left: 40,
                  right: 15,
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
            marginTop: 8,
            paddingTop: 12,
            borderTop: "3px solid rgba(26,26,26,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: frame >= 62 ? interpolate(frame - 62, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}>
            <span style={{
              fontFamily: "Georgia, serif",
              fontSize: 22,
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

      {/* Big X overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 40,
          fontSize: 160,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#FF5E5B",
          transform: `scale(${xScale})`,
          opacity: xScale * 0.9,
          lineHeight: 1,
        }}
      >
        ✕
      </div>
    </AbsoluteFill>
  );
};
