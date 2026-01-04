import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Vertical Showcase Scene: 2x2 mockup grid with larger images
 * More breathing room between elements
 */

const mockups = [
  { file: "dashboard-mockup-warm.png", label: "Dashboards", delay: 10 },
  { file: "landing-page-warm.png", label: "Web Apps", delay: 18 },
  { file: "mobile-app-mockup-warm.png", label: "Mobile Apps", delay: 26 },
  { file: "video-editor-warm.png", label: "Videos", delay: 34 },
];

export const VerticalShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const titleX = showTitle ? spring({ frame: frame - 5, fps, config: { damping: 20 } }) : 0;

  // Floating animation for mockups
  const floatOffset = Math.sin(frame * 0.06) * 5;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar - taller */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 30,
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
            fontSize: 40,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showTitle ? 1 : 0,
          }}
        >
          What students ship
        </div>
      </div>

      {/* Bottom bar with title - larger */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 250,
          background: "linear-gradient(0deg, #FDF6E3 60%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 50,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 72,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            opacity: showTitle ? 1 : 0,
            transform: `translateX(${(1 - titleX) * -25}px)`,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Students are building
          <span style={{ display: "block", color: "#FF5E5B", fontStyle: "italic" }}> real products.</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: "Georgia, serif",
            fontSize: 34,
            fontStyle: "italic",
            color: "rgba(26,26,26,0.5)",
            opacity: frame >= 60 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
            textAlign: "center",
          }}
        >
          You'll learn to build all of this inside SpeakCode.
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
          fontSize: 450,
          fontWeight: 400,
          color: "rgba(26,26,26,0.03)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        BUILD
      </div>

      {/* 2x2 Mockup Grid - FIXED SIZES, NO OVERFLOW */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 30,
          right: 30,
          bottom: 400,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          rowGap: 0,
          columnGap: 10,
          padding: "0px 10px",
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                opacity,
                transform: `translateY(${floatY}px) scale(${0.85 + scale * 0.15})`,
                minWidth: 0,
              }}
            >
              {/* Image wrapper - same size for all */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  border: "3px solid #1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: "4/3",
                }}
              >
                <Img
                  src={staticFile(mockup.file)}
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              {/* Label */}
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 22,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  background: "#FF5E5B",
                  padding: "10px 24px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                }}
              >
                {mockup.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
