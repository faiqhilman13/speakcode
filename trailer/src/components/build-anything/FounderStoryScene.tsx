import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Founder Story Scene: Personal journey + philosophical insight
 *
 * DESIGN: Editorial magazine spread with dramatic transitions
 * - Phase 1: Credentials with large image and overlay
 * - Phase 2: The insight - typographic focus with pull quote styling
 * - Large quotation marks as decorative elements
 * - Smooth phase transition with cross-fade
 */

export const FounderStoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing (450 frames total)
  const phase1End = 200;
  const phase1Active = frame < phase1End;
  const phase2Active = frame >= phase1End - 30;

  // Phase 1 animations
  const phase1Opacity = phase1Active
    ? interpolate(frame, [0, 20, phase1End - 30, phase1End], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  const imageSpring = frame >= 10 ? spring({ frame: frame - 10, fps, config: { damping: 18 } }) : 0;
  const credentialsSpring = frame >= 30 ? spring({ frame: frame - 30, fps, config: { damping: 15 } }) : 0;

  // Phase 2 animations
  const phase2Opacity = phase2Active
    ? interpolate(frame - (phase1End - 30), [0, 40], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const realThingSpring = frame >= phase1End + 10
    ? spring({ frame: frame - phase1End - 10, fps, config: { damping: 16 } })
    : 0;
  const insightSpring = frame >= phase1End + 40
    ? spring({ frame: frame - phase1End - 40, fps, config: { damping: 14 } })
    : 0;
  const becameSpring = frame >= phase1End + 80
    ? spring({ frame: frame - phase1End - 80, fps, config: { damping: 14 } })
    : 0;
  const superpowerSpring = frame >= phase1End + 140
    ? spring({ frame: frame - phase1End - 140, fps, config: { damping: 12, stiffness: 80 } })
    : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", overflow: "hidden" }}>
      {/* Phase 1: Credentials */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase1Opacity,
        }}
      >
        {/* Full-bleed image with overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imageSpring * 0.6,
            transform: `scale(${1 + imageSpring * 0.05})`,
          }}
        >
          <Img
            src={staticFile("founder-journey-warm.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              135deg,
              rgba(26,26,26,0.95) 0%,
              rgba(26,26,26,0.7) 50%,
              rgba(26,26,26,0.85) 100%
            )`,
          }}
        />

        {/* Top header bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "#FDF6E3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 60px",
            zIndex: 10,
            opacity: imageSpring,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.5)",
            }}
          >
            My Story
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 22,
              fontStyle: "italic",
              color: "#FF5E5B",
            }}
          >
            From zero to lead
          </div>
        </div>

        {/* Credentials content */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 80,
            transform: "translateY(-50%)",
            maxWidth: 900,
            opacity: credentialsSpring,
          }}
        >
          {/* Large quotation mark */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 300,
              color: "rgba(255,94,91,0.1)",
              lineHeight: 0.5,
              marginBottom: -80,
              marginLeft: -30,
            }}
          >
            "
          </div>

          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 48,
              color: "#FDF6E3",
              lineHeight: 1.3,
              position: "relative",
              zIndex: 1,
            }}
          >
            I used this approach to become{" "}
            <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>App Lead</span>
            <br />
            on a <span style={{ fontStyle: "italic" }}>100,000-line</span> enterprise platform.
            <br />
            <span style={{ fontSize: 40, opacity: 0.8 }}>Serving 30,000 users.</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 45,
            }}
          >
            {["No CS degree", "No background", "Just agentic coding"].map((text, i) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: credentialsSpring,
                }}
              >
                <div
                  style={{
                    width: i === 2 ? 8 : 6,
                    height: i === 2 ? 8 : 6,
                    background: i === 2 ? "#FF5E5B" : "rgba(253,246,227,0.4)",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: 18,
                    color: i === 2 ? "#FF5E5B" : "rgba(253,246,227,0.5)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical accent line */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 120,
            bottom: 80,
            width: 4,
            background: "#FF5E5B",
            opacity: credentialsSpring,
          }}
        />
      </div>

      {/* Phase 2: The Insight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase2Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
        }}
      >
        {/* Decorative background quote marks */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            fontFamily: "Georgia, serif",
            fontSize: 400,
            color: "rgba(253,246,227,0.02)",
            lineHeight: 0.7,
          }}
        >
          "
        </div>

        {/* "Here's the truth:" */}
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.4)",
            marginBottom: 50,
            opacity: realThingSpring,
            transform: `translateY(${(1 - realThingSpring) * 15}px)`,
          }}
        >
          Here's the truth
        </div>

        {/* First insight line */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 56,
            color: "#FDF6E3",
            textAlign: "center",
            marginBottom: 30,
            opacity: insightSpring,
            transform: `translateY(${(1 - insightSpring) * 25}px)`,
          }}
        >
          AI won't replace you.
        </div>

        {/* Second insight line */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#FDF6E3",
            textAlign: "center",
            lineHeight: 1.3,
            opacity: becameSpring,
            transform: `translateY(${(1 - becameSpring) * 25}px)`,
          }}
        >
          But someone who knows how to{" "}
          <span style={{ color: "#FF5E5B", fontStyle: "italic" }}>work with AI</span>
          <br />
          will.
        </div>

        {/* "That person could be you." */}
        <div
          style={{
            marginTop: 70,
            opacity: superpowerSpring,
            transform: `scale(${0.9 + superpowerSpring * 0.1})`,
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

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: superpowerSpring,
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
