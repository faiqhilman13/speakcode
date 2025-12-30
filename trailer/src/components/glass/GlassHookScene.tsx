import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, random } from "remotion";

/*
 * Glass Hook Scene: Dreamy gradient introduction with floating glass elements
 * Style: Soft gradients, frosted glass panels, floating particles
 */

// Floating particles for depth
const particles = Array.from({ length: 25 }, (_, i) => ({
  x: random(`particle-x-${i}`) * 1920,
  y: random(`particle-y-${i}`) * 1080,
  size: 3 + random(`particle-size-${i}`) * 8,
  speed: 0.3 + random(`particle-speed-${i}`) * 0.7,
  opacity: 0.2 + random(`particle-opacity-${i}`) * 0.4,
}));

// Floating blobs for background
const blobs = [
  { x: 200, y: 300, size: 400, color: "rgba(139, 92, 246, 0.3)", delay: 0 },
  { x: 1500, y: 200, size: 350, color: "rgba(236, 72, 153, 0.25)", delay: 0.3 },
  { x: 900, y: 700, size: 450, color: "rgba(59, 130, 246, 0.2)", delay: 0.6 },
  { x: 1600, y: 800, size: 300, color: "rgba(139, 92, 246, 0.2)", delay: 0.9 },
];

export const GlassHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLine1 = frame >= 8;
  const showLine2 = frame >= 22;
  const showLine3 = frame >= 40;
  const showAccent = frame >= 60;

  const line1Spring = showLine1 ? spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 150 } }) : 0;
  const line2Spring = showLine2 ? spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 150 } }) : 0;
  const line3Spring = showLine3 ? spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 140 } }) : 0;

  // Subtle background animation
  const bgHue = interpolate(frame, [0, 120], [260, 280], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          hsl(${bgHue}, 30%, 8%) 0%,
          hsl(${bgHue + 20}, 35%, 12%) 50%,
          hsl(${bgHue + 40}, 25%, 10%) 100%)`,
      }}
    >
      {/* Animated gradient blobs */}
      {blobs.map((blob, i) => {
        const floatY = Math.sin((frame * 0.02) + blob.delay * 10) * 20;
        const floatX = Math.cos((frame * 0.015) + blob.delay * 10) * 15;
        const scale = 1 + Math.sin((frame * 0.03) + blob.delay * 5) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: blob.x + floatX,
              top: blob.y + floatY,
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: blob.color,
              filter: "blur(80px)",
              transform: `scale(${scale})`,
              opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          />
        );
      })}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: ((frame * p.speed * 0.5) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(255, 255, 255, ${p.opacity})`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Glass header panel */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          right: 40,
          height: 80,
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          opacity: showLine1 ? 1 : 0,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SpeakCode
        </div>
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 22,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          A new way to build
        </div>
      </div>

      {/* Main content with glass card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          textAlign: "center",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 100,
            fontWeight: 200,
            color: "rgba(255, 255, 255, 0.95)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: showLine1 ? 1 : 0,
            transform: `translateY(${(1 - line1Spring) * 30}px)`,
          }}
        >
          What if you could
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 100,
            fontWeight: 200,
            color: "rgba(255, 255, 255, 0.95)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: showLine2 ? 1 : 0,
            transform: `translateY(${(1 - line2Spring) * 30}px)`,
          }}
        >
          build software
        </div>

        {/* Line 3 - Gradient text punch line */}
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginTop: 10,
            opacity: showLine3 ? 1 : 0,
            transform: `translateY(${(1 - line3Spring) * 30}px)`,
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          just by describing it?
        </div>

        {/* Glass accent bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
            opacity: showAccent ? interpolate(frame - 60, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 30,
              padding: "16px 40px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.6)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              No syntax. No debugging. No years of practice.
            </span>
          </div>
        </div>
      </div>

      {/* Corner glass accents */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 50,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: showAccent ? 1 : 0,
        }}
      >
        <div
          style={{
            width: 50,
            height: 3,
            background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 13,
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: "0.1em",
          }}
        >
          SPEAKCODE
        </div>
      </div>
    </AbsoluteFill>
  );
};
