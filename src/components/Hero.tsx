export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-start justify-center relative overflow-hidden">
      <div
        id="hero-bg"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 50%,rgba(201,168,76,.055) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 15% 80%,rgba(201,168,76,.03) 0%,transparent 60%)`
        }}
      />

      <div className="hero-ghost">AG</div>

      <div
        className="hero-tag"
        style={{ animation: 'fadeUp .8s ease .3s forwards' }}
      >
        01 — Available for opportunities
      </div>

      <h1
        className="hero-name"
        style={{ animation: 'fadeUp .9s ease .5s forwards' }}
      >
        Anshu<br/><span>Gupta</span>
      </h1>

      <p
        className="hero-desc"
        style={{ animation: 'fadeUp .8s ease .8s forwards' }}
      >
        Full Stack Developer · AI/ML Enthusiast · Cyber Security student.<br/>Building production-grade digital experiences — from backend architecture to intelligent interfaces.
      </p>

      <div
        className="hero-btns"
        style={{ animation: 'fadeUp .8s ease 1s forwards' }}
      >
        <a href="#projects" className="btn-p">View Work</a>
        <a href="#contact" className="btn-g">Get in Touch</a>
      </div>

      <div
        className="hero-scroll"
        style={{ animation: 'fadeUp .8s ease 1.4s forwards' }}
      >
        Scroll to explore
      </div>
    </section>
  )
}
