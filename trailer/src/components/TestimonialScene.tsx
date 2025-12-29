import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";

/*
 * Testimonial Scene: Social proof - what students say
 * Layout: Full screen quotes with background image
 */

const testimonials = [
  {
    quote: "I built and deployed my first SaaS in 3 weeks. No coding background.",
    author: "Sarah M.",
    role: "Product Manager → Founder",
  },
  {
    quote: "This changed how I think about building software. Like having a senior dev on call 24/7.",
    author: "David K.",
    role: "Marketing Director",
  },
  {
    quote: "Finally shipped that side project I've been dreaming about for years.",
    author: "Alex T.",
    role: "Designer → Indie Hacker",
  },
];

export const TestimonialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showTitle = frame >= 5;

  const testimonialsPerSlide = 75;
  const currentIndex = Math.min(Math.floor(frame / testimonialsPerSlide), testimonials.length - 1);
  const slideFrame = frame - currentIndex * testimonialsPerSlide;

  const slideIn = spring({ frame: slideFrame, fps, config: { damping: 15, stiffness: 100 } });
  const slideOpacity = interpolate(slideFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const testimonial = testimonials[currentIndex];

  // Background image animation
  const imageOpacity = interpolate(frame, [0, 20], [0, 0.4], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#FDF6E3" }}>
      {/* Background image - successful student */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("successful-student.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Cream overlay */}
      <AbsoluteFill
        style={{
          background: "rgba(253,246,227,0.7)",
        }}
      />

      {/* Large decorative quote */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: 30,
          fontSize: 700,
          fontFamily: "Georgia, serif",
          color: "rgba(255,94,91,0.08)",
          lineHeight: 0.8,
        }}
      >
        "
      </div>

      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 22,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(253,246,227,0.7)",
            opacity: showTitle ? 1 : 0,
          }}
        >
          What Students Say
        </div>
        <div
          style={{
            fontFamily: "'SF Mono', monospace",
            fontSize: 28,
            color: "#FF5E5B",
            fontWeight: 600,
          }}
        >
          {String(currentIndex + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}
        </div>
      </div>

      {/* Main testimonial */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateX(${(1 - slideIn) * 60}px)`,
          opacity: slideOpacity,
          width: "85%",
          maxWidth: 1400,
        }}
      >
        {/* Quote */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 62,
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: 45,
          }}
        >
          "{testimonial.quote}"
        </div>

        {/* Author info */}
        <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
          {/* Avatar */}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#FF5E5B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontSize: 28,
              color: "#FDF6E3",
              fontWeight: 500,
            }}
          >
            {testimonial.author.charAt(0)}
          </div>

          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 32,
                color: "#1a1a1a",
                fontWeight: 500,
              }}
            >
              {testimonial.author}
            </div>
            <div
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: 18,
                color: "rgba(26,26,26,0.5)",
                marginTop: 4,
              }}
            >
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
        }}
      >
        {testimonials.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? 40 : 10,
              height: 10,
              borderRadius: 5,
              background: i === currentIndex ? "#FF5E5B" : "rgba(26,26,26,0.12)",
            }}
          />
        ))}
      </div>

      {/* Side accent */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "25%",
          bottom: "25%",
          width: 6,
          background: "#FF5E5B",
          opacity: frame >= 20 ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
