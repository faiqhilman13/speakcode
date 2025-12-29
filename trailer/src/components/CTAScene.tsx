import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * CTA Scene: Final call to action
 * Layout: Bold, centered with celebration image
 */

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showImage = frame >= 5;
  const showLogo = frame >= 20;
  const showTagline = frame >= 45;
  const showButton = frame >= 65;
  const showSubtext = frame >= 85;

  const imageOpacity = showImage ? interpolate(frame - 5, [0, 20], [0, 0.3], { extrapolateRight: "clamp" }) : 0;
  const logoScale = showLogo ? spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const taglineY = showTagline ? spring({ frame: frame - 45, fps, config: { damping: 15 } }) * 25 : 0;
  const buttonScale = showButton ? spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 120 } }) : 0;

  // Pulse animation for button
  const buttonPulse = showButton ? 1 + Math.sin((frame - 65) * 0.15) * 0.02 : 1;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", justifyContent: "center", alignItems: "center" }}>
      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "#FDF6E3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
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
            fontSize: 28,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showLogo ? 1 : 0,
          }}
        >
          Join now
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
          left: 30,
          width: 120,
          height: 120,
          borderLeft: "3px solid rgba(255,94,91,0.4)",
          borderTop: "3px solid rgba(255,94,91,0.4)",
          opacity: showLogo ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 110,
          right: 30,
          width: 120,
          height: 120,
          borderRight: "3px solid rgba(255,94,91,0.4)",
          borderBottom: "3px solid rgba(255,94,91,0.4)",
          opacity: showLogo ? 1 : 0,
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            marginBottom: 35,
            opacity: showLogo ? 1 : 0,
            transform: `scale(${0.92 + logoScale * 0.08})`,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 100,
              height: 100,
              background: "#FF5E5B",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              boxShadow: "0 10px 40px rgba(255,94,91,0.5)",
            }}
          >
            ⚡
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 90,
              fontWeight: 400,
              color: "#FDF6E3",
              letterSpacing: "-0.02em",
            }}
          >
            SpeakCode
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 44,
            fontStyle: "italic",
            color: "rgba(253,246,227,0.75)",
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
            transform: `scale(${(0.92 + buttonScale * 0.08) * buttonPulse})`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 18,
              background: "#FF5E5B",
              padding: "28px 60px",
              borderRadius: 10,
              fontFamily: "Georgia, serif",
              fontSize: 28,
              color: "#FDF6E3",
              boxShadow: "0 15px 50px rgba(255,94,91,0.5)",
            }}
          >
            Enroll Now
            <span style={{ fontSize: 24 }}>→</span>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 35,
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            color: "rgba(253,246,227,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            opacity: showSubtext ? interpolate(frame - 85, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
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
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FDF6E3",
          }}
        >
          speakcode.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
