import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * New Way Scene: Show the conversational approach with VISUAL RESULTS
 * Layout: Split screen - conversation left, visual result right
 * 5 examples showing diverse use cases (coding + non-coding)
 */

const examples = [
  {
    prompt: "Create a landing page for my fitness SaaS",
    steps: [
      "Designing hero section...",
      "Adding features & CTAs...",
      "Deploying...",
    ],
    result: "landing-page-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
  },
  {
    prompt: "Build me a real-time analytics dashboard",
    steps: [
      "Connecting data sources...",
      "Creating visualizations...",
      "Ready!",
    ],
    result: "analytics-dashboard-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
  },
  {
    prompt: "Create a promotional video for my course",
    steps: [
      "Writing script...",
      "Generating scenes...",
      "Rendering...",
    ],
    result: "video-editor-result.png",
    finalMessage: "You made this",
    category: "Video",
  },
  {
    prompt: "Make a pitch deck for my startup",
    steps: [
      "Structuring slides...",
      "Adding charts...",
      "Formatting...",
    ],
    result: "powerpoint-result.png",
    finalMessage: "You created this",
    category: "Slides",
  },
  {
    prompt: "Research my competitors and create a report",
    steps: [
      "Gathering data...",
      "Analyzing market...",
      "Compiling report...",
    ],
    result: "research-report-result.png",
    finalMessage: "You did this",
    category: "Research",
  },
];

export const NewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each example gets 150 frames (5 seconds) - extra time to view final result
  const exampleDuration = 150;
  const currentIndex = Math.min(Math.floor(frame / exampleDuration), examples.length - 1);
  const exampleFrame = frame - currentIndex * exampleDuration;

  const example = examples[currentIndex];

  // Smooth transitions between examples
  const fadeOut = exampleFrame > exampleDuration - 8
    ? interpolate(exampleFrame, [exampleDuration - 8, exampleDuration], [1, 0], { extrapolateRight: "clamp" })
    : 1;
  const fadeIn = exampleFrame < 8
    ? interpolate(exampleFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" })
    : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  // Typing animation for user prompt (faster)
  const typingProgress = interpolate(exampleFrame, [5, 30], [0, example.prompt.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp"
  });
  const displayedPrompt = example.prompt.slice(0, Math.floor(typingProgress));
  const showCursor = exampleFrame >= 5 && exampleFrame < 35;

  // Step animations (faster)
  const getStepOpacity = (index: number) => {
    const startFrame = 32 + index * 8;
    return exampleFrame >= startFrame ? interpolate(exampleFrame - startFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" }) : 0;
  };

  // Result image animation
  const showResult = exampleFrame >= 45;
  const resultScale = showResult ? spring({ frame: exampleFrame - 45, fps, config: { damping: 15 } }) : 0;
  const resultOpacity = showResult ? interpolate(exampleFrame - 45, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Final success message
  const showFinal = exampleFrame >= 60;
  const finalOpacity = showFinal ? interpolate(exampleFrame - 60, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", opacity }}>
      {/* Top bar */}
      <div style={{
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
        zIndex: 10,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}>
          <div style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.7)",
          }}>
            What You'll Master
          </div>
          <div style={{
            background: "#FF5E5B",
            padding: "6px 14px",
            borderRadius: 20,
            fontFamily: "'SF Mono', monospace",
            fontSize: 14,
            color: "#FDF6E3",
            textTransform: "uppercase",
          }}>
            {example.category}
          </div>
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 24,
          color: "#FF5E5B",
          fontWeight: 600,
        }}>
          {currentIndex + 1}/{examples.length}
        </div>
      </div>

      {/* Main split layout */}
      <div style={{
        display: "flex",
        height: "100%",
        paddingTop: 100,
        paddingBottom: 80,
      }}>
        {/* Left side - Conversation */}
        <div style={{
          flex: 1,
          padding: "30px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "rgba(253,246,227,0.03)",
        }}>
          {/* User prompt bubble */}
          <div style={{ marginBottom: 25 }}>
            <div style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 13,
              color: "rgba(253,246,227,0.4)",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              You'll prompt
            </div>
            <div style={{
              background: "#FDF6E3",
              padding: "20px 26px",
              borderRadius: "18px 18px 18px 4px",
              fontFamily: "Georgia, serif",
              fontSize: 26,
              color: "#1a1a1a",
              lineHeight: 1.4,
            }}>
              "{displayedPrompt}
              {showCursor && (
                <span style={{
                  display: "inline-block",
                  width: 3,
                  height: 24,
                  background: "#FF5E5B",
                  marginLeft: 2,
                  opacity: Math.floor(frame / 6) % 2,
                  verticalAlign: "text-bottom",
                }} />
              )}
              "
            </div>
          </div>

          {/* AI response steps */}
          <div style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 13,
            color: "rgba(253,246,227,0.4)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            Claude
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {example.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: getStepOpacity(i),
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: i === example.steps.length - 1 ? "#FF5E5B" : "rgba(253,246,227,0.08)",
                  padding: "14px 20px",
                  borderRadius: "4px 16px 16px 16px",
                }}
              >
                <span style={{
                  color: i === example.steps.length - 1 ? "#FDF6E3" : "#00CA4E",
                  fontSize: 16,
                }}>
                  {i === example.steps.length - 1 ? "✓" : "→"}
                </span>
                <span style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 18,
                  color: "#FDF6E3",
                }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Visual Result */}
        <div style={{
          flex: 1.2,
          padding: "30px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}>
          {/* "Building..." label before result */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: exampleFrame >= 35 && exampleFrame < 50 ? 1 : 0,
          }}>
            <div style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 22,
              color: "rgba(253,246,227,0.5)",
              textAlign: "center",
            }}>
              Building...
              <div style={{
                width: 180,
                height: 4,
                background: "rgba(253,246,227,0.1)",
                borderRadius: 2,
                marginTop: 16,
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${interpolate(exampleFrame, [35, 50], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
                  height: "100%",
                  background: "#FF5E5B",
                  borderRadius: 2,
                }} />
              </div>
            </div>
          </div>

          {/* Result mockup */}
          <div style={{
            opacity: resultOpacity,
            transform: `scale(${0.9 + resultScale * 0.1}) perspective(1000px) rotateY(-5deg)`,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
          }}>
            <Img
              src={staticFile(example.result)}
              style={{
                width: 520,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Success badge */}
          <div style={{
            marginTop: 24,
            opacity: finalOpacity,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,202,78,0.15)",
            padding: "12px 24px",
            borderRadius: 24,
            border: "1px solid rgba(0,202,78,0.3)",
          }}>
            <span style={{ fontSize: 18, color: "#00CA4E" }}>✓</span>
            <span style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 16,
              color: "#00CA4E",
            }}>
              {example.finalMessage}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "#FF5E5B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 28,
          fontStyle: "italic",
          color: "#FDF6E3",
        }}>
          Learn to build all of this — and more.
        </div>
      </div>
    </AbsoluteFill>
  );
};
