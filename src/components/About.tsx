import { useEffect, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('about')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <div id="about" className="full-sec">
      <div className="full-inner">
        <div className="about-grid">
          <div className={`about-text reveal ${isVisible ? 'visible' : ''}`}>
            <div className="sec-label">02 — About</div>
            <h2 className="sec-title">Passionate about<br/>the craft of code</h2>
            <p>Pursuing <strong>B.Tech in Computer Science (Cyber Security)</strong>, driven by the boundless potential of technology — from elegant web apps to AI-powered systems.</p>
            <p>Proficient in <strong>Python, JavaScript, C/C++</strong>, I architect full MERN stack products, train ML/DL models, and build secure systems. I thrive where complexity meets creativity.</p>
            <p>I've shipped <strong>real-world freelance projects</strong> end-to-end — data modelling, backend design, cloud integration, and direct client interaction included.</p>
          </div>
          <div className={`about-stats reveal ${isVisible ? 'visible' : ''}`}>
            <div className="stat-box"><span className="stat-num">51+</span><span className="stat-lbl">GitHub Repos</span></div>
            <div className="stat-box"><span className="stat-num">MERN</span><span className="stat-lbl">Primary Stack</span></div>
            <div className="stat-box"><span className="stat-num">AI/ML</span><span className="stat-lbl">Deep Learning</span></div>
            <div className="stat-box"><span className="stat-num">CyberSec</span><span className="stat-lbl">Specialisation</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
