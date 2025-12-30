import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * NEURAL INTERFACE NEW WAY SCENE - REDESIGNED
 * Shows 5 examples with VARIED LAYOUTS (not repetitive left/right split)
 *
 * Layout 1: Full-bleed image with floating overlay text
 * Layout 2: Image at TOP, content stacked below (vertical)
 * Layout 3: REVERSED - Image LEFT, content RIGHT
 * Layout 4: Diagonal split with angled elements
 * Layout 5: Centered floating card over background image
 */

// SVG Icons
const WebIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-4 4 4 6-8" />
  </svg>
);

const VideoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M10 9l5 3-5 3V9z" fill="currentColor" opacity="0.5" />
  </svg>
);

const PresentIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21l4-4 4 4" />
  </svg>
);

const ResearchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);

interface Example {
  title: string;
  action: string;
  command: string;
  output: string;
  image: string;
  icon: React.FC;
  accentColor: string;
  layout: "fullbleed" | "vertical" | "reversed" | "diagonal" | "centered";
}

const examples: Example[] = [
  {
    title: "Landing Page",
    action: "Prompt it. Shipped.",
    command: "prompt: Build a modern SaaS landing page",
    output: "Deployed to production",
    image: "landing-page-mockup.png",
    icon: WebIcon,
    accentColor: "#00fff2",
    layout: "fullbleed",
  },
  {
    title: "Analytics Dashboard",
    action: "Build it in minutes.",
    command: "prompt: Create real-time analytics dashboard",
    output: "Live with data streaming",
    image: "dashboard-mockup.png",
    icon: ChartIcon,
    accentColor: "#ff0080",
    layout: "vertical",
  },
  {
    title: "Video Content",
    action: "Master the workflow.",
    command: "prompt: Generate promotional video",
    output: "Exported at 4K",
    image: "video-editor-mockup.png",
    icon: VideoIcon,
    accentColor: "#00ff88",
    layout: "reversed",
  },
  {
    title: "Pitch Deck",
    action: "Create it. Easy.",
    command: "prompt: Design investor pitch deck",
    output: "Ready for presentation",
    image: "pitch-deck-mockup.png",
    icon: PresentIcon,
    accentColor: "#ffaa00",
    layout: "diagonal",
  },
  {
    title: "Market Research",
    action: "Automate it. Complete.",
    command: "prompt: Research competitors, generate report",
    output: "Comprehensive analysis",
    image: "research-mockup.png",
    icon: ResearchIcon,
    accentColor: "#aa88ff",
    layout: "centered",
  },
];

// Typewriter component
const TypeWriter: React.FC<{ text: string; progress: number; color?: string }> = ({
  text, progress, color = "#e8e8e8"
}) => {
  const visibleChars = Math.floor(text.length * progress);
  return <span style={{ color }}>{text.slice(0, visibleChars)}</span>;
};

