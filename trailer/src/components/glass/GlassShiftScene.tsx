import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass Shift Scene: The dramatic pivot moment
 * Style: Dark to light transition, glass overlays, dramatic gradients
 */

// Particles for magical effect
const particles = Array.from({ length: 30 }, (_, i) => ({
  x: random(`shift-x-${i}`) * 1920,
  y: random(`shift-y-${i}`) * 1080,
  size: 2 + random(`shift-size-${i}`) * 6,
  delay: random(`shift-delay-${i}`) * 30,
  speed: 0.5 + random(`shift-speed-${i}`) * 1,
}));

export const GlassShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash transition
  const whiteFlash = interpolate(frame, [0, 5, 12, 18], [1, 1, 0.2, 0], { extrapolateRight: "clamp" });

  const showImage = frame >= 15;
  const imageOpacity = showImage ? interpolate(frame - 15, [0, 15], [0, 0.4], { extrapolateRight: "clamp" }) : 0;
  const imageScale = showImage ? spring({ frame: frame - 15, fps, config: { damping: 20 } }) : 0;

  const showLine1 = frame >= 30;
  const showLine2 = frame >= 48;

  const line1Scale = showLine1 ? spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 120 } }) : 0;
  const line2Scale = showLine2 ? spring({ frame: frame - 48, fps, config: { damping: 12, stiffness: 100 } }) : 0;

  // Gradient animation
  const gradientProgress = interpolate(frame, [20, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          hsl(${260 + gradientProgress * 20}, 40%, ${8 + gradientProgress * 4}%) 0%,
          hsl(${280 + gradientProgress * 15}, 45%, ${10 + gradientProgress * 5}%) 50%,
          hsl(${300 + gradientProgress * 10}, 35%, ${8 + gradientProgress * 3}%) 100%)`,
      }}
    >
      {/* Animated gradient blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `rgba(139, 92, 246, ${0.15 + gradientProgress * 0.1})`,
          filter: "blur(100px)",
          transform: `scale(${1 + Math.sin(frame * 0.03) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `rgba(236, 72, 153, ${0.12 + gradientProgress * 0.08})`,
          filter: "blur(80px)",
          transform: `scale(${1 + Math.cos(frame * 0.025) * 0.1})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "30%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: `rgba(59, 130, 246, ${0.1 + gradientProgress * 0.1})`,
          filter: "blur(90px)",
        }}
      />

      {/* Rising particles */}
      {particles.map((p, i) => {
        const particleStart = 20 + p.delay;
        if (frame < particleStart) return null;

        const particleFrame = frame - particleStart;
        const yOffset = particleFrame * p.speed * 2;
        const opacity = interpolate(particleFrame, [0, 10, 40, 50], [0, 0.6, 0.6, 0], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y - yOffset,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 3 === 0
                ? "rgba(139, 92, 246, 0.8)"
                : i % 3 === 1
                ? "rgba(236, 72, 153, 0.8)"
                : "rgba(59, 130, 246, 0.8)",
              opacity,
              filter: "blur(1px)",
              boxShadow: `0 0 ${p.size * 2}px ${i % 3 === 0 ? "rgba(139, 92, 246, 0.5)" : i % 3 === 1 ? "rgba(236, 72, 153, 0.5)" : "rgba(59, 130, 246, 0.5)"}`,
            }}
          />
        );
      })}

      {/* Background image */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: imageOpacity,
          transform: `scale(${1 + imageScale * 0.05})`,
        }}
      >
        <Img
          src={staticFile("code-to-product.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg,
            rgba(15, 10, 30, 0.85) 0%,
            rgba(30, 15, 50, 0.7) 50%,
            rgba(15, 15, 30, 0.8) 100%)`,
        }}
      />

      {/* Center content with glass effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "90%",
        }}
      >
        {/* Glass panel behind text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: 280,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: 40,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            opacity: showLine1 ? interpolate(frame - 30, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        />

        {/* Line 1 */}
        <div
          style={{
            position: "relative",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 80,
            fontWeight: 200,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: "-0.02em",
            opacity: showLine1 ? 1 : 0,
            transform: `scale(${0.9 + line1Scale * 0.1})`,
            marginBottom: 10,
          }}
        >
          Then AI happened.
        </div>

        {/* Line 2 - Gradient */}
        <div
          style={{
            position: "relative",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 130,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            marginTop: 5,
            opacity: showLine2 ? 1 : 0,
            transform: `scale(${0.9 + line2Scale * 0.1})`,
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 60px rgba(139, 92, 246, 0.4))",
          }}
        >
          Everything changed.
        </div>
      </div>

      {/* Corner glass accents */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          width: 100,
          height: 100,
          borderLeft: "2px solid rgba(139, 92, 246, 0.5)",
          borderTop: "2px solid rgba(139, 92, 246, 0.5)",
          borderRadius: "20px 0 0 0",
          opacity: showLine2 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
          width: 100,
          height: 100,
          borderRight: "2px solid rgba(236, 72, 153, 0.5)",
          borderBottom: "2px solid rgba(236, 72, 153, 0.5)",
          borderRadius: "0 0 20px 0",
          opacity: showLine2 ? interpolate(frame - 60, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      />

      {/* White flash overlay */}
      <AbsoluteFill
        style={{
          background: "white",
          opacity: whiteFlash,
        }}
      />
    </AbsoluteFill>
  );
};
