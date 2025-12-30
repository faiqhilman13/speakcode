import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * NEURAL INTERFACE OLD WAY SCENE - REDESIGNED
 * "The old path? Years of tutorials. Endless debugging. Pure frustration."
 *
 * NEW LAYOUT: Centered dramatic "SYSTEM FAILURE" aesthetic
 * Full-screen impact with elements converging to center
 */

// Error log line component - now positioned absolutely
const FloatingError: React.FC<{
  text: string;
  delay: number;
  x: number;
  y: number;
  type: "error" | "warn" | "fatal";
}> = ({ text, delay, x, y, type }) => {
  const frame = useCurrentFrame();
  const show = frame >= delay;
  const opacity = show
    ? interpolate(frame - delay, [0, 8, 60, 80], [0, 0.6, 0.6, 0.2], { extrapolateRight: "clamp" })
    : 0;

  const colors = { error: "#ff4444", warn: "#ffaa00", fatal: "#ff0055" };
  const labels = { error: "ERR", warn: "WRN", fatal: "FTL" };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontSize: 14,
      }}
    >
      <span style={{ color: colors[type] }}>[{labels[type]}]</span>
      <span style={{ color: "rgba(255,255,255,0.4)" }}>{text}</span>
    </div>
  );
};

// Glitch bar component
const GlitchBar: React.FC<{ delay: number; y: number; width: number }> = ({ delay, y, width }) => {
  const frame = useCurrentFrame();
  const show = frame >= delay;
  const opacity = show
    ? interpolate(frame - delay, [0, 2, 4, 6], [0, 0.8, 0.3, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${50 - width / 2}%`,
        top: y,
        width: `${width}%`,
        height: 2,
        background: "#ff4444",
        opacity,
        boxShadow: "0 0 20px #ff4444",
      }}
    />
  );
};

export const CyberOldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central title animation
  const showTitle = frame >= 8;
  const titleScale = showTitle
    ? spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 100 } })
    : 0;
  const titleOpacity = showTitle
    ? interpolate(frame - 8, [0, 15], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Pain points - staggered from different directions
  const painPoints = [
    { label: "Years of tutorials", stat: "2,190+ days", angle: -30, distance: 280, delay: 25 },
    { label: "Endless debugging", stat: "∞ stack traces", angle: 0, distance: 320, delay: 38 },
    { label: "Pure frustration", stat: "BURNOUT", angle: 30, distance: 280, delay: 51 },
  ];

  // Warning pulse
  const warningPulse = 0.4 + Math.sin(frame * 0.15) * 0.2;

  // Screen shake effect
  const shakeX = frame > 70 ? Math.sin(frame * 2) * 2 : 0;
  const shakeY = frame > 70 ? Math.cos(frame * 2.5) * 1.5 : 0;

  return (
    <AbsoluteFill style={{ background: "#0a0a0f", transform: `translate(${shakeX}px, ${shakeY}px)` }}>
      {/* Radial warning gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(255,68,68,${warningPulse * 0.08}) 0%, transparent 60%)`,
        }}
      />

      {/* Scan lines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating error messages - scattered around screen */}
      <FloatingError text="Tutorial hell detected" delay={15} x={80} y={120} type="warn" />
      <FloatingError text="Motivation.exe has stopped" delay={22} x={1400} y={180} type="error" />
      <FloatingError text="Time.waste() overflow" delay={30} x={120} y={750} type="error" />
      <FloatingError text="Stack overflow dependency" delay={38} x={1300} y={820} type="warn" />
      <FloatingError text="CRITICAL: Burnout imminent" delay={55} x={100} y={450} type="fatal" />
      <FloatingError text="Process terminated" delay={65} x={1350} y={500} type="fatal" />

      {/* Glitch bars */}
      <GlitchBar delay={20} y={200} width={40} />
      <GlitchBar delay={35} y={400} width={60} />
      <GlitchBar delay={50} y={600} width={35} />
      <GlitchBar delay={68} y={300} width={80} />
      <GlitchBar delay={75} y={700} width={50} />

      {/* CENTER: Main dramatic content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* System status badge */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "#ff4444",
            letterSpacing: "0.3em",
            marginBottom: 30,
            opacity: titleOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#ff4444",
              boxShadow: `0 0 ${10 + warningPulse * 10}px #ff4444`,
            }}
          />
          SYS.LEGACY_PATH // DEPRECATED
        </div>

        {/* Main title - MASSIVE centered */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 120,
            fontWeight: 700,
            color: "#e8e8e8",
            textAlign: "center",
            opacity: titleOpacity,
            transform: `scale(${0.8 + titleScale * 0.2})`,
            textShadow: `0 0 60px rgba(255,68,68,${warningPulse})`,
            letterSpacing: "-0.02em",
          }}
        >
          The old path<span style={{ color: "#ff4444" }}>?</span>
        </div>

        {/* Pain points - radiate outward from center */}
        {painPoints.map((point, i) => {
          const show = frame >= point.delay;
          const progress = show
            ? spring({ frame: frame - point.delay, fps, config: { damping: 18 } })
            : 0;

          const rad = (point.angle * Math.PI) / 180;
          const x = Math.sin(rad) * point.distance * progress;
          const y = Math.cos(rad) * (point.distance * 0.4) * progress + 180;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), ${y}px)`,
                opacity: show ? interpolate(frame - point.delay, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                  fontSize: 32,
                  color: "#e8e8e8",
                  marginBottom: 8,
                }}
              >
                {point.label}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                  fontSize: 18,
                  color: "#ff4444",
                  letterSpacing: "0.1em",
                }}
              >
                {point.stat}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: frame > 60 ? interpolate(frame - 60, [0, 15], [0, 0.7], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "rgba(255,68,68,0.6)",
          }}
        >
          $ ./learn-to-code.sh --traditional
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "#ff4444",
          }}
        >
          EXIT CODE: TIMEOUT
        </div>
      </div>

      {/* Top/bottom warning stripes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent 20%, rgba(255,68,68,${warningPulse}) 50%, transparent 80%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent 20%, rgba(255,68,68,${warningPulse}) 50%, transparent 80%)`,
        }}
      />
    </AbsoluteFill>
  );
};
