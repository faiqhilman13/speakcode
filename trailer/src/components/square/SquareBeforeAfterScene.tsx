import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Square Before/After Scene: Visual transformation - stacked layout
 */

export const SquareBeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const showImage = frame >= 15;
  const imageScale = showImage ? spring({ frame: frame - 15, fps, config: { damping: 12 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 15, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  const showBefore = frame >= 40;
  const showAfter = frame >= 80;
  const showTransform = frame >= 100;

  const beforeY = showBefore ? spring({ frame: frame - 40, fps, config: { damping: 18 } }) * 20 : 0;
  const afterY = showAfter ? spring({ frame: frame - 80, fps, config: { damping: 18 } }) * 20 : 0;

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

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Before panel - top */}
      <div
        style={{
          position: "absolute",
          top: 25,
          left: 25,
          right: 25,
          opacity: showBefore ? 1 : 0,
          transform: `translateY(${20 - beforeY}px)`,
          background: "rgba(0,0,0,0.8)",
          padding: "25px 30px",
          borderRadius: 14,
          borderLeft: "5px solid #FF5E5B",
        }}
      >
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 14,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
        }}>
          Before
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 48,
          color: "#FF5E5B",
          fontStyle: "italic",
          marginTop: 5,
        }}>
          The old way
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 42,
          fontWeight: 700,
          color: "#FF5E5B",
          marginTop: 10,
        }}>
          2+ years
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 18,
          color: "rgba(253,246,227,0.6)",
          marginTop: 8,
        }}>
          of tutorials, bootcamps, frustration
        </div>
      </div>

      {/* After panel - bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 25,
          right: 25,
          opacity: showAfter ? 1 : 0,
          transform: `translateY(${-(20 - afterY)}px)`,
          background: "rgba(0,0,0,0.8)",
          padding: "25px 30px",
          borderRadius: 14,
          borderRight: "5px solid #00CA4E",
          textAlign: "right",
        }}
      >
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 14,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(253,246,227,0.7)",
        }}>
          After
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 48,
          color: "#00CA4E",
          fontStyle: "italic",
          marginTop: 5,
        }}>
          The new way
        </div>
        <div style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: 42,
          fontWeight: 700,
          color: "#00CA4E",
          marginTop: 10,
        }}>
          2 weeks
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: 18,
          color: "rgba(253,246,227,0.6)",
          marginTop: 8,
        }}>
          with AI as your coding partner
        </div>
      </div>

      {/* Center transformation badge */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          opacity: showTransform ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.95)",
            padding: "30px 45px",
            borderRadius: 16,
            border: "3px solid rgba(255,94,91,0.6)",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
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
              fontSize: 48,
              color: "#FDF6E3",
              display: "flex",
              alignItems: "center",
              gap: 25,
              justifyContent: "center",
            }}
          >
            <span style={{ color: "rgba(253,246,227,0.5)" }}>Years</span>
            <span style={{ fontSize: 36, color: "#FF5E5B" }}>→</span>
            <span style={{ color: "#00CA4E" }}>Weeks</span>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "rgba(0,0,0,0.95)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          opacity: frame >= 120 ? interpolate(frame - 120, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        {[
          { label: "Time saved", value: "95%" },
          { label: "Frustration", value: "Zero" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 16, color: "rgba(253,246,227,0.6)" }}>
              {stat.label}:
            </span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "#00CA4E", fontWeight: 600 }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
