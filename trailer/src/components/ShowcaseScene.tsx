import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Showcase Scene: What you can build
 * Layout: Large mockups, dense capability list
 */

const capabilities = [
  "Web Apps",
  "Mobile Apps",
  "APIs",
  "Dashboards",
  "Automations",
  "AI Tools",
];

export const ShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 8;
  const titleX = showTitle ? spring({ frame: frame - 8, fps, config: { damping: 20 } }) : 0;

  const showMockup1 = frame >= 25;
  const showMockup2 = frame >= 40;
  const mockup1Scale = showMockup1 ? spring({ frame: frame - 25, fps, config: { damping: 12 } }) : 0;
  const mockup2Scale = showMockup2 ? spring({ frame: frame - 40, fps, config: { damping: 12 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Top header bar */}
      <div
        style={{
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
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
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
            fontSize: 32,
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
          fontSize: 450,
          fontWeight: 400,
          color: "rgba(26,26,26,0.025)",
          whiteSpace: "nowrap",
        }}
      >
        BUILD
      </div>

      {/* Content */}
      <div style={{ padding: "130px 60px 50px 60px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 68,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              opacity: showTitle ? 1 : 0,
              transform: `translateX(${(1 - titleX) * -25}px)`,
            }}
          >
            Students are building
            <span style={{ color: "#FF5E5B", fontStyle: "italic" }}> real products.</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flex: 1, gap: 40 }}>
          {/* Left: Mockups - stacked, larger */}
          <div style={{ flex: 1.3, display: "flex", gap: 25, alignItems: "center", position: "relative" }}>
            {/* Dashboard mockup - front */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: `translateY(-50%) scale(${0.92 + mockup1Scale * 0.08}) rotate(-3deg)`,
                opacity: showMockup1 ? 1 : 0,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
                border: "3px solid #1a1a1a",
                zIndex: 2,
              }}
            >
              <Img
                src={staticFile("dashboard-mockup.png")}
                style={{ width: 520, height: "auto", display: "block" }}
              />
            </div>

            {/* Mobile mockup - back */}
            <div
              style={{
                position: "absolute",
                right: 80,
                top: "50%",
                transform: `translateY(-50%) scale(${0.92 + mockup2Scale * 0.08}) rotate(3deg)`,
                opacity: showMockup2 ? 1 : 0,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
                border: "3px solid #1a1a1a",
                zIndex: 1,
              }}
            >
              <Img
                src={staticFile("mobile-app-mockup.png")}
                style={{ width: 500, height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Right: Capabilities - grid layout */}
          <div style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 12,
          }}>
            {capabilities.map((cap, i) => {
              const delay = 50 + i * 8;
              const show = frame >= delay;
              const itemX = show ? spring({ frame: frame - delay, fps, config: { damping: 15 } }) * 18 : 0;
              const itemOpacity = show ? interpolate(frame - delay, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    opacity: itemOpacity,
                    transform: `translateX(${18 - itemX}px)`,
                    background: "rgba(26,26,26,0.04)",
                    padding: "16px 20px",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: "#FF5E5B",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 30,
                      color: "#1a1a1a",
                    }}
                  >
                    {cap}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            marginTop: 15,
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "rgba(26,26,26,0.6)",
            textAlign: "center",
            opacity: frame >= 120 ? interpolate(frame - 120, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          You'll learn to build all of this inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
