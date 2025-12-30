import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/**
 * RetroCTAScene - Final call to action with 80s arcade victory screen
 * Style: Neon victory celebration, pulsing CTA, retro achievement unlocked
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
};

// Scanlines
const Scanlines: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.15) 2px,
        rgba(0, 0, 0, 0.15) 4px
      )`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

export const RetroCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showImage = frame >= 5;
  const showLogo = frame >= 20;
  const showTagline = frame >= 45;
  const showButton = frame >= 65;
  const showSubtext = frame >= 85;

  const imageOpacity = showImage
    ? interpolate(frame - 5, [0, 20], [0, 0.25], { extrapolateRight: "clamp" })
    : 0;
  const logoScale = showLogo
    ? spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } })
    : 0;
  const taglineY = showTagline
    ? spring({ frame: frame - 45, fps, config: { damping: 15 } }) * 30
    : 0;
  const buttonScale = showButton
    ? spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 120 } })
    : 0;

  // Pulsing animation for button
  const buttonPulse = showButton ? 1 + Math.sin((frame - 65) * 0.15) * 0.03 : 1;

  // Animated grid
  const gridOffset = frame * 1.5;

  // Floating Memphis shapes
  const shapes = Array.from({ length: 20 }, (_, i) => ({
    x: random(`cta-x-${i}`) * 100,
    y: random(`cta-y-${i}`) * 100,
    size: 15 + random(`cta-size-${i}`) * 40,
    rotation: random(`cta-rot-${i}`) * 360,
    type: Math.floor(random(`cta-type-${i}`) * 3),
    color: [COLORS.pink, COLORS.cyan, COLORS.yellow][Math.floor(random(`cta-color-${i}`) * 3)],
  }));

  // Chromatic aberration
  const chromatic = Math.sin(frame * 0.1) * 3;

  return (
    <AbsoluteFill style={{ background: COLORS.black }}>
      {/* Background perspective grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "500px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "-50%",
            right: "-50%",
            height: "60%",
            background: `
              linear-gradient(90deg, ${COLORS.cyan}44 1px, transparent 1px),
              linear-gradient(0deg, ${COLORS.pink}44 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `rotateX(60deg) translateY(${gridOffset % 80}px)`,
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 1400,
          height: 1400,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.purple}33 0%, transparent 50%)`,
          opacity: 0.8,
        }}
      />

      {/* Floating Memphis shapes */}
      {shapes.map((shape, i) => {
        const floatY = Math.sin(frame * 0.04 + i) * 12;
        const rotation = shape.rotation + frame * 0.3;
        const shapeOpacity = interpolate(frame, [20 + i * 2, 40 + i * 2], [0, 0.25], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform: `translateY(${floatY}px) rotate(${rotation}deg)`,
              opacity: shapeOpacity,
              border: `2px solid ${shape.color}`,
              borderRadius: shape.type === 0 ? "50%" : shape.type === 1 ? "0" : "0",
              clipPath: shape.type === 2 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
              boxShadow: `0 0 10px ${shape.color}44`,
            }}
          />
        );
      })}

      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.cyan})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
            opacity: showLogo ? 1 : 0,
          }}
        >
          {">> READY TO START? <<"}
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 32,
            color: COLORS.yellow,
            textShadow: `3px 3px 0 ${COLORS.black}`,
            opacity: showLogo ? 1 : 0,
          }}
        >
          JOIN NOW
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
            filter: "blur(3px) saturate(1.5) hue-rotate(300deg)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.black}88 0%, ${COLORS.black}ee 80%)`,
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 40,
          width: 100,
          height: 100,
          borderLeft: `5px solid ${COLORS.cyan}`,
          borderTop: `5px solid ${COLORS.cyan}`,
          opacity: showLogo ? 1 : 0,
          boxShadow: `-10px -10px 30px ${COLORS.cyan}44`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 130,
          right: 40,
          width: 100,
          height: 100,
          borderRight: `5px solid ${COLORS.pink}`,
          borderBottom: `5px solid ${COLORS.pink}`,
          opacity: showLogo ? 1 : 0,
          boxShadow: `10px 10px 30px ${COLORS.pink}44`,
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: "center", zIndex: 10, position: "relative", paddingTop: 120 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            marginBottom: 35,
            opacity: showLogo ? 1 : 0,
            transform: `scale(${0.9 + logoScale * 0.1})`,
          }}
        >
          {/* Lightning icon */}
          <div
            style={{
              width: 100,
              height: 100,
              background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.yellow})`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 55,
              boxShadow: `
                0 0 40px ${COLORS.pink}66,
                0 0 80px ${COLORS.pink}33
              `,
              border: `4px solid ${COLORS.cyan}`,
            }}
          >
            <span style={{ filter: "drop-shadow(2px 2px 0 black)" }}>{"<<"}</span>
          </div>

          {/* Name with glitch effect */}
          <div
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 100,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "0.02em",
              textShadow: `
                ${chromatic}px 0 ${COLORS.cyan},
                ${-chromatic}px 0 ${COLORS.pink},
                0 0 40px ${COLORS.purple}
              `,
            }}
          >
            SPEAKCODE
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 36,
            color: COLORS.yellow,
            marginBottom: 50,
            opacity: showTagline ? 1 : 0,
            transform: `translateY(${30 - taglineY}px)`,
            textShadow: `0 0 20px ${COLORS.yellow}`,
            letterSpacing: "0.15em",
          }}
        >
          {">> MASTER AGENTIC CODING <<"}
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
              gap: 20,
              background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.pink})`,
              backgroundSize: "200% 100%",
              padding: "30px 70px",
              borderRadius: 12,
              fontFamily: "'Impact', sans-serif",
              fontSize: 36,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              boxShadow: `
                0 0 40px ${COLORS.pink}66,
                0 0 80px ${COLORS.pink}33,
                inset 0 0 20px ${COLORS.purple}44
              `,
              border: `4px solid ${COLORS.yellow}`,
              textShadow: `2px 2px 0 ${COLORS.black}`,
            }}
          >
            ENROLL NOW
            <span style={{ fontSize: 30 }}>{">>>"}</span>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 40,
            fontFamily: "'Courier New', monospace",
            fontSize: 20,
            color: COLORS.cyan,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            opacity: showSubtext
              ? interpolate(frame - 85, [0, 15], [0, 1], { extrapolateRight: "clamp" })
              : 0,
            textShadow: `0 0 15px ${COLORS.cyan}`,
          }}
        >
          {">>> THE SKILL OF THE DECADE <<<"}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.cyan})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: showButton ? 1 : 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.black,
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
          }}
        >
          SPEAKCODE.COM
        </div>
      </div>

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
