import { useEffect, useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    badge: 'Freelance · Live',
    badgeClass: 'live',
    number: 'Project 001',
    title: 'Jan Kalyan Charitable Trust',
    description: 'Complete nonprofit website built end-to-end. Responsible for backend architecture, data modelling, REST API design, Cloudinary media integration, and direct client communication. Frontend prototyped with Bolt.new for rapid delivery.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Cloudinary', 'Bolt.new'],
    link: 'https://jkct.org',
    linkText: 'Visit Live Site',
    featured: true,
    ghostText: 'JKCT',
    url: 'jkct.org'
  },
  {
    id: 2,
    badge: 'AI · Computer Vision',
    badgeClass: 'ai',
    number: 'Project 002',
    title: 'Smart Traffic Violation Detector',
    description: 'AI-powered dashboard that detects and analyses traffic violation patterns in real-time using computer vision and YOLO object detection.',
    tags: ['Python', 'OpenCV', 'YOLO', 'Deep Learning', 'Dashboard'],
    link: 'https://github.com/Anshu370/smart-traffic-violation-pattern-detector-dashboard',
    linkText: 'View on GitHub'
  },
  {
    id: 3,
    badge: 'AI · Healthcare',
    badgeClass: 'ai',
    number: 'Project 003',
    title: 'Brain Tumor Detection',
    description: 'Deep learning CNN model for MRI-based brain tumor classification. Aids medical diagnosis with high-accuracy image analysis pipelines deployed via Flask.',
    tags: ['TensorFlow', 'CNN', 'Flask', 'Medical Imaging', 'Python'],
    link: 'https://github.com/Anshu370/Brain-Tumer-Detection',
    linkText: 'View on GitHub'
  },
  {
    id: 4,
    badge: 'AI · Visualization',
    badgeClass: 'ai',
    number: 'Project 004',
    title: 'AI Similar Image Visualizer',
    description: 'Uses AI embeddings and similarity search to find and visualize visually similar images from large datasets. Interactive explorer powered by vector search.',
    tags: ['Python', 'AI Embeddings', 'Vector Search', 'OpenCV'],
    link: 'https://github.com/Anshu370/AI_Similar_Image_Visualizer',
    linkText: 'View on GitHub'
  },
  {
    id: 5,
    badge: 'NLP · ML',
    badgeClass: 'ai',
    number: 'Project 005',
    title: 'Hate Speech Detection',
    description: 'NLP text classification system to detect hate speech and offensive language. Trained on real-world datasets with multiple ML classifiers compared.',
    tags: ['Python', 'NLP', 'scikit-learn', 'Text Classification', 'pandas'],
    link: 'https://github.com/Anshu370/Hate-Speech-Detection-Through-Text-Classification',
    linkText: 'View on GitHub'
  },
  {
    id: 6,
    badge: 'Security · Full Stack',
    badgeClass: 'cyber',
    number: 'Project 006',
    title: 'Retailer Shield',
    description: 'Security-focused full-stack application protecting retailers from cyber threats and fraud with real-time threat monitoring and alerts.',
    tags: ['MERN', 'Security', 'Fraud Detection', 'Node.js'],
    link: 'https://github.com/Anshu370/Retailer_Sheild',
    linkText: 'View on GitHub'
  },
  {
    id: 7,
    badge: 'Cryptography',
    badgeClass: 'cyber',
    number: 'Project 007',
    title: 'Encryption / Decryption Tool',
    description: 'Cryptography toolkit implementing AES, RSA and other algorithms. Supports symmetric and asymmetric encryption with a clean interactive interface.',
    tags: ['Python', 'Cryptography', 'AES', 'RSA'],
    link: 'https://github.com/Anshu370/Encryption-Decryption-Tool',
    linkText: 'View on GitHub'
  },
  {
    id: 8,
    badge: 'Real-time · E2E',
    badgeClass: 'web',
    number: 'Project 008',
    title: 'Mandal — E2E Chat App',
    description: 'Real-time end-to-end encrypted chat application with WebSocket support, message persistence, and secure JWT authentication.',
    tags: ['Node.js', 'Socket.io', 'MongoDB', 'E2E Encryption', 'React'],
    link: 'https://github.com/Anshu370/Mandal-End-to-End-Chat-Box',
    linkText: 'View on GitHub'
  },
  {
    id: 9,
    badge: 'Analytics · Monitoring',
    badgeClass: 'ai',
    number: 'Project 009',
    title: 'Telemetry Software',
    description: 'Data collection and telemetry analytics platform for monitoring system performance metrics with real-time visualisation dashboards.',
    tags: ['Python', 'Analytics', 'Real-time', 'Monitoring'],
    link: 'https://github.com/Anshu370/Telemetry-Software',
    linkText: 'View on GitHub'
  },
  {
    id: 10,
    badge: 'REST API · Backend',
    badgeClass: 'web',
    number: 'Project 010',
    title: 'Blog App — Django REST',
    description: 'Full-featured blog platform with Django REST Framework. JWT auth, CRUD, pagination and clean RESTful API design with PostgreSQL backend.',
    tags: ['Django', 'Django REST', 'JWT', 'PostgreSQL', 'Python'],
    link: 'https://github.com/Anshu370/Blog-Application-Django-Rest-Framework',
    linkText: 'View on GitHub'
  },
  {
    id: 11,
    badge: 'Integration · API',
    badgeClass: 'web',
    number: 'Project 011',
    title: 'Slack Connect',
    description: 'Slack integration and automation tool enabling custom workflows, smart notifications, and team collaboration enhancements via the Slack API.',
    tags: ['Node.js', 'Slack API', 'Webhooks', 'Automation'],
    link: 'https://github.com/Anshu370/Slack-Connect',
    linkText: 'View on GitHub'
  },
  {
    id: 12,
    badge: 'Full Stack',
    badgeClass: 'web',
    number: 'Project 012',
    title: 'PlayVerse',
    description: 'Full-stack entertainment platform featuring user profiles, content discovery, and an immersive gaming/media browsing experience.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://github.com/Anshu370/PlayVerse',
    linkText: 'View on GitHub'
  }
]

