import { useEffect, useRef, useState } from 'react'

interface IntroScreenProps {
  onComplete: () => void
}

const SCRIPTS = [
  { name: 'हिन्दी (Devanagari)',  letters: ['अ', 'न', 'स', 'ह', 'उ'] },
  { name: 'ਪੰਜਾਬੀ (Gurmukhi)',   letters: ['ਅ', 'ਨ', 'ਸ', 'ਹ', 'ਉ'] },
  { name: 'ગુજરાતી (Gujarati)',  letters: ['અ', 'ન', 'સ', 'હ', 'ઉ'] },
  { name: 'বাংলা (Bengali)',     letters: ['অ', 'ন', 'স', 'হ', 'উ'] },
  { name: 'অসমীয়া (Assamese)',  letters: ['অ', 'ন', 'স', 'হ', 'উ'] },
  { name: 'ଓଡ଼ିଆ (Odia)',        letters: ['ଅ', 'ନ', 'ସ', 'ହ', 'ଉ'] },
  { name: 'தமிழ் (Tamil)',       letters: ['அ', 'ன', 'ஸ', 'ஹ', 'உ'] },
  { name: 'తెలుగు (Telugu)',     letters: ['అ', 'న', 'స', 'హ', 'ఉ'] },
  { name: 'ಕನ್ನಡ (Kannada)',     letters: ['ಅ', 'ನ', 'ಸ', 'ಹ', 'ಉ'] },
  { name: 'മലയാളം (Malayalam)', letters: ['അ', 'ന', 'സ', 'ഹ', 'ഉ'] },
  { name: 'اردو (Urdu)',         letters: ['ا', 'ن', 'س', 'ہ', 'و'] },
  { name: 'कोंकणी (Konkani)',    letters: ['अ', 'न', 'स', 'ह', 'उ'] },
  { name: 'कश्मीरी (Kashmiri)',  letters: ['ا', 'ن', 'س', 'ہ', 'و'] },
  { name: 'سنڌي (Sindhi)',       letters: ['ا', 'ن', 'س', 'ہ', 'و'] },
  { name: 'डोगरी (Dogri)',       letters: ['अ', 'न', 'स', 'ह', 'उ'] },
  { name: 'मैथिली (Maithili)',   letters: ['अ', 'न', 'स', 'ह', 'उ'] },
  { name: 'ꯃꯤꯇꯩꯂꯣꯟ (Manipuri)', letters: ['ꯑ', 'ꯅ', 'ꯁ', 'ꯍ', 'ꯎ'] }
]

const ENGLISH = ['A', 'N', 'S', 'H', 'U']

