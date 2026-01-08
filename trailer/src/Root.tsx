import { Composition } from "remotion";
import { Trailer } from "./Trailer";
import { CyberTrailer } from "./CyberTrailer";
import { AgenticCodingTrailer } from "./AgenticCodingTrailer";
import { GlassmorphismTrailer } from "./GlassmorphismTrailer";
import { SquareTrailer } from "./SquareTrailer";
import { VerticalTrailer } from "./VerticalTrailer";
import { BuildAnythingTrailer } from "./BuildAnythingTrailer";
import { DojoTrailer } from "./DojoTrailer";
import { DojoTrailerVertical } from "./DojoTrailerVertical";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original warm/editorial style trailer */}
      <Composition
        id="Trailer"
        component={Trailer}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Cyberpunk style trailer */}
      <Composition
        id="CyberTrailer"
        component={CyberTrailer}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Agentic Coding 30-second trailer */}
      <Composition
        id="AgenticCodingTrailer"
        component={AgenticCodingTrailer}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Glassmorphism dreamy gradient style trailer */}
      <Composition
        id="GlassmorphismTrailer"
        component={GlassmorphismTrailer}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Square format trailer (1080x1080) for Instagram/TikTok/LinkedIn */}
      <Composition
        id="SquareTrailer"
        component={SquareTrailer}
        durationInFrames={1950}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Vertical format trailer (1080x1920) for Instagram Reels/TikTok/Stories */}
      <Composition
        id="VerticalTrailer"
        component={VerticalTrailer}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* New "Build Anything" trailer with updated script (possibility-focused) */}
      <Composition
        id="BuildAnythingTrailer"
        component={BuildAnythingTrailer}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* New Noob-Friendly Dojo // Zero Trailer */}
      <Composition
        id="DojoTrailer"
        component={DojoTrailer}
        durationInFrames={1470}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Vertical Dojo // Zero Trailer (Mobile/Shorts) */}
      <Composition
        id="DojoTrailerVertical"
        component={DojoTrailerVertical}
        durationInFrames={1620}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
