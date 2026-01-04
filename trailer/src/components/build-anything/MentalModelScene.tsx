import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Mental Model Scene: What you'll learn (conceptual)
 *
 * DESIGN: Abstract network visualization with flowing connections
 * - Three interconnected concept nodes
 * - Animated connection lines between nodes
 * - Organic, flowing layout rather than rigid grid
 * - Light theme for contrast with previous dark scenes
 */

const concepts = [
  {
    id: "mental-model",
    title: "The Mental Model",
    description: "How to think about AI as a builder",
    x: 120,
    y: 320,
    icon: "◈",
    delay: 40,
  },
  {
    id: "possible",
    title: "What's Possible",
    description: "Expanding your sense of capability",
    x: 620,
    y: 420,
    icon: "✦",
    delay: 70,
  },
  {
    id: "breakdown",
    title: "Problem Breakdown",
    description: "So AI executes your vision precisely",
    x: 1120,
    y: 320,
    icon: "◎",
    delay: 100,
  },
];

export const MentalModelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const showHeader = frame >= 8;
  const headerSpring = showHeader ? spring({ frame: frame - 8, fps, config: { damping: 16 } }) : 0;

  // Main title
  const showTitle = frame >= 20;
  const titleSpring = showTitle ? spring({ frame: frame - 20, fps, config: { damping: 14 } }) : 0;

  // Connection lines
  const showLines = frame >= 60;
  const lineProgress = showLines ? interpolate(frame - 60, [0, 40], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Concept node animations
  const getNodeAnimation = (delay: number) => {
    const isVisible = frame >= delay;
    const nodeSpring = isVisible
      ? spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 100 } })
      : 0;
    return { nodeSpring, isVisible };
  };

  // Bottom tagline
  const showTagline = frame >= 180;
  const taglineOpacity = showTagline ? interpolate(frame - 180, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Floating particles animation
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: 200 + (i * 150) % 1600,
    y: 200 + Math.sin(i * 2) * 300,
    size: 4 + (i % 3) * 2,
    delay: i * 5,
  }));

  return (
    <AbsoluteFill style={{ background: "#FDF6E3", overflow: "hidden" }}>
      {/* Subtle dot pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(#1a1a1a 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const particleOpacity = frame >= p.delay + 30
          ? interpolate(frame - p.delay - 30, [0, 20], [0, 0.15], { extrapolateRight: "clamp" })
          : 0;
        const floatY = Math.sin((frame + i * 20) * 0.03) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              background: "#FF5E5B",
              borderRadius: "50%",
              opacity: particleOpacity,
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
          height: 80,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: headerSpring,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(253,246,227,0.6)",
            }}
          >
            Inside The Course
          </div>
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: headerSpring,
          }}
        >
          What you'll learn
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32,
            color: "rgba(26,26,26,0.5)",
            marginBottom: 10,
          }}
        >
          In this course, you'll learn
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 80,
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1,
          }}
        >
          The <span style={{ color: "#FF5E5B" }}>mental model.</span>
        </div>
      </div>

      {/* Connection lines (SVG) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Line 1 → 2 */}
        <path
          d={`M ${concepts[0].x + 420} ${concepts[0].y + 100} Q ${(concepts[0].x + concepts[1].x) / 2 + 200} ${concepts[0].y + 200} ${concepts[1].x + 50} ${concepts[1].y + 30}`}
          fill="none"
          stroke="#FF5E5B"
          strokeWidth={3}
          strokeDasharray={500}
          strokeDashoffset={500 - 500 * lineProgress}
          opacity={0.4}
        />
        {/* Line 2 → 3 */}
        <path
          d={`M ${concepts[1].x + 420} ${concepts[1].y + 100} Q ${(concepts[1].x + concepts[2].x) / 2 + 200} ${concepts[1].y + 200} ${concepts[2].x + 50} ${concepts[2].y + 200}`}
          fill="none"
          stroke="#FF5E5B"
          strokeWidth={3}
          strokeDasharray={500}
          strokeDashoffset={500 - 500 * Math.max(0, lineProgress - 0.3) / 0.7}
          opacity={0.4}
        />
      </svg>

      {/* Concept nodes */}
      {concepts.map((concept, index) => {
        const { nodeSpring } = getNodeAnimation(concept.delay);

        return (
          <div
            key={concept.id}
            style={{
              position: "absolute",
              left: concept.x,
              top: concept.y,
              opacity: nodeSpring,
              transform: `scale(${0.8 + nodeSpring * 0.2}) translateY(${(1 - nodeSpring) * 30}px)`,
            }}
          >
            {/* Node card */}
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: 24,
                padding: "45px 50px",
                width: 420,
                boxShadow: "0 30px 80px rgba(26,26,26,0.2)",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 48,
                  color: "#FF5E5B",
                  marginBottom: 22,
                }}
              >
                {concept.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 36,
                  color: "#FDF6E3",
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {concept.title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 16,
                  color: "rgba(253,246,227,0.6)",
                  lineHeight: 1.6,
                }}
              >
                {concept.description}
              </div>

              {/* Number badge */}
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  right: -18,
                  width: 50,
                  height: 50,
                  background: "#FF5E5B",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#FDF6E3",
                  boxShadow: "0 8px 30px rgba(255,94,91,0.5)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 24,
            fontStyle: "italic",
            color: "#FDF6E3",
            opacity: taglineOpacity,
          }}
        >
          How to break problems down so AI can execute your vision precisely.
        </div>
      </div>
    </AbsoluteFill>
  );
};
