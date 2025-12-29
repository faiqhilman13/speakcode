import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Before/After Scene: Visual transformation comparison
 * Layout: Full bleed split screen with generated illustration
 */

export const BeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Image reveal animation
  const showImage = frame >= 15;
  const imageScale = showImage ? spring({ frame: frame - 15, fps, config: { damping: 12 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 15, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Text overlays
  const showBefore = frame >= 40;
  const showAfter = frame >= 80;
  const showStats = frame >= 120;

  const beforeX = showBefore ? spring({ frame: frame - 40, fps, config: { damping: 18 } }) * 30 : 0;
  const afterX = showAfter ? spring({ frame: frame - 80, fps, config: { damping: 18 } }) * 30 : 0;
  const statsY = showStats ? spring({ frame: frame - 120, fps, config: { damping: 15 } }) * 30 : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a", opacity: fadeIn }}>
      {/* Full-screen generated illustration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: imageOpacity,
          transform: `scale(${0.95 + imageScale * 0.05})`,
        }}
      >
        <Img
          src={staticFile("before-after-coding.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Left label - "Before" */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          opacity: showBefore ? 1 : 0,
          transform: `translateX(${30 - beforeX}px)`,
          background: "rgba(0,0,0,0.6)",
          padding: "30px 40px",
          borderRadius: 12,
          borderLeft: "4px solid #FF5E5B",
        }}
      >
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 18,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
        }}>
          Before
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 72,
          color: "#FF5E5B",
          fontStyle: "italic",
          marginTop: 8,
        }}>
          The old way
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 56,
          fontWeight: 700,
          color: "#FF5E5B",
          marginTop: 20,
        }}>
          2+ years
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 20,
          color: "rgba(253,246,227,0.6)",
          marginTop: 12,
        }}>
          of tutorials, bootcamps, frustration
        </div>
      </div>

      {/* Right label - "After" */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 60,
          textAlign: "right",
          opacity: showAfter ? 1 : 0,
          transform: `translateX(${-(30 - afterX)}px)`,
          background: "rgba(0,0,0,0.6)",
          padding: "30px 40px",
          borderRadius: 12,
          borderRight: "4px solid #00CA4E",
        }}
      >
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 18,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
        }}>
          After
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 72,
          color: "#00CA4E",
          fontStyle: "italic",
          marginTop: 8,
        }}>
          The new way
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 56,
          fontWeight: 700,
          color: "#00CA4E",
          marginTop: 20,
        }}>
          2 weeks
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 20,
          color: "rgba(253,246,227,0.6)",
          marginTop: 12,
        }}>
          with AI as your coding partner
        </div>
      </div>

      {/* Center transformation panel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: showAfter ? interpolate(frame - 90, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        {/* Main transformation message */}
        <div
          style={{
            background: "rgba(0,0,0,0.85)",
            padding: "40px 60px",
            borderRadius: 16,
            border: "2px solid rgba(255,94,91,0.5)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 16,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FF5E5B",
              marginBottom: 12,
            }}
          >
            The Transformation
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 56,
              color: "#FDF6E3",
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <span style={{ color: "rgba(253,246,227,0.5)" }}>Years</span>
            <span style={{ fontSize: 44, color: "#FF5E5B" }}>→</span>
            <span style={{ color: "#00CA4E" }}>Weeks</span>
          </div>
        </div>

        {/* Sub message */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "rgba(253,246,227,0.7)",
          }}
        >
          AI-powered development changes everything
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "rgba(0,0,0,0.95)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 100,
          opacity: showStats ? 1 : 0,
          transform: `translateY(${30 - statsY}px)`,
        }}
      >
        {[
          { label: "Time saved", value: "95%" },
          { label: "Learning curve", value: "Minimal" },
          { label: "Frustration", value: "Zero" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 22, color: "rgba(253,246,227,0.6)" }}>
              {stat.label}:
            </span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 34, color: "#00CA4E", fontWeight: 600 }}>
              {stat.value}
            </span>
            {i < 2 && <div style={{ width: 2, height: 40, background: "rgba(253,246,227,0.2)", marginLeft: 60 }} />}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
