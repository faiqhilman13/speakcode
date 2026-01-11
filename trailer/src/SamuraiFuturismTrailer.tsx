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
// DESIGN SYSTEM - Samurai x Futuristic "Agentic Dojo"
// ============================================================================
const colors = {
  // Deep backgrounds
  void: "#0a0a0f",
  inkBlack: "#121218",
  nightSky: "#0f1419",

  // Traditional Japanese
  crimson: "#cc0000",
  crimsonGlow: "#ff1a1a",
  crimsonDeep: "#8b0000",
  gold: "#d4a574",
  goldBright: "#ffd700",

  // Zen neutrals
  cream: "#fdfcf8",
  ricePaper: "#f5f3ed",
  inkGray: "#2a2a30",
  bamboo: "#4a5d3a",

  // Futuristic accents
  neonCrimson: "#ff073a",
  neonGold: "#ffcc00",
  cyberWhite: "#e8e8f0",

  // Sakura
  sakuraPink: "#ffb7c5",
  sakuraDeep: "#ff69b4",
};

const fonts = {
  display: "'SF Pro Display', 'Inter', system-ui, sans-serif",
  brush: "'Noto Serif JP', Georgia, serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// ============================================================================
// SAKURA PARTICLE SYSTEM - Falling cherry blossoms
// ============================================================================
interface SakuraPetal {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  rotation: number;
  rotationSpeed: number;
  delay: number;
  opacity: number;
}

const generateSakura = (count: number, seed: string): SakuraPetal[] => {
  return Array.from({ length: count }, (_, i) => ({
    x: random(`${seed}-x-${i}`) * 100,
    y: random(`${seed}-y-${i}`) * 100 - 20,
    size: 8 + random(`${seed}-size-${i}`) * 12,
    speed: 0.4 + random(`${seed}-speed-${i}`) * 0.8,
    sway: 2 + random(`${seed}-sway-${i}`) * 3,
    rotation: random(`${seed}-rot-${i}`) * 360,
    rotationSpeed: 0.5 + random(`${seed}-rotspeed-${i}`) * 2,
    delay: random(`${seed}-delay-${i}`) * 60,
    opacity: 0.4 + random(`${seed}-opacity-${i}`) * 0.4,
  }));
};

// ============================================================================
// JAPANESE BACKGROUND - Dark zen aesthetic with neon accents
// ============================================================================
const DojoBackground: React.FC<{ intensity?: number; variant?: "dark" | "light" }> = ({
  intensity = 1,
  variant = "dark",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const sakura = React.useMemo(() => generateSakura(40, "sakura"), []);

  const isDark = variant === "dark";
  const bgColor = isDark ? colors.void : colors.ricePaper;

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 20% 30%, ${colors.crimsonDeep}15 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 70%, ${colors.gold}10 0%, transparent 50%),
              linear-gradient(180deg, ${colors.inkBlack} 0%, ${colors.void} 100%)
            `
            : `
              radial-gradient(ellipse 80% 60% at 20% 30%, ${colors.sakuraPink}20 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 70%, ${colors.gold}15 0%, transparent 50%),
              linear-gradient(180deg, ${colors.cream} 0%, ${colors.ricePaper} 100%)
            `,
        }}
      />

      {/* Japanese wave pattern (subtle) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' fill='none' stroke='${encodeURIComponent(isDark ? colors.crimson + "15" : colors.crimson + "10")}' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 20px",
          opacity: 0.3,
        }}
      />

      {/* Falling sakura petals */}
      {sakura.map((petal, i) => {
        const adjustedFrame = Math.max(0, frame - petal.delay);
        const yOffset = (adjustedFrame * petal.speed) % 140;
        const xSway = Math.sin(adjustedFrame * 0.05 + i) * petal.sway;
        const rotation = petal.rotation + adjustedFrame * petal.rotationSpeed;
        const opacity = interpolate(adjustedFrame, [0, 20], [0, petal.opacity * intensity], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${petal.x + xSway}%`,
              top: `${((petal.y + yOffset) % 140) - 20}%`,
              width: petal.size,
              height: petal.size,
              background: `radial-gradient(ellipse, ${colors.sakuraPink} 30%, ${colors.sakuraDeep}80 100%)`,
              borderRadius: "50% 0 50% 50%",
              transform: `rotate(${rotation}deg)`,
              opacity,
              boxShadow: isDark ? `0 0 ${petal.size}px ${colors.sakuraPink}40` : "none",
            }}
          />
        );
      })}

      {/* Subtle grid overlay */}
      {isDark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${colors.crimson}08 1px, transparent 1px),
              linear-gradient(90deg, ${colors.crimson}08 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />
      )}

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// TORII GATE COMPONENT - Animated reveal
// ============================================================================
const ToriiGate: React.FC<{
  scale?: number;
  color?: string;
  glowing?: boolean;
  delay?: number;
}> = ({ scale = 1, color = colors.crimson, glowing = true, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const drawProgress = spring({ frame: adjustedFrame, fps, config: { damping: 20, stiffness: 60 } });
  const glowPulse = glowing ? 1 + Math.sin(frame * 0.1) * 0.2 : 1;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: glowing ? `drop-shadow(0 0 ${20 * glowPulse}px ${color})` : "none",
      }}
    >
      {/* Top bar (kasagi) */}
      <div
        style={{
          width: 200 * drawProgress,
          height: 16,
          background: `linear-gradient(180deg, ${color} 0%, ${colors.crimsonDeep} 100%)`,
          borderRadius: "4px 4px 0 0",
          boxShadow: glowing ? `0 0 30px ${color}` : "none",
        }}
      />
      {/* Second bar (nuki) */}
      <div
        style={{
          width: 160 * drawProgress,
          height: 10,
          background: color,
          marginTop: 15,
        }}
      />
      {/* Pillars (hashira) */}
      <div style={{ display: "flex", gap: 100, marginTop: 0 }}>
        <div
          style={{
            width: 14,
            height: 150 * drawProgress,
            background: `linear-gradient(180deg, ${color} 0%, ${colors.crimsonDeep} 100%)`,
          }}
        />
        <div
          style={{
            width: 14,
            height: 150 * drawProgress,
            background: `linear-gradient(180deg, ${color} 0%, ${colors.crimsonDeep} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// ENSO CIRCLE - Zen brush stroke
// ============================================================================
const EnsoCircle: React.FC<{
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
}> = ({ size = 300, strokeWidth = 8, color = colors.crimson, delay = 0 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  // Draw progress (0 to 1)
  const progress = interpolate(adjustedFrame, [0, 60], [0, 0.92], { extrapolateRight: "clamp" });
  const circumference = Math.PI * size;
  const strokeDashoffset = circumference * (1 - progress);

  // Fade in
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <svg
      width={size + strokeWidth * 2}
      height={size + strokeWidth * 2}
      style={{ opacity }}
    >
      <circle
        cx={(size + strokeWidth * 2) / 2}
        cy={(size + strokeWidth * 2) / 2}
        r={size / 2}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          filter: `drop-shadow(0 0 15px ${color})`,
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
};

// ============================================================================
// KATANA SLASH TRANSITION
// ============================================================================
const KatanaSlash: React.FC<{ delay?: number; direction?: "left" | "right" }> = ({
  delay = 0,
  direction = "right",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const slashProgress = interpolate(adjustedFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(adjustedFrame, [8, 20], [1, 0], { extrapolateRight: "clamp" });

  const x1 = direction === "right" ? -100 : width + 100;
  const x2 = direction === "right" ? width + 100 : -100;
  const currentX = interpolate(slashProgress, [0, 1], [x1, x2]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: fadeOut }}>
      {/* Slash line */}
      <div
        style={{
          position: "absolute",
          left: Math.min(x1, currentX),
          top: "40%",
          width: Math.abs(currentX - x1),
          height: 4,
          background: `linear-gradient(${direction === "right" ? "90deg" : "270deg"}, transparent 0%, ${colors.cyberWhite} 50%, ${colors.neonCrimson} 100%)`,
          boxShadow: `0 0 30px ${colors.neonCrimson}, 0 0 60px ${colors.crimson}`,
          transform: "rotate(-15deg)",
        }}
      />
      {/* Flash overlay */}
      {slashProgress > 0.5 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.cyberWhite,
            opacity: (1 - slashProgress) * 0.5,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// ANIMATED TEXT COMPONENTS
// ============================================================================
const BrushText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  delay?: number;
  glowing?: boolean;
}> = ({ children, fontSize = 72, color = colors.cream, delay = 0, glowing = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const scale = spring({ frame: adjustedFrame, fps, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize,
        fontWeight: 800,
        color,
        letterSpacing: "-0.02em",
        opacity,
        transform: `scale(${scale})`,
        textShadow: glowing ? `0 0 40px ${colors.crimson}, 0 0 80px ${colors.crimsonDeep}` : "none",
      }}
    >
      {children}
    </div>
  );
};

const GradientText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    style={{
      background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.neonCrimson} 50%, ${colors.crimson} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </span>
);

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
        fontSize: 22,
        color: colors.neonCrimson,
        textShadow: `0 0 20px ${colors.crimson}`,
      }}
    >
      {text.slice(0, charsToShow)}
      <span style={{ opacity: showCursor && charsToShow < text.length ? 1 : 0 }}>▊</span>
    </span>
  );
};

// ============================================================================
// AGENT NODE - Samurai warrior style
// ============================================================================
const AgentNode: React.FC<{
  x: number;
  y: number;
  label: string;
  delay?: number;
  isCenter?: boolean;
}> = ({ x, y, label, delay = 0, isCenter = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const scale = spring({ frame: adjustedFrame, fps, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;

  const size = isCenter ? 90 : 60;
  const nodeColor = isCenter ? colors.gold : colors.crimson;

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
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${nodeColor}40 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />

      {/* Hexagonal node (samurai shield) */}
      <div
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${nodeColor} 0%, ${colors.void} 100%)`,
          border: `2px solid ${nodeColor}`,
          borderRadius: isCenter ? "50%" : "8px",
          transform: isCenter ? "none" : "rotate(45deg)",
          boxShadow: `
            0 0 30px ${nodeColor}60,
            inset 0 0 20px ${nodeColor}20
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: isCenter ? 14 : 10,
            fontWeight: 700,
            color: colors.cream,
            transform: isCenter ? "none" : "rotate(-45deg)",
            textShadow: `0 0 10px ${nodeColor}`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK - Enter the Dojo
// ============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={0.6} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <TypewriterText text="> initiating_dojo_protocol..." delay={10} speed={1.5} />

          <div style={{ marginTop: 50 }}>
            <BrushText fontSize={80} delay={60}>
              What if coding wasn't
            </BrushText>
          </div>
          <div style={{ marginTop: 10 }}>
            <BrushText fontSize={80} delay={75} color={colors.neonCrimson}>
              about syntax?
            </BrushText>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 2: PROBLEM - The Old Way
// ============================================================================
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  const problems = ["Memorizing syntax", "Endless debugging", "Years of practice", "Working alone"];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={0.3} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              color: colors.crimson,
              marginBottom: 40,
              letterSpacing: "0.3em",
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            [ THE OLD PATH ]
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {problems.map((problem, i) => {
              const itemDelay = 25 + i * 18;
              const opacity = interpolate(frame, [itemDelay, itemDelay + 12], [0, 1], {
                extrapolateRight: "clamp",
              });
              const x = interpolate(frame, [itemDelay, itemDelay + 15], [-40, 0], {
                extrapolateRight: "clamp",
              });
              const strikeProgress = interpolate(frame, [itemDelay + 50, itemDelay + 60], [0, 100], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 44,
                    fontWeight: 600,
                    color: colors.inkGray,
                    opacity,
                    transform: `translateX(${x}px)`,
                    position: "relative",
                  }}
                >
                  {problem}
                  {/* Katana strike-through */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      height: 4,
                      width: `${strikeProgress}%`,
                      background: `linear-gradient(90deg, ${colors.crimson} 0%, ${colors.neonCrimson} 100%)`,
                      boxShadow: `0 0 15px ${colors.crimson}`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Katana slash effect */}
      <KatanaSlash delay={110} direction="right" />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 3: THE SHIFT - Enter the Dojo
// ============================================================================
const ShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={0.8} />

      {/* Torii Gate Reveal */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <ToriiGate scale={1.5} glowing={true} delay={10} />
      </AbsoluteFill>

      {/* Text overlay */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 120 }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: colors.neonCrimson,
              marginBottom: 20,
              opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            // entering_the_dojo
          </div>

          <BrushText fontSize={48} delay={50} color={colors.cream}>
            They're not tools.
          </BrushText>
          <div style={{ marginTop: 15 }}>
            <BrushText fontSize={64} delay={70}>
              <GradientText>They're agents.</GradientText>
            </BrushText>
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
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  // Agent nodes in constellation formation
  const agents = [
    { x: 50, y: 28, label: "PLAN", delay: 25 },
    { x: 25, y: 50, label: "CODE", delay: 35 },
    { x: 75, y: 50, label: "TEST", delay: 45 },
    { x: 30, y: 72, label: "DEBUG", delay: 55 },
    { x: 70, y: 72, label: "SHIP", delay: 65 },
    { x: 50, y: 50, label: "YOU", delay: 15, isCenter: true },
  ];

  // Connection lines
  const connections = [
    { from: 5, to: 0 },
    { from: 5, to: 1 },
    { from: 5, to: 2 },
    { from: 5, to: 3 },
    { from: 5, to: 4 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={1} />

      {/* Connection lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {connections.map((conn, i) => {
          const from = agents[conn.from];
          const to = agents[conn.to];
          const lineDelay = Math.max(from.delay, to.delay) + 10;
          const progress = interpolate(frame - lineDelay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = 0.4 + Math.sin(frame * 0.08 + i) * 0.2;

          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${from.x + (to.x - from.x) * progress}%`}
              y2={`${from.y + (to.y - from.y) * progress}%`}
              stroke={colors.crimson}
              strokeWidth={2}
              opacity={pulse * progress}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 5px ${colors.crimson})` }}
            />
          );
        })}
      </svg>

      {/* Agent nodes */}
      {agents.map((agent, i) => (
        <AgentNode
          key={i}
          x={agent.x}
          y={agent.y}
          label={agent.label}
          delay={agent.delay}
          isCenter={agent.isCenter}
        />
      ))}

      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 32,
            color: colors.cream,
            opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: "clamp" }),
            textAlign: "center",
          }}
        >
          Command your{" "}
          <GradientText style={{ fontSize: 32, fontWeight: 700 }}>agent swarm</GradientText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 5: PROOF - Battle Records
// ============================================================================
const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  const stats = [
    { value: "30K+", label: "Warriors training", delay: 15 },
    { value: "9 days", label: "5-week project shipped", delay: 30 },
    { value: "0", label: "lines written by hand", delay: 45 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={0.6} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.crimson,
              letterSpacing: "0.3em",
              marginBottom: 50,
              opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            [ BATTLE RECORDS ]
          </div>

          <div style={{ display: "flex", gap: 100 }}>
            {stats.map((stat, i) => {
              const adjustedFrame = Math.max(0, frame - stat.delay);
              const scale = spring({ frame: adjustedFrame, fps, config: { damping: 12 } });
              const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

              return (
                <div key={i} style={{ textAlign: "center", opacity, transform: `scale(${scale})` }}>
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
                      fontSize: 18,
                      color: colors.cream,
                      marginTop: 10,
                      opacity: 0.8,
                    }}
                  >
                    {stat.label}
                  </div>
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
// SCENE 6: CURRICULUM - The Training
// ============================================================================
const CurriculumScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  const modules = [
    "Context Engineering",
    "Prompt Architecture",
    "Agent Orchestration",
    "Production Deploy",
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <DojoBackground intensity={0.5} />

      {/* Enso circle background */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 0.15 }}>
        <EnsoCircle size={500} strokeWidth={12} color={colors.crimson} delay={0} />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.gold,
              marginBottom: 40,
              letterSpacing: "0.3em",
              opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            8 MODULES • LIFETIME ACCESS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "25px 80px" }}>
            {modules.map((mod, i) => {
              const itemDelay = 20 + i * 12;
              const opacity = interpolate(frame, [itemDelay, itemDelay + 12], [0, 1], {
                extrapolateRight: "clamp",
              });
              const x = interpolate(frame, [itemDelay, itemDelay + 15], [i % 2 === 0 ? -25 : 25, 0], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 28,
                    fontWeight: 600,
                    color: colors.cream,
                    opacity,
                    transform: `translateX(${x}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <span
                    style={{ color: colors.neonCrimson, fontFamily: fonts.mono, fontSize: 18 }}
                  >
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
// SCENE 7: CTA - Join the Dojo
// ============================================================================
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;
  const buttonScale = spring({ frame: frame - 50, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <DojoBackground intensity={1} />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors.crimson}30 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: colors.neonCrimson,
              marginBottom: 25,
              opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            speakcode.dev
          </div>

          <BrushText fontSize={56} delay={20} color={colors.cream} glowing={false}>
            Stop writing code.
          </BrushText>
          <div style={{ marginTop: 10 }}>
            <BrushText fontSize={56} delay={40}>
              <GradientText>Start speaking it.</GradientText>
            </BrushText>
          </div>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 60,
              opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${buttonScale * pulse})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "22px 70px",
                background: `linear-gradient(135deg, ${colors.crimson} 0%, ${colors.crimsonDeep} 100%)`,
                borderRadius: 8,
                border: `2px solid ${colors.neonCrimson}`,
                fontFamily: fonts.display,
                fontSize: 22,
                fontWeight: 700,
                color: colors.cream,
                boxShadow: `
                  0 0 40px ${colors.crimson}60,
                  inset 0 0 20px ${colors.neonCrimson}20
                `,
                letterSpacing: "0.05em",
              }}
            >
              JOIN THE DOJO →
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN COMPOSITION - SamuraiFuturism Trailer
// ============================================================================
export const SamuraiFuturismTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.void }}>
      {/* Scene 1: Hook - 0 to 120 frames (4s) */}
      <Sequence from={0} durationInFrames={120}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Problem - 120 to 280 frames (5.3s) */}
      <Sequence from={120} durationInFrames={160}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3: The Shift - 280 to 430 frames (5s) */}
      <Sequence from={280} durationInFrames={150}>
        <ShiftScene />
      </Sequence>

      {/* Scene 4: Solution (Agent Swarm) - 430 to 620 frames (6.3s) */}
      <Sequence from={430} durationInFrames={190}>
        <SolutionScene />
      </Sequence>

      {/* Scene 5: Proof/Stats - 620 to 800 frames (6s) */}
      <Sequence from={620} durationInFrames={180}>
        <ProofScene />
      </Sequence>

      {/* Scene 6: Curriculum - 800 to 950 frames (5s) */}
      <Sequence from={800} durationInFrames={150}>
        <CurriculumScene />
      </Sequence>

      {/* Scene 7: CTA - 950 to 1110 frames (5.3s) */}
      <Sequence from={950} durationInFrames={160}>
        <CTAScene />
      </Sequence>

      {/* Background music */}
      <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.35} />
    </AbsoluteFill>
  );
};