// LAYOUT 1: Full-bleed image with floating overlay
const FullbleedLayout: React.FC<{ example: Example; localFrame: number; fps: number; exampleIndex: number }> = ({
  example, localFrame, fps, exampleIndex
}) => {
  const Icon = example.icon;
  const showContent = localFrame >= 0;
  const imageOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const contentOpacity = interpolate(localFrame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const commandProgress = interpolate(localFrame, [30, 70], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(localFrame, [80, 95], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Full-bleed background image */}
      <div style={{ position: "absolute", inset: 0, opacity: imageOpacity * 0.4 }}>
        <Img src={staticFile(example.image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.95) 100%)" }} />
      </div>

      {/* Floating content - bottom left */}
      <div style={{ position: "absolute", bottom: 120, left: 80, maxWidth: 800, opacity: contentOpacity }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, background: `${example.accentColor}20`, border: `1px solid ${example.accentColor}60`, display: "flex", alignItems: "center", justifyContent: "center", color: example.accentColor }}>
            <Icon />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: example.accentColor, letterSpacing: "0.15em" }}>EXAMPLE {exampleIndex + 1}/5</span>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 90, fontWeight: 700, color: "#e8e8e8", textShadow: `0 0 60px ${example.accentColor}40`, marginBottom: 10 }}>
          {example.title}
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, color: example.accentColor, marginBottom: 40 }}>
          {example.action}
        </div>

        {/* Command bar */}
        <div style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${example.accentColor}40`, padding: "20px 28px", marginBottom: 25 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: example.accentColor, marginBottom: 10 }}>{">"} SPEAKCODE.EXECUTE</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>
            <TypeWriter text={example.command} progress={commandProgress} />
          </div>
        </div>

        {/* Output */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: outputOpacity }}>
          <div style={{ width: 12, height: 12, background: "#00ff88", boxShadow: "0 0 10px #00ff88" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: "#00ff88" }}>{example.output}</span>
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 25, left: 25, width: 50, height: 50, borderTop: `2px solid ${example.accentColor}50`, borderLeft: `2px solid ${example.accentColor}50` }} />
      <div style={{ position: "absolute", bottom: 25, right: 25, width: 50, height: 50, borderBottom: `2px solid ${example.accentColor}50`, borderRight: `2px solid ${example.accentColor}50` }} />

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${((exampleIndex + 1) / 5) * 100}%`, background: example.accentColor }} />
      </div>
    </AbsoluteFill>
  );
};

// LAYOUT 2: Vertical - Image at top, content below
const VerticalLayout: React.FC<{ example: Example; localFrame: number; fps: number; exampleIndex: number }> = ({
  example, localFrame, fps, exampleIndex
}) => {
  const Icon = example.icon;
  const imageScale = spring({ frame: Math.max(0, localFrame - 5), fps, config: { damping: 15 } });
  const contentOpacity = interpolate(localFrame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const commandProgress = interpolate(localFrame, [35, 75], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(localFrame, [85, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 30, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: example.accentColor }}>
          <div style={{ width: 10, height: 10, background: example.accentColor, boxShadow: `0 0 10px ${example.accentColor}` }} />
          EXAMPLE {exampleIndex + 1}/5
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>AGENTIC_BUILD.DEMO</div>
      </div>

      {/* Image at TOP - wide banner */}
      <div style={{ position: "absolute", top: 80, left: 60, right: 60, height: 380, overflow: "hidden", transform: `scale(${0.9 + imageScale * 0.1})`, opacity: imageScale }}>
        <div style={{ border: `2px solid ${example.accentColor}40`, boxShadow: `0 0 60px ${example.accentColor}20`, overflow: "hidden" }}>
          <Img src={staticFile(example.image)} style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "top" }} />
        </div>
      </div>

      {/* Content BELOW - centered */}
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", opacity: contentOpacity }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 50, height: 50, background: `${example.accentColor}15`, border: `1px solid ${example.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", color: example.accentColor }}>
            <Icon />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 56, fontWeight: 600, color: "#e8e8e8" }}>{example.title}</span>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: example.accentColor, marginBottom: 30 }}>{example.action}</div>

        {/* Inline command */}
        <div style={{ display: "inline-block", background: "rgba(0,0,0,0.5)", border: `1px solid ${example.accentColor}30`, padding: "16px 30px", marginBottom: 20 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "rgba(255,255,255,0.6)" }}>
            <TypeWriter text={example.command} progress={commandProgress} />
          </span>
        </div>

        {/* Output */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, opacity: outputOpacity }}>
          <div style={{ width: 10, height: 10, background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: "#00ff88" }}>{example.output}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${((exampleIndex + 1) / 5) * 100}%`, background: example.accentColor }} />
      </div>
    </AbsoluteFill>
  );
};

// LAYOUT 3: Reversed - Image LEFT, content RIGHT
const ReversedLayout: React.FC<{ example: Example; localFrame: number; fps: number; exampleIndex: number }> = ({
  example, localFrame, fps, exampleIndex
}) => {
  const Icon = example.icon;
  const imageScale = spring({ frame: Math.max(0, localFrame - 8), fps, config: { damping: 14 } });
  const contentY = spring({ frame: Math.max(0, localFrame - 15), fps, config: { damping: 18 } });
  const commandProgress = interpolate(localFrame, [30, 70], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(localFrame, [80, 95], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,136,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.01) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* IMAGE on LEFT */}
      <div style={{ position: "absolute", left: 60, top: "50%", transform: `translateY(-50%) scale(${0.9 + imageScale * 0.1})`, opacity: imageScale }}>
        <div style={{ boxShadow: `0 0 80px ${example.accentColor}25`, border: `2px solid ${example.accentColor}40`, overflow: "hidden" }}>
          <Img src={staticFile(example.image)} style={{ width: 750, height: "auto", display: "block" }} />
        </div>
      </div>

      {/* CONTENT on RIGHT */}
      <div style={{ position: "absolute", right: 80, top: "50%", transform: `translateY(calc(-50% + ${20 - contentY * 20}px))`, width: 500, opacity: contentY }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 25 }}>
          <div style={{ width: 54, height: 54, background: `${example.accentColor}15`, border: `1px solid ${example.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", color: example.accentColor }}>
            <Icon />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: example.accentColor, letterSpacing: "0.12em" }}>EXAMPLE {exampleIndex + 1}/5</span>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 64, fontWeight: 600, color: "#e8e8e8", marginBottom: 10, textShadow: `0 0 40px ${example.accentColor}30` }}>
          {example.title}
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: example.accentColor, marginBottom: 40 }}>{example.action}</div>

        {/* Command */}
        <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${example.accentColor}30`, padding: "22px 26px", marginBottom: 25 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: example.accentColor, marginBottom: 10 }}>{">"} SPEAKCODE.EXECUTE</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17 }}>
            <TypeWriter text={example.command} progress={commandProgress} />
          </div>
        </div>

        {/* Output */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: outputOpacity }}>
          <div style={{ width: 12, height: 12, background: "#00ff88", boxShadow: "0 0 10px #00ff88" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: "#00ff88" }}>{example.output}</span>
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 25, left: 25, width: 45, height: 45, borderTop: `2px solid ${example.accentColor}40`, borderLeft: `2px solid ${example.accentColor}40` }} />
      <div style={{ position: "absolute", bottom: 25, right: 25, width: 45, height: 45, borderBottom: `2px solid ${example.accentColor}40`, borderRight: `2px solid ${example.accentColor}40` }} />

      {/* Progress */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${((exampleIndex + 1) / 5) * 100}%`, background: example.accentColor }} />
      </div>
    </AbsoluteFill>
  );
};

