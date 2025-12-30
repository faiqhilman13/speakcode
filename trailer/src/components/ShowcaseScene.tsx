import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Showcase Scene: What you can build
 * Layout: Cascading mockups gallery with floating animation
 */

const mockups = [
  { file: "dashboard-mockup-warm.png", label: "Dashboards", x: 60, y: 320, rotate: -4, delay: 10, width: 420 },
  { file: "landing-page-warm.png", label: "Web Apps", x: 380, y: 280, rotate: 2, delay: 18, width: 440 },
  { file: "mobile-app-mockup-warm.png", label: "Mobile Apps", x: 720, y: 360, rotate: -2, delay: 26, width: 320 },
  { file: "video-editor-warm.png", label: "Videos", x: 980, y: 300, rotate: 3, delay: 34, width: 400 },
  { file: "api-code-warm.png", label: "APIs & Code", x: 1280, y: 340, rotate: -3, delay: 42, width: 380 },
];

export const ShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const titleX = showTitle ? spring({ frame: frame - 5, fps, config: { damping: 20 } }) : 0;

  // Floating animation for mockups
  const floatOffset = Math.sin(frame * 0.06) * 6;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.7)",
            opacity: showTitle ? 1 : 0,
          }}
        >
          What You Can Build
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showTitle ? 1 : 0,
          }}
        >
          What students ship
        </div>
      </div>

      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Georgia, serif",
          fontSize: 380,
          fontWeight: 400,
          color: "rgba(26,26,26,0.03)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        BUILD
      </div>

      {/* Cascading mockups */}
      {mockups.map((mockup, i) => {
        const show = frame >= mockup.delay;
        const scale = show ? spring({ frame: frame - mockup.delay, fps, config: { damping: 14 } }) : 0;
        const opacity = show ? interpolate(frame - mockup.delay, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;
        const floatY = floatOffset * (i % 2 === 0 ? 1 : -1);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mockup.x,
              top: mockup.y + floatY,
              transform: `scale(${0.85 + scale * 0.15}) rotate(${mockup.rotate}deg)`,
              opacity,
              zIndex: 10 + i,
            }}
          >
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                border: "3px solid #1a1a1a",
              }}
            >
              <Img
                src={staticFile(mockup.file)}
                style={{ width: mockup.width, height: "auto", display: "block" }}
              />
            </div>
            {/* Label */}
            <div
              style={{
                position: "absolute",
                bottom: -35,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'SF Mono', monospace",
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#1a1a1a",
                background: "#FF5E5B",
                padding: "6px 14px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              {mockup.label}
            </div>
          </div>
        );
      })}

      {/* Bottom bar with title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 140,
          background: "linear-gradient(0deg, #FDF6E3 60%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 30,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            opacity: showTitle ? 1 : 0,
            transform: `translateX(${(1 - titleX) * -25}px)`,
            textAlign: "center",
          }}
        >
          Students are building
          <span style={{ color: "#FF5E5B", fontStyle: "italic" }}> real products.</span>
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: "Georgia, serif",
            fontSize: 24,
            fontStyle: "italic",
            color: "rgba(26,26,26,0.5)",
            opacity: frame >= 60 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          You'll learn to build all of this inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
