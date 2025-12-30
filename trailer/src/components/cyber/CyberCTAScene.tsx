import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * NEURAL INTERFACE CTA SCENE
 * "SpeakCode. Master agentic coding. The skill of the decade."
 *
 * Aesthetic: Clean, dramatic finale - focused brand moment
 */

// Radial energy line
const EnergyLine: React.FC<{ angle: number; delay: number }> = ({ angle, delay }) => {
  const frame = useCurrentFrame();
  const show = frame >= delay;

  const length = show
    ? interpolate(frame - delay, [0, 25], [0, 600], { extrapolateRight: "clamp" })
    : 0;
  const opacity = show
    ? interpolate(frame - delay, [0, 10, 20, 30], [0, 0.3, 0.15, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: length,
        height: 1,
        background: "linear-gradient(90deg, #00fff2, transparent)",
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        opacity,
      }}
    />
  );
};

export const CyberCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const showLogo = frame >= 15;
  const logoScale = showLogo
    ? spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 80 } })
    : 0;
  const logoOpacity = showLogo
    ? interpolate(frame - 15, [0, 15], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Tagline animations
  const showTagline1 = frame >= 45;
  const showTagline2 = frame >= 65;

  const tagline1Opacity = showTagline1
    ? interpolate(frame - 45, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const tagline2Opacity = showTagline2
    ? interpolate(frame - 65, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // CTA button
  const showCTA = frame >= 90;
  const ctaOpacity = showCTA
    ? interpolate(frame - 90, [0, 15], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const ctaScale = showCTA
    ? spring({ frame: frame - 90, fps, config: { damping: 15 } })
    : 0;

  // Subtle glow pulse
  const glowPulse = 0.5 + Math.sin(frame * 0.08) * 0.1;
  const ctaGlow = 0.3 + Math.sin(frame * 0.12) * 0.1;

  // Central core pulse
  const corePulse = frame >= 5
    ? interpolate(frame - 5, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(0,255,242,0.08) 0%, transparent 50%)",
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

      {/* Energy lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <EnergyLine key={i} angle={i * 45} delay={8 + i * 2} />
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
          opacity: corePulse * 0.8,
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
        {/* Logo / Brand name */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 130,
            fontWeight: 700,
            color: "#e8e8e8",
            letterSpacing: "-0.02em",
            opacity: logoOpacity,
            transform: `scale(${0.9 + logoScale * 0.1})`,
            textShadow: `
              0 0 50px rgba(0,255,242,${glowPulse}),
              0 0 100px rgba(0,255,242,${glowPulse * 0.5})
            `,
            marginBottom: 35,
          }}
        >
          SpeakCode
        </div>

        {/* Tagline 1 */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 42,
            color: "#e8e8e8",
            opacity: tagline1Opacity,
            textShadow: "0 0 25px rgba(0,255,242,0.3)",
            marginBottom: 16,
          }}
        >
          Master <span style={{ color: "#00fff2" }}>agentic coding</span>.
        </div>

        {/* Tagline 2 */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 34,
            color: "#ff0080",
            opacity: tagline2Opacity,
            textShadow: "0 0 25px rgba(255,0,128,0.4)",
            marginBottom: 60,
          }}
        >
          The skill of the decade.
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${0.92 + ctaScale * 0.08})`,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
              fontSize: 24,
              fontWeight: 600,
              color: "#0a0a0f",
              background: "#00fff2",
              padding: "24px 65px",
              boxShadow: `0 0 40px rgba(0,255,242,${ctaGlow}), 0 15px 40px rgba(0,255,242,0.2)`,
              letterSpacing: "0.15em",
            }}
          >
            START LEARNING
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            marginTop: 35,
            opacity: ctaOpacity,
            letterSpacing: "0.2em",
          }}
        >
          SPEAKCODE.DEV
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{ position: "absolute", top: 35, left: 35, width: 60, height: 60, borderTop: "3px solid rgba(0,255,242,0.5)", borderLeft: "3px solid rgba(0,255,242,0.5)", opacity: frame > 25 ? 0.6 : 0 }} />
      <div style={{ position: "absolute", top: 35, right: 35, width: 60, height: 60, borderTop: "3px solid rgba(255,0,128,0.5)", borderRight: "3px solid rgba(255,0,128,0.5)", opacity: frame > 25 ? 0.6 : 0 }} />
      <div style={{ position: "absolute", bottom: 35, left: 35, width: 60, height: 60, borderBottom: "3px solid rgba(255,0,128,0.5)", borderLeft: "3px solid rgba(255,0,128,0.5)", opacity: frame > 25 ? 0.6 : 0 }} />
      <div style={{ position: "absolute", bottom: 35, right: 35, width: 60, height: 60, borderBottom: "3px solid rgba(0,255,242,0.5)", borderRight: "3px solid rgba(0,255,242,0.5)", opacity: frame > 25 ? 0.6 : 0 }} />

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          background: "linear-gradient(90deg, transparent, #00fff2, #ff0080, #00fff2, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
