import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * What You'll Learn Scene: MAXIMALIST Vertical Course Progression
 *
 * DESIGN: Fill the entire viewport with rich content
 * - Large cards spanning most of the width
 * - Dense information with visual hierarchy
 * - Decorative elements filling empty spaces
 * - Animated background elements
 */

// SVG Icons - LARGER versions
const SandboxGarageIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="18" width="10" height="10" rx="1" />
    <path d="M18 14l6-6M24 14V8h-6" />
    <rect x="18" y="18" width="10" height="10" rx="1" />
    <path d="M9 18V8M9 8l-4 4M9 8l4 4" />
  </svg>
);

const EngineVehicleIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="16" r="6" />
    <path d="M16 16h8M24 12v8M20 14l4 2-4 2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
);

const OrchestratorIcon = () => (
  <svg width="44" height="44" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="16" cy="8" r="4" />
    <circle cx="8" cy="24" r="3" />
    <circle cx="16" cy="24" r="3" />
    <circle cx="24" cy="24" r="3" />
    <path d="M16 12v9M12 21l-2-5M20 21l2-5" />
  </svg>
);

const DecomposeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="4" width="8" height="6" rx="1" />
    <rect x="3" y="14" width="6" height="6" rx="1" />
    <rect x="15" y="14" width="6" height="6" rx="1" />
    <path d="M12 10v2M8 12H6v2M16 12h2v2" />
  </svg>
);

const ToolIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

const ContextIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="4" rx="1" />
    <rect x="4" y="10" width="16" height="4" rx="1" />
    <rect x="4" y="16" width="16" height="4" rx="1" />
    <path d="M8 6h2M8 12h4M8 18h6" />
  </svg>
);

const IterationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12a8 8 0 0114-5.3" />
    <path d="M20 12a8 8 0 01-14 5.3" />
    <path d="M18 4v4h-4M6 20v-4h4" />
  </svg>
);

const ControlIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="8" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M12 10v4M15 10v4M18 10v4" />
  </svg>
);

const PlayIcon = () => (
  <svg width="64" height="64" viewBox="0 0 48 48" fill="currentColor">
    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M20 16l12 8-12 8V16z" />
  </svg>
);

// Framework steps
const frameworkSteps = [
  { icon: DecomposeIcon, label: "Decompose" },
  { icon: ToolIcon, label: "Select" },
  { icon: ContextIcon, label: "Context" },
  { icon: IterationIcon, label: "Iterate" },
  { icon: ControlIcon, label: "Control" },
];

// Build stages
const buildStages = [
  "Real-time problem decomposition",
  "Tool chaining in action",
  "Shipping a working system",
];

