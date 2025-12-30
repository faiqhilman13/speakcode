import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/**
 * RetroBeforeAfterScene - Visual transformation with 80s split screen
 * Style: Neon comparison, Memphis patterns, VHS aesthetic
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
};

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

export const RetroBeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const showImage = frame >= 15;
  const imageScale = showImage ? spring({ frame: frame - 15, fps, config: { damping: 12 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 15, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const showBefore = frame >= 40;
  const showAfter = frame >= 80;
  const showStats = frame >= 120;

  const beforeX = showBefore ? spring({ frame: frame - 40, fps, config: { damping: 15 } }) * 40 : 0;
  const afterX = showAfter ? spring({ frame: frame - 80, fps, config: { damping: 15 } }) * 40 : 0;
  const statsY = showStats ? spring({ frame: frame - 120, fps, config: { damping: 15 } }) * 40 : 0;

  // Animated grid
  const gridOffset = frame * 1.5;

  return (
    <AbsoluteFill style={{ background: COLORS.black, opacity: fadeIn }}>
      {/* Animated background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, ${COLORS.purple}22 1px, transparent 1px),
            linear-gradient(0deg, ${COLORS.purple}22 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: `${gridOffset}px ${gridOffset}px`,
        }}
      />

      {/* Central divider glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 4,
          background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.pink}, ${COLORS.yellow})`,
          boxShadow: `0 0 30px ${COLORS.pink}, 0 0 60px ${COLORS.cyan}`,
          transform: "translateX(-50%)",
          opacity: imageOpacity,
        }}
      />

      {/* Full-screen image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: imageOpacity,
          transform: `scale(${0.95 + imageScale * 0.05})`,
        }}
      >
        <Img
          src={staticFile("before-after-coding.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.4) contrast(1.1) hue-rotate(330deg)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${COLORS.black}cc 0%, ${COLORS.black}66 50%, ${COLORS.black}cc 100%)`,
        }}
      />

      {/* Left - Before panel */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 50,
          opacity: showBefore ? 1 : 0,
          transform: `translateX(${40 - beforeX}px)`,
          background: `${COLORS.black}ee`,
          padding: "30px 40px",
          borderRadius: 8,
          border: `4px solid ${COLORS.pink}`,
          boxShadow: `0 0 30px ${COLORS.pink}44, inset 0 0 30px ${COLORS.pink}11`,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.cyan,
            marginBottom: 12,
          }}
        >
          {"< BEFORE >"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 64,
            color: COLORS.pink,
            textShadow: `0 0 20px ${COLORS.pink}, 3px 3px 0 ${COLORS.yellow}`,
            marginBottom: 8,
          }}
        >
          THE OLD WAY
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 52,
            color: COLORS.pink,
            textShadow: `0 0 20px ${COLORS.pink}`,
            marginBottom: 15,
          }}
        >
          2+ YEARS
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 18,
            color: COLORS.yellow,
            letterSpacing: "0.05em",
          }}
        >
          TUTORIALS // BOOTCAMPS // FRUSTRATION
        </div>
      </div>

      {/* Right - After panel */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 50,
          textAlign: "right",
          opacity: showAfter ? 1 : 0,
          transform: `translateX(${-(40 - afterX)}px)`,
          background: `${COLORS.black}ee`,
          padding: "30px 40px",
          borderRadius: 8,
          border: `4px solid ${COLORS.green}`,
          boxShadow: `0 0 30px ${COLORS.green}44, inset 0 0 30px ${COLORS.green}11`,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.cyan,
            marginBottom: 12,
          }}
        >
          {"< AFTER >"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 64,
            color: COLORS.green,
            textShadow: `0 0 20px ${COLORS.green}, 3px 3px 0 ${COLORS.cyan}`,
            marginBottom: 8,
          }}
        >
          THE NEW WAY
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 52,
            color: COLORS.green,
            textShadow: `0 0 20px ${COLORS.green}`,
            marginBottom: 15,
          }}
        >
          2 WEEKS
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 18,
            color: COLORS.yellow,
            letterSpacing: "0.05em",
          }}
        >
          AI AS YOUR CODING PARTNER
        </div>
      </div>

      {/* Center transformation panel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: showAfter ? interpolate(frame - 90, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            background: `${COLORS.black}f5`,
            padding: "40px 60px",
            borderRadius: 12,
            border: `4px solid ${COLORS.yellow}`,
            boxShadow: `0 0 40px ${COLORS.yellow}44`,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 18,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: COLORS.yellow,
              marginBottom: 15,
            }}
          >
            {">> TRANSFORMATION <<"}
          </div>
          <div
            style={{
              fontFamily: "'Impact', sans-serif",
              fontSize: 56,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <span style={{ color: COLORS.pink, textShadow: `0 0 15px ${COLORS.pink}` }}>YEARS</span>
            <span
              style={{
                fontSize: 44,
                color: COLORS.yellow,
                animation: "pulse 0.5s infinite",
              }}
            >
              {">>>"}
            </span>
            <span style={{ color: COLORS.green, textShadow: `0 0 15px ${COLORS.green}` }}>WEEKS</span>
          </div>
        </div>

        {/* Sub message */}
        <div
          style={{
            marginTop: 20,
            fontFamily: "'Courier New', monospace",
            fontSize: 22,
            color: COLORS.cyan,
            textShadow: `0 0 10px ${COLORS.cyan}`,
            letterSpacing: "0.1em",
          }}
        >
          AI-POWERED DEVELOPMENT CHANGES EVERYTHING
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.cyan})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 80,
          opacity: showStats ? 1 : 0,
          transform: `translateY(${40 - statsY}px)`,
        }}
      >
        {[
          { label: "TIME SAVED", value: "95%" },
          { label: "LEARNING CURVE", value: "MINIMAL" },
          { label: "FRUSTRATION", value: "ZERO" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 20,
                color: COLORS.black,
                fontWeight: 700,
              }}
            >
              {stat.label}:
            </span>
            <span
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 32,
                color: COLORS.yellow,
                textShadow: `2px 2px 0 ${COLORS.black}`,
              }}
            >
              {stat.value}
            </span>
            {i < 2 && (
              <div
                style={{
                  width: 3,
                  height: 50,
                  background: COLORS.black,
                  marginLeft: 50,
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
