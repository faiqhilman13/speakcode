import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Square Showcase Scene: What you can build - fuller grid layout
 */

const mockups = [
  { file: "dashboard-mockup-warm.png", label: "Dashboards", delay: 10 },
  { file: "landing-page-warm.png", label: "Web Apps", delay: 18 },
  { file: "mobile-app-mockup-warm.png", label: "Mobile", delay: 26 },
  { file: "video-editor-warm.png", label: "Videos", delay: 34 },
];

export const SquareShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const titleX = showTitle ? spring({ frame: frame - 5, fps, config: { damping: 20 } }) : 0;

  const floatOffset = Math.sin(frame * 0.06) * 5;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 14,
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
            fontSize: 22,
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Georgia, serif",
          fontSize: 280,
          fontWeight: 400,
          color: "rgba(26,26,26,0.04)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        BUILD
      </div>

      {/* 2x2 Grid of mockups - LARGER */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 25,
          right: 25,
          bottom: 130,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 18,
        }}
      >
        {mockups.map((mockup, i) => {
          const show = frame >= mockup.delay;
          const scale = show ? spring({ frame: frame - mockup.delay, fps, config: { damping: 14 } }) : 0;
          const opacity = show ? interpolate(frame - mockup.delay, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;
          const floatY = floatOffset * (i % 2 === 0 ? 1 : -1);

          return (
            <div
              key={i}
              style={{
                transform: `scale(${0.85 + scale * 0.15}) translateY(${floatY}px)`,
                opacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
                  border: "3px solid #1a1a1a",
                }}
              >
                <Img
                  src={staticFile(mockup.file)}
                  style={{ width: 260, height: "auto", display: "block" }}
                />
              </div>
              {/* Label */}
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FDF6E3",
                  background: "#FF5E5B",
                  padding: "6px 14px",
                  borderRadius: 5,
                }}
              >
                {mockup.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(0deg, #FDF6E3 80%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 20,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 36,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            opacity: showTitle ? 1 : 0,
            transform: `translateX(${(1 - titleX) * -15}px)`,
            textAlign: "center",
          }}
        >
          Students build
          <span style={{ color: "#FF5E5B", fontStyle: "italic" }}> real products.</span>
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "Georgia, serif",
            fontSize: 18,
            fontStyle: "italic",
            color: "rgba(26,26,26,0.5)",
            opacity: frame >= 60 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          Learn to build all of this inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