export default function Projects() {
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

    const element = document.getElementById('projects')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const featuredProject = PROJECTS[0]
  const regularProjects = PROJECTS.slice(1)

  return (
    <div id="projects" className="full-sec">
      <div className="full-inner">
        <div className={`sec-label reveal ${isVisible ? 'visible' : ''}`}>04 — Work</div>
        <h2 className={`sec-title reveal ${isVisible ? 'visible' : ''}`}>Featured Projects</h2>
        <div className={`proj-grid reveal ${isVisible ? 'visible' : ''}`}>

          {/* Featured Project */}
          <div className="pc pc-featured" style={{ cursor: 'default' }}>
            <div className="pf-content">
              <span className={`pc-badge ${featuredProject.badgeClass}`}>● {featuredProject.badge}</span>
              <div className="pc-num">{featuredProject.number}</div>
              <div className="pc-title">{featuredProject.title}</div>
              <div className="pc-desc">{featuredProject.description}</div>
              <div className="pc-tags">
                {featuredProject.tags.map((tag, idx) => (
                  <span key={idx} className="pc-tag">{tag}</span>
                ))}
              </div>
              <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" className="pc-link" style={{ cursor: 'none' }}>
                {featuredProject.linkText}
              </a>
            </div>
            <div className="pf-visual">
              <div className="pf-ghost">{featuredProject.ghostText}</div>
              <div className="pf-url">{featuredProject.url}</div>
            </div>
          </div>

          {/* Regular Projects */}
          {regularProjects.map(project => (
            <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="pc">
              <span className={`pc-badge ${project.badgeClass}`}>{project.badge}</span>
              <div className="pc-num">{project.number}</div>
              <div className="pc-title">{project.title}</div>
              <div className="pc-desc">{project.description}</div>
              <div className="pc-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="pc-tag">{tag}</span>
                ))}
              </div>
              <div className="pc-link">{project.linkText}</div>
            </a>
          ))}

          {/* GitHub Link Card */}
          <a href="https://github.com/Anshu370" target="_blank" rel="noopener noreferrer" className="pc" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '180px' }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '42px', fontWeight: 900, color: 'rgba(201,168,76,0.12)', marginBottom: '12px' }}>51+</div>
              <div className="pc-title" style={{ fontSize: '14px' }}>More on GitHub</div>
              <div className="pc-desc" style={{ fontSize: '11px', marginTop: '6px' }}>Explore all repositories →</div>
            </div>
          </a>

        </div>
      </div>
    </div>
  )
}
