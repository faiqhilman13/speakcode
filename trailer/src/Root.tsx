import { Composition } from "remotion";
import { Trailer } from "./Trailer";
import { CyberTrailer } from "./CyberTrailer";
import { AgenticCodingTrailer } from "./AgenticCodingTrailer";
import { AgenticCodingTrailerExtended } from "./AgenticCodingTrailerExtended";
import { RetroTrailer } from "./RetroTrailer";
import { MinimalistTrailer } from "./MinimalistTrailer";
import { GlassmorphismTrailer } from "./GlassmorphismTrailer";

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

      {/* Agentic Coding 90-second extended trailer */}
      <Composition
        id="AgenticCodingTrailerExtended"
        component={AgenticCodingTrailerExtended}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Bold Retro 80s/90s style trailer */}
      <Composition
        id="RetroTrailer"
        component={RetroTrailer}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Minimalist Tech Swiss design trailer */}
      <Composition
        id="MinimalistTrailer"
        component={MinimalistTrailer}
        durationInFrames={1950}
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
    </>
  );
};
