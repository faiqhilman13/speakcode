import { AbsoluteFill, Sequence, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, random } from "remotion";
import { FC } from "react";

// 90 seconds = 2700 frames at 30fps
// 8 SCENES × 10s each + 10s curriculum = 90s total
// DESIGN DIRECTION: Editorial Brutalism - Warm, dynamic, alive
// THEME: Cream (#FDF6E3), Black (#1a1a1a), Coral (#FF5E5B), Teal (#2A9D8F), Yellow (#F4A261), Gray (#6B705C)

// UNIFIED COLOR SYSTEM
const COLORS = {
  cream: "#FDF6E3",
  black: "#1a1a1a",
  coral: "#FF5E5B",
  teal: "#2A9D8F",
  yellow: "#F4A261",
  gray: "#6B705C",
};

// ENHANCED PARTICLE SYSTEM
const ParticleField: FC<{
  count?: number;
  color?: string;
  frame: number;
  speed?: number;
}> = ({ count = 80, color = COLORS.coral, frame, speed = 1 }) => {
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: count }, (_, i) => ({
    x: random(`particle-x-${i}`) * width,
    y: random(`particle-y-${i}`) * height,
    size: 2 + random(`particle-size-${i}`) * 10,
    speed: (0.5 + random(`particle-speed-${i}`) * 1) * speed,
    opacity: 0.1 + random(`particle-opacity-${i}`) * 0.3,
    drift: random(`particle-drift-${i}`) * 30 - 15,
    sizePulse: 1 + Math.sin(frame * 0.02 + i) * 0.3,
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
            width: p.size * p.sizePulse,
            height: p.size * p.sizePulse,
            borderRadius: "50%",
            background: color,
            opacity: p.opacity,
            filter: "blur(2px)",
            boxShadow: `0 0 ${p.size}px ${color}40`,
          }}
        />
      ))}
    </>
  );
};

// FLOATING GEOMETRIC SHAPES
const FloatingShapes: FC<{
  frame: number;
  count?: number;
  color?: string;
}> = ({ frame, count = 15, color = COLORS.coral }) => {
  const shapes = Array.from({ length: count }, (_, i) => ({
    x: 100 + random(`shape-x-${i}`) * 1720,
    y: 100 + random(`shape-y-${i}`) * 880,
    size: 60 + random(`shape-size-${i}`) * 120,
    rotation: random(`shape-rotation-${i}`) * 360,
    speed: 0.1 + random(`shape-speed-${i}`) * 0.3,
    type: random(`shape-type-${i}`) > 0.5 ? "circle" : "square",
    pulsePhase: random(`shape-pulse-${i}`) * Math.PI * 2,
  }));

  return (
    <>
      {shapes.map((shape, i) => {
        const currentRotation = shape.rotation + frame * shape.speed;
        const floatY = shape.y + Math.sin(frame * 0.02 + i) * 40;
        const scalePulse = 0.9 + Math.sin(frame * 0.03 + shape.pulsePhase) * 0.1;
        const opacity = 0.05 + Math.sin(frame * 0.01 + i * 0.3) * 0.05;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.x,
              top: floatY,
              width: shape.size * scalePulse,
              height: shape.size * scalePulse,
              border: `3px solid ${color}`,
              borderRadius: shape.type === "circle" ? "50%" : "12px",
              transform: `rotate(${currentRotation}deg)`,
              opacity,
              filter: "blur(1px) drop-shadow(0 0 20px ${color}30)",
            }}
          />
        );
      })}
    </>
  );
};

// PULSING GLOW BACKGROUND
const PulsingGlow: FC<{
  color: string;
  frame: number;
  size?: number;
}> = ({ color, frame, size = 500 }) => {
  const pulse = 1 + Math.sin(frame * 0.1) * 0.2;
  const opacity = 0.06 + Math.sin(frame * 0.07) * 0.04;

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
        filter: "blur(100px)",
      }}
    />
  );
};

// GRID PATTERN OVERLAY
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

// WORD-BY-WORD REVEAL WITH SPRING
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