// LAYOUT 4: Diagonal split
const DiagonalLayout: React.FC<{ example: Example; localFrame: number; fps: number; exampleIndex: number }> = ({
  example, localFrame, fps, exampleIndex
}) => {
  const Icon = example.icon;
  const revealProgress = spring({ frame: Math.max(0, localFrame - 5), fps, config: { damping: 12 } });
  const contentOpacity = interpolate(localFrame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const commandProgress = interpolate(localFrame, [35, 75], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(localFrame, [85, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Diagonal image section - top right */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "65%", height: "100%", overflow: "hidden", clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)", opacity: revealProgress }}>
        <Img src={staticFile(example.image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${example.accentColor}20, transparent 60%)` }} />
      </div>

      {/* Diagonal accent line */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "35%", width: 4, background: example.accentColor, transform: "skewX(-15deg)", boxShadow: `0 0 30px ${example.accentColor}`, opacity: revealProgress }} />

      {/* Content - bottom left */}
      <div style={{ position: "absolute", left: 80, bottom: 100, width: 650, opacity: contentOpacity }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, background: `${example.accentColor}15`, border: `1px solid ${example.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", color: example.accentColor }}>
            <Icon />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: example.accentColor, letterSpacing: "0.12em" }}>EXAMPLE {exampleIndex + 1}/5</span>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 72, fontWeight: 600, color: "#e8e8e8", marginBottom: 10, textShadow: `0 0 50px ${example.accentColor}30` }}>
          {example.title}
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 30, color: example.accentColor, marginBottom: 35 }}>{example.action}</div>

        {/* Command */}
        <div style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${example.accentColor}30`, padding: "20px 26px", marginBottom: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>
            <TypeWriter text={example.command} progress={commandProgress} />
          </div>
        </div>

        {/* Output */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: outputOpacity }}>
          <div style={{ width: 12, height: 12, background: "#00ff88", boxShadow: "0 0 10px #00ff88" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: "#00ff88" }}>{example.output}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${((exampleIndex + 1) / 5) * 100}%`, background: example.accentColor }} />
      </div>
    </AbsoluteFill>
  );
};

