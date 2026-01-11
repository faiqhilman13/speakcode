import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
  Audio,
  staticFile,
} from "remotion";
import React from "react";

// ============================================================================
// DESIGN SYSTEM - Constellation/Neural Network Theme
// ============================================================================
const colors = {
  // Deep space backgrounds
  spaceBlack: "#030712",
  nebulaDark: "#0c1222",
  nebulaDeep: "#111827",

  // Primary - Electric blue (AI/Tech)
  primary: "#3b82f6",
  primaryGlow: "#60a5fa",
  primaryDim: "#1d4ed8",

  // Secondary - Warm amber (Human/Energy)
  secondary: "#f59e0b",
  secondaryGlow: "#fbbf24",

  // Accent - Violet (Connection/Magic)
  accent: "#8b5cf6",
  accentGlow: "#a78bfa",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
};

const fonts = {
  display: "'SF Pro Display', 'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// ============================================================================
// PARTICLE SYSTEM - Floating nodes in space
// ============================================================================
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  color: string;
  pulseSpeed: number;
}

const generateParticles = (count: number, seed: string): Particle[] => {
  const particleColors = [colors.primary, colors.accent, colors.secondary, colors.primaryGlow];
  return Array.from({ length: count }, (_, i) => ({
    x: random(`${seed}-x-${i}`) * 100,
    y: random(`${seed}-y-${i}`) * 100,
    size: 2 + random(`${seed}-size-${i}`) * 4,
    speed: 0.3 + random(`${seed}-speed-${i}`) * 0.7,
    delay: random(`${seed}-delay-${i}`) * 60,
    color: particleColors[Math.floor(random(`${seed}-color-${i}`) * particleColors.length)],
    pulseSpeed: 0.05 + random(`${seed}-pulse-${i}`) * 0.1,
  }));
};

// ============================================================================
// BACKGROUND COMPONENT - Cosmic depth with particles
// ============================================================================
const CosmicBackground: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = React.useMemo(() => generateParticles(80, "cosmic"), []);

  // Subtle nebula color shift
  const hueShift = interpolate(frame, [0, 1200], [0, 30]);

  return (
    <AbsoluteFill>
      {/* Deep space gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 120% 80% at 20% 20%, ${colors.nebulaDeep} 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 80% 80%, hsl(${250 + hueShift}, 40%, 8%) 0%, transparent 50%),
            radial-gradient(ellipse 80% 100% at 50% 50%, ${colors.nebulaDark} 0%, ${colors.spaceBlack} 100%)
          `,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const adjustedFrame = Math.max(0, frame - p.delay);
        const yOffset = (adjustedFrame * p.speed * 0.5) % 120;
        const pulse = 1 + Math.sin(frame * p.pulseSpeed) * 0.3;
        const opacity = interpolate(adjustedFrame, [0, 30], [0, 0.6 * intensity], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${((p.y + yOffset) % 120) - 10}%`,
              width: p.size * pulse,
              height: p.size * pulse,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${colors.primary}08 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}08 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.5,
        }}
      />

      {/* Film grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// NEURAL CONNECTION LINES
// ============================================================================
interface ConnectionLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const NeuralConnections: React.FC<{ nodePositions: { x: number; y: number }[] }> = ({ nodePositions }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const connections: ConnectionLine[] = React.useMemo(() => {
    const lines: ConnectionLine[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = Math.hypot(
          nodePositions[i].x - nodePositions[j].x,
          nodePositions[i].y - nodePositions[j].y
        );
        if (dist < 35) {
          lines.push({
            x1: nodePositions[i].x,
            y1: nodePositions[i].y,
            x2: nodePositions[j].x,
            y2: nodePositions[j].y,
            delay: random(`conn-${i}-${j}`) * 30,
          });
        }
      }
    }
    return lines;
  }, [nodePositions]);

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {connections.map((conn, i) => {
        const progress = interpolate(
          frame - conn.delay,
          [0, 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const pulse = 0.3 + Math.sin(frame * 0.08 + i) * 0.2;

        return (
          <line
            key={i}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x1 + (conn.x2 - conn.x1) * progress}%`}
            y2={`${conn.y1 + (conn.y2 - conn.y1) * progress}%`}
            stroke={colors.accent}
            strokeWidth={1.5}
            opacity={pulse * progress}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

// ============================================================================
// AGENT NODE COMPONENT
// ============================================================================
const AgentNode: React.FC<{
  x: number;
  y: number;
  label: string;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ x, y, label, delay = 0, size = 60, color = colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const scale = spring({ frame: adjustedFrame, fps, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale * pulse})`,
        opacity,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Core node */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${color}, ${colors.spaceBlack})`,
          border: `2px solid ${color}`,
          boxShadow: `
            0 0 20px ${color}60,
            inset 0 0 20px ${color}30
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 600,
            color: colors.textPrimary,
            textShadow: `0 0 10px ${color}`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// ANIMATED TEXT COMPONENTS
// ============================================================================
const GradientText: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  style?: React.CSSProperties;
}> = ({ children, gradient, style }) => (
  <span
    style={{
      background: gradient || `linear-gradient(135deg, ${colors.primaryGlow} 0%, ${colors.accentGlow} 50%, ${colors.secondaryGlow} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </span>
);

const AnimatedTitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  gradient?: boolean;
}> = ({ text, delay = 0, fontSize = 72, gradient = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", justifyContent: "center" }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 5;
        const adjustedFrame = Math.max(0, frame - wordDelay);
        const y = spring({ frame: adjustedFrame, fps, config: { damping: 15, stiffness: 100 } });
        const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

        const content = (
          <span
            style={{
              fontFamily: fonts.display,
              fontSize,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: colors.textPrimary,
            }}
          >
            {word}
          </span>
        );

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${(1 - y) * 40}px)`,
            }}
          >
            {gradient ? (
              <GradientText style={{ fontSize, fontWeight: 700, letterSpacing: "-0.02em" }}>
                {word}
              </GradientText>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
};

const TypewriterText: React.FC<{
  text: string;
  delay?: number;
  speed?: number;
}> = ({ text, delay = 0, speed = 2 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.floor(adjustedFrame / speed);
  const showCursor = adjustedFrame % 15 < 10;

  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 24,
        color: colors.primaryGlow,
        textShadow: `0 0 20px ${colors.primary}60`,
      }}
    >
      {text.slice(0, charsToShow)}
      <span style={{ opacity: showCursor && charsToShow < text.length ? 1 : 0 }}>▊</span>
    </span>
  );
};

