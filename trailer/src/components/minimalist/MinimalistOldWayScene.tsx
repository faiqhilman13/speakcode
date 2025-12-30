import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Old Way Scene: The painful traditional path
 * Style: Clean geometric visualization of time investment
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

const timelineItems = [
  { text: "Learn syntax", time: "6 months" },
  { text: "Build projects", time: "6 months" },
  { text: "Frameworks", time: "1 year" },
  { text: "Debug forever", time: "..." },
];

export const MinimalistOldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showHeader = frame >= 5;
  const showTimeline = frame >= 15;

  // Strike-through animation
  const getStrikeProgress = (index: number) => {
    const startFrame = 70 + index * 8;
    if (frame < startFrame) return 0;
    return interpolate(frame - startFrame, [0, 10], [0, 100], { extrapolateRight: "clamp" });
  };

  // X mark animation
  const showX = frame >= 100;
  const xOpacity = showX ? interpolate(frame - 100, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;
  const xScale = showX ? spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 150 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10,10,10,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header section */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          opacity: showHeader ? interpolate(frame - 5, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
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
            The Traditional Path
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 64,
              fontWeight: 300,
              color: "#0A0A0A",
              letterSpacing: "-0.02em",
            }}
          >
            The hard way
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(10,10,10,0.5)",
          }}
        >
          Time investment
        </div>
      </div>

      {/* Horizontal divider */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          right: 120,
          height: 1,
          background: "rgba(10,10,10,0.1)",
          opacity: showHeader ? 1 : 0,
        }}
      />

      {/* Timeline items - Swiss grid layout */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 120,
          right: 400,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {timelineItems.map((item, i) => {
          const itemDelay = 20 + i * 12;
          const itemOpacity = frame >= itemDelay
            ? interpolate(frame - itemDelay, [0, 10], [0, 1], { extrapolateRight: "clamp" })
            : 0;
          const itemX = frame >= itemDelay
            ? spring({ frame: frame - itemDelay, fps, config: { damping: 20 } }) * 30
            : 0;
          const strikeProgress = getStrikeProgress(i);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: itemOpacity,
                transform: `translateX(${30 - itemX}px)`,
                position: "relative",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(10,10,10,0.3)",
                  width: 40,
                }}
              >
                0{i + 1}
              </div>

              {/* Text */}
              <div
                style={{
                  flex: 1,
                  fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#0A0A0A",
                }}
              >
                {item.text}
              </div>

              {/* Time */}
              <div
                style={{
                  fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  fontSize: 24,
                  fontWeight: 300,
                  color: i === 3 ? "#0066FF" : "rgba(10,10,10,0.5)",
                }}
              >
                {item.time}
              </div>

              {/* Strike-through line */}
              <div
                style={{
                  position: "absolute",
                  left: 40,
                  right: 0,
                  top: "50%",
                  height: 2,
                  background: "#0066FF",
                  width: `${strikeProgress}%`,
                  maxWidth: "calc(100% - 40px)",
                }}
              />
            </div>
          );
        })}

        {/* Total */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 40,
            borderTop: "1px solid rgba(10,10,10,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: frame >= 55 ? interpolate(frame - 55, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 24,
              fontWeight: 300,
              color: "rgba(10,10,10,0.5)",
            }}
          >
            Total
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 500,
              color: "#0A0A0A",
            }}
          >
            2+ Years
          </div>
        </div>
      </div>

      {/* Right side - geometric X */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "50%",
          transform: `translateY(-50%) scale(${0.8 + xScale * 0.2})`,
          opacity: xOpacity,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line
            x1="30"
            y1="30"
            x2="170"
            y2="170"
            stroke="#0066FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="170"
            y1="30"
            x2="30"
            y2="170"
            stroke="#0066FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "#0A0A0A",
          opacity: showX ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
