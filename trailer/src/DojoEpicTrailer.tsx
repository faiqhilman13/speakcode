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
  Img,
  Easing,
} from "remotion";
import React from "react";

// ============================================================================
// DESIGN SYSTEM - Agentic Dojo Epic Edition
// ============================================================================
const colors = {
  void: "#0a0a0f",
  inkBlack: "#121218",
  crimson: "#cc0000",
  crimsonGlow: "#ff1a1a",
  crimsonDeep: "#8b0000",
  gold: "#d4a574",
  goldBright: "#ffd700",
  cream: "#fdfcf8",
  ricePaper: "#f5f3ed",
  sakuraPink: "#ffb7c5",
  neonCrimson: "#ff073a",
  cyberWhite: "#e8e8f0",
};

const fonts = {
  display: "'SF Pro Display', 'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

// Parallax image layer with Ken Burns effect
const ParallaxImage: React.FC<{
  src: string;
  scale?: [number, number];
  position?: [number, number];
  opacity?: [number, number];
  zIndex?: number;
  blur?: number;
  style?: React.CSSProperties;
}> = ({ src, scale = [1, 1.05], position = [0, 0], opacity = [1, 1], zIndex = 0, blur = 0, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const currentScale = interpolate(frame, [0, durationInFrames], scale, { extrapolateRight: "clamp" });
  const currentOpacity = interpolate(frame, [0, durationInFrames], opacity, { extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, durationInFrames], [position[0], position[0] + 20]);
  const panY = interpolate(frame, [0, durationInFrames], [position[1], position[1] + 10]);

  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${currentScale}) translate(${panX}px, ${panY}px)`,
        opacity: currentOpacity,
        zIndex,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        ...style,
      }}
    />
  );
};

// Floating element with physics
const FloatingElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  x: number;
  y: number;
  floatAmount?: number;
  rotateAmount?: number;
}> = ({ children, delay = 0, x, y, floatAmount = 10, rotateAmount = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const entryScale = spring({ frame: adjustedFrame, fps, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const floatY = Math.sin(frame * 0.05) * floatAmount;
  const floatRotate = Math.sin(frame * 0.03) * rotateAmount;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${entryScale}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

// Sakura particle system
const SakuraParticles: React.FC<{ count?: number; intensity?: number }> = ({ count = 30, intensity = 1 }) => {
  const frame = useCurrentFrame();

  const petals = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: random(`petal-x-${i}`) * 100,
        y: random(`petal-y-${i}`) * 100 - 20,
        size: 6 + random(`petal-size-${i}`) * 10,
        speed: 0.3 + random(`petal-speed-${i}`) * 0.6,
        sway: 2 + random(`petal-sway-${i}`) * 4,
        rotation: random(`petal-rot-${i}`) * 360,
        rotSpeed: 0.5 + random(`petal-rotspeed-${i}`) * 2,
        delay: random(`petal-delay-${i}`) * 40,
        opacity: 0.3 + random(`petal-opacity-${i}`) * 0.5,
      })),
    [count]
  );

  return (
    <>
      {petals.map((petal, i) => {
        const adjustedFrame = Math.max(0, frame - petal.delay);
        const yOffset = (adjustedFrame * petal.speed) % 140;
        const xSway = Math.sin(adjustedFrame * 0.04 + i) * petal.sway;
        const rotation = petal.rotation + adjustedFrame * petal.rotSpeed;
        const fadeIn = interpolate(adjustedFrame, [0, 20], [0, petal.opacity * intensity], {
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
              background: `radial-gradient(ellipse, ${colors.sakuraPink} 30%, ${colors.crimson}60 100%)`,
              borderRadius: "50% 0 50% 50%",
              transform: `rotate(${rotation}deg)`,
              opacity: fadeIn,
              boxShadow: `0 0 ${petal.size * 2}px ${colors.sakuraPink}60`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// Gradient text
const GradientText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
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

// Animated reveal text
const RevealText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  glowing?: boolean;
  stagger?: number;
}> = ({ text, delay = 0, fontSize = 72, color = colors.cream, glowing = true, stagger = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", justifyContent: "center" }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        const adjustedFrame = Math.max(0, frame - wordDelay);
        const y = spring({ frame: adjustedFrame, fps, config: { damping: 15, stiffness: 100 } });
        const opacity = interpolate(adjustedFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${(1 - y) * 50}px)`,
              fontFamily: fonts.display,
              fontSize,
              fontWeight: 800,
              color,
              letterSpacing: "-0.02em",
              textShadow: glowing ? `0 0 40px ${colors.crimson}, 0 0 80px ${colors.crimsonDeep}` : "none",
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};

// Typewriter effect
const Typewriter: React.FC<{ text: string; delay?: number; speed?: number }> = ({
  text,
  delay = 0,
  speed = 2,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const chars = Math.floor(adjustedFrame / speed);
  const showCursor = adjustedFrame % 15 < 10;

  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 20,
        color: colors.neonCrimson,
        textShadow: `0 0 20px ${colors.crimson}`,
      }}
    >
      {text.slice(0, chars)}
      <span style={{ opacity: showCursor && chars < text.length ? 1 : 0 }}>▊</span>
    </span>
  );
};

