import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Hook Scene: "What if you could build anything?"
 *
 * DESIGN: Oversized kinetic typography with dramatic reveals
 * - Split composition: question on left, "ANYTHING" dominates right
 * - Staggered word-by-word animation
 * - Bold geometric accents that animate in
 * - Editorial magazine cover aesthetic
 */

export const BuildAnythingHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered timing for word reveals - compressed to 2 seconds (60 frames)
  const showWhat = frame >= 2;
  const showIf = frame >= 5;
  const showYou = frame >= 8;
  const showCould = frame >= 11;
  const showBuild = frame >= 18;
  const showAnything = frame >= 28;
  const showFinalAnything = frame >= 40;
  const showAccents = frame >= 45;

  // Spring configs for snappy animations
  const wordSpring = (startFrame: number) =>
    frame >= startFrame ? spring({ frame: frame - startFrame, fps, config: { damping: 18, stiffness: 350 } }) : 0;

  const buildSpring = wordSpring(18);
  const anythingSpring = wordSpring(28);
  const finalAnythingSpring = wordSpring(40);

  // Geometric accent animations
  const verticalBarHeight = showAccents
    ? interpolate(frame - 45, [0, 10], [0, 600], { extrapolateRight: "clamp" })
    : 0;
  const horizontalBarWidth = showAccents
    ? interpolate(frame - 47, [0, 8], [0, 400], { extrapolateRight: "clamp" })
    : 0;

  // Background pattern subtle animation
  const patternOffset = frame * 0.3;

  return (
    <AbsoluteFill style={{ background: "#FDF6E3", overflow: "hidden" }}>
      {/* Animated diagonal lines background pattern */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          opacity: 0.015,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #1a1a1a 0px,
            #1a1a1a 2px,
            transparent 2px,
            transparent 80px
          )`,
          transform: `translateX(${patternOffset}px)`,
        }}
      />

      {/* Large decorative "?" bleeding off top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          fontSize: 900,
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          color: "rgba(26,26,26,0.025)",
          lineHeight: 0.75,
          opacity: showAnything ? 1 : 0,
          transform: `scale(${0.9 + anythingSpring * 0.1})`,
        }}
      >
        ?
      </div>

      {/* Top header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: showWhat ? 1 : 0,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#FF5E5B",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 16,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(253,246,227,0.6)",
            }}
          >
            AgenticDojo
          </div>
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: showWhat ? 1 : 0,
          }}
        >
          The skill of building anything
        </div>
      </div>

      {/* Vertical accent bar - left side */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 140,
          width: 6,
          height: verticalBarHeight,
          background: "#FF5E5B",
        }}
      />

      {/* Main content - asymmetric split */}
      <div
        style={{
          display: "flex",
          height: "100%",
          paddingTop: 90,
        }}
      >
        {/* Left side - Question words */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 90,
            paddingRight: 40,
          }}
        >
          {/* "What if you could" - stacked words */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { text: "What", show: showWhat, delay: 2 },
              { text: "if", show: showIf, delay: 5 },
              { text: "you", show: showYou, delay: 8 },
              { text: "could", show: showCould, delay: 11 },
            ].map((word, i) => (
              <div
                key={word.text}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: i === 3 ? 88 : 72,
                  fontWeight: 400,
                  color: "#1a1a1a",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  opacity: word.show ? interpolate(frame - word.delay, [0, 4], [0, 1], { extrapolateRight: "clamp" }) : 0,
                  transform: `translateX(${word.show ? (1 - wordSpring(word.delay)) * -30 : -30}px)`,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* "build" with emphasis */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 120,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#FF5E5B",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginTop: 25,
              opacity: showBuild ? 1 : 0,
              transform: `translateX(${(1 - buildSpring) * -40}px)`,
            }}
          >
            build
          </div>

          {/* Horizontal accent bar */}
          <div
            style={{
              width: horizontalBarWidth,
              height: 5,
              background: "#1a1a1a",
              marginTop: 35,
              marginLeft: 5,
            }}
          />
        </div>

        {/* Right side - Giant "ANYTHING" */}
        <div
          style={{
            flex: 1.1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* "anything?" first appearance */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 140,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#1a1a1a",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              opacity: showAnything && !showFinalAnything
                ? interpolate(frame - 28, [0, 5, 8, 12], [0, 1, 1, 0], { extrapolateRight: "clamp" })
                : 0,
              transform: `translateY(${showAnything ? 0 : 40}px) scale(${0.95 + anythingSpring * 0.05})`,
            }}
          >
            anything?
          </div>

          {/* Final "Anything." - bigger, bolder */}
          <div
            style={{
              position: "absolute",
              right: -40,
              opacity: showFinalAnything ? 1 : 0,
              transform: `scale(${0.85 + finalAnythingSpring * 0.15})`,
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 200,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#FF5E5B",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                textShadow: "0 20px 60px rgba(255,94,91,0.2)",
              }}
            >
              Anything.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 60px",
          opacity: showAccents ? 1 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.15em",
              color: "rgba(253,246,227,0.4)",
              textTransform: "uppercase",
            }}
          >
            Master agentic coding
          </div>
          <div style={{ width: 40, height: 2, background: "#FF5E5B" }} />
        </div>
      </div>

      {/* Floating corner accent - top right */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 40,
          width: 80,
          height: 80,
          borderRight: "4px solid rgba(255,94,91,0.25)",
          borderTop: "4px solid rgba(255,94,91,0.25)",
          opacity: showAccents ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
