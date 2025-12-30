import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * NEURAL INTERFACE SHOWCASE SCENE - REDESIGNED
 * "Apps, dashboards, videos, documents. You'll build them all."
 *
 * NEW LAYOUT: Full-screen cascading gallery with floating mockups
 * No more left/right split - mockups scattered across entire screen
 */

const mockups = [
  { file: "dashboard-mockup.png", label: "DASHBOARDS", x: 80, y: 180, rotate: -5, delay: 8, width: 480, color: "#00fff2" },
  { file: "landing-page-mockup.png", label: "WEB APPS", x: 480, y: 80, rotate: 3, delay: 16, width: 520, color: "#ff0080" },
  { file: "mobile-app-mockup.png", label: "MOBILE", x: 920, y: 220, rotate: -2, delay: 24, width: 340, color: "#00ff88" },
  { file: "video-editor-mockup.png", label: "VIDEOS", x: 1180, y: 60, rotate: 4, delay: 32, width: 460, color: "#ffaa00" },
  { file: "pitch-deck-mockup.png", label: "PITCH DECKS", x: 1420, y: 320, rotate: -3, delay: 40, width: 420, color: "#aa88ff" },
];

export const CyberShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating animation
  const floatOffset = Math.sin(frame * 0.05) * 8;

  // Title animation
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, config: { damping: 20 } });

  // Glow pulse
  const glowPulse = 0.4 + Math.sin(frame * 0.08) * 0.15;

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, rgba(0,255,242,0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,242,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,242,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          fontSize: 300,
          fontWeight: 800,
          color: "rgba(0,255,242,0.03)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.05em",
        }}
      >
        BUILD
      </div>

      {/* Cascading mockups */}
      {mockups.map((mockup, i) => {
        const show = frame >= mockup.delay;
        const scale = show
          ? spring({ frame: frame - mockup.delay, fps, config: { damping: 14 } })
          : 0;
        const opacity = show
          ? interpolate(frame - mockup.delay, [0, 15], [0, 1], { extrapolateRight: "clamp" })
          : 0;

        // Alternating float direction
        const floatY = floatOffset * (i % 2 === 0 ? 1 : -0.8);
        const floatX = Math.cos(frame * 0.04 + i) * 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mockup.x + floatX,
              top: mockup.y + floatY,
              transform: `scale(${0.85 + scale * 0.15}) rotate(${mockup.rotate}deg)`,
              opacity,
              zIndex: 10 + i,
            }}
          >
            {/* Mockup container */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 0 60px ${mockup.color}20, 0 30px 60px rgba(0,0,0,0.4)`,
                border: `2px solid ${mockup.color}40`,
              }}
            >
              <Img
                src={staticFile(mockup.file)}
                style={{
                  width: mockup.width,
                  height: "auto",
                  display: "block",
                }}
              />

              {/* Scan line effect */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: ((frame * 2 + i * 50) % 400) - 10,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${mockup.color}40, transparent)`,
                }}
              />
            </div>

            {/* Label badge */}
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                fontSize: 14,
                letterSpacing: "0.15em",
                color: "#0a0a0f",
                background: mockup.color,
                padding: "8px 18px",
                whiteSpace: "nowrap",
                boxShadow: `0 0 20px ${mockup.color}60`,
              }}
            >
              {mockup.label}
            </div>
          </div>
        );
      })}

      {/* Bottom content bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(0deg, #0a0a0f 40%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 40,
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 56,
            fontWeight: 600,
            color: "#e8e8e8",
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${20 - titleY * 20}px)`,
            textShadow: `0 0 40px rgba(0,255,242,${glowPulse * 0.4})`,
            marginBottom: 15,
          }}
        >
          Students are building <span style={{ color: "#ff0080" }}>real products</span>.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            opacity: frame >= 50 ? interpolate(frame - 50, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          You'll learn to build all of this inside{" "}
          <span style={{ color: "#00fff2" }}>SpeakCode</span>.
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 30, left: 30, width: 50, height: 50, borderTop: "2px solid rgba(0,255,242,0.5)", borderLeft: "2px solid rgba(0,255,242,0.5)" }} />
      <div style={{ position: "absolute", top: 30, right: 30, width: 50, height: 50, borderTop: "2px solid rgba(255,0,128,0.5)", borderRight: "2px solid rgba(255,0,128,0.5)" }} />

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "#00fff2",
            letterSpacing: "0.15em",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#00fff2",
              boxShadow: "0 0 10px #00fff2",
            }}
          />
          OUTPUT.GALLERY
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          STUDENT PROJECTS
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #00fff2, #ff0080, #00ff88, #ffaa00, #aa88ff)",
        }}
      />
    </AbsoluteFill>
  );
};
