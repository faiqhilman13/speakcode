import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/**
 * RetroNewWayScene - Conversational coding showcase with 80s terminal aesthetic
 * Style: Retro computer terminal, neon prompts, pixel progress bars
 */

const COLORS = {
  pink: "#FF1493",
  cyan: "#00FFFF",
  yellow: "#FFFF00",
  purple: "#9D00FF",
  green: "#00FF88",
  black: "#0a0a0f",
  darkBlue: "#0a1628",
};

const examples = [
  {
    prompt: "Create a landing page for my fitness SaaS",
    steps: ["DESIGNING HERO SECTION...", "ADDING FEATURES & CTAS...", "DEPLOYING..."],
    result: "landing-page-result.png",
    finalMessage: "YOU BUILT THIS",
    category: "WEB DEV",
  },
  {
    prompt: "Build me a real-time analytics dashboard",
    steps: ["CONNECTING DATA SOURCES...", "CREATING VISUALIZATIONS...", "READY!"],
    result: "analytics-dashboard-result.png",
    finalMessage: "YOU BUILT THIS",
    category: "WEB DEV",
  },
  {
    prompt: "Create a promotional video for my course",
    steps: ["WRITING SCRIPT...", "GENERATING SCENES...", "RENDERING..."],
    result: "video-editor-result.png",
    finalMessage: "YOU MADE THIS",
    category: "VIDEO",
  },
  {
    prompt: "Make a pitch deck for my startup",
    steps: ["STRUCTURING SLIDES...", "ADDING CHARTS...", "FORMATTING..."],
    result: "powerpoint-result.png",
    finalMessage: "YOU CREATED THIS",
    category: "SLIDES",
  },
  {
    prompt: "Research my competitors and create a report",
    steps: ["GATHERING DATA...", "ANALYZING MARKET...", "COMPILING REPORT..."],
    result: "research-report-result.png",
    finalMessage: "YOU DID THIS",
    category: "RESEARCH",
  },
];

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

