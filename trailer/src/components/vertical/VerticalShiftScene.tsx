import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Vertical Shift Scene: The dramatic pivot moment
 * Layout: Full bleed, maximum impact (adapted from horizontal ShiftScene)
 */

export const VerticalShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blackOverlay = interpolate(frame, [0, 4, 10, 14], [1, 1, 0, 0], { extrapolateRight: "clamp" });

  const showImage = frame >= 18;
  const imageOpacity = showImage ? interpolate(frame - 18, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 0;
  const imageScale = showImage ? spring({ frame: frame - 18, fps, config: { damping: 15 } }) : 0;

  const showLine1 = frame >= 35;
  const showLine2 = frame >= 52;

  const line1Scale = showLine1 ? spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 120 } }) : 0;
  const line2Scale = showLine2 ? spring({ frame: frame - 52, fps, config: { damping: 12, stiffness: 120 } }) : 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a1a" }}>
      {/* Full bleed background image */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: imageOpacity * 0.35,
          transform: `scale(${1 + imageScale * 0.08})`,
        }}
      >
        <Img
          src={staticFile("code-to-product.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Gradient overlay for text contrast */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.6) 100%)",
        }}
      />

      {/* Center content - adapted for vertical */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "90%",
      }}>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 62,
            color: "#FDF6E3",
            letterSpacing: "-0.02em",
            opacity: showLine1 ? 1 : 0,
            transform: `scale(${0.92 + line1Scale * 0.08})`,
          }}
        >
          Then AI happened.
        </div>

        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 88,
            fontStyle: "italic",
            color: "#FF5E5B",
            letterSpacing: "-0.03em",
            marginTop: 20,
            opacity: showLine2 ? 1 : 0,
            transform: `scale(${0.92 + line2Scale * 0.08})`,
          }}
        >
          Everything changed.
        </div>
      </div>

      {/* Corner accents - adapted for vertical */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 30,
          width: 80,
          height: 80,
          borderLeft: "4px solid #FF5E5B",
          borderTop: "4px solid #FF5E5B",
          opacity: showLine2 ? interpolate(frame - 65, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
          width: 80,
          height: 80,
          borderRight: "4px solid #FF5E5B",
          borderBottom: "4px solid #FF5E5B",
          opacity: showLine2 ? interpolate(frame - 65, [0, 8], [0, 1], { extrapolateRight: "clamp" }) : 0,
        }}
      />

      {/* Black flash overlay */}
      <AbsoluteFill
        style={{
          background: "#000",
          opacity: blackOverlay,
        }}
      />
    </AbsoluteFill>
  );
};
