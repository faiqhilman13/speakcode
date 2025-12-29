import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const modules = [
    { num: '01', title: 'Context Engineering', desc: 'Feed AI the right information. Project structure and memory systems that work.' },
    { num: '02', title: 'Prompt Architecture', desc: 'Describe intent clearly. Get working code on the first try.' },
    { num: '03', title: 'Model Selection', desc: 'Which AI for which task. Cost, speed, and capability tradeoffs.' },
    { num: '04', title: 'Subagent Orchestration', desc: 'Spawn multiple AI agents. Parallel execution and coordination.' },
    { num: '05', title: 'Hooks & Automation', desc: 'Event-driven workflows. Automate quality gates and reduce overhead.' },
    { num: '06', title: 'MCPs & Extensions', desc: 'Extend AI with external tools. Database access and custom integrations.' },
    { num: '07', title: 'Skills & Behaviors', desc: 'Reusable AI behaviors. Make agents work automatically.' },
    { num: '08', title: 'Production Deploy', desc: 'Testing, debugging, and shipping real software people use.' },
  ]

  const faqs = [
    { q: 'Do I need coding experience?', a: "No. This course works for complete beginners through experienced developers. If you can describe what you want in English, you can do this." },
    { q: 'What tools do I need?', a: "A computer and access to AI tools (Claude, ChatGPT, etc.). I'll show you exactly which tools to use and how to set them up." },
    { q: 'How long to complete?', a: "Most students finish in 2-4 weeks at a few hours per week. But you have lifetime access—go at your own pace." },
    { q: 'Will this actually work?', a: "If you apply what you learn, yes. This is the exact system I used to ship production software without traditional coding skills." },
    { q: 'What if AI tools change?', a: "The principles are tool-agnostic. You'll learn patterns that work across any AI. Plus, lifetime updates included." },
    { q: 'Is there a refund policy?', a: "Yes. 30-day money-back guarantee. Do the work, see no results, get a full refund. No questions asked." },
  ]

  return (
    <>
      {/* Navigation */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <a href="#" className="logo">
            <span className="logo-icon">⚡</span>
            SpeakCode
          </a>
          <a href="#pricing" className="nav-cta">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Now accepting students
            </div>
            <h1>
              Stop writing code.<br/>Start <span className="highlight">speaking</span> it.
            </h1>
            <p className="hero-subtitle">
              Build production software by describing what you want. No syntax memorization.
              No years of practice. Just results.
            </p>
            <div className="hero-cta-group">
              <a href="#pricing" className="btn-primary">
                Start Learning
                <span>→</span>
              </a>
              <a href="#curriculum" className="btn-secondary">See Curriculum</a>
            </div>
            <div className="stats-bar">
              <div className="stat">
                <div className="stat-icon coral">🚀</div>
                <div className="stat-content">
                  <div className="stat-value">30k+</div>
                  <div className="stat-label">Users on my platforms</div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon blue">⚡</div>
                <div className="stat-content">
                  <div className="stat-value">9 days</div>
                  <div className="stat-label">To ship 5-week project</div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon mint">✨</div>
                <div className="stat-content">
                  <div className="stat-value">Zero</div>
                  <div className="stat-label">Lines written by hand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section problem">
        <div className="container">
          <div className="problem-grid">
            <div>
              <span className="section-label">The Shift</span>
              <h2>You don't need <span className="strike">10,000 hours</span> anymore.</h2>
              <p>
                Traditional coding demanded years of syntax memorization, debugging nightmares,
                and endless Stack Overflow searches.
              </p>
              <p>
                AI flipped the script. The bottleneck isn't typing—it's thinking.
                And thinking is something you already know how to do.
              </p>
            </div>
            <div className="problem-card">
              <div className="old-way">
                <div className="old-way-title">The old path</div>
                <ul className="old-way-list">
                  <li>Learn syntax (6 months)</li>
                  <li>Build toy projects (6 months)</li>
                  <li>Understand frameworks (1 year)</li>
                  <li>Debug endlessly (forever)</li>
                  <li>Maybe ship something (3+ years)</li>
                </ul>
              </div>
              <div className="new-way">
                <div className="new-way-title">The new path</div>
                <ul className="new-way-list">
                  <li>Describe what you want</li>
                  <li>Understand the architecture</li>
                  <li>Ship production software</li>
                  <li>Time: weeks, not years</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section curriculum" id="curriculum">
        <div className="container">
          <div className="curriculum-header">
            <span className="section-label">What You'll Learn</span>
            <h2>The complete system.</h2>
            <p className="curriculum-intro">
              From first prompt to production deployment. Each module builds on the last.
            </p>
          </div>
          <div className="modules-grid">
            {modules.map((mod) => (
              <div className="module-card" key={mod.num}>
                <div className="module-number">{mod.num}</div>
                <h3 className="module-title">{mod.title}</h3>
                <p className="module-desc">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="section instructor">
        <div className="container">
          <div className="instructor-grid">
            <div className="instructor-quote-card">
              <div className="instructor-quote">
                I've never written a single line of code by hand. Everything I've shipped
                came through conversation with AI.
              </div>
            </div>
            <div className="instructor-content">
              <span className="section-label">Your Instructor</span>
              <h2>The unconventional path that works.</h2>
              <p>
                I came from finance. No CS degree. No bootcamp. When I joined a tech consulting firm,
                I had two weeks to become useful on a real project.
              </p>
              <p>
                So I started talking to AI. Describing what I wanted. Learning architecture top-down.
                It worked better than anyone expected—including me.
              </p>
              <ul className="credentials-list">
                <li>Core engineer on a platform serving 30,000+ users</li>
                <li>Shipped across React, React Native, FastAPI, .NET</li>
                <li>Revamped entire frontend in 9 days (5-week estimate)</li>
                <li>Team calls me "god dev"—as the most junior person</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing" id="pricing">
        <div className="container">
          <div className="pricing-header">
            <span className="section-label">Pricing</span>
            <h2>Start building today.</h2>
            <p className="pricing-subtitle">One-time payment. Lifetime access. No subscriptions.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier">Self-Paced</div>
              <h3 className="pricing-name">Course Only</h3>
              <div className="pricing-price">
                <span className="currency">$</span>20
              </div>
              <p className="pricing-desc">Learn at your own pace with video lessons.</p>
              <ul className="pricing-features">
                <li>8 comprehensive video modules</li>
                <li>Downloadable resources</li>
                <li>Lifetime updates</li>
                <li>Community access</li>
              </ul>
              <a href="#" className="btn-secondary">Get Started</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-tier">Course + Mentoring</div>
              <h3 className="pricing-name">Complete Package</h3>
              <div className="pricing-price">
                <span className="currency">$</span>100
              </div>
              <p className="pricing-desc">Everything in Course, plus personal guidance.</p>
              <ul className="pricing-features">
                <li>Everything in Course Only</li>
                <li>1-on-1 mentoring sessions</li>
                <li>Code review on your projects</li>
                <li>Direct Q&A access</li>
              </ul>
              <a href="#" className="btn-primary">Get Complete Access</a>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">In-Person</div>
              <h3 className="pricing-name">Physical Workshop</h3>
              <div className="pricing-price custom">Custom</div>
              <p className="pricing-desc">Live workshops for teams and organizations.</p>
              <ul className="pricing-features">
                <li>On-site training</li>
                <li>Custom curriculum</li>
                <li>Team exercises</li>
                <li>Hands-on projects</li>
              </ul>
              <a href="mailto:hello@speakcode.dev" className="btn-contact">Contact for Pricing</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container">
          <div className="faq-header">
            <span className="section-label">FAQ</span>
            <h2>Questions?</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <h3 className="faq-question">{faq.q}</h3>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <div className="footer-cta-content">
            <h2>The game changed.<br/>Ready to play?</h2>
            <p>Stop waiting. Start building. Join others who've already made the shift.</p>
            <a href="#pricing" className="btn-white">
              Get Started Now
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p className="footer-text">© 2025 SpeakCode. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="mailto:hello@speakcode.dev">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