export const WhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation delays - extended for 3-4s per card
  const card1Delay = 20;
  const card2Delay = 110;
  const card3Delay = 200;

  // Flow line animation - much slower
  const line1Progress = interpolate(frame, [40, 130], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line2Progress = interpolate(frame, [90, 210], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Card springs - slower, more gradual
  const getCardSpring = (delay: number) => {
    if (frame < delay) return { scale: 0.92, opacity: 0, y: 40 };
    const s = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 60 } });
    return { scale: 0.92 + s * 0.08, opacity: s, y: 40 * (1 - s) };
  };

  const card1Anim = getCardSpring(card1Delay);
  const card2Anim = getCardSpring(card2Delay);
  const card3Anim = getCardSpring(card3Delay);

  // Right panel appears last, after all cards are done
  const rightPanelDelay = 290;
  const rightPanelOpacity = frame >= rightPanelDelay
    ? interpolate(frame, [rightPanelDelay, rightPanelDelay + 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })
    : 0;

  // Pulse for active elements
  const pulseScale = 1 + Math.sin(frame * 0.12) * 0.04;

  // Color progression
  const cardColors = ["#1a1a1a", "#1e1919", "#221818"];
  const accentColors = ["#FF5E5B", "#FF6B5B", "#FF785B"];

  // Layout - MUCH bigger, fill the space
  const cardWidth = 780;
  const cardHeight = 240;
  const cardGap = 24;
  const startY = 55;
  const leftOffset = 180;

  // Floating decorative elements
  const floatingShapes = [
    { x: 1500, y: 150, size: 120, rotation: 15 },
    { x: 1600, y: 450, size: 80, rotation: -20 },
    { x: 1450, y: 700, size: 100, rotation: 30 },
    { x: 100, y: 850, size: 60, rotation: -10 },
    { x: 300, y: 900, size: 90, rotation: 25 },
  ];

  return (
    <AbsoluteFill style={{ background: "#FDF6E3", overflow: "hidden" }}>
      {/* Dense dot pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(#1a1a1a 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Diagonal accent lines */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <line x1="0" y1="1080" x2="400" y2="0" stroke="#FF5E5B" strokeWidth="1" opacity="0.08" />
        <line x1="200" y1="1080" x2="600" y2="0" stroke="#FF5E5B" strokeWidth="1" opacity="0.05" />
        <line x1="1920" y1="200" x2="1400" y2="1080" stroke="#FF5E5B" strokeWidth="1" opacity="0.08" />
      </svg>

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => {
        const floatY = Math.sin((frame + i * 30) * 0.04) * 20;
        const floatRotation = shape.rotation + Math.sin((frame + i * 20) * 0.03) * 5;
        const shapeOpacity = interpolate(frame, [20 + i * 10, 40 + i * 10], [0, 0.06], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y + floatY,
              width: shape.size,
              height: shape.size,
              border: `2px solid #FF5E5B`,
              borderRadius: i % 2 === 0 ? "50%" : "8px",
              opacity: shapeOpacity,
              transform: `rotate(${floatRotation}deg)`,
            }}
          />
        );
      })}

      {/* Large decorative number in background */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 100,
          fontFamily: "Georgia, serif",
          fontSize: 400,
          fontWeight: 400,
          color: "#1a1a1a",
          opacity: 0.03,
          lineHeight: 0.8,
        }}
      >
        03
      </div>

      {/* Left side - Progress track with larger indicators */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: startY + 40,
          height: cardHeight * 3 + cardGap * 2,
          width: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Vertical track line - thicker */}
        <svg style={{ position: "absolute", left: 36, top: 30, height: "90%" }} width="8" height="100%">
          <line x1="4" y1="0" x2="4" y2="100%" stroke="#e0d9c8" strokeWidth="4" />
          <line
            x1="4"
            y1="0"
            x2="4"
            y2={`${Math.min(100, (line1Progress * 50 + line2Progress * 50))}%`}
            stroke="#FF5E5B"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Progress indicators - LARGER */}
        {[0, 1, 2].map((i) => {
          const cardAnim = [card1Anim, card2Anim, card3Anim][i];
          const isActive = cardAnim.opacity > 0.5;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: i * (cardHeight + cardGap) + cardHeight / 2 - 32,
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: isActive ? accentColors[i] : "#e0d9c8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${isActive ? pulseScale : 1})`,
                boxShadow: isActive ? `0 8px 30px ${accentColors[i]}60` : "none",
                border: isActive ? "none" : "3px solid #d0c9b8",
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: isActive ? "#FDF6E3" : "#1a1a1a",
                }}
              >
                {i + 1}/3
              </span>
            </div>
          );
        })}
      </div>

      {/* ===== CARD 01: The Mental Model ===== */}
      <div
        style={{
          position: "absolute",
          left: leftOffset,
          top: startY,
          width: cardWidth,
          opacity: card1Anim.opacity,
          transform: `scale(${card1Anim.scale}) translateY(${card1Anim.y}px)`,
        }}
      >
        <div
          style={{
            background: cardColors[0],
            borderRadius: 20,
            padding: "32px 40px",
            height: cardHeight,
            boxShadow: "0 30px 80px rgba(26,26,26,0.2)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background: `radial-gradient(circle at top right, ${accentColors[0]}20 0%, transparent 60%)`,
            }}
          />

          {/* Number badge - larger */}
          <div
            style={{
              position: "absolute",
              top: -15,
              right: 30,
              fontFamily: "'SF Mono', monospace",
              fontSize: 80,
              fontWeight: 700,
              color: accentColors[0],
              opacity: 0.15,
            }}
          >
            01
          </div>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 36,
                  color: "#FDF6E3",
                  fontWeight: 400,
                }}
              >
                The Mental Model
              </div>
              <div
                style={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: 16,
                  color: "rgba(253,246,227,0.5)",
                  marginTop: 6,
                }}
              >
                How to think about AI as a builder
              </div>
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 14,
                color: accentColors[0],
                background: `${accentColors[0]}20`,
                padding: "8px 16px",
                borderRadius: 24,
                fontWeight: 600,
              }}
            >
              ~25 min
            </div>
          </div>

          {/* Icon bullets - LARGER, more spacing */}
          <div style={{ display: "flex", gap: 32, marginTop: "auto" }}>
            {[
              { Icon: SandboxGarageIcon, label: "Sandbox vs Garage" },
              { Icon: EngineVehicleIcon, label: "Engine vs Vehicle" },
              { Icon: OrchestratorIcon, label: "Orchestrator's Mindset" },
            ].map(({ Icon, label }, i) => {
              const iconDelay = card1Delay + 30 + i * 15;
              const iconOpacity = interpolate(frame, [iconDelay, iconDelay + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    opacity: iconOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 14,
                      background: "rgba(253,246,227,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accentColors[0],
                      border: `1px solid ${accentColors[0]}30`,
                    }}
                  >
                    <Icon />
                  </div>
                  <span
                    style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 11,
                      color: "rgba(253,246,227,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CARD 02: The Framework ===== */}
      <div
        style={{
          position: "absolute",
          left: leftOffset,
          top: startY + cardHeight + cardGap,
          width: cardWidth,
          opacity: card2Anim.opacity,
          transform: `scale(${card2Anim.scale}) translateY(${card2Anim.y}px)`,
        }}
      >
        <div
          style={{
            background: cardColors[1],
            borderRadius: 20,
            padding: "32px 40px",
            height: cardHeight,
            boxShadow: "0 30px 80px rgba(26,26,26,0.2)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background: `radial-gradient(circle at top right, ${accentColors[1]}20 0%, transparent 60%)`,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: -15,
              right: 30,
              fontFamily: "'SF Mono', monospace",
              fontSize: 80,
              fontWeight: 700,
              color: accentColors[1],
              opacity: 0.15,
            }}
          >
            02
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#FDF6E3" }}>
                The Framework
              </div>
              <div style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 16, color: "rgba(253,246,227,0.5)", marginTop: 6 }}>
                The 5-step orchestration system
              </div>
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 14,
                color: accentColors[1],
                background: `${accentColors[1]}20`,
                padding: "8px 16px",
                borderRadius: 24,
                fontWeight: 600,
              }}
            >
              ~30 min
            </div>
          </div>

          {/* 5-step sequence - LARGER */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
            {frameworkSteps.map(({ icon: Icon, label }, i) => {
              const stepDelay = card2Delay + 20 + i * 12;
              const stepOpacity = interpolate(frame, [stepDelay, stepDelay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
              const isFirst = i === 0;

              return (
                <div key={i} style={{ display: "flex", alignItems: "center", opacity: stepOpacity }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: isFirst ? accentColors[1] : "rgba(253,246,227,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isFirst ? "#1a1a1a" : "rgba(253,246,227,0.8)",
                        border: isFirst ? "none" : `1px solid rgba(253,246,227,0.2)`,
                      }}
                    >
                      <Icon />
                    </div>
                    <span
                      style={{
                        fontFamily: "'SF Mono', monospace",
                        fontSize: 10,
                        color: "rgba(253,246,227,0.45)",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 4 && (
                    <div
                      style={{
                        width: 40,
                        height: 3,
                        background: `linear-gradient(90deg, ${accentColors[1]}50, ${accentColors[1]}10)`,
                        marginLeft: 8,
                        marginBottom: 24,
                        borderRadius: 2,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CARD 03: Live Build ===== */}
      <div
        style={{
          position: "absolute",
          left: leftOffset,
          top: startY + (cardHeight + cardGap) * 2,
          width: cardWidth,
          opacity: card3Anim.opacity,
          transform: `scale(${card3Anim.scale}) translateY(${card3Anim.y}px)`,
        }}
      >
        <div
          style={{
            background: cardColors[2],
            borderRadius: 20,
            padding: "32px 40px",
            height: cardHeight,
            boxShadow: "0 30px 80px rgba(26,26,26,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background: `radial-gradient(circle at top right, ${accentColors[2]}20 0%, transparent 60%)`,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: -15,
              right: 30,
              fontFamily: "'SF Mono', monospace",
              fontSize: 80,
              fontWeight: 700,
              color: accentColors[2],
              opacity: 0.15,
            }}
          >
            03
          </div>

          {/* Play button - prominent */}
          <div
            style={{
              position: "absolute",
              right: 50,
              top: "50%",
              transform: "translateY(-50%)",
              color: accentColors[2],
              opacity: 0.4 + Math.sin(frame * 0.1) * 0.15,
            }}
          >
            <PlayIcon />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#FDF6E3" }}>
                Live Build
              </div>
              <div style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 16, color: "rgba(253,246,227,0.5)", marginTop: 6 }}>
                Watch me build a real project from scratch
              </div>
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 14,
                color: accentColors[2],
                background: `${accentColors[2]}20`,
                padding: "8px 16px",
                borderRadius: 24,
                fontWeight: 600,
              }}
            >
              ~45 min
            </div>
          </div>

          {/* Build stages - larger text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
            {buildStages.map((stage, i) => {
              const stageDelay = card3Delay + 20 + i * 15;
              const stageOpacity = interpolate(frame, [stageDelay, stageDelay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: stageOpacity }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: accentColors[2],
                      boxShadow: `0 0 10px ${accentColors[2]}60`,
                    }}
                  />
                  <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 15, color: "rgba(253,246,227,0.7)" }}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL - Course Overview ===== */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: startY + 20,
          width: 480,
          opacity: rightPanelOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.4)",
            marginBottom: 16,
          }}
        >
          Course Overview
        </div>

        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#1a1a1a",
            lineHeight: 1.1,
            marginBottom: 30,
          }}
        >
          Master the art of
          <br />
          <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>agentic coding</span>
        </div>

        {/* Stats - LARGER */}
        <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
          {[
            { value: "~100", label: "Minutes" },
            { value: "3", label: "Modules" },
            { value: "∞", label: "Replay" },
          ].map(({ value, label }, i) => (
            <div key={i}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 48, color: "#1a1a1a" }}>
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 12,
                  color: "rgba(26,26,26,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 2, background: "rgba(26,26,26,0.1)", marginBottom: 30 }} />

        {/* Features - LARGER */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            "HD video lessons",
            "Downloadable resources",
            "Lifetime access",
            "Real-world projects",
            "Framework templates",
          ].map((feature, i) => {
            const featureDelay = rightPanelDelay + 30 + i * 12;
            const featureOpacity = interpolate(frame, [featureDelay, featureDelay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: featureOpacity }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "#FF5E5B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="#FDF6E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 18, color: "#1a1a1a" }}>
                  {feature}
                </span>
              </div>
            );
          })}
        </div>

        {/* Testimonial quote */}
        <div
          style={{
            marginTop: 40,
            padding: "24px 28px",
            background: "rgba(26,26,26,0.04)",
            borderRadius: 16,
            borderLeft: "4px solid #FF5E5B",
          }}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "#1a1a1a", fontStyle: "italic", lineHeight: 1.5 }}>
            "The mental model alone changed how I approach every project."
          </div>
          <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 12, color: "rgba(26,26,26,0.5)", marginTop: 12 }}>
            — Early Access Student
          </div>
        </div>
      </div>

      {/* ===== BOTTOM CTA BAR ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Gradient accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #FF5E5B, #FF785B, #FF5E5B)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {[
            { icon: "⏱", text: "Total: ~100 minutes" },
            { icon: "📦", text: "Video + Resources" },
            { icon: "♾️", text: "Lifetime Access" },
          ].map(({ icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 15,
                  color: "rgba(253,246,227,0.8)",
                  letterSpacing: "0.02em",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