export const RetroNewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exampleDuration = 150;
  const currentIndex = Math.min(Math.floor(frame / exampleDuration), examples.length - 1);
  const exampleFrame = frame - currentIndex * exampleDuration;

  const example = examples[currentIndex];

  // Transitions
  const fadeOut =
    exampleFrame > exampleDuration - 10
      ? interpolate(exampleFrame, [exampleDuration - 10, exampleDuration], [1, 0], { extrapolateRight: "clamp" })
      : 1;
  const fadeIn = exampleFrame < 10 ? interpolate(exampleFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  // Typing animation
  const typingProgress = interpolate(exampleFrame, [5, 35], [0, example.prompt.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const displayedPrompt = example.prompt.slice(0, Math.floor(typingProgress));
  const showCursor = exampleFrame >= 5 && exampleFrame < 40;

  // Step animations
  const getStepOpacity = (index: number) => {
    const startFrame = 38 + index * 10;
    return exampleFrame >= startFrame
      ? interpolate(exampleFrame - startFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" })
      : 0;
  };

  // Result animation
  const showResult = exampleFrame >= 50;
  const resultScale = showResult ? spring({ frame: exampleFrame - 50, fps, config: { damping: 12 } }) : 0;
  const resultOpacity = showResult ? interpolate(exampleFrame - 50, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Success message
  const showFinal = exampleFrame >= 65;
  const finalOpacity = showFinal ? interpolate(exampleFrame - 65, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Animated grid
  const gridOffset = frame * 0.5;

  return (
    <AbsoluteFill style={{ background: COLORS.darkBlue, opacity }}>
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, ${COLORS.cyan}11 1px, transparent 1px),
            linear-gradient(0deg, ${COLORS.cyan}11 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: `${gridOffset}px ${gridOffset}px`,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: COLORS.black,
          borderBottom: `4px solid ${COLORS.pink}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: COLORS.cyan,
            }}
          >
            {">> WHAT YOU'LL MASTER"}
          </div>
          <div
            style={{
              background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.yellow})`,
              padding: "8px 18px",
              borderRadius: 4,
              fontFamily: "'Impact', sans-serif",
              fontSize: 16,
              color: COLORS.black,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {example.category}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 32,
            color: COLORS.pink,
            textShadow: `0 0 15px ${COLORS.pink}`,
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
          paddingTop: 100,
          paddingBottom: 90,
        }}
      >
        {/* Left - Terminal style conversation */}
        <div
          style={{
            flex: 1,
            padding: "30px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* User prompt - terminal style */}
          <div style={{ marginBottom: 30 }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: COLORS.green,
                marginBottom: 10,
                letterSpacing: "0.1em",
              }}
            >
              {"USER@SPEAKCODE:~$"}
            </div>
            <div
              style={{
                background: COLORS.black,
                padding: "20px 25px",
                borderRadius: 8,
                border: `3px solid ${COLORS.cyan}`,
                boxShadow: `0 0 20px ${COLORS.cyan}33, inset 0 0 30px ${COLORS.cyan}11`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 24,
                  color: COLORS.yellow,
                }}
              >
                {">"} {displayedPrompt}
                {showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 28,
                      background: COLORS.cyan,
                      marginLeft: 4,
                      opacity: Math.floor(frame / 8) % 2,
                      verticalAlign: "text-bottom",
                      boxShadow: `0 0 10px ${COLORS.cyan}`,
                    }}
                  />
                )}
              </span>
            </div>
          </div>

          {/* AI Response */}
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              color: COLORS.pink,
              marginBottom: 10,
              letterSpacing: "0.1em",
            }}
          >
            {"CLAUDE@AI:~$"}
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
                    gap: 15,
                    background: isLast
                      ? `linear-gradient(90deg, ${COLORS.green}22, transparent)`
                      : `${COLORS.black}88`,
                    padding: "14px 20px",
                    borderRadius: 6,
                    border: isLast ? `2px solid ${COLORS.green}` : `2px solid ${COLORS.purple}44`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 18,
                      color: isLast ? COLORS.green : COLORS.cyan,
                      textShadow: `0 0 10px ${isLast ? COLORS.green : COLORS.cyan}`,
                    }}
                  >
                    {isLast ? "[OK]" : "[...]"}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Visual result */}
        <div
          style={{
            flex: 1.2,
            padding: "30px 40px",
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
              opacity: exampleFrame >= 40 && exampleFrame < 55 ? 1 : 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 24,
                color: COLORS.cyan,
                marginBottom: 20,
                textShadow: `0 0 15px ${COLORS.cyan}`,
              }}
            >
              {">>> BUILDING <<<"}
            </div>
            {/* Retro progress bar */}
            <div
              style={{
                width: 250,
                height: 20,
                background: COLORS.black,
                border: `3px solid ${COLORS.cyan}`,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${interpolate(exampleFrame, [40, 55], [0, 100], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                  })}%`,
                  height: "100%",
                  background: `repeating-linear-gradient(
                    90deg,
                    ${COLORS.pink} 0px,
                    ${COLORS.pink} 10px,
                    ${COLORS.yellow} 10px,
                    ${COLORS.yellow} 20px
                  )`,
                  boxShadow: `0 0 15px ${COLORS.pink}`,
                }}
              />
            </div>
          </div>

          {/* Result mockup with CRT frame */}
          <div
            style={{
              opacity: resultOpacity,
              transform: `scale(${0.85 + resultScale * 0.15}) perspective(1000px) rotateY(-5deg)`,
              position: "relative",
            }}
          >
            {/* CRT monitor frame */}
            <div
              style={{
                padding: 15,
                background: `linear-gradient(135deg, #333 0%, #1a1a1a 100%)`,
                borderRadius: 20,
                border: `4px solid ${COLORS.purple}`,
                boxShadow: `
                  0 30px 80px rgba(0,0,0,0.6),
                  0 0 40px ${COLORS.purple}44,
                  inset 0 0 20px rgba(0,0,0,0.5)
                `,
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `3px solid ${COLORS.cyan}`,
                  boxShadow: `inset 0 0 30px ${COLORS.cyan}22`,
                }}
              >
                <Img
                  src={staticFile(example.result)}
                  style={{
                    width: 480,
                    height: "auto",
                    display: "block",
                    filter: "saturate(1.2) contrast(1.05)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Success badge */}
          <div
            style={{
              marginTop: 25,
              opacity: finalOpacity,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: `${COLORS.black}ee`,
              padding: "14px 28px",
              borderRadius: 8,
              border: `3px solid ${COLORS.green}`,
              boxShadow: `0 0 20px ${COLORS.green}44`,
            }}
          >
            <span style={{ fontSize: 22, color: COLORS.green }}>{"[OK]"}</span>
            <span
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 22,
                color: COLORS.green,
                textShadow: `0 0 10px ${COLORS.green}`,
                letterSpacing: "0.1em",
              }}
            >
              {example.finalMessage}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom tagline bar */}
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
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Impact', sans-serif",
            fontSize: 32,
            color: COLORS.black,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textShadow: `2px 2px 0 ${COLORS.yellow}`,
          }}
        >
          LEARN TO BUILD ALL OF THIS - AND MORE
        </div>
      </div>

      {/* Scanlines */}
      <Scanlines />
    </AbsoluteFill>
  );
};
