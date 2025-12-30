import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * NEURAL INTERFACE SHIFT SCENE
 * "Then AI changed everything."
 *
 * Aesthetic: Clean system reboot - precise energy burst, not chaotic flash
 */

// Radial progress ring
const EnergyRing: React.FC<{ radius: number; delay: number; color: string }> = ({
  radius, delay, color
}) => {
  const frame = useCurrentFrame();
  const show = frame >= delay;

  const scale = show
    ? interpolate(frame - delay, [0, 30], [0, radius / 100], { extrapolateRight: "clamp" })
    : 0;
  const opacity = show
    ? interpolate(frame - delay, [0, 10, 25, 40], [0, 0.6, 0.4, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 100,
        height: 100,
        transform: `translate(-50%, -50%) scale(${scale})`,
        border: `2px solid ${color}`,
        borderRadius: "50%",
        opacity,
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
};

// Directional light ray
const LightRay: React.FC<{ angle: number; delay: number }> = ({ angle, delay }) => {
  const frame = useCurrentFrame();
  const show = frame >= delay;

  const length = show
    ? interpolate(frame - delay, [0, 20], [0, 800], { extrapolateRight: "clamp" })
    : 0;
  const opacity = show
    ? interpolate(frame - delay, [0, 8, 15, 25], [0, 0.4, 0.2, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: length,
        height: 2,
        background: `linear-gradient(90deg, #00fff2, transparent)`,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        opacity,
      }}
    />
  );
};

export const CyberShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash at start
  const flashOpacity = frame < 8
    ? interpolate(frame, [0, 4, 8], [0.8, 0.6, 0])
    : 0;

  // Text reveal
  const showText = frame >= 25;
  const textOpacity = showText
    ? interpolate(frame - 25, [0, 15], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const textScale = showText
    ? spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 80 } })
    : 0;

  // Subtle glow pulse
  const glowPulse = 0.5 + Math.sin(frame * 0.1) * 0.15;

  // System status animation
  const statusProgress = interpolate(frame, [35, 70], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#00fff2",
          opacity: flashOpacity,
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
          opacity: frame > 15 ? 1 : 0,
        }}
      />

      {/* Energy rings - clean expansion */}
      <EnergyRing radius={200} delay={3} color="#00fff2" />
      <EnergyRing radius={350} delay={6} color="rgba(0,255,242,0.6)" />
      <EnergyRing radius={500} delay={9} color="rgba(0,255,242,0.3)" />

      {/* Light rays - geometric precision */}
      {Array.from({ length: 8 }).map((_, i) => (
        <LightRay key={i} angle={i * 45} delay={5 + i * 2} />
      ))}

      {/* Central core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 20,
          height: 20,
          background: "#00fff2",
          boxShadow: `0 0 40px #00fff2, 0 0 80px rgba(0,255,242,0.5)`,
          opacity: frame > 5 ? interpolate(frame - 5, [0, 10, 20], [0, 1, 0.6]) : 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* System reboot indicator */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 22,
            color: "rgba(0,255,242,0.6)",
            letterSpacing: "0.2em",
            marginBottom: 35,
            opacity: frame > 20 ? interpolate(frame - 20, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          {">"} PARADIGM_SHIFT.INIT
        </div>

        {/* Main text */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 82,
            fontWeight: 600,
            color: "#e8e8e8",
            textAlign: "center",
            opacity: textOpacity,
            transform: `scale(${0.9 + textScale * 0.1})`,
            textShadow: `0 0 50px rgba(0,255,242,${glowPulse * 0.4})`,
            letterSpacing: "-0.01em",
          }}
        >
          Then <span style={{ color: "#00fff2", textShadow: `0 0 40px rgba(0,255,242,${glowPulse})` }}>AI</span> changed
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 100,
            fontWeight: 700,
            color: "#ff0080",
            textAlign: "center",
            opacity: textOpacity,
            transform: `scale(${0.9 + textScale * 0.1})`,
            textShadow: `0 0 60px rgba(255,0,128,${glowPulse})`,
            marginTop: 15,
            letterSpacing: "-0.01em",
          }}
        >
          everything.
        </div>
      </div>

      {/* System status - corners */}
      <div
        style={{
          position: "absolute",
          top: 45,
          left: 60,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          fontSize: 17,
          color: "rgba(0,255,242,0.5)",
          opacity: frame > 30 ? 1 : 0,
        }}
      >
        <div style={{ marginBottom: 6 }}>SYS.REBOOT</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: "#00ff88",
              boxShadow: "0 0 8px #00ff88",
            }}
          />
          <span style={{ color: "#00ff88" }}>ONLINE</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 45,
          right: 60,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          fontSize: 17,
          color: "rgba(0,255,242,0.5)",
          textAlign: "right",
          opacity: frame > 30 ? 1 : 0,
        }}
      >
        <div style={{ marginBottom: 6 }}>MODE: AGENTIC</div>
        <div style={{ color: "#00fff2" }}>v2.0.25</div>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 100,
          right: 100,
          opacity: frame > 35 ? 1 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
          }}
        >
          <span>LOADING NEW_PARADIGM</span>
          <span style={{ color: "#00fff2" }}>{Math.floor(statusProgress)}%</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 6,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${statusProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #00fff2, #00ff88)",
              boxShadow: "0 0 15px #00fff2",
            }}
          />
        </div>
      </div>

      {/* Corner brackets */}
      {[
        { top: 30, left: 30, borderTop: "2px solid", borderLeft: "2px solid" },
        { top: 30, right: 30, borderTop: "2px solid", borderRight: "2px solid" },
        { bottom: 30, left: 30, borderBottom: "2px solid", borderLeft: "2px solid" },
        { bottom: 30, right: 30, borderBottom: "2px solid", borderRight: "2px solid" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 35,
            height: 35,
            borderColor: "rgba(0,255,242,0.4)",
            opacity: frame > 25 ? 0.6 : 0,
            ...style,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