// Cinematic bars
const CinematicBars: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: size, background: "#000", zIndex: 100 }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: size, background: "#000", zIndex: 100 }} />
  </>
);

// Vignette overlay
const Vignette: React.FC<{ intensity?: number }> = ({ intensity = 0.6 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${intensity}) 100%)`,
      pointerEvents: "none",
      zIndex: 50,
    }}
  />
);

// Film grain
const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => {
  const frame = useCurrentFrame();
  const offsetX = (frame * 7) % 100;
  const offsetY = (frame * 11) % 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        zIndex: 60,
      }}
    />
  );
};

// Katana slash transition
const KatanaSlash: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  if (!active) return null;

  const progress = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const fade = interpolate(frame, [6, 15], [1, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 200, opacity: fade }}>
      <div
        style={{
          position: "absolute",
          left: -100 + progress * (width + 200),
          top: "35%",
          width: 300,
          height: 6,
          background: `linear-gradient(90deg, transparent 0%, ${colors.cyberWhite} 40%, ${colors.neonCrimson} 100%)`,
          boxShadow: `0 0 40px ${colors.neonCrimson}, 0 0 80px ${colors.crimson}`,
          transform: "rotate(-12deg)",
        }}
      />
      {progress > 0.4 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.cyberWhite,
            opacity: (1 - progress) * 0.6,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK - Epic dojo interior with floating kanji
// ============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Dramatic zoom on background
  const bgScale = interpolate(frame, [0, durationInFrames], [1.1, 1.2], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: Dojo interior background with Ken Burns */}
      <Img
        src={staticFile("dojo-interior-dark.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${bgScale})`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Layer 2: Dark gradient overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, ${colors.void}90 100%),
            linear-gradient(180deg, ${colors.void}40 0%, transparent 30%, transparent 70%, ${colors.void}80 100%)
          `,
        }}
      />

      {/* Layer 3: Floating kanji code image */}
      <FloatingElement x={75} y={35} delay={20} floatAmount={15} rotateAmount={5}>
        <Img
          src={staticFile("floating-kanji-code.png")}
          style={{
            width: 350,
            height: 350,
            objectFit: "contain",
            filter: `drop-shadow(0 0 30px ${colors.crimson})`,
            opacity: 0.8,
          }}
        />
      </FloatingElement>

      {/* Layer 4: Second floating kanji (mirrored) */}
      <FloatingElement x={20} y={55} delay={35} floatAmount={12} rotateAmount={-4}>
        <Img
          src={staticFile("floating-kanji-code.png")}
          style={{
            width: 250,
            height: 250,
            objectFit: "contain",
            filter: `drop-shadow(0 0 20px ${colors.gold}) hue-rotate(30deg)`,
            opacity: 0.6,
            transform: "scaleX(-1)",
          }}
        />
      </FloatingElement>

      {/* Sakura particles */}
      <SakuraParticles count={25} intensity={0.7} />

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
        <div style={{ textAlign: "center", maxWidth: 1000 }}>
          <Typewriter text="> initiating_dojo_protocol..." delay={15} speed={1.5} />

          <div style={{ marginTop: 50 }}>
            <RevealText text="What if coding" fontSize={76} delay={55} />
          </div>
          <div style={{ marginTop: 5 }}>
            <RevealText text="wasn't about syntax?" fontSize={76} delay={70} color={colors.neonCrimson} />
          </div>
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.7} />
      <FilmGrain opacity={0.03} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 2: PROBLEM - Frustrated dev + code chaos
// ============================================================================
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Reveal the frustrated dev
  const devReveal = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const devSlide = interpolate(frame, [30, 60], [50, 0], { extrapolateRight: "clamp" });

  const problems = ["Memorizing syntax", "Endless debugging", "Years of practice", "Working alone"];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: Code chaos wall background */}
      <Img
        src={staticFile("code-wall-chaos.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.4) saturate(0.8)",
          transform: `scale(${interpolate(frame, [0, durationInFrames], [1, 1.1])})`,
        }}
      />

      {/* Red warning overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.crimsonDeep}30 100%)`,
        }}
      />

      {/* Frustrated developer silhouette */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          bottom: 0,
          opacity: devReveal,
          transform: `translateX(${devSlide}px)`,
        }}
      >
        <Img
          src={staticFile("frustrated-dev-silhouette.png")}
          style={{
            height: 700,
            objectFit: "contain",
            filter: `drop-shadow(0 0 30px ${colors.crimson}50)`,
          }}
        />
      </div>

      {/* Content - Problem list */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 120, zIndex: 10 }}>
        <div>
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

          {problems.map((problem, i) => {
            const itemDelay = 40 + i * 20;
            const opacity = interpolate(frame, [itemDelay, itemDelay + 15], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(frame, [itemDelay, itemDelay + 20], [-60, 0], { extrapolateRight: "clamp" });
            const strike = interpolate(frame, [itemDelay + 60, itemDelay + 75], [0, 100], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  fontFamily: fonts.display,
                  fontSize: 52,
                  fontWeight: 700,
                  color: colors.cream,
                  opacity,
                  transform: `translateX(${x}px)`,
                  marginBottom: 20,
                  position: "relative",
                  textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                }}
              >
                {problem}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    height: 5,
                    width: `${strike}%`,
                    background: `linear-gradient(90deg, ${colors.crimson} 0%, ${colors.neonCrimson} 100%)`,
                    boxShadow: `0 0 20px ${colors.crimson}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.7} />
      <FilmGrain opacity={0.04} />
      <CinematicBars size={50} />

      {/* Katana slash at end */}
      <KatanaSlash active={frame > durationInFrames - 20} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 3: THE SHIFT - Dojo reveal with parallax
// ============================================================================
const ShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Dramatic zoom reveal
  const zoomScale = interpolate(frame, [0, 60], [1.3, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const zoomOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  // Dojo core logo reveal
  const logoScale = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 60 } });
  const logoOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: Dojo blueprint background */}
      <Img
        src={staticFile("dojo-blueprint.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoomScale})`,
          opacity: zoomOpacity * 0.3,
          filter: `brightness(0.6) hue-rotate(-10deg)`,
        }}
      />

      {/* Layer 2: Dojo catalyst scene */}
      <Img
        src={staticFile("dojo-catalyst.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoomScale * 0.98})`,
          opacity: zoomOpacity * 0.8,
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.void}60 0%, ${colors.void}90 100%)`,
        }}
      />

      {/* Dojo core logo - centered */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile("dojo-core-dark.png")}
            style={{
              width: 400,
              objectFit: "contain",
              filter: `drop-shadow(0 0 40px ${colors.crimson})`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Text overlay */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 130, zIndex: 10 }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: colors.neonCrimson,
              marginBottom: 20,
              opacity: interpolate(frame, [90, 105], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            // entering_the_dojo
          </div>

          <RevealText text="They're not tools." fontSize={52} delay={100} glowing={false} />
          <div style={{ marginTop: 15 }}>
            <div
              style={{
                opacity: interpolate(frame, [115, 130], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: 68,
                  fontWeight: 800,
                }}
              >
                <GradientText>They're agents.</GradientText>
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <SakuraParticles count={20} intensity={0.5} />
      <Vignette intensity={0.6} />
      <FilmGrain opacity={0.03} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 4: SOLUTION - The Agent Swarm (5 samurai agents + commander)
// ============================================================================
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Agent data with positions
  const agents = [
    { src: "samurai-agent-planner.png", label: "PLAN", x: 12, y: 35, delay: 30 },
    { src: "samurai-agent-coder.png", label: "CODE", x: 30, y: 60, delay: 45 },
    { src: "samurai-agent-tester.png", label: "TEST", x: 70, y: 60, delay: 60 },
    { src: "samurai-agent-debugger.png", label: "DEBUG", x: 88, y: 35, delay: 75 },
    { src: "samurai-agent-shipper.png", label: "SHIP", x: 50, y: 78, delay: 90 },
  ];

  // Commander reveal
  const commanderScale = spring({ frame: frame - 15, fps, config: { damping: 15, stiffness: 70 } });
  const commanderOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: Dojo nodes network background */}
      <Img
        src={staticFile("dojo-nodes.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          filter: "brightness(0.7) hue-rotate(-10deg)",
        }}
      />

      {/* Radial gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, ${colors.crimson}15 0%, transparent 50%),
                       radial-gradient(ellipse at center, transparent 30%, ${colors.void} 100%)`,
        }}
      />

      {/* Connection lines from commander to agents */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
        {agents.map((agent, i) => {
          const lineDelay = agent.delay + 15;
          const progress = interpolate(frame - lineDelay, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = 0.3 + Math.sin(frame * 0.08 + i * 0.5) * 0.2;

          return (
            <line
              key={i}
              x1="50%"
              y1="42%"
              x2={`${50 + (agent.x - 50) * progress}%`}
              y2={`${42 + (agent.y - 42) * progress}%`}
              stroke={colors.crimson}
              strokeWidth={2}
              opacity={pulse * progress}
              strokeDasharray="8 4"
              style={{ filter: `drop-shadow(0 0 8px ${colors.crimson})` }}
            />
          );
        })}
      </svg>

      {/* Commander in center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: `translate(-50%, -50%) scale(${commanderScale})`,
          opacity: commanderOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            background: `radial-gradient(ellipse at center, ${colors.void} 0%, ${colors.void} 60%, transparent 100%)`,
            padding: 40,
            borderRadius: "50%",
          }}
        >
          <Img
            src={staticFile("master-commander-you.png")}
            style={{
              height: 280,
              objectFit: "contain",
              filter: `drop-shadow(0 0 40px ${colors.gold})`,
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontFamily: fonts.mono,
            fontSize: 16,
            fontWeight: 700,
            color: colors.goldBright,
            textShadow: `0 0 20px ${colors.gold}`,
          }}
        >
          YOU
        </div>
      </div>

      {/* Samurai agents */}
      {agents.map((agent, i) => {
        const agentScale = spring({ frame: frame - agent.delay, fps, config: { damping: 12, stiffness: 80 } });
        const agentOpacity = interpolate(frame - agent.delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });
        const float = Math.sin(frame * 0.04 + i * 1.2) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${agent.x}%`,
              top: `${agent.y}%`,
              transform: `translate(-50%, -50%) scale(${agentScale}) translateY(${float}px)`,
              opacity: agentOpacity,
              zIndex: 5,
            }}
          >
            <div
              style={{
                position: "relative",
                background: `radial-gradient(ellipse at center, ${colors.void} 0%, ${colors.void} 50%, transparent 100%)`,
                padding: 25,
                borderRadius: "50%",
              }}
            >
              <Img
                src={staticFile(agent.src)}
                style={{
                  height: 140,
                  objectFit: "contain",
                  filter: `drop-shadow(0 0 20px ${colors.crimson})`,
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: 8,
                fontFamily: fonts.mono,
                fontSize: 12,
                fontWeight: 700,
                color: colors.neonCrimson,
                textShadow: `0 0 10px ${colors.crimson}`,
              }}
            >
              {agent.label}
            </div>
          </div>
        );
      })}

      {/* Title */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 50, zIndex: 20 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 700,
            color: colors.cream,
            opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateRight: "clamp" }),
            textShadow: "0 4px 30px rgba(0,0,0,0.8)",
          }}
        >
          Command your <GradientText style={{ fontWeight: 800 }}>agent swarm</GradientText>
        </div>
      </AbsoluteFill>

      <SakuraParticles count={15} intensity={0.4} />
      <Vignette intensity={0.5} />
      <FilmGrain opacity={0.03} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 5: PROOF - Battle Records with scroll + badges
// ============================================================================
const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Scroll unroll effect
  const scrollScale = interpolate(frame, [0, 40], [0.8, 1], { extrapolateRight: "clamp" });
  const scrollOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const stats = [
    { value: "30K+", label: "Warriors training", delay: 35 },
    { value: "9 days", label: "5-week project shipped", delay: 55 },
    { value: "0", label: "lines written by hand", delay: 75 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: War scroll background */}
      <Img
        src={staticFile("war-scroll-background.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: scrollOpacity * 0.5,
          transform: `scale(${scrollScale})`,
          filter: "brightness(0.6)",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.void}70 0%, ${colors.void}95 100%)`,
        }}
      />

      {/* Achievement badges - floating in corners */}
      <FloatingElement x={15} y={25} delay={90} floatAmount={8}>
        <Img
          src={staticFile("achievement-badges.png")}
          style={{
            width: 120,
            objectFit: "contain",
            filter: `drop-shadow(0 0 20px ${colors.gold})`,
            opacity: 0.9,
          }}
        />
      </FloatingElement>

      <FloatingElement x={85} y={75} delay={100} floatAmount={10}>
        <Img
          src={staticFile("achievement-badges.png")}
          style={{
            width: 100,
            objectFit: "contain",
            filter: `drop-shadow(0 0 15px ${colors.gold}) hue-rotate(20deg)`,
            opacity: 0.8,
            transform: "rotate(15deg)",
          }}
        />
      </FloatingElement>

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.crimson,
              letterSpacing: "0.3em",
              marginBottom: 60,
              opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            [ BATTLE RECORDS ]
          </div>

          <div style={{ display: "flex", gap: 100 }}>
            {stats.map((stat, i) => {
              const statScale = spring({ frame: frame - stat.delay, fps, config: { damping: 12 } });
              const statOpacity = interpolate(frame - stat.delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

              return (
                <div key={i} style={{ textAlign: "center", opacity: statOpacity, transform: `scale(${statScale})` }}>
                  <GradientText
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 80,
                      fontWeight: 800,
                      display: "block",
                      filter: `drop-shadow(0 0 20px ${colors.crimson}50)`,
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
                      opacity: 0.9,
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

      <SakuraParticles count={12} intensity={0.3} />
      <Vignette intensity={0.6} />
      <FilmGrain opacity={0.04} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 6: CURRICULUM - Training ground + scrolls
// ============================================================================
const CurriculumScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const modules = [
    { name: "Context Engineering", icon: "01" },
    { name: "Prompt Architecture", icon: "02" },
    { name: "Agent Orchestration", icon: "03" },
    { name: "Production Deploy", icon: "04" },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: colors.void }}>
      {/* Layer 1: Training ground background */}
      <Img
        src={staticFile("dojo-training-ground.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.4)",
          transform: `scale(${interpolate(frame, [0, durationInFrames], [1, 1.08])})`,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${colors.void}80 0%, ${colors.void}60 50%, ${colors.void}90 100%)`,
        }}
      />

      {/* Training scroll decoration */}
      <FloatingElement x={88} y={30} delay={20} floatAmount={6}>
        <Img
          src={staticFile("training-scroll-module.png")}
          style={{
            width: 180,
            objectFit: "contain",
            filter: `drop-shadow(0 0 15px ${colors.crimson})`,
            opacity: 0.8,
          }}
        />
      </FloatingElement>

      <FloatingElement x={10} y={70} delay={30} floatAmount={8}>
        <Img
          src={staticFile("training-scroll-module.png")}
          style={{
            width: 150,
            objectFit: "contain",
            filter: `drop-shadow(0 0 12px ${colors.gold})`,
            opacity: 0.7,
            transform: "rotate(-10deg)",
          }}
        />
      </FloatingElement>

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.gold,
              marginBottom: 50,
              letterSpacing: "0.3em",
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            8 MODULES • LIFETIME ACCESS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px 100px" }}>
            {modules.map((mod, i) => {
              const itemDelay = 25 + i * 15;
              const opacity = interpolate(frame, [itemDelay, itemDelay + 15], [0, 1], { extrapolateRight: "clamp" });
              const x = interpolate(frame, [itemDelay, itemDelay + 20], [i % 2 === 0 ? -40 : 40, 0], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity,
                    transform: `translateX(${x}px)`,
                    background: `${colors.void}80`,
                    padding: "20px 30px",
                    borderRadius: 12,
                    border: `1px solid ${colors.crimson}40`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 24,
                      fontWeight: 800,
                      color: colors.neonCrimson,
                      textShadow: `0 0 15px ${colors.crimson}`,
                    }}
                  >
                    {mod.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 26,
                      fontWeight: 600,
                      color: colors.cream,
                    }}
                  >
                    {mod.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      <SakuraParticles count={10} intensity={0.3} />
      <Vignette intensity={0.5} />
      <FilmGrain opacity={0.03} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// SCENE 7: CTA - Dojo entrance + sensei
// ============================================================================
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Sensei reveal
  const senseiScale = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 60 } });
  const senseiOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });

  // Button pulse
  const pulse = 1 + Math.sin(frame * 0.12) * 0.03;
  const buttonScale = spring({ frame: frame - 100, fps, config: { damping: 10 } });
  const buttonOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn, background: colors.void }}>
      {/* Layer 1: Dojo entrance hero shot */}
      <Img
        src={staticFile("dojo-entrance-hero.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.5)",
          transform: `scale(${interpolate(frame, [0, 200], [1, 1.1])})`,
        }}
      />

      {/* Warm glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 50% 60%, ${colors.crimson}20 0%, transparent 60%),
            radial-gradient(ellipse at center, transparent 30%, ${colors.void}90 100%)
          `,
        }}
      />

      {/* Sensei welcoming */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          bottom: 50,
          opacity: senseiOpacity,
          transform: `scale(${senseiScale})`,
        }}
      >
        <Img
          src={staticFile("sensei-welcoming.png")}
          style={{
            height: 500,
            objectFit: "contain",
            filter: `drop-shadow(0 0 40px ${colors.gold}50)`,
          }}
        />
      </div>

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
        <div style={{ textAlign: "center", marginLeft: 200 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: colors.neonCrimson,
              marginBottom: 25,
              opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            speakcode.dev
          </div>

          <RevealText text="Stop writing code." fontSize={58} delay={25} glowing={false} />
          <div style={{ marginTop: 10 }}>
            <div style={{ opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }) }}>
              <span style={{ fontFamily: fonts.display, fontSize: 58, fontWeight: 800 }}>
                <GradientText>Start speaking it.</GradientText>
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 60,
              opacity: buttonOpacity,
              transform: `scale(${buttonScale * pulse})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "24px 80px",
                background: `linear-gradient(135deg, ${colors.crimson} 0%, ${colors.crimsonDeep} 100%)`,
                borderRadius: 10,
                border: `2px solid ${colors.neonCrimson}`,
                fontFamily: fonts.display,
                fontSize: 24,
                fontWeight: 800,
                color: colors.cream,
                boxShadow: `
                  0 0 50px ${colors.crimson}60,
                  inset 0 0 30px ${colors.neonCrimson}20
                `,
                letterSpacing: "0.08em",
              }}
            >
              JOIN THE DOJO →
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <SakuraParticles count={25} intensity={0.6} />
      <Vignette intensity={0.5} />
      <FilmGrain opacity={0.03} />
      <CinematicBars size={50} />
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================
export const DojoEpicTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.void }}>
      {/* Scene 1: Hook - 0 to 150 frames (5s) */}
      <Sequence from={0} durationInFrames={150}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Problem - 150 to 330 frames (6s) */}
      <Sequence from={150} durationInFrames={180}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3: The Shift - 330 to 510 frames (6s) */}
      <Sequence from={330} durationInFrames={180}>
        <ShiftScene />
      </Sequence>

      {/* Scene 4: Solution (Agent Swarm) - 510 to 720 frames (7s) */}
      <Sequence from={510} durationInFrames={210}>
        <SolutionScene />
      </Sequence>

      {/* Scene 5: Proof - 720 to 900 frames (6s) */}
      <Sequence from={720} durationInFrames={180}>
        <ProofScene />
      </Sequence>

      {/* Scene 6: Curriculum - 900 to 1080 frames (6s) */}
      <Sequence from={900} durationInFrames={180}>
        <CurriculumScene />
      </Sequence>

      {/* Scene 7: CTA - 1080 to 1290 frames (7s) */}
      <Sequence from={1080} durationInFrames={210}>
        <CTAScene />
      </Sequence>

      {/* Audio */}
      <Audio src={staticFile("lofi-piano-beat.mp3")} volume={0.35} />
    </AbsoluteFill>
  );
};
