import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Before/After Scene: Visual transformation comparison
 * Style: Clean split screen, geometric contrast
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

export const MinimalistBeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Split line animation
  const splitLineHeight = interpolate(frame, [10, 30], [0, 100], { extrapolateRight: "clamp" });

  // Before/After labels
  const showBefore = frame >= 25;
  const showAfter = frame >= 60;
  const showStats = frame >= 100;

  const beforeY = showBefore ? spring({ frame: frame - 25, fps, config: { damping: 20 } }) * 30 : 0;
  const afterY = showAfter ? spring({ frame: frame - 60, fps, config: { damping: 20 } }) * 30 : 0;

  // Transformation arrow
  const showArrow = frame >= 85;
  const arrowScale = showArrow ? spring({ frame: frame - 85, fps, config: { damping: 12 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity: fadeIn }}>
      {/* Left half - Before (darker) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        {/* Chaotic geometric shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            overflow: "hidden",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 960 1080">
            <rect x="100" y="200" width="80" height="80" fill="#FFFFFF" transform="rotate(15, 140, 240)" />
            <rect x="300" y="400" width="60" height="60" fill="#FFFFFF" transform="rotate(-20, 330, 430)" />
            <rect x="200" y="600" width="100" height="100" fill="#FFFFFF" transform="rotate(35, 250, 650)" />
            <rect x="400" y="300" width="70" height="70" fill="#FFFFFF" transform="rotate(-45, 435, 335)" />
            <rect x="150" y="800" width="50" height="50" fill="#FFFFFF" transform="rotate(25, 175, 825)" />
          </svg>
        </div>

        {/* Before content */}
        <div
          style={{
            opacity: showBefore ? 1 : 0,
            transform: `translateY(${30 - beforeY}px)`,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Before
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 300,
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            The old way
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            2+ years
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              marginTop: 16,
            }}
          >
            tutorials, bootcamps, frustration
          </div>
        </div>
      </div>

      {/* Right half - After (light with blue) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        {/* Aligned geometric shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            overflow: "hidden",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 960 1080">
            <rect x="100" y="200" width="80" height="80" fill="#0066FF" />
            <rect x="200" y="200" width="80" height="80" fill="#0066FF" />
            <rect x="300" y="200" width="80" height="80" fill="#0066FF" />
            <rect x="100" y="300" width="80" height="80" fill="#0066FF" />
            <rect x="200" y="300" width="80" height="80" fill="#0066FF" />
          </svg>
        </div>

        {/* After content */}
        <div
          style={{
            opacity: showAfter ? 1 : 0,
            transform: `translateY(${30 - afterY}px)`,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#0066FF",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            After
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 300,
              color: "#0A0A0A",
              marginBottom: 16,
            }}
          >
            The new way
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 600,
              color: "#0066FF",
            }}
          >
            2 weeks
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "rgba(10,10,10,0.5)",
              marginTop: 16,
            }}
          >
            with AI as your coding partner
          </div>
        </div>
      </div>

      {/* Center divider line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${50 - splitLineHeight / 2}%`,
          width: 2,
          height: `${splitLineHeight}%`,
          background: "#0066FF",
          transform: "translateX(-50%)",
        }}
      />

      {/* Center transformation indicator */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${0.8 + arrowScale * 0.2})`,
          opacity: showArrow ? 1 : 0,
          background: "#0066FF",
          width: 80,
          height: 80,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M15 10 L30 20 L15 30"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "#0A0A0A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 100,
          opacity: showStats ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        {[
          { label: "Time saved", value: "95%" },
          { label: "Learning curve", value: "Minimal" },
          { label: "Frustration", value: "Zero" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: "#0066FF",
              }}
            >
              {stat.value}
            </span>
            {i < 2 && (
              <div
                style={{
                  width: 1,
                  height: 30,
                  background: "rgba(255,255,255,0.15)",
                  marginLeft: 60,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
