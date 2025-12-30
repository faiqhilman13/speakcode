import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile, random } from "remotion";

/*
 * Glass Before/After Scene: Visual transformation with frosted glass split
 * Style: Split screen with glass panels, gradient accents, floating elements
 */

// Floating decorative elements
const floatingElements = Array.from({ length: 20 }, (_, i) => ({
  x: random(`ba-x-${i}`) * 1920,
  y: random(`ba-y-${i}`) * 1080,
  size: 4 + random(`ba-size-${i}`) * 10,
  speed: 0.3 + random(`ba-speed-${i}`) * 0.5,
  hue: random(`ba-hue-${i}`) * 60 + 260,
}));

export const GlassBeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Image reveal
  const showImage = frame >= 10;
  const imageScale = showImage ? spring({ frame: frame - 10, fps, config: { damping: 14 } }) : 0;
  const imageOpacity = showImage ? interpolate(frame - 10, [0, 20], [0, 1], { extrapolateRight: "clamp" }) : 0;

  // Glass panels reveal
  const showBefore = frame >= 35;
  const showAfter = frame >= 75;
  const showCenter = frame >= 100;
  const showStats = frame >= 120;

  const beforeX = showBefore ? spring({ frame: frame - 35, fps, config: { damping: 16 } }) * 40 : 0;
  const afterX = showAfter ? spring({ frame: frame - 75, fps, config: { damping: 16 } }) * 40 : 0;
  const centerScale = showCenter ? spring({ frame: frame - 100, fps, config: { damping: 12 } }) : 0;
  const statsY = showStats ? spring({ frame: frame - 120, fps, config: { damping: 15 } }) * 30 : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a15 0%, #12101f 50%, #0a0a15 100%)",
        opacity: fadeIn,
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.15)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "rgba(16, 185, 129, 0.12)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating particles */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: el.x,
            top: ((frame * el.speed * 0.4) + el.y) % 1200 - 60,
            width: el.size,
            height: el.size,
            borderRadius: "50%",
            background: `hsla(${el.hue}, 70%, 60%, 0.3)`,
            filter: "blur(2px)",
          }}
        />
      ))}

      {/* Full-screen image with glass overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
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

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg, rgba(10,10,20,0.8) 0%, rgba(10,10,20,0.4) 50%, rgba(10,10,20,0.8) 100%)",
        }}
      />

      {/* Left glass panel - Before */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 50,
          width: 400,
          opacity: showBefore ? 1 : 0,
          transform: `translateX(${40 - beforeX}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 24,
            padding: "30px 35px",
            border: "1px solid rgba(236, 72, 153, 0.2)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: 12,
            }}
          >
            Before
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 52,
              fontWeight: 300,
              background: "linear-gradient(135deg, #EC4899, #F472B6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 15,
            }}
          >
            The old way
          </div>
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 44,
              fontWeight: 600,
              color: "rgba(236, 72, 153, 0.9)",
              marginBottom: 12,
            }}
          >
            2+ years
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 18,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            of tutorials, bootcamps, frustration
          </div>
        </div>
      </div>

      {/* Right glass panel - After */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 50,
          width: 400,
          opacity: showAfter ? 1 : 0,
          transform: `translateX(${-(40 - afterX)}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 24,
            padding: "30px 35px",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: 12,
            }}
          >
            After
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 52,
              fontWeight: 300,
              background: "linear-gradient(135deg, #10B981, #34D399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 15,
            }}
          >
            The new way
          </div>
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 44,
              fontWeight: 600,
              color: "rgba(16, 185, 129, 0.9)",
              marginBottom: 12,
            }}
          >
            2 weeks
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 18,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            with AI as your coding partner
          </div>
        </div>
      </div>

      {/* Center transformation panel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${0.9 + centerScale * 0.1})`,
          opacity: showCenter ? interpolate(frame - 100, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: 30,
            padding: "40px 60px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.4)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 20,
            }}
          >
            The Transformation
          </div>
          <div
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 48,
              color: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>Years</span>
            <span
              style={{
                fontSize: 36,
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              -&gt;
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Weeks
            </span>
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
          height: 100,
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 80,
          opacity: showStats ? 1 : 0,
          transform: `translateY(${30 - statsY}px)`,
        }}
      >
        {[
          { label: "Time saved", value: "95%", color: "#10B981" },
          { label: "Learning curve", value: "Minimal", color: "#8B5CF6" },
          { label: "Frustration", value: "Zero", color: "#EC4899" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <span
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              {stat.label}:
            </span>
            <span
              style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 28,
                fontWeight: 600,
                color: stat.color,
              }}
            >
              {stat.value}
            </span>
            {i < 2 && (
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: "rgba(255, 255, 255, 0.15)",
                  marginLeft: 50,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
