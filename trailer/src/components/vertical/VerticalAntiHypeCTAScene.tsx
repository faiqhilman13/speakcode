import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical Anti-Hype CTA Scene: Mobile adaptation - GREATLY ENLARGED
 *
 * LITERAL mobile adaptation of AntiHypeCTAScene:
 * - Same content and animations
 * - Stacked vertical layout for mobile
 * - MUCH LARGER fonts and components to fill viewport
 * - 9:16 portrait format
 */

export const VerticalAntiHypeCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation phases - SAME TIMING
  const showNot1 = frame >= 10;
  const showNot2 = frame >= 25;
  const showActual = frame >= 50;
  const showBuildAnything = frame >= 80;
  const showLogo = frame >= 120;
  const showCTA = frame >= 150;

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
          width: 1400,
          height: 1400,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,94,91,0.08) 0%, transparent 50%)",
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
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner accents - LARGER */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 120,
          height: 120,
          borderLeft: "4px solid rgba(255,94,91,0.3)",
          borderTop: "4px solid rgba(255,94,91,0.3)",
          opacity: not1Spring,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 30,
          width: 120,
          height: 120,
          borderRight: "4px solid rgba(255,94,91,0.3)",
          borderBottom: "4px solid rgba(255,94,91,0.3)",
          opacity: not1Spring,
        }}
      />

      {/* Main content - stacked vertically (mobile) */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 40,
          right: 40,
          bottom: 220, // ADJUSTED FOR LARGER CTA + FOOTER
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {/* Anti-hype section - stacked (mobile) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginBottom: 30,
          }}
        >
          {/* "Not coding tutorials" - MUCH LARGER */}
          <div
            style={{
              position: "relative",
              opacity: not1Spring,
              transform: `translateY(${(1 - not1Spring) * 15}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 40, // MUCH BIGGER - 24 → 40
                color: "rgba(253,246,227,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              Not coding tutorials
            </div>
            {/* Animated strikethrough - THICKER */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: 5, // THICKER - 3 → 5
                width: `${strikeWidth1}%`,
                background: "#FF5E5B",
              }}
            />
          </div>

          {/* "Not AI hype" - MUCH LARGER */}
          <div
            style={{
              position: "relative",
              opacity: not2Spring,
              transform: `translateY(${(1 - not2Spring) * 15}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 40, // MUCH BIGGER - 24 → 40
                color: "rgba(253,246,227,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              Not AI hype
            </div>
            {/* Animated strikethrough - THICKER */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: 5, // THICKER - 3 → 5
                width: `${strikeWidth2}%`,
                background: "#FF5E5B",
              }}
            />
          </div>
        </div>

        {/* "The actual framework that lets you" - MUCH LARGER */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 60, // MUCH BIGGER - 36 → 60
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 30,
            opacity: actualSpring,
            transform: `translateY(${(1 - actualSpring) * 20}px)`,
          }}
        >
          The actual framework that lets you
        </div>

        {/* "build anything." - huge emphasis - MUCH LARGER */}
        <div
          style={{
            opacity: buildAnythingSpring,
            transform: `scale(${0.85 + buildAnythingSpring * 0.15})`,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 120, // MUCH BIGGER - 80 → 120
              fontStyle: "italic",
              color: "#FF5E5B",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textShadow: "0 10px 30px rgba(255,94,91,0.25)",
              textAlign: "center",
            }}
          >
            build anything.
          </div>
        </div>

        {/* Divider - MUCH LARGER */}
        <div
          style={{
            width: 200, // WIDER - 150 → 200
            height: 5, // THICKER - 3 → 5
            background: "rgba(253,246,227,0.15)",
            marginBottom: 40,
            opacity: logoSpring,
            transform: `scaleX(${logoSpring})`,
          }}
        />

        {/* Logo + tagline - MUCH LARGER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            opacity: logoSpring,
            transform: `translateY(${(1 - logoSpring) * 15}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <div
              style={{
                width: 90, // MUCH BIGGER - 60 → 90
                height: 90,
                background: "#FF5E5B",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48, // MUCH BIGGER - 32 → 48
                boxShadow: "0 8px 30px rgba(255,94,91,0.35)",
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 80, // MUCH BIGGER - 48 → 80
                color: "#FDF6E3",
                letterSpacing: "-0.02em",
              }}
            >
              AgenticDojo
            </div>
          </div>

          {/* "Master agentic coding. The skill of decade." - MUCH LARGER */}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 48, // MUCH BIGGER - 28 → 48
                fontStyle: "italic",
                color: "rgba(253,246,227,0.7)",
                marginBottom: 12,
              }}
            >
              Master agentic coding.
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 28, // MUCH BIGGER - 16 → 28
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#FF5E5B",
              }}
            >
              The skill of the decade
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button - MUCH LARGER */}
      <div
        style={{
          position: "absolute",
          bottom: 200, // MOVED UP FOR LARGER FOOTER
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            position: "relative",
            opacity: ctaSpring,
            transform: `scale(${(0.9 + ctaSpring * 0.1) * ctaPulse})`,
          }}
        >
          {/* Glow effect - LARGER */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: `rgba(255,94,91,${glowIntensity})`,
              borderRadius: 20,
              filter: "blur(25px)", // STRONGER - 20 → 25
            }}
          />

          <div
            style={{
              position: "relative",
              background: "#FF5E5B",
              padding: "35px 80px", // MUCH LARGER - 25px 60px → 35px 80px
              borderRadius: 16, // LARGER RADIUS - 14 → 16
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 48, // MUCH BIGGER - 28 → 48
                color: "#FDF6E3",
              }}
            >
              Build whatever you want
            </div>
            <div style={{ fontSize: 40, color: "#FDF6E3" }}>→</div> {/* MUCH BIGGER - 24 → 40 */}
          </div>
        </div>
      </div>

      {/* Bottom bar - MUCH LARGER */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180, // MUCH TALLER - 120 → 180
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 48, // MUCH BIGGER - 32 → 48
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
