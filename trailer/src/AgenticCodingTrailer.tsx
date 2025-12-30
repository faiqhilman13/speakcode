import { AbsoluteFill, Sequence, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, random } from "remotion";
import { FC } from "react";

// 30 seconds = 900 frames at 30fps
// DESIGN DIRECTION: Editorial Brutalism - Warm, confident, unexpected
// THEME: Cream (#FDF6E3), Black (#1a1a1a), Coral (#FF5E5B), Teal (#2A9D8F)

// UNIFIED COLOR SYSTEM
const COLORS = {
  cream: "#FDF6E3",
  black: "#1a1a1a",
  coral: "#FF5E5B",
  teal: "#2A9D8F",
  yellow: "#F4A261",
  gray: "#6B705C",
};

// Advanced Particle Effect
const ParticleField: FC<{
  count?: number;
  color?: string;
  frame: number;
}> = ({ count = 30, color = COLORS.coral, frame }) => {
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: count }, (_, i) => ({
    x: random(`particle-x-${i}`) * width,
    y: random(`particle-y-${i}`) * height,
    size: 2 + random(`particle-size-${i}`) * 8,
    speed: 0.3 + random(`particle-speed-${i}`) * 0.8,
    opacity: 0.1 + random(`particle-opacity-${i}`) * 0.2,
    drift: random(`particle-drift-${i}`) * 20 - 10,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x + Math.sin(frame * 0.02 + i) * p.drift,
            top: (frame * p.speed + p.y) % height,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: p.opacity,
            filter: "blur(2px)",
          }}
        />
      ))}
    </>
  );
};

