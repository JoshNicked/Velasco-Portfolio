import { useEffect, useRef, useState } from 'react'
import portfolioPic from './assets/portfolio_pic.jpg'
import cvFile from './assets/Velasco CV.pdf'
import './App.css'

const nameWords = 'Joshuaa Nickk Velasco'
const nameParts = nameWords.split(' ')
const stars = Array.from({ length: 96 }, (_, index) => ({
  id: index,
  '--left': `${(index * 37) % 100}%`,
  '--top': `${(index * 61) % 100}%`,
  '--size': `${index % 3 === 0 ? 2 : 1}px`,
  '--delay': `${(index % 11) * -0.45}s`,
  '--duration': `${2.8 + (index % 5) * 0.7}s`,
}))
const comets = [
  { id: 1, '--left': '12%', '--top': '18%', '--delay': '1s', '--duration': '8s' },
  { id: 2, '--left': '72%', '--top': '12%', '--delay': '4.5s', '--duration': '11s' },
  { id: 3, '--left': '58%', '--top': '62%', '--delay': '7s', '--duration': '13s' },
]

function App() {
  const [typingComplete, setTypingComplete] = useState(false)
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [typedWords, setTypedWords] = useState(() => nameParts.map(() => ''))
  const [visibleSections, setVisibleSections] = useState([])
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvModalClosing, setCvModalClosing] = useState(false)
  const [topbarVisible, setTopbarVisible] = useState(false)
  const heroRef = useRef(null)

  const openCvModal = () => {
    setCvModalClosing(false)
    setCvModalOpen(true)
  }

  const closeCvModal = () => {
    setCvModalClosing(true)
    window.setTimeout(() => {
      setCvModalOpen(false)
      setCvModalClosing(false)
    }, 220)
  }

  const handleHomeClick = (event) => {
    event.preventDefault()
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    let wordIndex = 0
    let characterIndex = 0
    const typingTimer = window.setInterval(() => {
      characterIndex += 1
      setTypedWords((currentWords) => {
        const nextWords = [...currentWords]
        nextWords[wordIndex] = nameParts[wordIndex].slice(0, characterIndex)
        return nextWords
      })

      if (characterIndex === nameParts[wordIndex].length) {
        if (wordIndex === nameParts.length - 1) {
          window.clearInterval(typingTimer)
          setTypingComplete(true)
          revealTimer = window.setTimeout(() => setPortraitVisible(true), 900)
        } else {
          wordIndex += 1
          characterIndex = 0
        }
      }
    }, 110)

    let revealTimer

    return () => {
      window.clearInterval(typingTimer)
      window.clearTimeout(revealTimer)
    }
  }, [])

  useEffect(() => {
    const heroObserver = new IntersectionObserver(([entry]) => {
      setTopbarVisible(!entry.isIntersecting)
    }, { threshold: 0 })

    if (heroRef.current) heroObserver.observe(heroRef.current)
    return () => heroObserver.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((current) => [...new Set([...current, entry.target.dataset.reveal])])
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.18 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="top">
      <nav className={`floating-topbar ${topbarVisible ? 'is-visible' : ''}`} aria-label="Main navigation" aria-hidden={!topbarVisible}>
        <a href="#top" onClick={handleHomeClick} tabIndex={topbarVisible ? 0 : -1}>Home</a>
        <a href="#about" tabIndex={topbarVisible ? 0 : -1}>About Me</a>
        <a href="#achievements" tabIndex={topbarVisible ? 0 : -1}>Achievements</a>
        <a href="#work" tabIndex={topbarVisible ? 0 : -1}>Projects</a>
        <a href="#contact" tabIndex={topbarVisible ? 0 : -1}>Contact</a>
      </nav>
      <div className="space-field" aria-hidden="true">
        {stars.map((star) => <i className="star" key={star.id} style={star} />)}
        {comets.map((comet) => <i className="comet" key={comet.id} style={comet} />)}
      </div>
      <section ref={heroRef} className={`hero ${portraitVisible ? 'hero-ready' : typingComplete ? 'hero-moving' : 'typing-only'}`} aria-label="Introduction">


        <div className="hero-content">
          <div className={`portrait-wrap ${portraitVisible ? 'is-visible' : ''}`}>
            <img
              src={portfolioPic}
              alt="Joshua Nick Velasco image"
            />
          </div>
          <div className="intro-copy">
            <p className="eyebrow"> qa tester + frontend developer</p>
            <h1>
              {typedWords.map((word, index) => (
                <span className="name-line" key={nameParts[index]}>{word}</span>
              ))}
            </h1>
            <div className="hero-social-links" aria-label="Social links">
              <a className="hero-social-link" data-tooltip="Open LinkedIn" href="https://www.linkedin.com/in/joshua-nick-velasco" target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.85c0-3.76-2.01-5.51-4.7-5.51-2.16 0-3.12 1.19-3.66 2.02V8.5H9.15V21h3.49v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.87 2.02 3.32V21H21v-7.15Z" /></svg>
              </a>
              <a className="hero-social-link" data-tooltip="Open GitHub" href="https://github.com/JoshNicked" target="_blank" rel="noreferrer" aria-label="Open GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.69c-2.65.58-3.21-1.13-3.21-1.13-.44-1.1-1.06-1.39-1.06-1.39-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.85 1.46 2.23 1.04 2.77.8.09-.62.33-1.04.6-1.28-2.12-.24-4.35-1.06-4.35-4.71 0-1.04.37-1.89.99-2.56-.1-.24-.43-1.21.09-2.52 0 0 .81-.26 2.62.98a9.1 9.1 0 0 1 4.76 0c1.81-1.24 2.62-.98 2.62-.98.52 1.31.19 2.28.09 2.52.62.67.99 1.52.99 2.56 0 3.66-2.23 4.47-4.36 4.71.34.29.64.86.64 1.74v2.58c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>
              </a>
              <button className="hero-social-link" data-tooltip="Download CV" type="button" onClick={openCvModal} aria-label="Download CV">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8.1L19.5 8v13.5H6V2.5Zm7.5 1.8v4.9h4.4l-4.4-4.9ZM8.5 12h8v1.5h-8V12Zm0 3h8v1.5h-8V15Z" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hero-footer"><span>Pangasinan, Philippines</span></div>
      </section>

      <section className={`about-section ${visibleSections.includes('about') ? 'is-revealed' : ''}`} id="about" data-reveal="about">
        <span id="achievements" className="anchor-target" aria-hidden="true" />
        <div className="section-heading"><p className="eyebrow">about me</p></div>
        <div className="about-grid">
          <h2>I’m a passionate <b>Frontend Developer</b> who enjoys solving problems, creating aesthetically pleasing user interfaces and easy to understand user experiences.</h2>
          <div className="about-details">
            <p>I build thoughtful digital experiences with an eye for clarity, interaction, and the small details that make products feel human.</p>
            <div className="tech-stack-area">
              <div className="stack-group">
                <p className="stack-label">Technologies &amp; tools</p>
                <div className="stack-space" aria-label="Space for technologies and tools" />
              </div>
              <div className="stack-group">
                <p className="stack-label">Programming languages</p>
                <div className="stack-space" aria-label="Space for programming languages" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {cvModalOpen && (
        <div className={`cv-modal-backdrop ${cvModalClosing ? 'is-closing' : ''}`} role="presentation" onClick={closeCvModal}>
          <div className={`cv-modal ${cvModalClosing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="cv-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="cv-modal-close" type="button" onClick={closeCvModal} aria-label="Close dialog">&times;</button>
            <h2 id="cv-modal-title">Are you sure you want to download the CV</h2>
            <div className="cv-modal-actions">
              <button className="cv-modal-button cv-modal-button-secondary" type="button" onClick={closeCvModal}>No</button>
              <a className="cv-modal-button cv-modal-button-primary" href={cvFile} download="Velasco CV.pdf" onClick={closeCvModal}>Yes</a>
            </div>
          </div>
        </div>
      )}

      <section className={`work-section ${visibleSections.includes('work') ? 'is-revealed' : ''}`} id="work" data-reveal="work">
        <div className="section-heading"><p className="eyebrow">Selected work</p><span>(03)</span></div>
        <div className="project-list">
          <article className="project project-sage"><div className="project-visual"><span>01</span><strong>Field<br />notes</strong></div><div className="project-meta"><h2>Field Notes</h2><p>Brand world / Digital experience</p><span>2025</span></div></article>
          <article className="project project-coral"><div className="project-visual"><span>02</span><strong>Soft<br />systems</strong></div><div className="project-meta"><h2>Soft Systems</h2><p>Product design / Direction</p><span>2024</span></div></article>
          <article className="project project-blue"><div className="project-visual"><span>03</span><strong>Good<br />company</strong></div><div className="project-meta"><h2>Good Company</h2><p>Campaign / Editorial</p><span>2024</span></div></article>
        </div>
      </section>

      <footer id="contact" className={`site-footer ${visibleSections.includes('footer') ? 'is-revealed' : ''}`} data-reveal="footer"><a href="mailto:hello@example.com">hello@example.com</a><div className="social-links"><a href="#work">Work</a><a href="#top">Instagram</a><a href="#top">LinkedIn</a></div></footer>
    </main>
  )
}

export default App
