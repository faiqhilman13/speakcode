import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass Old Way Scene: The painful traditional path with frosted glass timeline
 * Style: Dark gradient background, glass cards for timeline items
 */

const timelineItems = [
  { text: "Learn syntax", time: "6 months", icon: "01" },
  { text: "Build toy projects", time: "6 months", icon: "02" },
  { text: "Understand frameworks", time: "1 year", icon: "03" },
  { text: "Debug endlessly", time: "forever", icon: "04" },
];

// Floating particles
const particles = Array.from({ length: 15 }, (_, i) => ({
  x: random(`old-particle-x-${i}`) * 1920,
  y: random(`old-particle-y-${i}`) * 1080,
  size: 2 + random(`old-particle-size-${i}`) * 5,
  speed: 0.2 + random(`old-particle-speed-${i}`) * 0.5,
}));

export const GlassOldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const showImage = frame >= 12;
  const showTimeline = frame >= 25;

  const imageScale = showImage ? spring({ frame: frame - 12, fps, config: { damping: 15 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 12, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const getStrikeProgress = (index: number) => {
    const startFrame = 80 + index * 8;
    if (frame < startFrame) return 0;
    return interpolate(frame - startFrame, [0, 8], [0, 100], { extrapolateRight: "clamp" });
  };

  const showX = frame >= 105;
  const xScale = showX ? spring({ frame: frame - 105, fps, config: { damping: 10, stiffness: 180 } }) : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0d0d1a 100%)",
      }}
    >
      {/* Subtle background blobs */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.1)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 100,
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
            top: ((frame * p.speed * 0.3) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
      ))}

      {/* Glass header panel */}
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
          The Traditional Path
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 26,
            fontWeight: 300,
            background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The hard way
        </div>
      </div>

      <div style={{ display: "flex", height: "100%", paddingTop: 130, paddingBottom: 30 }}>
        {/* Left: Image in glass frame */}
        <div
          style={{
            flex: 1.1,
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              opacity: imageOpacity,
              transform: `scale(${0.92 + imageScale * 0.08})`,
              padding: 12,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 24,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Img
              src={staticFile("frustrated-developer.png")}
              style={{
                width: 650,
                height: "auto",
                borderRadius: 16,
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Right: Timeline with glass cards */}
        <div
          style={{
            width: 520,
            padding: "30px 50px 30px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: 25,
              opacity: showTimeline ? 1 : 0,
            }}
          >
            Time investment:
          </div>

          {timelineItems.map((item, i) => {
            const itemDelay = 30 + i * 10;
            const itemOpacity = frame >= itemDelay
              ? interpolate(frame - itemDelay, [0, 10], [0, 1], { extrapolateRight: "clamp" })
              : 0;
            const strikeProgress = getStrikeProgress(i);
            const isLast = i === timelineItems.length - 1;

            return (
              <div
                key={i}
                style={{
                  marginBottom: 16,
                  opacity: itemOpacity,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: isLast
                      ? "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "16px 20px",
                    borderRadius: 16,
                    border: isLast
                      ? "1px solid rgba(236, 72, 153, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: isLast
                        ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                        : "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 13,
                      color: "rgba(255, 255, 255, 0.8)",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 22,
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 16,
                      fontWeight: isLast ? 600 : 400,
                      background: isLast
                        ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                        : "none",
                      WebkitBackgroundClip: isLast ? "text" : "none",
                      WebkitTextFillColor: isLast ? "transparent" : "rgba(255, 255, 255, 0.5)",
                      backgroundClip: isLast ? "text" : "none",
                      color: isLast ? undefined : "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Strike through */}
                <div
                  style={{
                    position: "absolute",
                    left: 60,
                    right: 20,
                    top: "50%",
                    height: 3,
                    background: "linear-gradient(90deg, #EC4899, #8B5CF6)",
                    borderRadius: 2,
                    width: `${strikeProgress}%`,
                    opacity: 0.8,
                  }}
                />
              </div>
            );
          })}

          {/* Total */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: frame >= 65 ? interpolate(frame - 65, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
            }}
          >
            <span
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 22,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Total:
            </span>
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 30,
                fontWeight: 700,
                background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2+ YEARS
            </span>
          </div>
        </div>
      </div>

      {/* Big X with glass glow */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          fontSize: 180,
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 200,
          background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          transform: `scale(${xScale})`,
          opacity: xScale,
          lineHeight: 1,
          filter: "drop-shadow(0 0 40px rgba(236, 72, 153, 0.5))",
        }}
      >
        X
      </div>
    </AbsoluteFill>
  );
};
