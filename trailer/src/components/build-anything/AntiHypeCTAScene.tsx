import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Anti-Hype CTA Scene: Final call to action
 *
 * DESIGN: Bold, confident typography with dramatic strikethroughs
 * - Anti-hype positioning with crossed-out words
 * - Building tension to final reveal
 * - Large scale typography for impact
 * - Pulsing CTA with glow effect
 */

export const AntiHypeCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation phases
  const showNot1 = frame >= 10;
  const showNot2 = frame >= 25;
  const showActual = frame >= 50;
  const showBuildAnything = frame >= 80;
  const showLogo = frame >= 120;
  const showCTA = frame >= 150;
  const showUrl = frame >= 180;

  // Springs
  const not1Spring = showNot1 ? spring({ frame: frame - 10, fps, config: { damping: 16 } }) : 0;
  const not2Spring = showNot2 ? spring({ frame: frame - 25, fps, config: { damping: 16 } }) : 0;
  const actualSpring = showActual ? spring({ frame: frame - 50, fps, config: { damping: 14 } }) : 0;
  const buildAnythingSpring = showBuildAnything ? spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 80 } }) : 0;
  const logoSpring = showLogo ? spring({ frame: frame - 120, fps, config: { damping: 14 } }) : 0;
  const ctaSpring = showCTA ? spring({ frame: frame - 150, fps, config: { damping: 10, stiffness: 100 } }) : 0;

  // Strikethrough animation
  const strikeWidth1 = showNot1 ? interpolate(frame - 10, [10, 25], [0, 100], { extrapolateRight: "clamp" }) : 0;
  const strikeWidth2 = showNot2 ? interpolate(frame - 25, [10, 25], [0, 100], { extrapolateRight: "clamp" }) : 0;

  // CTA pulse
  const ctaPulse = showCTA ? 1 + Math.sin((frame - 150) * 0.1) * 0.015 : 1;

  // CTA glow intensity
  const glowIntensity = showCTA ? 0.4 + Math.sin((frame - 150) * 0.08) * 0.15 : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", overflow: "hidden" }}>
      {/* Radial gradient backdrop */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 1600,
          height: 1600,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,94,91,0.06) 0%, transparent 50%)",
          opacity: buildAnythingSpring,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(253,246,227,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253,246,227,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 120,
          height: 120,
          borderLeft: "4px solid rgba(255,94,91,0.25)",
          borderTop: "4px solid rgba(255,94,91,0.25)",
          opacity: not1Spring,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 40,
          width: 120,
          height: 120,
          borderRight: "4px solid rgba(255,94,91,0.25)",
          borderBottom: "4px solid rgba(255,94,91,0.25)",
          opacity: not1Spring,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Anti-hype section */}
        <div
          style={{
            display: "flex",
            gap: 80,
            marginBottom: 50,
          }}
        >
          {/* "Not coding tutorials" */}
          <div
            style={{
              position: "relative",
              opacity: not1Spring,
              transform: `translateY(${(1 - not1Spring) * 20}px)`,
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 24,
                color: "rgba(253,246,227,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              Not coding tutorials
            </div>
            {/* Animated strikethrough */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 3,
                width: `${strikeWidth1}%`,
                background: "#FF5E5B",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          {/* "Not AI hype" */}
          <div
            style={{
              position: "relative",
              opacity: not2Spring,
              transform: `translateY(${(1 - not2Spring) * 20}px)`,
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 24,
                color: "rgba(253,246,227,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              Not AI hype
            </div>
            {/* Animated strikethrough */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 3,
                width: `${strikeWidth2}%`,
                background: "#FF5E5B",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>

        {/* "The actual framework that lets you" */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 44,
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 20,
            opacity: actualSpring,
            transform: `translateY(${(1 - actualSpring) * 25}px)`,
          }}
        >
          The actual framework that lets you
        </div>

        {/* "build anything." - huge emphasis */}
        <div
          style={{
            opacity: buildAnythingSpring,
            transform: `scale(${0.85 + buildAnythingSpring * 0.15})`,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 120,
              fontStyle: "italic",
              color: "#FF5E5B",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textShadow: "0 20px 60px rgba(255,94,91,0.25)",
            }}
          >
            build anything.
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 150,
            height: 3,
            background: "rgba(253,246,227,0.15)",
            marginBottom: 40,
            opacity: logoSpring,
            transform: `scaleX(${logoSpring})`,
          }}
        />

        {/* Logo + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 25,
            marginBottom: 25,
            opacity: logoSpring,
            transform: `translateY(${(1 - logoSpring) * 20}px)`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              background: "#FF5E5B",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              boxShadow: "0 8px 30px rgba(255,94,91,0.35)",
            }}
          >
            ⚡
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              color: "#FDF6E3",
              letterSpacing: "-0.02em",
            }}
          >
            AgenticDojo
          </div>
        </div>

        {/* "Master agentic coding. The skill of the decade." */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
            opacity: logoSpring,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 36,
              fontStyle: "italic",
              color: "rgba(253,246,227,0.7)",
              marginBottom: 8,
            }}
          >
            Master agentic coding.
          </div>
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 18,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FF5E5B",
            }}
          >
            The skill of the decade
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "relative",
            opacity: ctaSpring,
            transform: `scale(${(0.9 + ctaSpring * 0.1) * ctaPulse})`,
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: `rgba(255,94,91,${glowIntensity})`,
              borderRadius: 30,
              filter: "blur(30px)",
            }}
          />

          <div
            style={{
              position: "relative",
              background: "#FF5E5B",
              padding: "30px 70px",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 18,
              boxShadow: "0 15px 50px rgba(255,94,91,0.4)",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 30,
                color: "#FDF6E3",
              }}
            >
              Build whatever you want
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#FDF6E3",
              }}
            >
              →
            </div>
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
          height: 70,
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: showUrl ? 1 : 0,
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#FDF6E3",
          }}
        >
          agenticdojo.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
