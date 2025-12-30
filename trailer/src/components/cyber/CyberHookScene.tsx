import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

/*
 * NEURAL INTERFACE HOOK SCENE
 * "What if you could build anything, just by describing it?"
 *
 * Aesthetic: Clean terminal interface with data streams, not chaotic glitch
 */

// Binary data stream - purposeful, not random
const DataStream: React.FC<{ column: number; speed: number; opacity: number }> = ({
  column, speed, opacity
}) => {
  const frame = useCurrentFrame();
  const chars = "01";
  const streamLength = 12;
  const yOffset = (frame * speed) % 800;

  return (
    <div
      style={{
        position: "absolute",
        left: column,
        top: yOffset - 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        opacity: opacity * 0.15,
      }}
    >
      {Array.from({ length: streamLength }).map((_, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 14,
            color: "#00fff2",
            opacity: 1 - (i / streamLength) * 0.7,
          }}
        >
          {chars[Math.floor((frame + i * 3 + column) % 2)]}
        </span>
      ))}
    </div>
  );
};

// Geometric corner bracket - clean UI element
const CornerBracket: React.FC<{
  position: "tl" | "tr" | "bl" | "br";
  color: string;
  size?: number;
}> = ({ position, color, size = 40 }) => {
  const corners = {
    tl: { top: 30, left: 30, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: 30, right: 30, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: 30, left: 30, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: 30, right: 30, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        ...corners[position],
      }}
    />
  );
};

// Horizontal data line with packet indicators
const DataLine: React.FC<{ y: number; delay: number }> = ({ y, delay }) => {
  const frame = useCurrentFrame();
  const show = frame > delay;
  const progress = show ? interpolate(frame - delay, [0, 60], [0, 1920], { extrapolateRight: "clamp" }) : 0;

  // Packet indicator position
  const packetX = ((frame - delay) * 8) % 1920;

  return (
    <div style={{ position: "absolute", top: y, left: 0, right: 0, opacity: show ? 0.3 : 0 }}>
      {/* Base line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: progress,
          height: 1,
          background: "linear-gradient(90deg, transparent, #00fff2 20%, #00fff2 80%, transparent)",
        }}
      />
      {/* Packet indicator */}
      {show && (
        <div
          style={{
            position: "absolute",
            left: packetX,
            top: -2,
            width: 6,
            height: 6,
            background: "#00fff2",
            boxShadow: "0 0 8px #00fff2",
          }}
        />
      )}
    </div>
  );
};

export const CyberHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text reveal timing
  const showLine1 = frame >= 20;
  const showLine2 = frame >= 55;
  const showCursor = frame >= 55;

  const line1Progress = showLine1
    ? interpolate(frame - 20, [0, 25], [0, 1], { extrapolateRight: "clamp" })
    : 0;
  const line2Progress = showLine2
    ? interpolate(frame - 55, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const line1Y = showLine1
    ? spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 80 } }) * 20
    : 0;
  const line2Y = showLine2
    ? spring({ frame: frame - 55, fps, config: { damping: 20, stiffness: 80 } }) * 20
    : 0;

  // Subtle glow pulse - not overdone
  const glowOpacity = 0.4 + Math.sin(frame * 0.08) * 0.1;

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  const line1Text = "What if you could build anything";
  const line2Text = "just by describing it?";

  const line1Visible = Math.floor(line1Text.length * line1Progress);
  const line2Visible = Math.floor(line2Text.length * line2Progress);

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Subtle grid - very low opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,242,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,242,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Data streams - sparse, purposeful */}
      {[120, 340, 580, 820, 1100, 1380, 1600, 1800].map((x, i) => (
        <DataStream key={i} column={x} speed={2 + (i % 3)} opacity={0.6 + (i % 2) * 0.4} />
      ))}

      {/* Horizontal data lines */}
      <DataLine y={180} delay={5} />
      <DataLine y={900} delay={15} />

      {/* Corner brackets */}
      <CornerBracket position="tl" color="rgba(0,255,242,0.5)" />
      <CornerBracket position="tr" color="rgba(0,255,242,0.5)" />
      <CornerBracket position="bl" color="rgba(255,0,128,0.5)" />
      <CornerBracket position="br" color="rgba(255,0,128,0.5)" />

      {/* System status - top left */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 90,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          fontSize: 16,
          color: "rgba(0,255,242,0.5)",
          letterSpacing: "0.1em",
        }}
      >
        <div style={{ marginBottom: 6 }}>SYS.SPEAKCODE.INIT</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: frame > 10 ? "#00ff88" : "#333",
              boxShadow: frame > 10 ? "0 0 8px #00ff88" : "none",
            }}
          />
          <span style={{ color: frame > 10 ? "#00ff88" : "#333" }}>READY</span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 100,
        }}
      >
        {/* Prompt indicator */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 20,
            color: "rgba(0,255,242,0.6)",
            marginBottom: 40,
            opacity: showLine1 ? 1 : 0,
            letterSpacing: "0.15em",
          }}
        >
          {">"} QUERY.IMAGINE
        </div>

        {/* Line 1 - typewriter effect */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 72,
            fontWeight: 500,
            color: "#e8e8e8",
            textAlign: "center",
            opacity: showLine1 ? 1 : 0,
            transform: `translateY(${20 - line1Y}px)`,
            textShadow: `0 0 40px rgba(0,255,242,${glowOpacity * 0.3})`,
            letterSpacing: "-0.01em",
          }}
        >
          {line1Text.slice(0, line1Visible)}
          {line1Progress < 1 && cursorVisible && (
            <span style={{ color: "#00fff2" }}>_</span>
          )}
        </div>

        {/* Line 2 - accent color */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 80,
            fontWeight: 600,
            color: "#00fff2",
            textAlign: "center",
            opacity: showLine2 ? 1 : 0,
            transform: `translateY(${20 - line2Y}px)`,
            textShadow: `0 0 50px rgba(0,255,242,${glowOpacity * 0.5})`,
            marginTop: 20,
            letterSpacing: "-0.01em",
          }}
        >
          {line2Text.slice(0, line2Visible)}
          {line2Progress < 1 && showCursor && cursorVisible && (
            <span>_</span>
          )}
          {line2Progress >= 1 && cursorVisible && (
            <span style={{ opacity: 0.7 }}>_</span>
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "linear-gradient(0deg, rgba(0,255,242,0.03), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "rgba(0,255,242,0.4)",
            letterSpacing: "0.2em",
          }}
        >
          SPEAKCODE.DEV
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          {["PROMPT", "BUILD", "SHIP"].map((label, i) => (
            <div
              key={label}
              style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                fontSize: 15,
                color: i === 0 && frame > 40 ? "#00fff2" : "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: 16,
            color: "rgba(0,255,242,0.4)",
          }}
        >
          v2.0.25
        </div>
      </div>
    </AbsoluteFill>
  );
};