// Pulsing Glow Background
const PulsingGlow: FC<{
  color: string;
  frame: number;
  size?: number;
}> = ({ color, frame, size = 400 }) => {
  const pulse = 1 + Math.sin(frame * 0.08) * 0.15;
  const opacity = 0.08 + Math.sin(frame * 0.06) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${pulse})`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(80px)",
      }}
    />
  );
};

// Grid Pattern Overlay
const GridOverlay: FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(${COLORS.gray}15 1px, transparent 1px),
        linear-gradient(90deg, ${COLORS.gray}15 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      opacity: 0.4,
    }}
  />
);

// Animated Gradient Background
const AnimatedGradient: FC<{
  frame: number;
  variant?: "warm" | "cool" | "dramatic";
}> = ({ frame, variant = "warm" }) => {
  const hue = interpolate(frame, [0, 900], [0, 360]);

  const gradients = {
    warm: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.yellow}10 50%, ${COLORS.cream} 100%)`,
    cool: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.teal}10 50%, ${COLORS.cream} 100%)`,
    dramatic: `linear-gradient(135deg, ${COLORS.black}05 0%, ${COLORS.coral}08 50%, ${COLORS.black}05 100%)`,
  };

  return (
    <AbsoluteFill
      style={{
        background: gradients[variant],
        transition: "background 0.3s",
      }}
    />
  );
};

// Geometric Accent Shape
const AccentShape: FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
  frame: number;
  delay?: number;
}> = ({ position, color, frame, delay = 0 }) => {
  const startFrame = delay;
  const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 0.7], { extrapolateRight: "clamp" });
  const rotation = interpolate(frame, [startFrame, startFrame + 60], [45, 35], { extrapolateRight: "clamp" });
  const scale = spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: 12, stiffness: 80 },
  });

  const positions = {
    "top-left": { top: "-15%", left: "-15%" },
    "top-right": { top: "-15%", right: "-15%" },
    "bottom-left": { bottom: "-15%", left: "-15%" },
    "bottom-right": { bottom: "-15%", right: "-15%" },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positions[position],
        width: "45%",
        height: "45%",
        background: color,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity,
        borderRadius: "4px",
        filter: "blur(1px)",
      }}
    />
  );
};

// Animated Line Divider
const LineDivider: FC<{
  frame: number;
  delay?: number;
  width?: string;
}> = ({ frame, delay = 0, width = "200px" }) => {
  const startFrame = delay;
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [startFrame, startFrame + 40], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        height: "4px",
        background: COLORS.black,
        width: `${lineWidth}%`,
        opacity,
        minWidth: width,
        marginTop: "40px",
        borderRadius: "2px",
      }}
    />
  );
};

// Word-by-word Reveal with Spring
const WordReveal: FC<{
  word: string;
  delay: number;
  frame: number;
  isAccent?: boolean;
}> = ({ word, delay, frame, isAccent = false }) => {
  const startFrame = delay;
  const y = spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  const scale = spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: 10, stiffness: 90 },
  });

  const offsetY = 30 * (1 - Math.min(y, 1));
  const scaleValue = 0.9 + 0.1 * Math.min(scale, 1);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: frame >= startFrame ? 1 : 0,
        transform: `translateY(${offsetY}px) scale(${scaleValue})`,
        marginRight: "20px",
        marginLeft: "-5px",
        color: isAccent ? COLORS.coral : COLORS.black,
        transition: "color 0.2s",
      }}
    >
      {word}
    </span>
  );
};

// Unified Text Slide Component
const TextSlide: FC<{
  title: string;
  subtitle?: string;
  frame: number;
  layout?: "center" | "left" | "right";
  variant?: "warm" | "cool" | "dramatic";
}> = ({ title, subtitle, frame, layout = "center", variant = "warm" }) => {
  const words = title.split(" ");

  const containerStyles = {
    center: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center" as const,
      width: "85%",
    },
    left: {
      left: "8%",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "left" as const,
      width: "40%",
    },
    right: {
      right: "8%",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "right" as const,
      width: "40%",
    },
  };

  const accentWords = subtitle?.toLowerCase().split(" ") || [];

  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [50, 70], [30, 0], { extrapolateRight: "clamp" });

  const backdropOpacity = interpolate(frame, [0, 30], [0, 0.92], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      ...containerStyles[layout],
    }}>
      {/* Text Backdrop for readability */}
      <div style={{
        position: "absolute",
        inset: "-20px -30px",
        background: COLORS.cream,
        opacity: backdropOpacity,
        borderRadius: "8px",
        boxShadow: variant === "dramatic"
          ? "0 4px 20px rgba(26, 26, 26, 0.08)"
          : "0 2px 12px rgba(26, 26, 26, 0.05)",
        zIndex: -1,
      }} />

      <h1 style={{
        fontSize: "clamp(52px, 6.5vw, 100px)",
        fontWeight: "700",
        color: COLORS.black,
        margin: 0,
        lineHeight: 1.05,
        fontFamily: "Georgia, serif",
        letterSpacing: "-0.025em",
        textShadow: variant === "dramatic" ? "2px 2px 0px rgba(255, 94, 91, 0.1)" : "none",
        position: "relative",
        zIndex: 1,
      }}>
        {words.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            delay={i * 6}
            frame={frame}
            isAccent={accentWords.includes(word.toLowerCase())}
          />
        ))}
      </h1>

      {subtitle && (
        <h2 style={{
          fontSize: "clamp(26px, 3vw, 42px)",
          color: variant === "cool" ? COLORS.teal : COLORS.coral,
          marginTop: "20px",
          fontFamily: "Georgia, serif",
          fontWeight: "500",
          fontStyle: "italic",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          position: "relative",
          zIndex: 1,
        }}>
          {subtitle}
        </h2>
      )}

      <LineDivider frame={frame} delay={70} />
    </div>
  );
};

// Scene Container with Unified Backgrounds
const SceneContainer: FC<{
  children: React.ReactNode;
  frame: number;
  variant?: "warm" | "cool" | "dramatic";
  showGlow?: boolean;
  glowColor?: string;
  showParticles?: boolean;
  particleColor?: string;
}> = ({
  children,
  frame,
  variant = "warm",
  showGlow = true,
  glowColor = COLORS.coral,
  showParticles = true,
  particleColor = COLORS.coral,
}) => (
  <>
    <AnimatedGradient frame={frame} variant={variant} />
    {showGlow && <PulsingGlow color={glowColor} frame={frame} />}
    {showParticles && <ParticleField count={25} color={particleColor} frame={frame} />}
    <GridOverlay />
    {children}
  </>
);

const GrainOverlay: FC = () => (
  <div style={{
    position: "absolute",
    inset: 0,
    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    opacity: 0.03,
    pointerEvents: "none",
    mixBlendMode: "overlay",
  }} />
);

const SceneImage: FC<{
  src: string;
  frame: number;
}> = ({ src, frame }) => {
  const scale = interpolate(frame, [0, 60], [1.1, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      opacity,
      overflow: "hidden",
    }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

const GeometricShape: FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
  frame: number;
}> = ({ position, color, frame }) => {
  const opacity = interpolate(frame, [0, 30], [0, 0.6], { extrapolateRight: "clamp" });
  const rotation = interpolate(frame, [0, 60], [45, 30], { extrapolateRight: "clamp" });

  const positions = {
    "top-left": { top: "-10%", left: "-10%" },
    "top-right": { top: "-10%", right: "-10%" },
    "bottom-left": { bottom: "-10%", left: "-10%" },
    "bottom-right": { bottom: "-10%", right: "-10%" },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positions[position],
        width: "40%",
        height: "40%",
        background: color,
        transform: `rotate(${rotation}deg)`,
        opacity,
        borderRadius: "0",
      }}
    />
  );
};

export const AgenticCodingTrailer: FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Scene 1: Hook - The Future of Coding (0-5s) */}
      <Sequence from={0} durationInFrames={150}>
        <SceneContainer
          frame={frame}
          variant="warm"
          showGlow={true}
          glowColor={COLORS.yellow}
          showParticles={true}
          particleColor={COLORS.yellow}
        >
          <SceneImage src={staticFile("agentic-hook.png")} frame={frame} />
          <AccentShape position="top-right" color={COLORS.coral} frame={frame} />
          <TextSlide
            title="The Future of Coding"
            subtitle="Is Already Here"
            frame={frame}
            layout="center"
            variant="warm"
          />
        </SceneContainer>
      </Sequence>

      {/* Scene 2: The Problem - Manual Coding (5-10s) */}
      <Sequence from={150} durationInFrames={150}>
        <SceneContainer
          frame={frame - 150}
          variant="dramatic"
          showGlow={true}
          glowColor={COLORS.gray}
          showParticles={false}
        >
          <SceneImage src={staticFile("agentic-problem.png")} frame={frame - 150} />
          <TextSlide
            title="Stop Fighting Code"
            subtitle="Start Building Products"
            frame={frame - 150}
            layout="left"
            variant="dramatic"
          />
        </SceneContainer>
      </Sequence>

      {/* Scene 3: The Solution - AI Agents (10-15s) */}
      <Sequence from={300} durationInFrames={150}>
        <SceneContainer
          frame={frame - 300}
          variant="cool"
          showGlow={true}
          glowColor={COLORS.teal}
          showParticles={true}
          particleColor={COLORS.teal}
        >
          <SceneImage src={staticFile("agentic-solution.png")} frame={frame - 300} />
          <AccentShape position="bottom-left" color={COLORS.teal} frame={frame - 300} />
          <TextSlide
            title="Meet AI Agents"
            subtitle="Your New Coding Partners"
            frame={frame - 300}
            layout="right"
            variant="cool"
          />
        </SceneContainer>
      </Sequence>

      {/* Scene 4: Multi-Agent Collaboration (15-20s) */}
      <Sequence from={450} durationInFrames={150}>
        <SceneContainer
          frame={frame - 450}
          variant="warm"
          showGlow={false}
          showParticles={true}
          particleColor={COLORS.coral}
        >
          <SceneImage src={staticFile("agentic-collaboration.png")} frame={frame - 450} />
          <AccentShape position="top-right" color={COLORS.yellow} frame={frame - 450} delay={0} />
          <AccentShape position="bottom-left" color={COLORS.coral} frame={frame - 450} delay={10} />
          <TextSlide
            title="Collaborate"
            subtitle="With Your AI Team"
            frame={frame - 450}
            layout="center"
            variant="warm"
          />
        </SceneContainer>
      </Sequence>

      {/* Scene 5: Results - What You Build (20-25s) */}
      <Sequence from={600} durationInFrames={150}>
        <SceneContainer
          frame={frame - 600}
          variant="cool"
          showGlow={true}
          glowColor={COLORS.teal}
          showParticles={true}
          particleColor={COLORS.yellow}
        >
          <SceneImage src={staticFile("agentic-results.png")} frame={frame - 600} />
          <AccentShape position="top-left" color={COLORS.teal} frame={frame - 600} />
          <TextSlide
            title="Build Amazing Products"
            subtitle="Faster Than Ever"
            frame={frame - 600}
            layout="left"
            variant="cool"
          />
        </SceneContainer>
      </Sequence>

      {/* Scene 6: CTA - Start Today (25-30s) */}
      <Sequence from={750} durationInFrames={150}>
        <SceneContainer
          frame={frame - 750}
          variant="dramatic"
          showGlow={true}
          glowColor={COLORS.coral}
          showParticles={true}
          particleColor={COLORS.coral}
        >
          <SceneImage src={staticFile("agentic-cta.png")} frame={frame - 750} />
          <AccentShape position="top-right" color={COLORS.yellow} frame={frame - 750} />
          <AccentShape position="bottom-left" color={COLORS.coral} frame={frame - 750} delay={5} />
          <TextSlide
            title="Start Today"
            subtitle="Transform Your Coding Journey"
            frame={frame - 750}
            layout="center"
            variant="dramatic"
          />
        </SceneContainer>
      </Sequence>

      {/* Grain overlay for texture */}
      <GrainOverlay />
    </AbsoluteFill>
  );
};