// ============================================================================
// SCENE 1: HOOK - "What if coding wasn't about syntax?"
// ============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={0.5} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 1200 }}>
          <TypewriterText text="> what if coding wasn't about syntax?" delay={15} speed={1.5} />

          <div style={{ marginTop: 60 }}>
            <AnimatedTitle
              text="What if it was about thinking?"
              delay={70}
              fontSize={64}
              gradient={true}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 2: PROBLEM - Traditional coding struggle
// ============================================================================
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const problems = [
    "Memorizing syntax",
    "Endless debugging",
    "Years of practice",
    "Working alone",
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={0.3} />

      {/* Red warning overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, transparent 0%, #ef444420 100%)`,
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: "#ef4444",
              marginBottom: 30,
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            [ THE OLD WAY ]
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {problems.map((problem, i) => {
              const itemDelay = 20 + i * 15;
              const opacity = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], { extrapolateRight: "clamp" });
              const x = interpolate(frame, [itemDelay, itemDelay + 15], [-30, 0], { extrapolateRight: "clamp" });
              const strikethrough = interpolate(frame, [itemDelay + 40, itemDelay + 50], [0, 100], { extrapolateRight: "clamp" });

              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 48,
                    fontWeight: 600,
                    color: colors.textSecondary,
                    opacity,
                    transform: `translateX(${x}px)`,
                    position: "relative",
                  }}
                >
                  {problem}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      height: 3,
                      width: `${strikethrough}%`,
                      background: "#ef4444",
                      boxShadow: "0 0 10px #ef4444",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 3: THE SHIFT - New paradigm reveal
// ============================================================================
const ShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Dramatic zoom
  const scale = interpolate(frame, [0, 60], [0.8, 1], { extrapolateRight: "clamp" });

  // Ring expansion
  const ringScale = spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 50 } });
  const ringOpacity = interpolate(frame, [20, 40, 80, 100], [0, 0.8, 0.8, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={0.8} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        {/* Expanding ring */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: `3px solid ${colors.primary}`,
            transform: `scale(${ringScale * 2})`,
            opacity: ringOpacity,
            boxShadow: `0 0 60px ${colors.primary}`,
          }}
        />

        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 20,
              color: colors.primaryGlow,
              marginBottom: 20,
              opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            // paradigm_shift.exe
          </div>

          <AnimatedTitle
            text="They're not tools."
            delay={40}
            fontSize={56}
            gradient={false}
          />

          <div style={{ marginTop: 30 }}>
            <AnimatedTitle
              text="They're agents."
              delay={65}
              fontSize={80}
              gradient={true}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 4: SOLUTION - The Agent Swarm
