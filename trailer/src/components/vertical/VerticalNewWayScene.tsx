import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Vertical New Way Scene: Conversational approach with stacked layout
 * Prompt bubble at top, steps in middle, large result image at bottom
 */

const examples = [
  {
    prompt: "Create a landing page for my fitness SaaS",
    steps: ["Designing hero section...", "Adding features & CTAs...", "Deploying..."],
    result: "landing-page-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
  },
  {
    prompt: "Build me a real-time analytics dashboard",
    steps: ["Connecting data sources...", "Creating visualizations...", "Ready!"],
    result: "analytics-dashboard-result.png",
    finalMessage: "You built this",
    category: "Web Dev",
  },
  {
    prompt: "Create a promotional video for my course",
    steps: ["Writing script...", "Generating scenes...", "Rendering..."],
    result: "video-editor-result.png",
    finalMessage: "You made this",
    category: "Video",
  },
  {
    prompt: "Make a pitch deck for my startup",
    steps: ["Structuring slides...", "Adding charts...", "Formatting..."],
    result: "powerpoint-result.png",
    finalMessage: "You created this",
    category: "Slides",
  },
  {
    prompt: "Research my competitors and create a report",
    steps: ["Gathering data...", "Analyzing market...", "Compiling report..."],
    result: "research-report-result.png",
    finalMessage: "You did this",
    category: "Research",
  },
];

export const VerticalNewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exampleDuration = 150;
  const currentIndex = Math.min(Math.floor(frame / exampleDuration), examples.length - 1);
  const exampleFrame = frame - currentIndex * exampleDuration;

  const example = examples[currentIndex];

  const fadeOut = exampleFrame > exampleDuration - 8
    ? interpolate(exampleFrame, [exampleDuration - 8, exampleDuration], [1, 0], { extrapolateRight: "clamp" })
    : 1;
  const fadeIn = exampleFrame < 8
    ? interpolate(exampleFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" })
    : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  const typingProgress = interpolate(exampleFrame, [5, 30], [0, example.prompt.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp"
  });
  const displayedPrompt = example.prompt.slice(0, Math.floor(typingProgress));
  const showCursor = exampleFrame >= 5 && exampleFrame < 35;

  const getStepOpacity = (index: number) => {
    const startFrame = 32 + index * 8;
    return exampleFrame >= startFrame ? interpolate(exampleFrame - startFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" }) : 0;
  };

  const showResult = exampleFrame >= 45;
  const resultScale = showResult ? spring({ frame: exampleFrame - 45, fps, config: { damping: 15 } }) : 0;
  const resultOpacity = showResult ? interpolate(exampleFrame - 45, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const showFinal = exampleFrame >= 60;
  const finalOpacity = showFinal ? interpolate(exampleFrame - 60, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", opacity }}>
      {/* Top bar - taller */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        background: "#FDF6E3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 10,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}>
          <div style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 28,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.7)",
          }}>
            What You'll Master
          </div>
          <div style={{
            background: "#FF5E5B",
            padding: "10px 24px",
            borderRadius: 20,
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            color: "#FDF6E3",
            textTransform: "uppercase",
          }}>
            {example.category}
          </div>
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 40,
          color: "#FF5E5B",
          fontWeight: 600,
        }}>
          {currentIndex + 1}/{examples.length}
        </div>
      </div>

      {/* Bottom tagline - taller */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 130,
        background: "#FF5E5B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 42,
          fontStyle: "italic",
          color: "#FDF6E3",
        }}>
          Learn to build all of this — and more.
        </div>
      </div>

      {/* Vertical stacked layout - tighter, MUCH larger components */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 120,
        paddingBottom: 95,
      }}>
        {/* Top: Prompt bubble - MUCH larger */}
        <div style={{
          padding: "8px 40px 4px",
          background: "rgba(253,246,227,0.03)",
        }}>
          <div style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            color: "rgba(253,246,227,0.4)",
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            You'll prompt
          </div>
          <div style={{
            background: "#FDF6E3",
            padding: "48px 60px",
            borderRadius: "32px 32px 32px 6px",
            fontFamily: "Georgia, serif",
            fontSize: 62,
            color: "#1a1a1a",
            lineHeight: 1.2,
          }}>
            "{displayedPrompt}
            {showCursor && (
              <span style={{
                display: "inline-block",
                width: 6,
                height: 56,
                background: "#FF5E5B",
                marginLeft: 5,
                opacity: Math.floor(frame / 6) % 2,
                verticalAlign: "text-bottom",
              }} />
            )}
            "
          </div>
        </div>

        {/* Middle: Steps - MUCH larger */}
        <div style={{
          padding: "2px 40px 4px",
          background: "rgba(253,246,227,0.02)",
        }}>
          <div style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            color: "rgba(253,246,227,0.4)",
            marginBottom: 5,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            Claude
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {example.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: getStepOpacity(i),
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: i === example.steps.length - 1 ? "#FF5E5B" : "rgba(253,246,227,0.08)",
                  padding: "40px 60px",
                  borderRadius: "18px 36px 36px 36px",
                }}
              >
                <span style={{
                  color: i === example.steps.length - 1 ? "#FDF6E3" : "#00CA4E",
                  fontSize: 44,
                }}>
                  {i === example.steps.length - 1 ? "✓" : "→"}
                </span>
                <span style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 48,
                  color: "#FDF6E3",
                }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Large result image - reduce gap */}
        <div style={{
          flex: 1,
          padding: "4px 40px 15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}>
          {/* Building indicator - larger */}
          <div style={{
            position: "absolute",
            top: "32%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: exampleFrame >= 35 && exampleFrame < 50 ? 1 : 0,
          }}>
            <div style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 28,
              color: "rgba(253,246,227,0.5)",
              textAlign: "center",
            }}>
              Building...
              <div style={{
                width: 260,
                height: 7,
                background: "rgba(253,246,227,0.1)",
                borderRadius: 2,
                marginTop: 20,
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

          {/* Result mockup - MUCH LARGER for vertical */}
          <div style={{
            opacity: resultOpacity,
            transform: `scale(${0.9 + resultScale * 0.1})`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 35px 90px rgba(0,0,0,0.5)",
          }}>
            <Img
              src={staticFile(example.result)}
              style={{
                width: 850,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Success badge - larger */}
          <div style={{
            marginTop: 25,
            opacity: finalOpacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(0,202,78,0.15)",
            padding: "18px 32px",
            borderRadius: 30,
            border: "2px solid rgba(0,202,78,0.3)",
          }}>
            <span style={{ fontSize: 26, color: "#00CA4E" }}>✓</span>
            <span style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 22,
              color: "#00CA4E",
            }}>
              {example.finalMessage}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
