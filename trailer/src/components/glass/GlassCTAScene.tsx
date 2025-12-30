import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass CTA Scene: Final call to action with dramatic glass effects
 * Style: Central glass panel, gradient mesh, floating celebration elements
 */

// Floating particles for celebration
const particles = Array.from({ length: 40 }, (_, i) => ({
  x: random(`cta-x-${i}`) * 1920,
  y: random(`cta-y-${i}`) * 1080,
  size: 3 + random(`cta-size-${i}`) * 10,
  speed: 0.3 + random(`cta-speed-${i}`) * 0.8,
  hue: 260 + random(`cta-hue-${i}`) * 80,
  delay: random(`cta-delay-${i}`) * 20,
}));

// Rising confetti-like elements
const confetti = Array.from({ length: 25 }, (_, i) => ({
  x: random(`conf-x-${i}`) * 1920,
  startY: 1100 + random(`conf-y-${i}`) * 200,
  size: 4 + random(`conf-size-${i}`) * 8,
  speed: 1.5 + random(`conf-speed-${i}`) * 2,
  wobble: random(`conf-wobble-${i}`) * 4,
  hue: [280, 320, 220, 160, 30][Math.floor(random(`conf-hue-${i}`) * 5)],
}));

export const GlassCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showImage = frame >= 5;
  const showLogo = frame >= 20;
  const showTagline = frame >= 45;
  const showButton = frame >= 65;
  const showSubtext = frame >= 90;

  const imageOpacity = showImage ? interpolate(frame - 5, [0, 25], [0, 0.35], { extrapolateRight: "clamp" }) : 0;
  const logoScale = showLogo ? spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 120 } }) : 0;
  const taglineY = showTagline ? spring({ frame: frame - 45, fps, config: { damping: 16 } }) * 30 : 0;
  const buttonScale = showButton ? spring({ frame: frame - 65, fps, config: { damping: 12, stiffness: 140 } }) : 0;

  // Pulse animation for button
  const buttonPulse = showButton ? 1 + Math.sin((frame - 65) * 0.12) * 0.02 : 1;

  // Gradient animation
  const gradientHue = interpolate(frame, [0, 150], [260, 290], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          hsl(${gradientHue}, 35%, 8%) 0%,
          hsl(${gradientHue + 20}, 40%, 12%) 50%,
          hsl(${gradientHue - 10}, 30%, 8%) 100%)`,
      }}
    >
      {/* Animated gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.15)",
          filter: "blur(120px)",
          transform: `scale(${1 + Math.sin(frame * 0.02) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.12)",
          filter: "blur(100px)",
          transform: `scale(${1 + Math.cos(frame * 0.025) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "40%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.1)",
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
            top: ((frame * p.speed * 0.3) + p.y) % 1300 - 100,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `hsla(${p.hue}, 65%, 55%, 0.35)`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Rising confetti */}
      {showButton && confetti.map((c, i) => {
        const confettiFrame = frame - 65;
        const yPos = c.startY - (confettiFrame * c.speed * 1.5);
        const xWobble = Math.sin(confettiFrame * 0.1 + i) * c.wobble * 10;
        const opacity = interpolate(yPos, [1100, 800, 200, -50], [0, 0.8, 0.6, 0], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.x + xWobble,
              top: yPos,
              width: c.size,
              height: c.size * 1.5,
              borderRadius: 3,
              background: `hsla(${c.hue}, 70%, 60%, ${opacity})`,
              transform: `rotate(${confettiFrame * 3 + i * 45}deg)`,
            }}
          />
        );
      })}

      {/* Glass header */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          right: 40,
          height: 80,
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 20,
          opacity: showLogo ? 1 : 0,
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
          Ready to Start?
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
          Join now
        </div>
      </div>

      {/* Background image */}
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
            filter: "blur(3px)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: "rgba(10, 8, 20, 0.75)",
        }}
      />

      {/* Corner glass accents */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 40,
          width: 100,
          height: 100,
          borderLeft: "2px solid rgba(139, 92, 246, 0.4)",
          borderTop: "2px solid rgba(139, 92, 246, 0.4)",
          borderRadius: "20px 0 0 0",
          opacity: showLogo ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 40,
          width: 100,
          height: 100,
          borderRight: "2px solid rgba(236, 72, 153, 0.4)",
          borderBottom: "2px solid rgba(236, 72, 153, 0.4)",
          borderRadius: "0 0 20px 0",
          opacity: showLogo ? 1 : 0,
        }}
      />

      {/* Main content - central glass panel */}
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
        {/* Glass card container */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: 40,
            padding: "60px 80px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.4), 0 0 80px rgba(139, 92, 246, 0.1)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 25,
              marginBottom: 30,
              opacity: showLogo ? 1 : 0,
              transform: `scale(${0.9 + logoScale * 0.1})`,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                boxShadow: "0 15px 40px rgba(139, 92, 246, 0.4)",
              }}
            >
              *
            </div>

            {/* Name */}
            <div
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 72,
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.95)",
                letterSpacing: "-0.02em",
              }}
            >
              SpeakCode
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: 40,
              opacity: showTagline ? 1 : 0,
              transform: `translateY(${30 - taglineY}px)`,
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
                gap: 15,
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                padding: "22px 50px",
                borderRadius: 30,
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 24,
                fontWeight: 500,
                color: "#fff",
                boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4), 0 0 30px rgba(236, 72, 153, 0.2)",
                cursor: "pointer",
              }}
            >
              Enroll Now
              <span style={{ fontSize: 20 }}>-&gt;</span>
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              marginTop: 30,
              opacity: showSubtext ? interpolate(frame - 90, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
            }}
          >
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.45)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              The skill of the decade
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
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
            fontSize: 18,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          speakcode.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
