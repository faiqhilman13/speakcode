# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Launch Remotion Studio for live preview
npm run build    # Render Trailer composition to out/trailer.mp4
npm run render   # Same as build
```

To render a specific composition:
```bash
npx remotion render src/index.ts CyberTrailer out/cyber-trailer.mp4
```

## Architecture

This is a Remotion video project for the SpeakCode course trailer. Two trailer variants exist:

**Compositions** (defined in `src/Root.tsx`):
- `Trailer` (1980 frames) - Warm editorial style with cream/coral colors
- `CyberTrailer` (1830 frames) - Cyberpunk "Neural Interface Terminal" aesthetic

Both run at 30fps, 1920x1080.

**Scene Structure**:
- Each trailer is a sequence of scene components
- Scenes use `<Sequence from={frame} durationInFrames={N}>` for timing
- Frame math: `from={120}` = starts at 4 seconds (120/30fps)

**Scene Components**:
- `src/components/` - Original warm style scenes
- `src/components/cyber/` - Cyberpunk style scenes (index.ts exports all)

**Static Assets** (`public/`):
- PNG mockups and illustrations for scenes
- Audio: `voiceover.mp3`, `background-music.mp3`, `cyberpunk-music.mp3`

## CyberTrailer Design System

Colors: `#0a0a0f` (black), `#00fff2` (cyan), `#ff0080` (magenta), `#00ff88` (green)
Typography: JetBrains Mono / SF Mono
Pattern: Terminal interfaces, data visualizations, geometric precision

## Remotion Patterns

Animation imports from remotion:
```tsx
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
```

Common animation pattern:
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
const scale = spring({ frame, fps, config: { damping: 15 } });
```

Static files: `<Img src={staticFile("image.png")} />` or `<Audio src={staticFile("audio.mp3")} />`

## Session Tracking

This project uses session tracking. Log completed work to `sessions/YYYY-MM-DD.md` when the user confirms task completion with phrases like "good job", "done", "complete".
