import { useEffect, useState } from 'react'

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Anshu370' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anshugupta370/' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/AnshuGupta' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/AnshuGupta370/' },
  { name: 'Dev.to', url: 'https://dev.to/anshugupta' },
  { name: 'Instagram', url: 'https://instagram.com/ag_silver_op' }
]

export default function Contact() {
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

    const element = document.getElementById('contact')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <div id="contact" className="full-sec">
      <div className="contact-inner">
        <div className={`gold-line reveal ${isVisible ? 'visible' : ''}`} />

        <div className={`sec-label reveal ${isVisible ? 'visible' : ''}`} style={{ justifyContent: 'center' }}>05 — Contact</div>

        <h2 className={`sec-title reveal ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
          Let's build something<br/>extraordinary
        </h2>

        <p className={`reveal ${isVisible ? 'visible' : ''}`} style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.85, marginBottom: '26px' }}>
          Open to freelance, collaborations, internships and full-time opportunities.<br/>Drop a message — I'd love to connect.
        </p>

        <a href="mailto:2k22.cscys.2212695@gmail.com" className={`contact-email reveal ${isVisible ? 'visible' : ''}`}>
          anshu.gupta.anshu2004@gmail.com
        </a>

        <div className={`socials reveal ${isVisible ? 'visible' : ''}`}>
          {SOCIAL_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="soc-link"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
