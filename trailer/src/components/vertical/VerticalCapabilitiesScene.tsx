import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Vertical Capabilities Scene: MAXIMIZED TO FILL VIEWPORT
 * All components significantly enlarged to use full viewport
 */

const capabilities = [
  { label: "Landing Pages", image: "landing-page-result.png" },
  { label: "Dashboards", image: "analytics-dashboard-result.png" },
  { label: "Video Editors", image: "video-editor-result.png" },
  { label: "Pitch Decks", image: "powerpoint-result.png" },
  { label: "Market Research", image: "research-report-result.png" },
  { label: "Automation", image: null },
];

export const VerticalCapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered card animations - FASTER for more items
  const getCardAnimation = (index: number) => {
    const startFrame = 8 + index * 12;
    const isVisible = frame >= startFrame;
    const cardSpring = isVisible
      ? spring({ frame: frame - startFrame, fps, config: { damping: 16, stiffness: 100 } })
      : 0;
    return { cardSpring, isVisible, startFrame };
  };

  // Background text reveal
  const showBgText = frame >= 5;
  const bgTextOpacity = showBgText ? interpolate(frame - 5, [0, 30], [0, 0.03], { extrapolateRight: "clamp" }) : 0;

  // Header animations
  const showHeader = frame >= 5;
  const headerSpring = showHeader ? spring({ frame: frame - 5, fps, config: { damping: 15 } }) : 0;

  // Floating offset - REDUCED
  const parallaxOffset = frame * 0.08;

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
          fontSize: 250,
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
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top header bar - GREATLY ENLARGED */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120, // MUCH TALLER - 70 → 120
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
            gap: 30,
            opacity: headerSpring,
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
            What You'll Build
          </div>
          <div
            style={{
              width: 100, // WIDER - 60 → 100
              height: 4, // THICKER - 3 → 4
              background: "#FF5E5B",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 32, // MUCH BIGGER - 20 → 32
            fontStyle: "italic",
            color: "#FF5E5B",
            opacity: headerSpring,
          }}
        >
          Whatever you can imagine
        </div>
      </div>

      {/* Content - MOVED DOWN BY 80px (90 → 170) */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          padding: "0 30px",
          overflow: "hidden",
        }}
      >
        {capabilities.map((cap, index) => {
          const { cardSpring, startFrame } = getCardAnimation(index);
          const floatOffset = Math.sin((frame - startFrame) * 0.05) * 2;

          // Handle text-only "Automation" - MUCH BIGGER
          if (!cap.image) {
            return (
              <div
                key={cap.label}
                style={{
                  width: "100%",
                  maxWidth: 800,
                  opacity: cardSpring,
                  transform: `translateY(${(1 - cardSpring) * 30}px) scale(${0.9 + cardSpring * 0.1})`,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 72,
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
                    fontSize: 20,
                    color: "rgba(253,246,227,0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  + Everything else
                </div>
              </div>
            );
          }

          // Image cards - MUCH BIGGER TO FILL VIEWPORT
          return (
            <div
              key={cap.label}
              style={{
                width: "100%",
                maxWidth: 900,
                opacity: cardSpring,
                transform: `translateY(${(1 - cardSpring) * 30}px) translateY(${floatOffset}px) scale(${0.9 + cardSpring * 0.1})`,
              }}
            >
              {/* Card container - MUCH BIGGER */}
              <div
                style={{
                  width: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
                  background: "#2a2a2a",
                  position: "relative",
                }}
              >
                <Img
                  src={staticFile(cap.image)}
                  style={{
                    width: "100%",
                    height: 240,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Bigger label overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 28px",
                    background: "linear-gradient(transparent, rgba(26,26,26,0.98))",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 36,
                      fontWeight: 400,
                      color: "#FDF6E3",
                    }}
                  >
                    {cap.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar - GREATLY ENLARGED */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90, // MUCH TALLER - 50 → 90
          background: "#FF5E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 24, // MUCH BIGGER - 15 → 24
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FDF6E3",
          }}
        >
          Whatever you need
        </div>
      </div>
    </AbsoluteFill>
  );
};
