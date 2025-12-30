import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/**
 * RetroShowcaseScene - What you can build with 80s arcade gallery
 * Style: Cascading CRT monitors, neon labels, floating animations
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
};

const mockups = [
  { file: "dashboard-mockup-warm.png", label: "DASHBOARDS", x: 50, y: 300, rotate: -6, delay: 10, width: 400 },
  { file: "landing-page-warm.png", label: "WEB APPS", x: 360, y: 260, rotate: 3, delay: 18, width: 420 },
  { file: "mobile-app-mockup-warm.png", label: "MOBILE APPS", x: 700, y: 340, rotate: -3, delay: 26, width: 300 },
  { file: "video-editor-warm.png", label: "VIDEOS", x: 960, y: 280, rotate: 4, delay: 34, width: 380 },
  { file: "api-code-warm.png", label: "APIS & CODE", x: 1260, y: 320, rotate: -4, delay: 42, width: 360 },
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

export const RetroShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const titleX = showTitle ? spring({ frame: frame - 5, fps, config: { damping: 18 } }) : 0;

  // Floating animation
  const floatOffset = Math.sin(frame * 0.06) * 8;

  // Animated grid
  const gridOffset = frame * 0.8;

  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {/* Animated perspective grid floor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "600px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "-50%",
            right: "-50%",
            height: "40%",
            background: `
              linear-gradient(90deg, ${COLORS.cyan}33 1px, transparent 1px),
              linear-gradient(0deg, ${COLORS.pink}33 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `rotateX(65deg) translateY(${gridOffset % 60}px)`,
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(180deg, ${COLORS.black} 0%, transparent 100%)`,
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
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: showTitle ? 1 : 0,
          }}
        >
          {"<< WHAT YOU CAN BUILD >>"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 32,
            color: COLORS.yellow,
            textShadow: `3px 3px 0 ${COLORS.black}`,
            opacity: showTitle ? 1 : 0,
          }}
        >
          WHAT STUDENTS SHIP
        </div>
      </div>

      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Impact', sans-serif",
          fontSize: 350,
          fontWeight: 900,
          color: COLORS.purple,
          opacity: 0.08,
          whiteSpace: "nowrap",
          textShadow: `0 0 80px ${COLORS.purple}`,
          zIndex: 0,
        }}
      >
        BUILD
      </div>

      {/* Cascading mockups */}
      {mockups.map((mockup, i) => {
        const show = frame >= mockup.delay;
        const scale = show ? spring({ frame: frame - mockup.delay, fps, config: { damping: 12 } }) : 0;
        const opacity = show
          ? interpolate(frame - mockup.delay, [0, 12], [0, 1], { extrapolateRight: "clamp" })
          : 0;
        const floatY = floatOffset * (i % 2 === 0 ? 1 : -1);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mockup.x,
              top: mockup.y + floatY,
              transform: `scale(${0.8 + scale * 0.2}) rotate(${mockup.rotate}deg)`,
              opacity,
              zIndex: 10 + i,
            }}
          >
            {/* CRT monitor frame */}
            <div
              style={{
                padding: 12,
                background: `linear-gradient(135deg, #444 0%, #1a1a1a 100%)`,
                borderRadius: 16,
                border: `4px solid ${COLORS.cyan}`,
                boxShadow: `
                  0 25px 60px rgba(0,0,0,0.5),
                  0 0 30px ${COLORS.cyan}44,
                  inset 0 0 15px rgba(0,0,0,0.5)
                `,
              }}
            >
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `2px solid ${COLORS.pink}`,
                }}
              >
                <Img
                  src={staticFile(mockup.file)}
                  style={{
                    width: mockup.width,
                    height: "auto",
                    display: "block",
                    filter: "saturate(1.2) contrast(1.05)",
                  }}
                />
              </div>
            </div>

            {/* Neon label */}
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'Impact', sans-serif",
                fontSize: 16,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: COLORS.black,
                background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.yellow})`,
                padding: "8px 18px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                boxShadow: `0 0 20px ${COLORS.pink}66`,
              }}
            >
              {mockup.label}
            </div>
          </div>
        );
      })}

      {/* Bottom content area */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: `linear-gradient(0deg, ${COLORS.black} 70%, transparent)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 25,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 52,
            color: "#fff",
            letterSpacing: "0.02em",
            opacity: showTitle ? 1 : 0,
            transform: `translateX(${(1 - titleX) * -30}px)`,
            textAlign: "center",
            textShadow: `4px 4px 0 ${COLORS.purple}`,
          }}
        >
          STUDENTS ARE BUILDING
          <span
            style={{
              color: COLORS.pink,
              textShadow: `0 0 30px ${COLORS.pink}, 4px 4px 0 ${COLORS.cyan}`,
            }}
          >
            {" "}
            REAL PRODUCTS
          </span>
        </div>
        <div
          style={{
            marginTop: 15,
            fontFamily: "'Courier New', monospace",
            fontSize: 22,
            color: COLORS.cyan,
            textShadow: `0 0 15px ${COLORS.cyan}`,
            opacity:
              frame >= 60
                ? interpolate(frame - 60, [0, 12], [0, 1], { extrapolateRight: "clamp" })
                : 0,
            letterSpacing: "0.1em",
          }}
        >
          {">> YOU'LL LEARN TO BUILD ALL OF THIS INSIDE SPEAKCODE <<"}
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
            ${COLORS.pink} 25px,
            ${COLORS.cyan} 25px,
            ${COLORS.cyan} 50px,
            ${COLORS.yellow} 50px,
            ${COLORS.yellow} 75px
          )`,
        }}
      />

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