// TEXT SLIDE WITH BLURRED BACKGROUND (NO OPAQUE BACKDROP)
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
      width: "45%",
    },
    right: {
      right: "8%",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "right" as const,
      width: "45%",
    },
  };

  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [50, 70], [30, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      ...containerStyles[layout],
      zIndex: 10,
    }}>
      <h1 style={{
        fontSize: "clamp(52px, 6.5vw, 100px)",
        fontWeight: "700",
        color: COLORS.black,
        margin: 0,
        lineHeight: 1.05,
        fontFamily: "Georgia, serif",
        letterSpacing: "-0.025em",
        textShadow: variant === "dramatic" ? "2px 2px 0px rgba(255, 94, 91, 0.1)" : "none",
        filter: "drop-shadow(0 4px 8px rgba(253, 246, 227, 0.9))",
      }}>
        {words.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            delay={i * 5}
            frame={frame}
            isAccent={subtitle?.toLowerCase().split(" ").includes(word.toLowerCase())}
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
          filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
        }}>
          {subtitle}
        </h2>
      )}

      <div style={{
        height: "4px",
        background: COLORS.black,
        marginTop: "40px",
        borderRadius: "2px",
        filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
      }} />
    </div>
  );
};

// ANIMATED TIMELINE COMPONENT (Scene 2)
const AnimatedTimeline: FC<{
  frame: number;
  milestones: string[];
}> = ({ frame, milestones }) => {
  const lineProgress = interpolate(frame, [0, 80], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      bottom: "15%",
      left: "10%",
      right: "10%",
      height: "200px",
      zIndex: 10,
      filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
    }}>
      {/* Timeline line */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${COLORS.teal} 0%, ${COLORS.coral} 100%)`,
        transform: "translateY(-50%)",
      }} />

      {/* Milestones */}
      {milestones.map((text, i) => {
        const startX = 15 + i * 35;
        const revealFrame = 60 + i * 40;
        const textY = spring({
          frame: frame - revealFrame,
          fps: 30,
          config: { damping: 14, stiffness: 80 },
        });
        const dotScale = spring({
          frame: frame - revealFrame - 20,
          fps: 30,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <div key={i} style={{
            position: "absolute",
            left: `${startX}%`,
            top: "50%",
            transform: "translateY(-50%)",
          }}>
            {/* Dot */}
            <div style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: i % 2 === 0 ? COLORS.teal : COLORS.coral,
              transform: `scale(${Math.min(dotScale, 1)})`,
              boxShadow: `0 0 20px ${i % 2 === 0 ? COLORS.teal : COLORS.coral}60`,
            }} />
            
            {/* Text */}
            <div style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: `translateX(-50%) translateY(${20 * (1 - Math.min(textY, 1))}px)`,
              whiteSpace: "nowrap",
              fontSize: "clamp(18px, 2vw, 24px)",
              color: COLORS.black,
              fontFamily: "Georgia, serif",
              fontWeight: "500",
              textAlign: "center",
              filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
            }}>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// BEFORE/AFTER SPLIT SCREEN COMPONENT (Scene 5)
const BeforeAfterSplit: FC<{
  frame: number;
  beforeTitle: string;
  afterTitle: string;
  beforeSubtitle: string;
  afterSubtitle: string;
}> = ({ frame, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle }) => {
  const dividerY = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      zIndex: 10,
    }}>
      {/* Before Side */}
      <div style={{
        flex: 1,
        background: "rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
      }}>
        <div style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: "700",
          color: COLORS.gray,
          fontFamily: "Georgia, serif",
          marginBottom: "20px",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          {beforeTitle}
        </div>
        <div style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          color: COLORS.coral,
          fontFamily: "Georgia, serif",
          opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          {beforeSubtitle}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: "4px",
        background: `linear-gradient(180deg, ${COLORS.gray}30 0%, ${COLORS.teal} 50%, ${COLORS.coral} 100%)`,
        transform: `translateY(${-50 + 100 * (1 - dividerY)}%)`,
      }} />

      {/* After Side */}
      <div style={{
        flex: 1,
        background: "rgba(244, 162, 97, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
      }}>
        <div style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: "700",
          color: COLORS.teal,
          fontFamily: "Georgia, serif",
          marginBottom: "20px",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          {afterTitle}
        </div>
        <div style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          color: COLORS.black,
          fontFamily: "Georgia, serif",
          opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          {afterSubtitle}
        </div>
      </div>
    </div>
  );
};

// CURRICULUM CARD COMPONENT FOR 5 MODULES
const CurriculumCard: FC<{
  icon: string;
  title: string;
  subtitle?: string;
  frame: number;
  delay: number;
  color: string;
  position: { x: string; y: string };
}> = ({ icon, title, subtitle, frame, delay, color, position }) => {
  const revealFrame = delay;
  const slideScale = spring({
    frame: frame - revealFrame,
    fps: 30,
    config: { damping: 14, stiffness: 80 },
  });
  const floatY = Math.sin(frame * 0.03 + (parseInt(position.x) || 0)) * 8;

  return (
    <div style={{
      position: "absolute",
      left: position.x,
      top: position.y,
      transform: `translate(-50%, -50%) scale(${Math.min(slideScale, 1)}) translateY(${floatY}px)`,
      opacity: frame >= revealFrame ? 1 : 0,
      width: "clamp(280px, 22vw, 320px)",
      padding: "32px",
      background: COLORS.cream,
      border: `3px solid ${color}`,
      borderRadius: "12px",
      boxShadow: `0 6px 30px ${color}20`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "16px",
      zIndex: 10,
      filter: "drop-shadow(0 2px 4px rgba(253, 246, 227, 0.9))",
    }}>
      <div style={{
        width: "70px",
        height: "70px",
        flexShrink: 0,
      }}>
        <Img src={icon} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: "clamp(22px, 2.5vw, 28px)",
          fontWeight: "700",
          color: COLORS.black,
          fontFamily: "Georgia, serif",
          lineHeight: 1.2,
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: "clamp(16px, 1.8vw, 18px)",
            color: color,
            fontFamily: "Georgia, serif",
            marginTop: "8px",
            fontWeight: "500",
          }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

// UNIFIED SCENE IMAGE WITH KEN BURNS EFFECT AND BLUR FOR TEXT CLARITY
const SceneImage: FC<{
  src: string;
  frame: number;
  scale?: number;
  blurAmount?: number;
}> = ({ src, frame, scale = 1.1, blurAmount = 2 }) => {
  const currentScale = interpolate(frame, [0, 150], [scale, 1.0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${currentScale})`,
          filter: `blur(${blurAmount}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(253, 246, 227, 0.15)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};

// SCENE CONTAINER
const SceneContainer: FC<{
  children: React.ReactNode;
  frame: number;
  variant?: "warm" | "cool" | "dramatic";
  showGlow?: boolean;
  glowColor?: string;
  showParticles?: boolean;
  particleColor?: string;
  showShapes?: boolean;
  blurAmount?: number;
}> = ({
  children,
  frame,
  variant = "warm",
  showGlow = true,
  glowColor = COLORS.coral,
  showParticles = true,
  particleColor = COLORS.coral,
  showShapes = false,
  blurAmount = 2,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: variant === "warm"
          ? `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.yellow}10 50%, ${COLORS.cream} 100%)`
          : variant === "cool"
          ? `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.teal}10 50%, ${COLORS.cream} 100%)`
          : `linear-gradient(135deg, ${COLORS.black}05 0%, ${COLORS.coral}08 50%, ${COLORS.black}05 100%)`,
      }}
    />
    {showGlow && <PulsingGlow color={glowColor} frame={frame} />}
    {showParticles && <ParticleField count={80} color={particleColor} frame={frame} />}
    {showShapes && <FloatingShapes frame={frame} />}
    <GridOverlay />
    {children}
  </>
);

// GRAIN OVERLAY
const GrainOverlay: FC = () => (
  <div style={{
    position: "absolute",
    inset: 0,
    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    opacity: 0.04,
    pointerEvents: "none",
    mixBlendMode: "overlay",
  }} />
);

// MAIN TRAILER COMPONENT - 90 SECONDS (2700 FRAMES) - 8 SCENES
export const AgenticCodingTrailerExtended: FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      
      {/* SCENE 1: Hook - Emotional Question (0:00-0:10) - 300 frames */}
      <Sequence from={0} durationInFrames={300}>
        <SceneContainer
          frame={frame}
          variant="warm"
          showGlow={true}
          glowColor={COLORS.yellow}
          showParticles={true}
          particleColor={COLORS.yellow}
          showShapes={true}
          blurAmount={3}
        >
          <SceneImage src={staticFile("hook-emotional-question.png")} frame={frame} scale={1.15} blurAmount={3} />
          <TextSlide
            title="Ever had ideas"
            subtitle="That were limited because of technical ability or time?"
            frame={frame}
            layout="center"
            variant="warm"
          />
        </SceneContainer>
      </Sequence>

      {/* SCENE 2: Career Journey (0:10-0:20) - 300 frames */}
      <Sequence from={300} durationInFrames={300}>
        <SceneContainer
          frame={frame - 300}
          variant="cool"
          showGlow={true}
          glowColor={COLORS.teal}
          showParticles={true}
          particleColor={COLORS.teal}
        >
          <SceneImage src={staticFile("career-timeline.png")} frame={frame - 300} scale={1.12} blurAmount={2} />
          <FloatingShapes frame={frame - 300} count={10} color={COLORS.teal} />
          <AnimatedTimeline
            frame={frame - 300}
            milestones={[
              "Top 3 contributor",
              "Shipped weeks early",
              "Built agent framework"
            ]}
          />
        </SceneContainer>
      </Sequence>

      {/* SCENE 3: Problem - The Struggle (0:20-0:30) - 300 frames */}
      <Sequence from={600} durationInFrames={300}>
        <SceneContainer
          frame={frame - 600}
          variant="dramatic"
          showGlow={true}
          glowColor={COLORS.coral}
          showParticles={true}
          particleColor={COLORS.coral}
          showShapes={true}
          blurAmount={3}
        >
          <SceneImage src={staticFile("problem-struggle.png")} frame={frame - 600} scale={1.1} blurAmount={3} />
          <div style={{
            position: "absolute",
            bottom: "25%",
            left: "10%",
            right: "10%",
            textAlign: "center",
            zIndex: 10,
            filter: "drop-shadow(0 4px 8px rgba(253, 246, 227, 0.9))",
          }}>
            <h1 style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: "700",
              color: COLORS.gray,
              fontFamily: "Georgia, serif",
              marginBottom: "20px",
              opacity: interpolate(frame - 600, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              The Old Way
            </h1>
            <div style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              color: COLORS.coral,
              fontFamily: "Georgia, serif",
              opacity: interpolate(frame - 600, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              Buried in boilerplate. Weeks of repetition.
            </div>
          </div>
        </SceneContainer>
      </Sequence>

      {/* SCENE 4: Solution - Agentic Coding (0:30-0:40) - 300 frames */}
      <Sequence from={900} durationInFrames={300}>
        <SceneContainer
          frame={frame - 900}
          variant="cool"
          showGlow={true}
          glowColor={COLORS.teal}
          showParticles={true}
          particleColor={COLORS.teal}
          showShapes={true}
          blurAmount={3}
        >
          <SceneImage src={staticFile("solution-agentic-intro.png")} frame={frame - 900} scale={1.1} blurAmount={3} />
          <div style={{
            position: "absolute",
            bottom: "25%",
            left: "10%",
            right: "10%",
            textAlign: "center",
            zIndex: 10,
            filter: "drop-shadow(0 4px 8px rgba(253, 246, 227, 0.9))",
          }}>
            <h1 style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: "700",
              color: COLORS.teal,
              fontFamily: "Georgia, serif",
              marginBottom: "20px",
              opacity: interpolate(frame - 900, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              The Agentic Way
            </h1>
            <div style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              color: COLORS.black,
              fontFamily: "Georgia, serif",
              opacity: interpolate(frame - 900, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              Orchestrate intelligence. Ship in days.
            </div>
          </div>
        </SceneContainer>
      </Sequence>

      {/* SCENE 5: Before/After Split (0:40-0:50) - 300 frames */}
      <Sequence from={1200} durationInFrames={300}>
        <SceneContainer
          frame={frame - 1200}
          variant="dramatic"
          showGlow={true}
          glowColor={COLORS.coral}
          showParticles={false}
        >
          <SceneImage src={staticFile("before-after-split.png")} frame={frame - 1200} scale={1.08} blurAmount={2} />
          <BeforeAfterSplit
            frame={frame - 1200}
            beforeTitle="Traditional Coding"
            beforeSubtitle="Weeks of boilerplate"
            afterTitle="Agentic Coding"
            afterSubtitle="Ship in days"
          />
        </SceneContainer>
      </Sequence>

      {/* SCENE 6: Credentials - Authority (0:50-1:00) - 300 frames */}
      <Sequence from={1500} durationInFrames={300}>
        <SceneContainer
          frame={frame - 1500}
          variant="warm"
          showGlow={true}
          glowColor={COLORS.yellow}
          showParticles={true}
          particleColor={COLORS.yellow}
          blurAmount={3}
        >
          <SceneImage src={staticFile("credentials-authority.png")} frame={frame - 1500} scale={1.1} blurAmount={3} />
          <TextSlide
            title="I Built This"
            subtitle="At EY, leading a 100k+ LOC GenAI platform"
            frame={frame - 1500}
            layout="center"
            variant="warm"
          />
        </SceneContainer>
      </Sequence>

      {/* SCENE 7: Curriculum - All 5 Modules (1:00-1:20) - 600 frames */}
      <Sequence from={1800} durationInFrames={600}>
        <SceneContainer
          frame={frame - 1800}
          variant="cool"
          showGlow={false}
          showParticles={true}
          particleColor={COLORS.teal}
          showShapes={true}
          blurAmount={2}
        >
          <ParticleField count={80} color={COLORS.coral} frame={frame - 1800} />
          
          <div style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
            filter: "drop-shadow(0 4px 8px rgba(253, 246, 227, 0.9))",
          }}>
            <h1 style={{
              fontSize: "clamp(48px, 5.5vw, 72px)",
              fontWeight: "700",
              color: COLORS.black,
              fontFamily: "Georgia, serif",
              margin: 0,
              letterSpacing: "0.05em",
            }}>
              What You'll Learn
            </h1>
            <div style={{
              width: "120px",
              height: "4px",
              background: COLORS.black,
              marginTop: "20px",
              borderRadius: "2px",
            }} />
          </div>

          {/* 5 Curriculum Cards Arranged */}
          <CurriculumCard
            icon={staticFile("curriculum-mental-model.png")}
            title="New Mental Model"
            subtitle="How to work with agents"
            frame={frame - 1800}
            delay={40}
            color={COLORS.teal}
            position={{ x: "25%", y: "40%" }}
          />
          <CurriculumCard
            icon={staticFile("curriculum-fundamentals.png")}
            title="Fundamentals"
            subtitle="Models, context, prompt"
            frame={frame - 1800}
            delay={80}
            color={COLORS.coral}
            position={{ x: "75%", y: "40%" }}
          />
          <CurriculumCard
            icon={staticFile("curriculum-agent-harnesses.png")}
            title="Agent Harnesses"
            subtitle="IDE vs TUI, LLM models"
            frame={frame - 1800}
            delay={120}
            color={COLORS.yellow}
            position={{ x: "25%", y: "65%" }}
          />
          <CurriculumCard
            icon={staticFile("curriculum-skills-mcp.png")}
            title="Skills & MCPs"
            subtitle="Plugins, AGENTS.md"
            frame={frame - 1800}
            delay={160}
            color={COLORS.teal}
            position={{ x: "75%", y: "65%" }}
          />
          <CurriculumCard
            icon={staticFile("curriculum-build-projects.png")}
            title="Build Real Projects"
            subtitle="Ship production-ready apps"
            frame={frame - 1800}
            delay={200}
            color={COLORS.coral}
            position={{ x: "50%", y: "50%" }}
          />
        </SceneContainer>
      </Sequence>

      {/* SCENE 8: CTA - Unlock Your Agency (1:20-1:30) - 300 frames */}
      <Sequence from={2400} durationInFrames={300}>
        <SceneContainer
          frame={frame - 2400}
          variant="dramatic"
          showGlow={true}
          glowColor={COLORS.coral}
          showParticles={true}
          particleColor={COLORS.coral}
          showShapes={true}
          blurAmount={3}
        >
          <SceneImage src={staticFile("cta-background.png")} frame={frame - 2400} scale={1.05} blurAmount={4} />
          <ParticleField count={100} color={COLORS.yellow} frame={frame - 2400} speed={1.5} />
          <FloatingShapes frame={frame - 2400} count={18} color={COLORS.coral} />
          <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "90%",
            zIndex: 10,
            filter: "drop-shadow(0 8px 16px rgba(253, 246, 227, 0.95))",
          }}>
            <h1 style={{
              fontSize: "clamp(64px, 8vw, 140px)",
              fontWeight: "900",
              color: COLORS.coral,
              fontFamily: "Georgia, serif",
              letterSpacing: "0.08em",
              margin: 0,
              lineHeight: 1.1,
              textShadow: `0 0 40px ${COLORS.coral}80, 0 0 80px ${COLORS.coral}40`,
            }}>
              Unlock Your
            </h1>
            <h1 style={{
              fontSize: "clamp(80px, 10vw, 160px)",
              fontWeight: "900",
              color: COLORS.black,
              fontFamily: "Georgia, serif",
              letterSpacing: "0.06em",
              margin: 0,
              lineHeight: 1,
              textShadow: `0 0 40px ${COLORS.coral}40`,
            }}>
              Agency
            </h1>
            <div style={{
              marginTop: "40px",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: COLORS.yellow,
              fontFamily: "Georgia, serif",
              letterSpacing: "0.2em",
              fontWeight: "600",
              textShadow: `0 0 30px ${COLORS.yellow}60`,
            }}>
              Sign Up For Class
            </div>
          </div>
        </SceneContainer>
      </Sequence>

      {/* Grain overlay for texture */}
      <GrainOverlay />
    </AbsoluteFill>
  );
};
