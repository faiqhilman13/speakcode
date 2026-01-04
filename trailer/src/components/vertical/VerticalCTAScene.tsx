import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Vertical CTA Scene: Final call to action
 * Stacked vertically: logo, tagline, button
 */

export const VerticalCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showImage = frame >= 5;
  const showLogo = frame >= 20;
  const showTagline = frame >= 45;
  const showButton = frame >= 65;
  const showSubtext = frame >= 85;

  const imageOpacity = showImage ? interpolate(frame - 5, [0, 20], [0, 0.3], { extrapolateRight: "clamp" }) : 0;
  const logoScale = showLogo ? spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const taglineY = showTagline ? spring({ frame: frame - 45, fps, config: { damping: 15 } }) * 30 : 0;
  const buttonScale = showButton ? spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 120 } }) : 0;

  // Pulse animation for button
  const buttonPulse = showButton ? 1 + Math.sin((frame - 65) * 0.15) * 0.02 : 1;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", justifyContent: "center", alignItems: "center" }}>
      {/* Top header bar - taller */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 32,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.6)",
            opacity: showLogo ? 1 : 0,
          }}
        >
          Ready to Start?
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 42,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showLogo ? 1 : 0,
          }}
        >
          Join now
        </div>
      </div>

      {/* Bottom bar - taller */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: showButton ? 1 : 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 34,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FDF6E3",
          }}
        >
          speakcode.com
        </div>
      </div>

      {/* Background celebration image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("course-celebration.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: "rgba(26,26,26,0.75)",
        }}
      />

      {/* Background grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 35,
          width: 140,
          height: 140,
          borderLeft: "4px solid rgba(255,94,91,0.4)",
          borderTop: "4px solid rgba(255,94,91,0.4)",
          opacity: showLogo ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 130,
          right: 35,
          width: 140,
          height: 140,
          borderRight: "4px solid rgba(255,94,91,0.4)",
          borderBottom: "4px solid rgba(255,94,91,0.4)",
          opacity: showLogo ? 1 : 0,
        }}
      />

      {/* Main content - stacked vertically */}
      <div style={{ textAlign: "center", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 35 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            opacity: showLogo ? 1 : 0,
            transform: `scale(${0.92 + logoScale * 0.08})`,
          }}
        >
          {/* Icon - larger */}
          <div
            style={{
              width: 130,
              height: 130,
              background: "#FF5E5B",
              borderRadius: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 65,
              boxShadow: "0 20px 60px rgba(255,94,91,0.5)",
            }}
          >
            ⚡
          </div>

          {/* Name - larger */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 100,
              fontWeight: 400,
              color: "#FDF6E3",
              letterSpacing: "-0.02em",
            }}
          >
            SpeakCode
          </div>
        </div>

        {/* Tagline - larger */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 50,
            fontStyle: "italic",
            color: "rgba(253,246,227,0.75)",
            opacity: showTagline ? 1 : 0,
            transform: `translateY(${30 - taglineY}px)`,
          }}
        >
          Master agentic coding.
        </div>

        {/* CTA Button - larger */}
        <div
          style={{
            opacity: showButton ? 1 : 0,
            transform: `scale(${(0.92 + buttonScale * 0.08) * buttonPulse})`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              background: "#FF5E5B",
              padding: "40px 80px",
              borderRadius: 16,
              fontFamily: "Georgia, serif",
              fontSize: 40,
              color: "#FDF6E3",
              boxShadow: "0 25px 70px rgba(255,94,91,0.5)",
            }}
          >
            Enroll Now
            <span style={{ fontSize: 34 }}>→</span>
          </div>
        </div>

        {/* Subtext - larger */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 24,
            color: "rgba(253,246,227,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            opacity: showSubtext ? interpolate(frame - 85, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          The skill of the decade
        </div>
      </div>
    </AbsoluteFill>
  );
};
