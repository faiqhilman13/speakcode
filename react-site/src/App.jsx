import { useState, useEffect } from 'react'
import HorizonScene from './components/HorizonScene.jsx'
import BrushCursor from './components/BrushCursor.jsx'
import './App.css'

function App() {
  const [heroVisible, setHeroVisible] = useState(false)

  const faqs = [
    { q: 'Is coding experience required?', a: "Negative. This protocol is designed for system thinkers. If you can architect intent in natural language, you can command the machine." },
    { q: 'What is the required toolkit?', a: "Modular interface access (Claude, ChatGPT, etc.) and a local terminal environment. We provide the orchestration framework." },
    { q: 'What is the cycle time?', a: "Typical mastery achieved in 2-4 development cycles. Access is perpetual." },
    { q: 'Is the system battle-tested?', a: "Affirmative. Built upon protocols that have shipped production software serving 30k+ active users." },
    { q: 'Does it support evolving models?', a: "The framework is model-agnostic. You learn the immutable principles of agentic orchestration." },
  ]

  useEffect(() => {
    setHeroVisible(true)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <BrushCursor />
      <HorizonScene />

      <header>
        <div className="container nav-inner">
          <a href="#" className="logo">
            <div />
            DOJO // ZERO
          </a>

          <nav className="hidden md:flex desktop-nav">
            <a href="#problem">The Shift</a>
            <a href="#curriculum">Syllabus</a>
            <a href="#instructor">Sensei</a>
            <a href="#pricing">Access</a>
          </nav>

          <a href="#pricing" className="nav-cta">
            INITIALIZE
          </a>
        </div>
      </header>

      <div className="content-root">

        <section className="hero container">
          <div className={`reveal hero-badge ${heroVisible ? 'visible' : ''}`}>
            <div className="badge-pulse"></div>
            PROTOCOL V2.4 // ACTIVE
          </div>

          <h1 className={`reveal delay-100 ${heroVisible ? 'visible' : ''}`}>
            Build <span>Anything</span><br />Just Orchestrate.
          </h1>

          <p className={`reveal delay-200 ${heroVisible ? 'visible' : ''}`}>
            The paradigm of manual syntax is over. Master the orchestration
            of agentic intelligence to build production systems at the speed of thought.
          </p>

          <div className={`reveal delay-300 hero-ctas ${heroVisible ? 'visible' : ''}`}>
            <a href="#pricing" className="btn-primary">Connect Protocol</a>
            <a href="#curriculum" className="btn-secondary">View Syllabus</a>
          </div>
        </section>

        <section id="problem" className="reveal container">
          <div className="section-header">
            <h2 className="section-title">The Paradigm Shift</h2>
            <p className="section-desc">
              syntax is the bottleneck. strategy is the leverage.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="material-icons feature-icon">layers</span>
              <h3>High-Level Decomposition</h3>
              <p>Stop writing lines. Start architecting intents. Learn to break complex systems into atomic, shipable instructions.</p>
            </div>

            <div className="feature-card">
              <span className="material-icons feature-icon">code_off</span>
              <h3>Zero-Syntax Mastery</h3>
              <p>Leverage the full power of agentic tools to handle the manual labor of coding while you focus on the logic flow.</p>
            </div>

            <div className="feature-card">
              <span className="material-icons feature-icon">speed</span>
              <h3>Production Velocity</h3>
              <p>Go from concept to production in record cycles. Built on the same protocols used to serve 30k+ users.</p>
            </div>
          </div>
        </section>

        <section id="curriculum" className="reveal container">
          <div className="section-header">
            <h2 className="section-title">The Syllabus</h2>
            <p className="section-desc">three phases of agentic mastery.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>PHASE 01: THE MIND</h3>
              <p>Developing the Orchestrator's mindset. Shifting perspective from "How do I code this?" to "How do I architect this?"</p>
            </div>
            <div className="feature-card">
              <h3>PHASE 02: THE BLADE</h3>
              <p>The technical framework. Tools, context injection, and the 5-step decomposition system for reliable output.</p>
            </div>
            <div className="feature-card">
              <h3>PHASE 03: THE STRIKE</h3>
              <p>The Live Execution. Watch as total systems are built from scratch, covering frontend, backend, and deployment.</p>
            </div>
          </div>
        </section>

        <section id="instructor" className="reveal container">
          <div className="section-header">
            <h2 className="section-title">The Sensei</h2>
            <p className="section-desc">battle-tested orchestration intelligence.</p>
          </div>

          <div className="instructor-layout">
            <div className="instructor-profile">
              <div className="instructor-bio">
                <p>Senior AI Engineer with a focus on shipping production-scale multi-agent systems. From architecting enterprise GenAI platforms to winning government-backed AI hackathons, the curriculum is built on real-world scars and deployment success.</p>
              </div>
              <div className="instructor-stats">
                <div className="stat-item">
                  <span className="stat-value">30K+</span>
                  <span className="stat-label">Production Users Served</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">MSc</span>
                  <span className="stat-label">Data Science (London, UK)</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">TOP 5</span>
                  <span className="stat-label">ASEAN AI Hackathon</span>
                </div>
              </div>
            </div>

            <div className="instructor-records">
              <div className="record-item">
                <span className="record-tag">APP LEAD</span>
                <h4>Enterprise GenAI Platform</h4>
                <p>Top 3 contributor and app lead on 100k+ LOC enterprise AI platform for a top 5 KLSE company. Serving 30,000+ employees across web and mobile.</p>
              </div>
              <div className="record-item">
                <span className="record-tag">SOLO DEV</span>
                <h4>ASEAN AI Hackathon</h4>
                <p>Top 5 out of 150+ participants as a solo developer in government-backed hackathon hosted by Malaysia's Ministry of Health and National AI Office.</p>
              </div>
              <div className="record-item">
                <span className="record-tag">SHIPPED FAST</span>
                <h4>Production AI Systems</h4>
                <p>Built reusable agent frameworks that cut deployment from weeks to days. Achieved fastest UAT approval in project history — 2 weeks ahead of schedule.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal container">
          <div className="section-header">
            <h2 className="section-title">System Logs</h2>
            <p className="section-desc">protocol clarifications.</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="reveal container">
          <div className="section-header">
            <h2 className="section-title">Initialize Access</h2>
            <p className="section-desc">Launching soon. Join the waitlist for early access.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <span className="pricing-tier">White Belt</span>
              <div className="pricing-price">$20</div>
              <ul className="pricing-features">
                <li>Full Video Curriculum</li>
                <li>Strategic Resource Vault</li>
                <li>Lifetime Protocol Updates</li>
              </ul>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJE99cwMuVbtAE1Iy2G1Lc5OGP3UxxHyyWIJxBx4_UTRz4-w/viewform" target="_blank" rel="noopener noreferrer" className="btn-secondary">Join Waitlist</a>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-tier">Black Belt</span>
              <div className="pricing-price">$100</div>
              <ul className="pricing-features">
                <li>Everything in White Belt</li>
                <li>1-on-1 Strategic Mentoring</li>
                <li>Direct Neural Network Access</li>
                <li>Priority Code Validation</li>
              </ul>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJE99cwMuVbtAE1Iy2G1Lc5OGP3UxxHyyWIJxBx4_UTRz4-w/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary">Get Early Access</a>
            </div>
            <div className="pricing-card">
              <span className="pricing-tier">Corporate</span>
              <div className="pricing-price">CUSTOM</div>
              <ul className="pricing-features">
                <li>On-site Team Calibration</li>
                <li>Custom Workflow Design</li>
                <li>Direct System Integration</li>
              </ul>
              <a href="mailto:hello@speakcode.dev" className="btn-secondary">Contact Sensei</a>
            </div>
          </div>
        </section>

        <footer>
          <div className="container footer-inner">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div />
                DOJO // ZERO
              </a>
              <p>Architecting the future of software orchestration. Built for the modern builder.</p>
            </div>
            <div className="footer-col">
              <h4>STRUCTURE</h4>
              <ul>
                <li><a href="#">The Shift</a></li>
                <li><a href="#">Syllabus</a></li>
                <li><a href="#">Instructor</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>PROTOCOL</h4>
              <ul>
                <li><a href="#">Access</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>TRANSMIT</h4>
              <ul>
                <li><a href="#">X / Twitter</a></li>
                <li><a href="#">Github</a></li>
                <li><a href="mailto:hello@speakcode.dev">System Mail</a></li>
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <p>© 2025 DOJO ZERO. ALL RIGHTS RESERVED.</p>
            <p>CORE_v2.4_INITIALIZED</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
