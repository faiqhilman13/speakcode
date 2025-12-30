import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass New Way Scene: Conversational AI coding demos with glass UI
 * Style: Split screen glass panels, gradient highlights, smooth transitions
 */

const examples = [
  {
    prompt: "Create a landing page for my fitness SaaS",
    steps: ["Designing hero section...", "Adding features & CTAs...", "Deploying..."],
    result: "landing-page-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
    accentColor: "#8B5CF6",
  },
  {
    prompt: "Build me a real-time analytics dashboard",
    steps: ["Connecting data sources...", "Creating visualizations...", "Ready!"],
    result: "analytics-dashboard-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
    accentColor: "#3B82F6",
  },
  {
    prompt: "Create a promotional video for my course",
    steps: ["Writing script...", "Generating scenes...", "Rendering..."],
    result: "video-editor-result.png",
    finalMessage: "You made this",
    category: "Video",
    accentColor: "#EC4899",
  },
  {
    prompt: "Make a pitch deck for my startup",
    steps: ["Structuring slides...", "Adding charts...", "Formatting..."],
    result: "powerpoint-result.png",
    finalMessage: "You created this",
    category: "Slides",
    accentColor: "#10B981",
  },
  {
    prompt: "Research my competitors and create a report",
    steps: ["Gathering data...", "Analyzing market...", "Compiling report..."],
    result: "research-report-result.png",
    finalMessage: "You did this",
    category: "Research",
    accentColor: "#F59E0B",
  },
];

// Floating particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  x: random(`nw-x-${i}`) * 1920,
  y: random(`nw-y-${i}`) * 1080,
  size: 2 + random(`nw-size-${i}`) * 5,
  speed: 0.2 + random(`nw-speed-${i}`) * 0.4,
}));

export const GlassNewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each example gets 150 frames (5 seconds)
  const exampleDuration = 150;
  const currentIndex = Math.min(Math.floor(frame / exampleDuration), examples.length - 1);
  const exampleFrame = frame - currentIndex * exampleDuration;

  const example = examples[currentIndex];

  // Smooth transitions
  const fadeOut = exampleFrame > exampleDuration - 10
    ? interpolate(exampleFrame, [exampleDuration - 10, exampleDuration], [1, 0], { extrapolateRight: "clamp" })
    : 1;
  const fadeIn = exampleFrame < 10
    ? interpolate(exampleFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" })
    : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  // Typing animation
  const typingProgress = interpolate(exampleFrame, [8, 35], [0, example.prompt.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const displayedPrompt = example.prompt.slice(0, Math.floor(typingProgress));
  const showCursor = exampleFrame >= 8 && exampleFrame < 40;

  // Step animations
  const getStepOpacity = (index: number) => {
    const startFrame = 38 + index * 10;
    return exampleFrame >= startFrame
      ? interpolate(exampleFrame - startFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" })
      : 0;
  };

  // Result animation
  const showResult = exampleFrame >= 55;
  const resultScale = showResult ? spring({ frame: exampleFrame - 55, fps, config: { damping: 14 } }) : 0;
  const resultOpacity = showResult ? interpolate(exampleFrame - 55, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Success badge
  const showFinal = exampleFrame >= 75;
  const finalOpacity = showFinal ? interpolate(exampleFrame - 75, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a15 0%, #0f0a1f 50%, #0a0a15 100%)",
        opacity,
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `${example.accentColor}20`,
          filter: "blur(100px)",
          transition: "background 0.5s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.1)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: ((frame * p.speed * 0.3) + p.y) % 1200 - 60,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
      ))}

      {/* Glass header */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          right: 40,
          height: 70,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 18,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 16,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            What You'll Master
          </span>
          <div
            style={{
              background: `linear-gradient(135deg, ${example.accentColor}, ${example.accentColor}CC)`,
              padding: "5px 14px",
              borderRadius: 20,
              fontFamily: "'SF Mono', monospace",
              fontSize: 12,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {example.category}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
            fontWeight: 600,
            color: example.accentColor,
          }}
        >
          {currentIndex + 1}/{examples.length}
        </div>
      </div>

      {/* Main split layout */}
      <div
        style={{
          display: "flex",
          height: "100%",
          paddingTop: 120,
          paddingBottom: 100,
        }}
      >
        {/* Left - Conversation glass panel */}
        <div
          style={{
            flex: 1,
            padding: "20px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              borderRadius: 24,
              padding: "30px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* User prompt */}
            <div style={{ marginBottom: 25 }}>
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                You'll prompt
              </div>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  padding: "18px 22px",
                  borderRadius: "16px 16px 16px 4px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                    fontSize: 22,
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.4,
                  }}
                >
                  "{displayedPrompt}
                  {showCursor && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 22,
                        background: example.accentColor,
                        marginLeft: 2,
                        opacity: Math.floor(frame / 8) % 2,
                        verticalAlign: "text-bottom",
                      }}
                    />
                  )}
                  "
                </span>
              </div>
            </div>

            {/* AI response steps */}
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.4)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Claude
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {example.steps.map((step, i) => {
                const isLast = i === example.steps.length - 1;
                return (
                  <div
                    key={i}
                    style={{
                      opacity: getStepOpacity(i),
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: isLast
                        ? `linear-gradient(135deg, ${example.accentColor}30, ${example.accentColor}15)`
                        : "rgba(255, 255, 255, 0.04)",
                      padding: "12px 18px",
                      borderRadius: "4px 14px 14px 14px",
                      border: isLast ? `1px solid ${example.accentColor}40` : "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <span style={{ color: isLast ? "#10B981" : example.accentColor, fontSize: 14 }}>
                      {isLast ? "OK" : "->"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'SF Mono', monospace",
                        fontSize: 16,
                        color: "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right - Result */}
        <div
          style={{
            flex: 1.2,
            padding: "20px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Loading state */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: exampleFrame >= 45 && exampleFrame < 60 ? 1 : 0,
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.5)",
                textAlign: "center",
              }}
            >
              Building...
              <div
                style={{
                  width: 160,
                  height: 4,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  marginTop: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${interpolate(exampleFrame, [45, 58], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${example.accentColor}, #EC4899)`,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Result mockup in glass frame */}
          <div
            style={{
              opacity: resultOpacity,
              transform: `scale(${0.9 + resultScale * 0.1}) perspective(1000px) rotateY(-3deg)`,
            }}
          >
            <div
              style={{
                padding: 10,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${example.accentColor}20`,
              }}
            >
              <Img
                src={staticFile(example.result)}
                style={{
                  width: 480,
                  height: "auto",
                  display: "block",
                  borderRadius: 12,
                }}
              />
            </div>
          </div>

          {/* Success badge */}
          <div
            style={{
              marginTop: 20,
              opacity: finalOpacity,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(16, 185, 129, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "10px 22px",
                borderRadius: 24,
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <span style={{ fontSize: 16, color: "#10B981" }}>OK</span>
              <span
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 14,
                  color: "#10B981",
                }}
              >
                {example.finalMessage}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glass bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: `linear-gradient(135deg, ${example.accentColor}CC, #EC4899CC)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontSize: 26,
            fontWeight: 300,
            color: "#fff",
          }}
        >
          Learn to build all of this - and more.
        </div>
      </div>
    </AbsoluteFill>
  );
};
