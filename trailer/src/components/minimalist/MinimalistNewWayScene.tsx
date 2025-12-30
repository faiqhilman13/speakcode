import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist New Way Scene: Show the conversational approach
 * Style: Clean split screen, typing animation, geometric results
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

const examples = [
  {
    prompt: "Create a landing page for my fitness SaaS",
    steps: ["Designing hero section...", "Adding features & CTAs...", "Deploying..."],
    finalMessage: "You built this",
    category: "Web",
  },
  {
    prompt: "Build me a real-time analytics dashboard",
    steps: ["Connecting data sources...", "Creating visualizations...", "Ready!"],
    finalMessage: "You built this",
    category: "App",
  },
  {
    prompt: "Create a promotional video for my course",
    steps: ["Writing script...", "Generating scenes...", "Rendering..."],
    finalMessage: "You made this",
    category: "Video",
  },
  {
    prompt: "Make a pitch deck for my startup",
    steps: ["Structuring slides...", "Adding charts...", "Formatting..."],
    finalMessage: "You created this",
    category: "Slides",
  },
  {
    prompt: "Research my competitors and create a report",
    steps: ["Gathering data...", "Analyzing market...", "Compiling report..."],
    finalMessage: "You did this",
    category: "Research",
  },
];

export const MinimalistNewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each example gets 150 frames
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
  const resultScale = showResult ? spring({ frame: exampleFrame - 55, fps, config: { damping: 15 } }) : 0;

  // Success message
  const showSuccess = exampleFrame >= 70;
  const successOpacity = showSuccess
    ? interpolate(exampleFrame - 70, [0, 10], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#0A0A0A", opacity }}>
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(10,10,10,0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            What You'll Master
          </div>
          <div
            style={{
              background: "#0066FF",
              padding: "6px 16px",
              borderRadius: 4,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {example.category}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#0066FF",
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
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        {/* Left side - Conversation */}
        <div
          style={{
            flex: 1,
            padding: "40px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* User prompt */}
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              You
            </div>
            <div
              style={{
                background: "#FFFFFF",
                padding: "24px 28px",
                borderRadius: 4,
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#0A0A0A",
                lineHeight: 1.5,
              }}
            >
              "{displayedPrompt}
              {showCursor && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 22,
                    background: "#0066FF",
                    marginLeft: 2,
                    opacity: Math.floor(frame / 8) % 2,
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
              "
            </div>
          </div>

          {/* AI response steps */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Claude
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {example.steps.map((step, i) => {
                const isLast = i === example.steps.length - 1;
                return (
                  <div
                    key={i}
                    style={{
                      opacity: getStepOpacity(i),
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      background: isLast ? "#0066FF" : "rgba(255,255,255,0.05)",
                      padding: "16px 20px",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: isLast ? "#FFFFFF" : "transparent",
                        border: isLast ? "none" : "2px solid #0066FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isLast && (
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path
                            d="M2 6 L5 9 L10 3"
                            fill="none"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#FFFFFF",
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

        {/* Right side - Visual Result */}
        <div
          style={{
            flex: 1.2,
            padding: "40px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Building indicator */}
          <div
            style={{
              opacity: exampleFrame >= 40 && exampleFrame < 55 ? 1 : 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 16,
              }}
            >
              Building...
            </div>
            <div
              style={{
                width: 200,
                height: 3,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${interpolate(exampleFrame, [40, 55], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
                  height: "100%",
                  background: "#0066FF",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          {/* Result visualization - geometric mockup */}
          <div
            style={{
              opacity: showResult ? interpolate(exampleFrame - 55, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
              transform: `scale(${0.9 + resultScale * 0.1})`,
              width: 480,
              height: 320,
              background: "#FFFFFF",
              borderRadius: 8,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Browser chrome */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }} />
            </div>

            {/* Abstract content representation */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "60%", height: 24, background: "#0A0A0A", borderRadius: 4 }} />
              <div style={{ width: "80%", height: 12, background: "rgba(10,10,10,0.2)", borderRadius: 2 }} />
              <div style={{ width: "70%", height: 12, background: "rgba(10,10,10,0.2)", borderRadius: 2 }} />
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <div style={{ flex: 1, height: 80, background: "#0066FF", borderRadius: 4, opacity: 0.2 }} />
                <div style={{ flex: 1, height: 80, background: "#0066FF", borderRadius: 4, opacity: 0.3 }} />
                <div style={{ flex: 1, height: 80, background: "#0066FF", borderRadius: 4, opacity: 0.4 }} />
              </div>
              <div
                style={{
                  marginTop: 12,
                  width: 120,
                  height: 40,
                  background: "#0066FF",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>

          {/* Success message */}
          <div
            style={{
              marginTop: 24,
              opacity: successOpacity,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(0,102,255,0.15)",
              padding: "12px 24px",
              borderRadius: 4,
              border: "1px solid rgba(0,102,255,0.3)",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#0066FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2 6 L5 9 L10 3"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: "#0066FF",
              }}
            >
              {example.finalMessage}
            </span>
          </div>
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
          background: "#0066FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 20,
            fontWeight: 400,
            color: "#FFFFFF",
          }}
        >
          Learn to build all of this
          <span style={{ fontWeight: 600 }}> - and more.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