type Phase = 'cycling' | 'locking' | 'locked'

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scriptIndex, setScriptIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('cycling')
  // For the locking phase: each letter's currently-displayed character + font
  const [lockChars, setLockChars] = useState<string[]>([...ENGLISH])
  const [lockedCount, setLockedCount] = useState(0)
  const [showSub, setShowSub] = useState(false)
  const [showRole, setShowRole] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [fade, setFade] = useState(false)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: any[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.45 + 0.1,
        g: Math.random() > 0.45,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.a -= 0.0005

        if (p.a <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.4 + 0.3,
            a: Math.random() * 0.45 + 0.1,
            g: Math.random() > 0.45,
          }
          return
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.g ? `rgba(201, 168, 76, ${p.a})` : `rgba(255, 255, 255, ${p.a * 0.45})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Phase 1: cycle through every script once, then move to locking
  useEffect(() => {
    if (phase !== 'cycling') return

    const interval = setInterval(() => {
      setScriptIndex(prev => {
        const next = prev + 1
        if (next >= SCRIPTS.length) {
          clearInterval(interval)
          setPhase('locking')
          return prev
        }
        return next
      })
    }, 400)

    return () => clearInterval(interval)
  }, [phase])

  // Phase 2: glitch-lock each letter to English, one at a time
  useEffect(() => {
    if (phase !== 'locking') return

    let cancelled = false
    const timers: number[] = []

    ENGLISH.forEach((_, i) => {
      const t = window.setTimeout(() => {
        if (cancelled) return
        let flips = 0
        const flipInterval = setInterval(() => {
          if (cancelled) {
            clearInterval(flipInterval)
            return
          }
          if (flips >= 12) {
            clearInterval(flipInterval)
            // settle this letter on its English character
            setLockChars(prev => {
              const next = [...prev]
              next[i] = ENGLISH[i]
              return next
            })
            setLockedCount(count => {
              const newCount = count + 1
              if (newCount === ENGLISH.length) {
                setPhase('locked')
              }
              return newCount
            })
            return
          }
          // alternate between the English letter and a random script's letter
          setLockChars(prev => {
            const next = [...prev]
            if (flips % 2 === 0) {
              next[i] = ENGLISH[i]
            } else {
              const rand = SCRIPTS[Math.floor(Math.random() * SCRIPTS.length)]
              next[i] = rand.letters[i]
            }
            return next
          })
          flips++
        }, 55)
      }, i * 180)
      timers.push(t)
    })

    return () => {
      cancelled = true
      timers.forEach(t => clearTimeout(t))
    }
  }, [phase])

  // Phase 3: when locked, reveal the subtitle / role / button
  useEffect(() => {
    if (phase !== 'locked') return
    const t1 = window.setTimeout(() => setShowSub(true), 500)
    const t2 = window.setTimeout(() => setShowRole(true), 1100)
    const t3 = window.setTimeout(() => setShowButton(true), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [phase])

  const handleEnter = () => {
    setFade(true)
    setTimeout(() => onComplete(), 950)
  }

  // Pick the letters currently displayed in each slot
  const displayed = phase === 'cycling'
    ? SCRIPTS[scriptIndex]?.letters ?? ENGLISH
    : phase === 'locking'
      ? lockChars
      : ENGLISH

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden cursor-none">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex gap-4 items-center justify-center">
        {ENGLISH.map((_, i) => {
          const isLocked = phase === 'locked' || (phase === 'locking' && i < lockedCount)
          return (
            <div
              key={i}
              className="w-[90px] h-[112px] flex items-center justify-center relative overflow-visible"
            >
              <span
                className={`text-[76px] font-bold text-white absolute leading-none select-none transition-colors duration-150 ${
                  isLocked ? "font-['Cinzel'] gold-glow" : ''
                }`}
                style={{ color: isLocked ? undefined : 'rgba(255,255,255,1)' }}
              >
                {displayed[i] ?? ENGLISH[i]}
              </span>
            </div>
          )
        })}
      </div>

      <div className="relative z-10 mt-3 font-['JetBrains_Mono'] text-[9px] tracking-[5px] text-[rgba(201,168,76,0.5)] uppercase h-[18px] transition-opacity duration-200">
        {phase === 'cycling' ? SCRIPTS[scriptIndex]?.name : ''}
      </div>

      <div className={`relative z-10 mt-[22px] font-['Outfit'] text-[11px] tracking-[10px] uppercase transition-colors duration-1000 ${showSub ? 'text-[rgba(201,168,76,0.8)]' : 'text-[rgba(201,168,76,0)]'}`}>
        Full Stack Developer
      </div>

      <div className={`relative z-10 mt-[6px] font-['JetBrains_Mono'] text-[9px] tracking-[3px] transition-colors duration-1000 ${showRole ? 'text-[rgba(255,255,255,0.3)]' : 'text-[rgba(255,255,255,0)]'}`}>
        // B.Tech CSE · Cyber Security · MERN
      </div>

      <button
        onClick={handleEnter}
        className={`relative z-10 mt-[44px] px-12 py-3 bg-transparent border border-[rgba(201,168,76,0.5)] text-[rgba(201,168,76,0.9)] font-['Cinzel'] text-[11px] tracking-[6px] uppercase cursor-none transition-all duration-800 hover:bg-[rgba(201,168,76,0.1)] hover:text-white ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        Enter Portfolio
      </button>

      <div className={`absolute inset-0 bg-black z-20 transition-opacity duration-900 ${fade ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
    </div>
  )
}
