import { useEffect, useState } from 'react'

const SKILLS_DATA = [
  {
    title: 'Languages',
    tags: ['Python', 'JavaScript', 'C / C++', 'HTML5', 'CSS3', 'Go']
  },
  {
    title: 'Frontend',
    tags: ['React.js', 'Angular', 'Tailwind CSS', 'Bootstrap', 'Bolt.new']
  },
  {
    title: 'Backend',
    tags: ['Node.js', 'Express.js', 'Django', 'Django REST', 'Flask']
  },
  {
    title: 'AI / ML / DL',
    tags: ['TensorFlow', 'Keras', 'CNN', 'OpenCV', 'scikit-learn', 'YOLO', 'NLP']
  },
  {
    title: 'Databases & Cloud',
    tags: ['MongoDB', 'MySQL', 'PostgreSQL', 'Cloudinary']
  },
  {
    title: 'Security & Tools',
    tags: ['Cryptography', 'Network Security', 'Git / GitHub', 'VS Code', 'Photoshop']
  }
]

export default function Skills() {
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

    const element = document.getElementById('skills')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <div id="skills" className="full-sec">
      <div className="full-inner">
        <div className={`sec-label reveal ${isVisible ? 'visible' : ''}`}>03 — Skill Set</div>
        <h2 className={`sec-title reveal ${isVisible ? 'visible' : ''}`}>Technologies &amp; Tools</h2>
        <div className={`skills-grid reveal ${isVisible ? 'visible' : ''}`}>
          {SKILLS_DATA.map((skill, idx) => (
            <div key={idx} className="sk-cat">
              <div className="sk-title">{skill.title}</div>
              <div className="sk-tags">
                {skill.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="sk-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
