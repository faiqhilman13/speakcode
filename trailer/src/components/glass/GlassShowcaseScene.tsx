import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass Showcase Scene: Floating app mockups with glass frames
 * Style: Cascading glass-framed mockups, gradient mesh background, depth layers
 */

const mockups = [
  { file: "dashboard-mockup-warm.png", label: "Dashboards", x: 80, y: 340, rotate: -4, delay: 12, width: 380, color: "#8B5CF6" },
  { file: "landing-page-warm.png", label: "Web Apps", x: 400, y: 300, rotate: 2, delay: 20, width: 400, color: "#EC4899" },
  { file: "mobile-app-mockup-warm.png", label: "Mobile Apps", x: 740, y: 380, rotate: -2, delay: 28, width: 280, color: "#3B82F6" },
  { file: "video-editor-warm.png", label: "Videos", x: 980, y: 320, rotate: 3, delay: 36, width: 360, color: "#10B981" },
  { file: "api-code-warm.png", label: "APIs & Code", x: 1280, y: 360, rotate: -3, delay: 44, width: 340, color: "#F59E0B" },
];

// Floating particles
const particles = Array.from({ length: 30 }, (_, i) => ({
  x: random(`show-x-${i}`) * 1920,
  y: random(`show-y-${i}`) * 1080,
  size: 3 + random(`show-size-${i}`) * 8,
  speed: 0.25 + random(`show-speed-${i}`) * 0.5,
  hue: 260 + random(`show-hue-${i}`) * 100,
}));

export const GlassShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;
  const titleX = showTitle ? spring({ frame: frame - 5, fps, config: { damping: 18 } }) : 0;

  // Floating animation for mockups
  const floatOffset = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0a18 0%, #1a0f25 50%, #0f0a18 100%)",
      }}
    >
      {/* Gradient mesh background */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.12)",
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.1)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "30%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.08)",
          filter: "blur(90px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: ((frame * p.speed * 0.4) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `hsla(${p.hue}, 60%, 55%, 0.3)`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Glass header */}
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
          zIndex: 100,
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
          What You Can Build
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 24,
            fontWeight: 300,
            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontSize: 320,
          fontWeight: 200,
          color: "rgba(255, 255, 255, 0.015)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        BUILD
      </div>

      {/* Cascading glass-framed mockups */}
      {mockups.map((mockup, i) => {
        const show = frame >= mockup.delay;
        const scale = show ? spring({ frame: frame - mockup.delay, fps, config: { damping: 15 } }) : 0;
        const opacity = show ? interpolate(frame - mockup.delay, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0;
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
            {/* Glass frame */}
            <div
              style={{
                padding: 10,
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                borderRadius: 18,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${mockup.color}15`,
              }}
            >
              <Img
                src={staticFile(mockup.file)}
                style={{
                  width: mockup.width,
                  height: "auto",
                  display: "block",
                  borderRadius: 10,
                }}
              />
            </div>

            {/* Label badge */}
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: "50%",
                transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${mockup.color}, ${mockup.color}CC)`,
                padding: "8px 18px",
                borderRadius: 20,
                fontFamily: "'SF Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fff",
                whiteSpace: "nowrap",
                boxShadow: `0 8px 20px ${mockup.color}40`,
              }}
            >
              {mockup.label}
            </div>
          </div>
        );
      })}

      {/* Bottom content area with gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(0deg, rgba(15, 10, 24, 1) 40%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 40,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 44,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: "-0.01em",
            opacity: showTitle ? 1 : 0,
            transform: `translateX(${(1 - titleX) * -25}px)`,
            textAlign: "center",
          }}
        >
          Students are building{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 500,
            }}
          >
            real products.
          </span>
        </div>
        <div
          style={{
            marginTop: 14,
            opacity: frame >= 60 ? interpolate(frame - 60, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "10px 24px",
              borderRadius: 20,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 18,
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              You'll learn to build all of this inside SpeakCode.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
