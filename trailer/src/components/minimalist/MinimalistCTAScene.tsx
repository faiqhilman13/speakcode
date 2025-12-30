import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist CTA Scene: Final call to action
 * Style: Bold, centered, clean geometric focus
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

export const MinimalistCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLogo = frame >= 15;
  const showTagline = frame >= 40;
  const showButton = frame >= 60;
  const showSubtext = frame >= 85;

  const logoScale = showLogo
    ? spring({ frame: frame - 15, fps, config: { damping: 15, stiffness: 100 } })
    : 0;
  const taglineY = showTagline
    ? spring({ frame: frame - 40, fps, config: { damping: 18 } }) * 25
    : 0;
  const buttonScale = showButton
    ? spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 100 } })
    : 0;

  // Subtle pulse for button
  const buttonPulse = showButton ? 1 + Math.sin((frame - 60) * 0.12) * 0.015 : 1;

  // Breathing animation for geometric elements
  const breathe = 1 + Math.sin(frame * 0.06) * 0.02;

  return (
    <AbsoluteFill style={{ background: "#0A0A0A" }}>
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner geometric accents */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 100,
          height: 100,
          borderLeft: "2px solid #0066FF",
          borderTop: "2px solid #0066FF",
          opacity: showLogo ? interpolate(frame - 15, [0, 15], [0, 0.6], { extrapolateRight: "clamp" }) : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 60,
          width: 100,
          height: 100,
          borderRight: "2px solid #0066FF",
          borderBottom: "2px solid #0066FF",
          opacity: showLogo ? interpolate(frame - 15, [0, 15], [0, 0.6], { extrapolateRight: "clamp" }) : 0,
        }}
      />

      {/* Center geometric element - breathing circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${breathe})`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(0,102,255,0.15)",
          opacity: showLogo ? 0.5 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${breathe * 0.7})`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(0,102,255,0.1)",
          opacity: showLogo ? 0.5 : 0,
        }}
      />

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(10,10,10,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: showLogo ? 1 : 0,
          }}
        >
          Ready to Start?
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: "#0066FF",
            opacity: showLogo ? 1 : 0,
          }}
        >
          Join now
        </div>
      </div>

      {/* Main content - centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: 40,
            opacity: showLogo ? 1 : 0,
            transform: `scale(${0.9 + logoScale * 0.1})`,
          }}
        >
          {/* Geometric icon */}
          <div
            style={{
              width: 80,
              height: 80,
              background: "#0066FF",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <polygon
                points="20,5 35,30 5,30"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 300,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            SpeakCode
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 36,
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 50,
            opacity: showTagline ? 1 : 0,
            transform: `translateY(${25 - taglineY}px)`,
          }}
        >
          Master agentic coding.
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: showButton ? 1 : 0,
            transform: `scale(${(0.9 + buttonScale * 0.1) * buttonPulse})`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              background: "#0066FF",
              padding: "24px 48px",
              borderRadius: 4,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
            }}
          >
            Enroll Now
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M4 10 L14 10 M10 5 L15 10 L10 15"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 40,
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: showSubtext
              ? interpolate(frame - 85, [0, 12], [0, 1], { extrapolateRight: "clamp" })
              : 0,
          }}
        >
          The skill of the decade
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#0066FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: showButton ? 1 : 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "#FFFFFF",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          speakcode.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
