import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Capabilities Scene: Cascading showcase of what you can build
 *
 * DESIGN: Magazine editorial layout with overlapping cards
 * - Diagonal grid with staggered cascade reveal
 * - Cards with parallax depth and dramatic shadows
 * - Text labels that slide in from different directions
 * - Bold category typography in the background
 */

const capabilities = [
  { label: "Landing Pages", image: "landing-page-result.png", x: 60, y: 100, rotation: -2, size: 480 },
  { label: "Dashboards", image: "analytics-dashboard-result.png", x: 580, y: 120, rotation: 1.5, size: 520 },
  { label: "Video Editors", image: "video-editor-result.png", x: 1150, y: 90, rotation: -1.5, size: 460 },
  { label: "Pitch Decks", image: "powerpoint-result.png", x: 280, y: 520, rotation: 2, size: 440 },
  { label: "Market Research", image: "research-report-result.png", x: 780, y: 480, rotation: -1, size: 480 },
  { label: "Automation", image: null, x: 1300, y: 520, rotation: 0, size: 0 },
];

export const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered card animations
  const getCardAnimation = (index: number) => {
    const startFrame = 15 + index * 20;
    const isVisible = frame >= startFrame;
    const cardSpring = isVisible
      ? spring({ frame: frame - startFrame, fps, config: { damping: 16, stiffness: 120 } })
      : 0;
    return { cardSpring, isVisible, startFrame };
  };

  // Floating label animation
  const getLabelAnimation = (index: number) => {
    const startFrame = 35 + index * 20;
    const isVisible = frame >= startFrame;
    const labelSpring = isVisible
      ? spring({ frame: frame - startFrame, fps, config: { damping: 18, stiffness: 160 } })
      : 0;
    return { labelSpring, isVisible };
  };

  // Background text reveal
  const showBgText = frame >= 5;
  const bgTextOpacity = showBgText ? interpolate(frame - 5, [0, 30], [0, 0.03], { extrapolateRight: "clamp" }) : 0;

  // Header animations
  const showHeader = frame >= 5;
  const headerSpring = showHeader ? spring({ frame: frame - 5, fps, config: { damping: 15 } }) : 0;

  // Final tagline
  const showTagline = frame >= 140;
  const taglineOpacity = showTagline ? interpolate(frame - 140, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Parallax based on frame
  const parallaxOffset = frame * 0.15;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", overflow: "hidden" }}>
      {/* Large background typography */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-8deg)",
          fontFamily: "Georgia, serif",
          fontSize: 350,
          fontWeight: 400,
          fontStyle: "italic",
          color: "#FDF6E3",
          opacity: bgTextOpacity,
          whiteSpace: "nowrap",
          letterSpacing: "-0.03em",
        }}
      >
        BUILD
      </div>

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(rgba(253,246,227,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(253,246,227,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
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
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 25,
            opacity: headerSpring,
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
            What You'll Build
          </div>
          <div
            style={{
              width: 80,
              height: 3,
              background: "#FF5E5B",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 24,
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: headerSpring,
          }}
        >
          Whatever you can imagine
        </div>
      </div>

      {/* Cascading cards */}
      {capabilities.map((cap, index) => {
        const { cardSpring, startFrame } = getCardAnimation(index);
        const { labelSpring } = getLabelAnimation(index);

        // Subtle floating animation
        const floatOffset = Math.sin((frame - startFrame) * 0.05) * 3;

        // Handle the "Automation" text-only item
        if (!cap.image) {
          return (
            <div
              key={cap.label}
              style={{
                position: "absolute",
                left: cap.x,
                top: cap.y + floatOffset,
                opacity: cardSpring,
                transform: `translateX(${(1 - cardSpring) * 50}px)`,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 80,
                  fontStyle: "italic",
                  color: "#FDF6E3",
                  lineHeight: 1,
                }}
              >
                Automation
              </div>
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 18,
                  color: "rgba(253,246,227,0.5)",
                  marginTop: 15,
                  letterSpacing: "0.1em",
                }}
              >
                + Everything else
              </div>
            </div>
          );
        }

        return (
          <div
            key={cap.label}
            style={{
              position: "absolute",
              left: cap.x,
              top: cap.y + floatOffset + parallaxOffset * (index % 2 === 0 ? 1 : -1),
              transform: `rotate(${cap.rotation}deg) scale(${0.7 + cardSpring * 0.3})`,
              opacity: cardSpring,
              zIndex: 10 + index,
            }}
          >
            {/* Card container */}
            <div
              style={{
                width: cap.size,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: `
                  0 30px 60px rgba(0,0,0,0.4),
                  0 10px 20px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(255,255,255,0.05)
                `,
                background: "#2a2a2a",
              }}
            >
              <Img
                src={staticFile(cap.image)}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              {/* Gradient overlay at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 100,
                  background: "linear-gradient(transparent, rgba(26,26,26,0.95))",
                }}
              />
            </div>

            {/* Floating label */}
            <div
              style={{
                position: "absolute",
                bottom: -35,
                left: 15,
                background: "#FF5E5B",
                padding: "12px 24px",
                borderRadius: 6,
                opacity: labelSpring,
                transform: `translateY(${(1 - labelSpring) * 20}px)`,
                boxShadow: "0 8px 25px rgba(255,94,91,0.4)",
              }}
            >
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#FDF6E3",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {cap.label}
              </div>
            </div>
          </div>
        );
      })}

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
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "#FDF6E3",
            opacity: taglineOpacity,
          }}
        >
          Whatever you can imagine.
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 30,
          width: 60,
          height: 60,
          borderLeft: "3px solid rgba(253,246,227,0.15)",
          borderBottom: "3px solid rgba(253,246,227,0.15)",
          opacity: showTagline ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
