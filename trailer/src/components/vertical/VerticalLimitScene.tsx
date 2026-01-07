import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Vertical Limit Scene: Mobile adaptation
 *
 * LITERAL mobile adaptation of LimitScene:
 * - Same content and animations
 * - Stacked vertical layout for mobile
 * - Larger fonts for readability
 * - 9:16 portrait format
 */

export const VerticalLimitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation phases
  const showIntro = frame >= 8;
  const showQuestion = frame >= 25;
  const showLine = frame >= 55;
  const showYes = frame >= 75;
  const showBuildIt = frame >= 95;
  const showCategories = frame >= 120;

  // Springs
  const introSpring = showIntro ? spring({ frame: frame - 8, fps, config: { damping: 18 } }) : 0;
  const questionSpring = showQuestion ? spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 100 } }) : 0;
  const yesSpring = showYes ? spring({ frame: frame - 75, fps, config: { damping: 12, stiffness: 80 } }) : 0;
  const buildItSpring = showBuildIt ? spring({ frame: frame - 95, fps, config: { damping: 10, stiffness: 100 } }) : 0;

  // Animated line progress
  const lineProgress = showLine ? interpolate(frame - 55, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Pulsing glow for checkmark
  const pulseIntensity = showYes ? 0.3 + Math.sin((frame - 75) * 0.15) * 0.15 : 0;

  // Categories stagger
  const categories = ["APIs", "Databases", "Documents", "Web", "Files", "Code"];
  const getCategoryOpacity = (index: number) => {
    const startFrame = 125 + index * 8;
    return frame >= startFrame ? interpolate(frame - startFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;
  };

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", overflow: "hidden" }}>
      {/* Radial gradient backdrop */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1400,
          height: 1400,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,94,91,0.08) 0%, transparent 60%)",
          opacity: questionSpring,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `
            linear-gradient(rgba(253,246,227,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253,246,227,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative corner brackets */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          width: 100,
          height: 100,
          borderLeft: "4px solid rgba(255,94,91,0.3)",
          borderTop: "4px solid rgba(255,94,91,0.3)",
          opacity: introSpring,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 40,
          width: 100,
          height: 100,
          borderRight: "4px solid rgba(255,94,91,0.3)",
          borderBottom: "4px solid rgba(255,94,91,0.3)",
          opacity: introSpring,
        }}
      />

      {/* Main content - stacked vertically (mobile) - NO BOTTOM MARGIN SINCE FOOTER REMOVED */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0, // FULL HEIGHT - FOOTER REMOVED
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 50px",
        }}
      >
        {/* Intro text */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 18,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.4)",
            marginBottom: 30,
            opacity: introSpring,
            transform: `translateY(${(1 - introSpring) * 15}px)`,
          }}
        >
          The Framework
        </div>

        {/* "The only limit:" */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 42,
            color: "rgba(253,246,227,0.7)",
            marginBottom: 40,
            opacity: introSpring,
            transform: `translateY(${(1 - introSpring) * 20}px)`,
          }}
        >
          The only limit:
        </div>

        {/* Main question box */}
        <div
          style={{
            position: "relative",
            background: "rgba(253,246,227,0.03)",
            border: "2px solid rgba(253,246,227,0.15)",
            borderRadius: 20,
            padding: "40px 60px",
            opacity: questionSpring,
            transform: `scale(${0.9 + questionSpring * 0.1})`,
          }}
        >
          {/* Question mark decoration */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -30,
              fontFamily: "Georgia, serif",
              fontSize: 150,
              color: "rgba(255,94,91,0.08)",
              lineHeight: 1,
            }}
          >
            ?
          </div>

          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 58,
              fontStyle: "italic",
              color: "#FDF6E3",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            Can an AI agent <span style={{ color: "#FF5E5B" }}>access</span> it?
          </div>
        </div>

        {/* Animated connecting line */}
        <div
          style={{
            width: 4,
            height: 80 * lineProgress,
            background: `linear-gradient(180deg, rgba(255,94,91,0.3) 0%, #FF5E5B 100%)`,
            margin: "20px 0",
            borderRadius: 2,
          }}
        />

        {/* Arrow head */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "16px solid #FF5E5B",
            opacity: lineProgress > 0.9 ? 1 : 0,
            marginTop: -2,
          }}
        />

        {/* Answer section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            margin: "20px 0",
            opacity: yesSpring,
            transform: `translateY(${(1 - yesSpring) * 30}px)`,
          }}
        >
          {/* Glowing YES checkmark */}
          <div
            style={{
              position: "relative",
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                inset: -15,
                background: `rgba(0,202,78,${pulseIntensity})`,
                borderRadius: "50%",
                filter: "blur(20px)",
              }}
            />
            <div
              style={{
                width: 80,
                height: 80,
                background: "#00CA4E",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                color: "#FDF6E3",
                fontWeight: 600,
                position: "relative",
                boxShadow: "0 10px 40px rgba(0,202,78,0.4)",
              }}
            >
              ✓
            </div>
          </div>

          {/* "If yes..." text */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 36,
              color: "rgba(253,246,227,0.6)",
            }}
          >
            If yes...
          </div>
        </div>

        {/* "You can BUILD IT." */}
        <div
          style={{
            margin: "40px 0",
            opacity: buildItSpring,
            transform: `scale(${0.85 + buildItSpring * 0.15})`,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 90,
              fontWeight: 400,
              color: "#FDF6E3",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            You can{" "}
            <span
              style={{
                color: "#FF5E5B",
                fontStyle: "italic",
                textShadow: "0 10px 40px rgba(255,94,91,0.3)",
              }}
            >
              build it.
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER REMOVED - Categories bar deleted */}
    </AbsoluteFill>
  );
};