// ============================================================================
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Agent nodes arranged in constellation
  const agentNodes = [
    { x: 50, y: 30, label: "PLAN", delay: 20 },
    { x: 25, y: 50, label: "CODE", delay: 30 },
    { x: 75, y: 50, label: "TEST", delay: 40 },
    { x: 35, y: 70, label: "DEBUG", delay: 50 },
    { x: 65, y: 70, label: "SHIP", delay: 60 },
    { x: 50, y: 50, label: "YOU", delay: 10, color: colors.secondary },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={1} />

      {/* Neural connections */}
      <NeuralConnections
        nodePositions={agentNodes.map(n => ({ x: n.x, y: n.y }))}
      />

      {/* Agent nodes */}
      {agentNodes.map((node, i) => (
        <AgentNode
          key={i}
          x={node.x}
          y={node.y}
          label={node.label}
          delay={node.delay}
          size={node.label === "YOU" ? 80 : 55}
          color={node.color || colors.primary}
        />
      ))}

      {/* Title overlay */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 80 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 36,
            color: colors.textPrimary,
            opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" }),
            textAlign: "center",
          }}
        >
          Command a <GradientText>swarm of AI agents</GradientText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 5: PROOF - Stats and achievements
// ============================================================================
const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const stats = [
    { value: "30K+", label: "Developers learning", delay: 15 },
    { value: "9 days", label: "to ship 5-week project", delay: 30 },
    { value: "0", label: "lines written by hand", delay: 45 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={0.6} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 80 }}>
          {stats.map((stat, i) => {
            const adjustedFrame = Math.max(0, frame - stat.delay);
            const scale = spring({ frame: adjustedFrame, fps, config: { damping: 12 } });
            const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <GradientText
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 72,
                    fontWeight: 800,
                    display: "block",
                  }}
                >
                  {stat.value}
                </GradientText>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 20,
                    color: colors.textSecondary,
                    marginTop: 10,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 6: CURRICULUM - What you'll learn
// ============================================================================
const CurriculumScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const modules = [
    "Context Engineering",
    "Prompt Architecture",
    "Agent Orchestration",
    "Production Deploy",
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <CosmicBackground intensity={0.5} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              color: colors.accent,
              marginBottom: 30,
              opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
              letterSpacing: "0.2em",
            }}
          >
            8 MODULES • LIFETIME ACCESS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px 60px" }}>
            {modules.map((mod, i) => {
              const itemDelay = 20 + i * 12;
              const opacity = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], { extrapolateRight: "clamp" });
              const x = interpolate(frame, [itemDelay, itemDelay + 15], [i % 2 === 0 ? -20 : 20, 0], { extrapolateRight: "clamp" });

              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 32,
                    fontWeight: 600,
                    color: colors.textPrimary,
                    opacity,
                    transform: `translateX(${x}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <span style={{ color: colors.primaryGlow, fontFamily: fonts.mono, fontSize: 20 }}>
                    0{i + 1}
                  </span>
                  {mod}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 7: CTA - Join the revolution
// ============================================================================
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing CTA button
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;
  const buttonScale = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <CosmicBackground intensity={1} />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: colors.primaryGlow,
              marginBottom: 20,
              opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            speakcode.dev
          </div>

          <AnimatedTitle
            text="Stop writing code."
            delay={20}
            fontSize={60}
            gradient={false}
          />

          <div style={{ marginTop: 10 }}>
            <AnimatedTitle
              text="Start speaking it."
              delay={35}
              fontSize={60}
              gradient={true}
            />
          </div>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 60,
              opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${buttonScale * pulse})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "20px 60px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                borderRadius: 12,
                fontFamily: fonts.display,
                fontSize: 24,
                fontWeight: 700,
                color: colors.textPrimary,
                boxShadow: `
                  0 0 40px ${colors.primary}60,
                  0 10px 40px ${colors.spaceBlack}80
                `,
              }}
            >
              Start Learning →
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================
export const ConstellationTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.spaceBlack }}>
      {/* Scene 1: Hook - 0 to 120 frames (4 seconds) */}
      <Sequence from={0} durationInFrames={120}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Problem - 120 to 270 frames (5 seconds) */}
      <Sequence from={120} durationInFrames={150}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3: The Shift - 270 to 420 frames (5 seconds) */}
      <Sequence from={270} durationInFrames={150}>
        <ShiftScene />
      </Sequence>

      {/* Scene 4: Solution (Agent Swarm) - 420 to 600 frames (6 seconds) */}
      <Sequence from={420} durationInFrames={180}>
        <SolutionScene />
      </Sequence>

      {/* Scene 5: Proof/Stats - 600 to 780 frames (6 seconds) */}
      <Sequence from={600} durationInFrames={180}>
        <ProofScene />
      </Sequence>

      {/* Scene 6: Curriculum - 780 to 930 frames (5 seconds) */}
      <Sequence from={780} durationInFrames={150}>
        <CurriculumScene />
      </Sequence>

      {/* Scene 7: CTA - 930 to 1080 frames (5 seconds) */}
      <Sequence from={930} durationInFrames={150}>
        <CTAScene />
      </Sequence>

      {/* Background music */}
      <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.4} />
    </AbsoluteFill>
  );
};
