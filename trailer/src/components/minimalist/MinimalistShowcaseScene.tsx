import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * Minimalist Showcase Scene: What you can build
 * Style: Clean geometric mockups, Swiss grid layout
 * Colors: White (#FFFFFF), Black (#0A0A0A), Electric blue (#0066FF)
 */

const projects = [
  { label: "Dashboards", width: 280, height: 180 },
  { label: "Web Apps", width: 320, height: 200 },
  { label: "Mobile Apps", width: 160, height: 280 },
  { label: "Videos", width: 300, height: 170 },
  { label: "APIs", width: 260, height: 160 },
];

export const MinimalistShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showHeader = frame >= 5;
  const headerOpacity = showHeader
    ? interpolate(frame - 5, [0, 12], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Subtle floating animation
  const float = Math.sin(frame * 0.04) * 4;

  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10,10,10,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
          fontSize: 280,
          fontWeight: 800,
          color: "rgba(10,10,10,0.03)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.05em",
        }}
      >
        BUILD
      </div>

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "#0A0A0A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: headerOpacity,
          }}
        >
          What You Can Build
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: "#0066FF",
            opacity: headerOpacity,
          }}
        >
          What students ship
        </div>
      </div>

      {/* Geometric project representations - cascading */}
      {projects.map((project, i) => {
        const delay = 12 + i * 10;
        const show = frame >= delay;
        const itemOpacity = show
          ? interpolate(frame - delay, [0, 12], [0, 1], { extrapolateRight: "clamp" })
          : 0;
        const itemScale = show
          ? spring({ frame: frame - delay, fps, config: { damping: 15 } })
          : 0;

        // Cascading positions
        const positions = [
          { x: 100, y: 200, rotate: -3 },
          { x: 350, y: 280, rotate: 2 },
          { x: 680, y: 180, rotate: -2 },
          { x: 900, y: 300, rotate: 3 },
          { x: 1200, y: 240, rotate: -1 },
        ];

        const pos = positions[i];
        const floatOffset = float * (i % 2 === 0 ? 1 : -1);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y + floatOffset,
              width: project.width,
              height: project.height,
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
              opacity: itemOpacity,
              transform: `scale(${0.9 + itemScale * 0.1}) rotate(${pos.rotate}deg)`,
              overflow: "hidden",
              zIndex: 10 + i,
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                height: 28,
                background: "rgba(10,10,10,0.04)",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 6,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(10,10,10,0.15)" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(10,10,10,0.15)" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(10,10,10,0.15)" }} />
            </div>

            {/* Abstract content */}
            <div style={{ padding: 16, height: "calc(100% - 28px)" }}>
              <div
                style={{
                  width: "50%",
                  height: 12,
                  background: "#0A0A0A",
                  borderRadius: 2,
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: 6,
                  background: "rgba(10,10,10,0.1)",
                  borderRadius: 2,
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: 6,
                  background: "rgba(10,10,10,0.1)",
                  borderRadius: 2,
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  width: "40%",
                  height: 20,
                  background: "#0066FF",
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Label */}
            <div
              style={{
                position: "absolute",
                bottom: -28,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#FFFFFF",
                background: "#0A0A0A",
                padding: "6px 14px",
                borderRadius: 2,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {project.label}
            </div>
          </div>
        );
      })}

      {/* Bottom section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(0deg, #FFFFFF 70%, transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 40,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 42,
            fontWeight: 300,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            opacity: frame >= 60 ? interpolate(frame - 60, [0, 15], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          Students are building{" "}
          <span style={{ color: "#0066FF", fontWeight: 600 }}>real products.</span>
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(10,10,10,0.5)",
            opacity: frame >= 75 ? interpolate(frame - 75, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0,
          }}
        >
          You'll learn to build all of this inside SpeakCode.
        </div>
      </div>
    </AbsoluteFill>
  );
};