// LAYOUT 5: Centered floating card
const CenteredLayout: React.FC<{ example: Example; localFrame: number; fps: number; exampleIndex: number }> = ({
  example, localFrame, fps, exampleIndex
}) => {
  const Icon = example.icon;
  const bgOpacity = interpolate(localFrame, [0, 15], [0, 0.3], { extrapolateRight: "clamp" });
  const cardScale = spring({ frame: Math.max(0, localFrame - 10), fps, config: { damping: 14 } });
  const commandProgress = interpolate(localFrame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(localFrame, [90, 105], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* Background image - subtle */}
      <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
        <Img src={staticFile(example.image)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(8px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,15,0.85)" }} />
      </div>

      {/* Floating center card */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 900,
          background: "rgba(10,10,15,0.95)",
          border: `2px solid ${example.accentColor}40`,
          boxShadow: `0 0 100px ${example.accentColor}20, 0 40px 80px rgba(0,0,0,0.5)`,
          padding: 60,
          transform: `scale(${0.85 + cardScale * 0.15})`,
          opacity: cardScale,
        }}>
          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 35, paddingBottom: 25, borderBottom: `1px solid ${example.accentColor}30` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, background: `${example.accentColor}15`, border: `1px solid ${example.accentColor}50`, display: "flex", alignItems: "center", justifyContent: "center", color: example.accentColor }}>
                <Icon />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: example.accentColor, letterSpacing: "0.12em" }}>EXAMPLE {exampleIndex + 1}/5</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>FINAL_OUTPUT</span>
          </div>

          {/* Title */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 68, fontWeight: 600, color: "#e8e8e8", marginBottom: 12, textAlign: "center" }}>
            {example.title}
          </div>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: example.accentColor, marginBottom: 40, textAlign: "center" }}>
            {example.action}
          </div>

          {/* Command */}
          <div style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${example.accentColor}25`, padding: "22px 28px", marginBottom: 25 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: example.accentColor, marginBottom: 10 }}>{">"} SPEAKCODE.EXECUTE</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>
              <TypeWriter text={example.command} progress={commandProgress} />
            </div>
          </div>

          {/* Output */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, opacity: outputOpacity }}>
            <div style={{ width: 14, height: 14, background: "#00ff88", boxShadow: "0 0 12px #00ff88" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: "#00ff88" }}>{example.output}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: `${((exampleIndex + 1) / 5) * 100}%`, background: example.accentColor }} />
      </div>
    </AbsoluteFill>
  );
};

export const CyberNewWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const framesPerExample = 150;
  const currentExampleIndex = Math.min(Math.floor(frame / framesPerExample), examples.length - 1);
  const currentExample = examples[currentExampleIndex];
  const localFrame = frame - currentExampleIndex * framesPerExample;

  const layoutComponents = {
    fullbleed: FullbleedLayout,
    vertical: VerticalLayout,
    reversed: ReversedLayout,
    diagonal: DiagonalLayout,
    centered: CenteredLayout,
  };

  const LayoutComponent = layoutComponents[currentExample.layout];

  return (
    <LayoutComponent
      example={currentExample}
      localFrame={localFrame}
      fps={fps}
      exampleIndex={currentExampleIndex}
    />
  );
};
