import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical What You'll Learn Scene: MOBILE OPTIMIZED COPY OF ORIGINAL
 *
 * 1:1 copy of BuildAnythingTrailer's WhatYouLearnScene
 * Optimized for 9:16 mobile (1080x1920)
 * - All original content preserved
 * - Stacked vertical layout for mobile
 * - Larger fonts for mobile readability
 */

// SVG Icons - SAME AS ORIGINAL
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

// Framework steps - SAME AS ORIGINAL
const frameworkSteps = [
  { icon: DecomposeIcon, label: "Decompose" },
  { icon: ToolIcon, label: "Select" },
  { icon: ContextIcon, label: "Context" },
  { icon: IterationIcon, label: "Iterate" },
  { icon: ControlIcon, label: "Control" },
];

// Build stages - SAME AS ORIGINAL
const buildStages = [
  "Real-time problem decomposition",
  "Tool chaining in action",
  "Shipping a working system",
];

export const VerticalWhatYouLearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation delays - SAME AS ORIGINAL
  const card1Delay = 20;
  const card2Delay = 110;
  const card3Delay = 200;

  // Flow line animation - REMOVED (not needed for vertical stack)
  // Card springs - SAME AS ORIGINAL
  const getCardSpring = (delay: number) => {
    if (frame < delay) return { scale: 0.92, opacity: 0, y: 40 };
    const s = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 60 } });
    return { scale: 0.92 + s * 0.08, opacity: s, y: 40 * (1 - s) };
  };

  const card1Anim = getCardSpring(card1Delay);
  const card2Anim = getCardSpring(card2Delay);
  const card3Anim = getCardSpring(card3Delay);

  // Right panel appears last - MOBILE: Now appears at bottom
  const rightPanelDelay = 290;
  const rightPanelOpacity = frame >= rightPanelDelay
    ? interpolate(frame, [rightPanelDelay, rightPanelDelay + 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })
    : 0;

  // Pulse for active elements - SAME AS ORIGINAL
  const pulseScale = 1 + Math.sin(frame * 0.12) * 0.04;

  // Color progression - SAME AS ORIGINAL
  const cardColors = ["#1a1a1a", "#1e1919", "#221818"];
  const accentColors = ["#FF5E5B", "#FF6B5B", "#FF785B"];

  // Layout - MOBILE OPTIMIZED (stacked vertical, fills width)
  const cardWidth = 900;    // WIDER FOR MOBILE
  const cardHeight = 280;  // TALLER FOR MOBILE
  const cardGap = 20;      // REDUCED GAP
  const startY = 150;      // START BELOW HEADER
  const leftOffset = 90;   // CENTERED

  // Floating decorative elements - ADJUSTED FOR MOBILE
  const floatingShapes = [
    { x: 100, y: 300, size: 80, rotation: 15 },
    { x: 850, y: 500, size: 60, rotation: -20 },
    { x: 150, y: 900, size: 70, rotation: 30 },
    { x: 800, y: 1100, size: 50, rotation: -10 },
  ];

  return (
    <AbsoluteFill style={{ background: "#FDF6E3", overflow: "hidden" }}>
      {/* Dense dot pattern background - SAME AS ORIGINAL */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(#1a1a1a 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Diagonal accent lines - SAME AS ORIGINAL */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <line x1="0" y1="1080" x2="400" y2="0" stroke="#FF5E5B" strokeWidth="1" opacity="0.08" />
        <line x1="200" y1="1080" x2="600" y2="0" stroke="#FF5E5B" strokeWidth="1" opacity="0.05" />
        <line x1="1920" y1="200" x2="1400" y2="1080" stroke="#FF5E5B" strokeWidth="1" opacity="0.08" />
      </svg>

      {/* Floating geometric shapes - ADJUSTED FOR MOBILE */}
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

      {/* Large decorative number - MOBILE: Moved up */}
      <div
        style={{
          position: "absolute",
          right: 50,
          top: 120,
          fontFamily: "Georgia, serif",
          fontSize: 300,
          fontWeight: 400,
          color: "#1a1a1a",
          opacity: 0.03,
          lineHeight: 0.8,
        }}
      >
        03
      </div>

      {/* ===== CARD 01: The Mental Model - MOBILE OPTIMIZED ===== */}
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

          {/* Number badge - LARGER FOR MOBILE */}
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
                  fontSize: 42, // LARGER FOR MOBILE
                  color: "#FDF6E3",
                  fontWeight: 400,
                }}
              >
                The Mental Model
              </div>
              <div
                style={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: 18, // LARGER FOR MOBILE
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

          {/* Icon bullets - LARGER, WRAPPED FOR MOBILE */}
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

      {/* ===== CARD 02: The Framework - MOBILE OPTIMIZED ===== */}
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

          {/* Number badge - LARGER FOR MOBILE */}
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
              <div style={{ fontFamily: "Georgia, serif", fontSize: 42, color: "#FDF6E3" }}>
                The Framework
              </div>
              <div style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 18, color: "rgba(253,246,227,0.5)", marginTop: 6 }}>
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

          {/* 5-step sequence - LARGER, WRAPPED FOR MOBILE */}
          <div style={{ display: "flex", gap: 12, marginTop: "auto", flexWrap: "wrap", justifyContent: "center" }}>
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
                        width: 30,
                        height: 3,
                        background: `linear-gradient(90deg, ${accentColors[1]}50, ${accentColors[1]}10)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CARD 03: Live Build - MOBILE OPTIMIZED ===== */}
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

          {/* Number badge - LARGER FOR MOBILE */}
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

          {/* Play button - SAME AS ORIGINAL */}
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
              <div style={{ fontFamily: "Georgia, serif", fontSize: 42, color: "#FDF6E3" }}>
                Live Build
              </div>
              <div style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 18, color: "rgba(253,246,227,0.5)", marginTop: 6 }}>
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

          {/* Build stages - LARGER FOR MOBILE */}
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

      {/* ===== RIGHT PANEL (COURSE OVERVIEW) - MOBILE: Now at bottom ===== */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: startY + (cardHeight + cardGap) * 3 + 30,
          opacity: rightPanelOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Stats - MOBILE LAYOUT */}
        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          {[
            { value: "~100", label: "Minutes" },
            { value: "3", label: "Modules" },
            { value: "∞", label: "Replay" },
          ].map(({ value, label }, i) => (
            <div key={label}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 52, color: "#1a1a1a" }}>
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 14,
                  color: "rgba(26,26,26,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Features - MOBILE: Wrapped */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {[
            "HD video lessons",
            "Downloadable resources",
            "Lifetime access",
            "Real-world projects",
            "Framework templates",
          ].map((feature, i) => {
            const featureDelay = rightPanelDelay + 20 + i * 12;
            const featureOpacity = interpolate(frame, [featureDelay, featureDelay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: featureOpacity }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#FF5E5B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="#FDF6E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 20, color: "#1a1a1a" }}>
                  {feature}
                </span>
              </div>
            );
          })}
        </div>

        {/* Testimonial quote - MOBILE: Centered */}
        <div
          style={{
            margin: "0 auto",
            maxWidth: 600,
            padding: "24px 32px",
            background: "rgba(26,26,26,0.04)",
            borderRadius: 16,
            borderLeft: "4px solid #FF5E5B",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#1a1a1a", fontStyle: "italic", lineHeight: 1.5 }}>
            "The mental model alone changed how I approach every project."
          </div>
          <div style={{ fontFamily: "'SF Mono', monospace", fontSize: 14, color: "rgba(26,26,26,0.5)", marginTop: 12 }}>
            — Early Access Student
          </div>
        </div>
      </div>

      {/* ===== BOTTOM CTA BAR - MOBILE OPTIMIZED ===== */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120, // TALLER FOR MOBILE
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Gradient accent line - SAME AS ORIGINAL */}
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
              <span style={{ fontSize: 28 }}>{icon}</span> {/* LARGER FOR MOBILE */}
              <span
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 18, // LARGER FOR MOBILE
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
