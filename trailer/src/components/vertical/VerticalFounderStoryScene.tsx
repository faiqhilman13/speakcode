import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical Founder Story Scene: MOBILE ADAPTATION with OPTIMIZED LAYOUT
 */

// Animated counter component
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  startFrame: number;
  currentFrame: number;
  fps: number;
  duration?: number;
}> = ({ value, suffix = "", startFrame, currentFrame, fps, duration = 30 }) => {
  if (currentFrame < startFrame) return <span>0{suffix}</span>;

  const progress = Math.min(1, (currentFrame - startFrame) / duration);
  const eased = 1 - Math.pow(1 - progress, 3);
  const displayValue = Math.floor(value * eased);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

export const VerticalFounderStoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing (660 frames total = 22s)
  const phase1End = 300;
  const phase2End = 450;

  const phase1Active = frame < phase1End;
  const phase2Active = frame >= phase1End - 30 && frame < phase2End;
  const phase3Active = frame >= phase2End - 30;

  // Phase 1 animations
  const phase1Opacity = phase1Active
    ? interpolate(frame, [0, 20, phase1End - 30, phase1End], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  const titleSpring = frame >= 10 ? spring({ frame: frame - 10, fps, config: { damping: 14 } }) : 0;
  const stat1Spring = frame >= 50 ? spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const stat2Spring = frame >= 90 ? spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const stat3Spring = frame >= 130 ? spring({ frame: frame - 130, fps, config: { damping: 12, stiffness: 100 } }) : 0;
  const roleSpring = frame >= 180 ? spring({ frame: frame - 180, fps, config: { damping: 14 } }) : 0;
  const companySpring = frame >= 220 ? spring({ frame: frame - 220, fps, config: { damping: 14 } }) : 0;

  // Phase 2 animations
  const phase2Opacity = phase2Active
    ? interpolate(frame - (phase1End - 30), [0, 40, phase2End - phase1End - 10, phase2End - phase1End + 20], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  const hackathonTitleSpring = frame >= phase1End + 10
    ? spring({ frame: frame - phase1End - 10, fps, config: { damping: 14 } }) : 0;
  const hackathonStatSpring = frame >= phase1End + 30
    ? spring({ frame: frame - phase1End - 30, fps, config: { damping: 12, stiffness: 80 } }) : 0;
  const hackathonDetailSpring = frame >= phase1End + 50
    ? spring({ frame: frame - phase1End - 50, fps, config: { damping: 14 } }) : 0;
  const soloTagSpring = frame >= phase1End + 70
    ? spring({ frame: frame - phase1End - 70, fps, config: { damping: 10, stiffness: 120 } }) : 0;

  // Phase 3 animations
  const phase3Opacity = phase3Active
    ? interpolate(frame - (phase2End - 30), [0, 40], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const truthSpring = frame >= phase2End + 15
    ? spring({ frame: frame - phase2End - 15, fps, config: { damping: 18 } }) : 0;
  const insight1Spring = frame >= phase2End + 45
    ? spring({ frame: frame - phase2End - 45, fps, config: { damping: 16 } }) : 0;
  const insight2Spring = frame >= phase2End + 90
    ? spring({ frame: frame - phase2End - 90, fps, config: { damping: 16 } }) : 0;
  const ctaSpring = frame >= phase2End + 135
    ? spring({ frame: frame - phase2End - 135, fps, config: { damping: 14, stiffness: 80 } }) : 0;

  // Floating particles (adjusted for vertical)
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: 100 + (i * 50) % 900,
    y: 150 + Math.sin(i * 1.5) * 500,
    size: 3 + (i % 4) * 2,
    speed: 0.02 + (i % 3) * 0.01,
  }));

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", overflow: "hidden" }}>
      {/* Animated gradient background - SAME AS ORIGINAL */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame * 0.01) * 10}% ${40 + Math.cos(frame * 0.008) * 10}%, rgba(255,94,91,0.08) 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles - SAME AS ORIGINAL */}
      {particles.map((p, i) => {
        const floatY = Math.sin((frame + i * 30) * p.speed) * 20;
        const floatX = Math.cos((frame + i * 20) * p.speed * 0.5) * 10;
        const particleOpacity = interpolate(frame, [20, 50], [0, 0.2 + (i % 3) * 0.1], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + floatX,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              background: i % 3 === 0 ? "#FF5E5B" : "rgba(253,246,227,0.3)",
              borderRadius: "50%",
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* Subtle grid pattern - SAME AS ORIGINAL */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(253,246,227,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253,246,227,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ============ PHASE 1: Enterprise Credentials (OPTIMIZED) ============ */}
      <div style={{ position: "absolute", inset: 0, opacity: phase1Opacity }}>
        {/* Header - GREATLY ENLARGED */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 130, // MUCH TALLER - 70 → 130
            background: "#FDF6E3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 70px",
            zIndex: 10,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 20, // MUCH BIGGER - 12 → 20
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.5)",
            }}
          >
            The Proof
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 36, // MUCH BIGGER - 20 → 36
              fontStyle: "italic",
              color: "#FF5E5B",
            }}
          >
            Zero to hero
          </div>
        </div>

        {/* Main title - BIGGER AND BETTER POSITIONED */}
        <div
          style={{
            position: "absolute",
            top: 170, // ADJUSTED FOR LARGER HEADER
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: titleSpring,
            transform: `translateY(${(1 - titleSpring) * 20}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(253,246,227,0.4)",
              marginBottom: 12,
            }}
          >
            Enterprise Impact
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 64,
              color: "#FDF6E3",
              lineHeight: 1.1,
            }}
          >
            I built AI platform<br />
            <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>everyone uses.</span>
          </div>
        </div>

        {/* Stats grid - OPTIMIZED FOR VERTICAL (BIGGER CARDS, LESS GAP) */}
        <div
          style={{
            position: "absolute",
            top: 400, // ADJUSTED FOR LARGER HEADER
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 45,
          }}
        >
          {/* Stat 1: LOC - BIGGER AND OPTIMIZED */}
          <div
            style={{
              opacity: stat1Spring,
              transform: `translateY(${(1 - stat1Spring) * 30}px) scale(${0.85 + stat1Spring * 0.15})`,
              width: "100%",
              maxWidth: 800,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255,94,91,0.1)",
                border: "2px solid rgba(255,94,91,0.3)",
                borderRadius: 20,
                padding: "40px 70px",
                display: "flex",
                alignItems: "center",
                gap: 35,
                width: "100%",
                maxWidth: 750,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 100,
                  fontWeight: 400,
                  color: "#FF5E5B",
                  lineHeight: 1,
                  minWidth: 220,
                  textAlign: "center",
                }}
              >
                <AnimatedCounter value={100} suffix="K+" startFrame={60} currentFrame={frame} fps={fps} duration={90} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 18,
                    color: "rgba(253,246,227,0.7)",
                    letterSpacing: "0.05em",
                  }}
                >
                  LINES OF CODE
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 24,
                    color: "#FDF6E3",
                    fontStyle: "italic",
                  }}
                >
                  Top 3 contributor
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2: Users - BIGGER AND OPTIMIZED */}
          <div
            style={{
              opacity: stat2Spring,
              transform: `translateY(${(1 - stat2Spring) * 30}px) scale(${0.85 + stat2Spring * 0.15})`,
              width: "100%",
              maxWidth: 800,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(253,246,227,0.05)",
                border: "2px solid rgba(253,246,227,0.15)",
                borderRadius: 20,
                padding: "40px 70px",
                display: "flex",
                alignItems: "center",
                gap: 35,
                width: "100%",
                maxWidth: 750,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 100,
                  fontWeight: 400,
                  color: "#FDF6E3",
                  lineHeight: 1,
                  minWidth: 220,
                  textAlign: "center",
                }}
              >
                <AnimatedCounter value={30} suffix="K+" startFrame={100} currentFrame={frame} fps={fps} duration={90} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 18,
                    color: "rgba(253,246,227,0.7)",
                    letterSpacing: "0.05em",
                  }}
                >
                  USERS SERVED
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 24,
                    color: "rgba(253,246,227,0.9)",
                    fontStyle: "italic",
                  }}
                >
                  Enterprise GenAI
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3: Team - BIGGER AND OPTIMIZED */}
          <div
            style={{
              opacity: stat3Spring,
              transform: `translateY(${(1 - stat3Spring) * 30}px) scale(${0.85 + stat3Spring * 0.15})`,
              width: "100%",
              maxWidth: 800,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(253,246,227,0.05)",
                border: "2px solid rgba(253,246,227,0.15)",
                borderRadius: 20,
                padding: "40px 70px",
                display: "flex",
                alignItems: "center",
                gap: 35,
                width: "100%",
                maxWidth: 750,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 100,
                  fontWeight: 400,
                  color: "#FDF6E3",
                  lineHeight: 1,
                  minWidth: 220,
                  textAlign: "center",
                }}
              >
                <AnimatedCounter value={40} suffix="" startFrame={140} currentFrame={frame} fps={fps} duration={90} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 18,
                    color: "rgba(253,246,227,0.7)",
                    letterSpacing: "0.05em",
                  }}
                >
                  PERSON TEAM
                </div>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 24,
                    color: "rgba(253,246,227,0.9)",
                    fontStyle: "italic",
                  }}
                >
                  App Lead
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role + Company - MOVED DOWN TO BE CLOSER TO BOTTOM */}
        <div
          style={{
            position: "absolute",
            bottom: 450, // MOVED DOWN FROM 700 TO BE CLOSER TO BOTTOM
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 25,
          }}
        >
          <div
            style={{
              opacity: roleSpring,
              transform: `translateY(${(1 - roleSpring) * -25}px)`,
            }}
          >
            <div
              style={{
                background: "#FF5E5B",
                padding: "24px 80px", // MUCH BIGGER PADDING
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(255,94,91,0.5)",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 38, // MUCH BIGGER FONT
                  color: "#FDF6E3",
                }}
              >
                Senior AI Engineer
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: companySpring,
              transform: `translateY(${(1 - companySpring) * -15}px)`,
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 24, // MUCH BIGGER FONT
                color: "rgba(253,246,227,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              @ EY · Top 5 KLSE Company
            </div>
          </div>
        </div>

        {/* "No CS degree" tags - MOVED DOWN TO BE CLOSER TO BOTTOM */}
        <div
          style={{
            position: "absolute",
            bottom: 280, // MOVED DOWN FROM 550 TO BE CLOSER TO BOTTOM
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: companySpring,
          }}
        >
          {["No CS degree", "No tech background", "Just agentic coding"].map((text, i) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: i === 2 ? 12 : 10, // MUCH BIGGER DOTS
                  height: i === 2 ? 12 : 10,
                  background: i === 2 ? "#FF5E5B" : "rgba(253,246,227,0.3)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 20, // MUCH BIGGER FONT
                  color: i === 2 ? "#FF5E5B" : "rgba(253,246,227,0.4)",
                  letterSpacing: "0.03em",
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ PHASE 2: Hackathon Achievement ============ */}
      <div style={{ position: "absolute", inset: 0, opacity: phase2Opacity }}>
        {/* Header - GREATLY ENLARGED */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 130, // MUCH TALLER - 70 → 130
            background: "#FF5E5B",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 70px",
            zIndex: 10,
            opacity: hackathonTitleSpring,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 20, // MUCH BIGGER - 12 → 20
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(253,246,227,0.7)",
            }}
          >
            Competition
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 36, // MUCH BIGGER - 20 → 36
              fontStyle: "italic",
              color: "#FDF6E3",
            }}
          >
            Against 150+ teams
          </div>
        </div>

        {/* Main content - OPTIMIZED FOR VERTICAL */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          {/* Big ranking - SAME AS ORIGINAL */}
          <div
            style={{
              opacity: hackathonStatSpring,
              transform: `scale(${0.7 + hackathonStatSpring * 0.3})`,
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 200,
                fontWeight: 400,
                color: "#FF5E5B",
                lineHeight: 0.9,
                textShadow: "0 20px 60px rgba(255,94,91,0.3)",
              }}
            >
              Top 5
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 28,
                color: "rgba(253,246,227,0.5)",
                marginTop: 10,
                letterSpacing: "0.1em",
              }}
            >
              OUT OF 150+ PARTICIPANTS
            </div>
          </div>

          {/* Hackathon details - SAME AS ORIGINAL */}
          <div
            style={{
              marginTop: 60,
              opacity: hackathonDetailSpring,
              transform: `translateY(${(1 - hackathonDetailSpring) * 30}px)`,
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 42,
                color: "#FDF6E3",
                lineHeight: 1.3,
              }}
            >
              ASEAN AI Hackathon
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 18,
                color: "rgba(253,246,227,0.5)",
                marginTop: 15,
                letterSpacing: "0.05em",
              }}
            >
              Ministry of Health · National AI Office Malaysia
            </div>
          </div>

          {/* SOLO tag - SAME AS ORIGINAL */}
          <div
            style={{
              marginTop: 50,
              opacity: soloTagSpring,
              transform: `scale(${0.8 + soloTagSpring * 0.2})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#FDF6E3",
                padding: "20px 50px",
                borderRadius: 14,
                boxShadow: "0 15px 50px rgba(253,246,227,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 32,
                  fontStyle: "italic",
                  color: "#1a1a1a",
                }}
              >
                As a <span style={{ color: "#FF5E5B" }}>solo</span> developer
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements - SAME AS ORIGINAL */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 30,
            width: 80,
            height: 80,
            borderLeft: "4px solid rgba(255,94,91,0.3)",
            borderTop: "4px solid rgba(255,94,91,0.3)",
            opacity: hackathonDetailSpring,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 80,
            height: 80,
            borderRight: "4px solid rgba(255,94,91,0.3)",
            borderBottom: "4px solid rgba(255,94,91,0.3)",
            opacity: hackathonDetailSpring,
          }}
        />
      </div>

      {/* ============ PHASE 3: The Insight ============ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase3Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {/* Decorative background quote marks - SAME AS ORIGINAL */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 60,
            fontFamily: "Georgia, serif",
            fontSize: 400,
            color: "rgba(253,246,227,0.02)",
            lineHeight: 0.7,
          }}
        >
          "
        </div>

        {/* "Here's to truth:" - SAME AS ORIGINAL */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.4)",
            marginBottom: 50,
            opacity: truthSpring,
            transform: `translateY(${(1 - truthSpring) * 15}px)`,
          }}
        >
          Here's to truth
        </div>

        {/* First insight line - SAME AS ORIGINAL */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 56,
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 30,
            opacity: insight1Spring,
            transform: `translateY(${(1 - insight1Spring) * 25}px)`,
          }}
        >
          AI won't replace you.
        </div>

        {/* Second insight line - SAME AS ORIGINAL */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#FDF6E3",
            textAlign: "center",
            lineHeight: 1.3,
            opacity: insight2Spring,
            transform: `translateY(${(1 - insight2Spring) * 25}px)`,
          }}
        >
          But someone who knows how to{" "}
          <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>work with AI</span>
          <br />
          will.
        </div>

        {/* "That person could be you." - SAME AS ORIGINAL */}
        <div
          style={{
            marginTop: 70,
            opacity: ctaSpring,
            transform: `scale(${0.9 + ctaSpring * 0.1})`,
          }}
        >
          <div
            style={{
              background: "rgba(255,94,91,0.1)",
              border: "2px solid rgba(255,94,91,0.3)",
              borderRadius: 16,
              padding: "30px 60px",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 56,
                fontStyle: "italic",
                color: "#FF5E5B",
                textShadow: "0 10px 40px rgba(255,94,91,0.2)",
              }}
            >
              That person could be you.
            </div>
          </div>
        </div>

        {/* Bottom accent - SAME AS ORIGINAL */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: ctaSpring,
          }}
        >
          <div style={{ width: 60, height: 3, background: "#FF5E5B" }} />
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              color: "rgba(253,246,227,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            AND YOU CAN LEARN IT TOO
          </div>
          <div style={{ width: 60, height: 3, background: "#FF5E5B" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
