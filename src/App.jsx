import { useEffect, useRef, useState } from "react";
import portfolioPic from "./assets/portfolio_pic.jpg";
import cvFile from "./assets/Velasco CV.pdf";
import certificateImage from "./assets/certify.png";
import JellyRadio from "./JellyRadio";
import FlipCard from "./FlipCard";
import "./App.css";

const nameWords = "Joshuaa Nickk Velasco";
const nameParts = nameWords.split(" ");
const stars = Array.from({ length: 96 }, (_, index) => ({
  id: index,
  "--left": `${(index * 37) % 100}%`,
  "--top": `${(index * 61) % 100}%`,
  "--size": `${index % 3 === 0 ? 0.125 : 0.0625}rem`,
  "--delay": `${(index % 11) * -0.45}s`,
  "--duration": `${2.8 + (index % 5) * 0.7}s`,
}));
const comets = [
  {
    id: 1,
    "--left": "12%",
    "--top": "18%",
    "--delay": "1s",
    "--duration": "8s",
  },
  {
    id: 2,
    "--left": "72%",
    "--top": "12%",
    "--delay": "4.5s",
    "--duration": "11s",
  },
  {
    id: 3,
    "--left": "58%",
    "--top": "62%",
    "--delay": "7s",
    "--duration": "13s",
  },
];

const navItems = [
  { value: "top", label: "Home" },
  { value: "about", label: "About Me" },
  { value: "experience", label: "Experience" },
  { value: "work", label: "Projects" },
  { value: "contact", label: "Contact" },
];

const stackGroups = [
  {
    label: "Technologies & tools",
    items: [
      ["GitHub"],
      ["React"],
      ["Vite"],
      ["MERN Stack"],
      ["MongoDB"],
      ["AWS"],
      ["Flutter"],
      ["Visual Studio Code"],
      ["Android Studio"],
    ],
  },
  {
    label: "Programming languages",
    items: [["Python"], ["Java"], ["JavaScript"], ["C#"], ["Dart"], ["Kotlin"]],
  },
  {
    label: "Skills",
    items: [
      ["Adaptable"],
      ["Punctual"],
      ["Efficient"],
      ["Cooperative"],
      ["Team-Oriented"],
      ["Responsible"],
    ],
  },
];

function StackCarousel({ label, items }) {
  return (
    <div className="stack-group">
      <p className="stack-label">{label}</p>
      <div className="stack-space" aria-label={`${label} list`}>
        {items.map(([name], index) => (
          <span className="stack-item" key={`${name}-${index}`}>
            <span className="stack-item-name">{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [portraitVisible, setPortraitVisible] = useState(false);
  const [typedWords, setTypedWords] = useState(() => nameParts.map(() => ""));
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvModalClosing, setCvModalClosing] = useState(false);
  const [topbarVisible, setTopbarVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("top");
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [aboutHasBeenViewed, setAboutHasBeenViewed] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const openCvModal = () => {
    setCvModalClosing(false);
    setCvModalOpen(true);
  };

  const closeCvModal = () => {
    setCvModalClosing(true);
    window.setTimeout(() => {
      setCvModalOpen(false);
      setCvModalClosing(false);
    }, 220);
  };

  const handleNavChange = (value) => {
    setActiveNav(value);
    const target = document.getElementById(value);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else if (value === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = value === "work" ? "projects" : value;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    let wordIndex = 0;
    let characterIndex = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedWords((currentWords) => {
        const nextWords = [...currentWords];
        nextWords[wordIndex] = nameParts[wordIndex].slice(0, characterIndex);
        return nextWords;
      });

      if (characterIndex === nameParts[wordIndex].length) {
        if (wordIndex === nameParts.length - 1) {
          window.clearInterval(typingTimer);
          setTypingComplete(true);
          revealTimer = window.setTimeout(() => setPortraitVisible(true), 900);
        } else {
          wordIndex += 1;
          characterIndex = 0;
          setTypingWordIndex(wordIndex);
        }
      }
    }, 110);

    let revealTimer;

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setTopbarVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    return () => heroObserver.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((current) => [
              ...new Set([...current, entry.target.dataset.reveal]),
            ]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const aboutSection = aboutRef.current;
    if (!aboutSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAboutInView(entry.isIntersecting);
        if (entry.isIntersecting) setAboutHasBeenViewed(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observedSections = [
      { id: "top", element: heroRef.current },
      { id: "about", element: document.getElementById("about") },
      { id: "work", element: document.getElementById("work") },
      { id: "contact", element: document.getElementById("contact") },
    ].filter((section) => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        if (visible[0]) {
          const current = observedSections.find(
            (section) => section.element === visible[0].target,
          );
          if (current) setActiveNav(current.id);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-18% 0px -45% 0px" },
    );

    observedSections.forEach((section) => observer.observe(section.element));
    return () => observer.disconnect();
  }, []);

  const navigationVisible = topbarVisible || activeNav !== "top";

  return (
    <main>
      <nav
        className={`floating-topbar ${navigationVisible ? "is-visible" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!navigationVisible}
      >
        <JellyRadio
          items={navItems}
          value={activeNav}
          onChange={handleNavChange}
          ariaLabel="Main navigation"
        />
      </nav>
      <div className="space-field" aria-hidden="true">
        {stars.map((star) => (
          <i className="star" key={star.id} style={star} />
        ))}
        {comets.map((comet) => (
          <i className="comet" key={comet.id} style={comet} />
        ))}
      </div>
      <section
        id="top"
        ref={heroRef}
        className={`hero ${portraitVisible ? "hero-ready" : typingComplete ? "hero-moving" : "typing-only"}`}
        aria-label="Introduction"
      >
        <div className="hero-content">
          <div
            className={`portrait-wrap ${portraitVisible ? "is-visible" : ""}`}
          >
            <img src={portfolioPic} alt="Joshua Nick Velasco image" />
          </div>
          <div className="intro-copy">
            <p className="eyebrow">
              {" "}
              qa tester + frontend developer + software developer
            </p>
            <h1>
              {typedWords.map((word, index) => (
                <span className="name-line" key={nameParts[index]}>
                  {word}
                  {((!typingComplete && index === typingWordIndex) ||
                    (typingComplete && index === nameParts.length - 1)) && (
                    <span
                      className={`typing-cursor ${typingComplete ? "is-final" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </span>
              ))}
            </h1>
            <div className="hero-action-row">
              <div className="hero-social-links" aria-label="Social links">
                <a
                  className="hero-social-link"
                  data-tooltip="Open LinkedIn"
                  href="https://www.linkedin.com/in/joshua-nick-velasco"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.85c0-3.76-2.01-5.51-4.7-5.51-2.16 0-3.12 1.19-3.66 2.02V8.5H9.15V21h3.49v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.87 2.02 3.32V21H21v-7.15Z" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  data-tooltip="Open GitHub"
                  href="https://github.com/JoshNicked"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.69c-2.65.58-3.21-1.13-3.21-1.13-.44-1.1-1.06-1.39-1.06-1.39-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.85 1.46 2.23 1.04 2.77.8.09-.62.33-1.04.6-1.28-2.12-.24-4.35-1.06-4.35-4.71 0-1.04.37-1.89.99-2.56-.1-.24-.43-1.21.09-2.52 0 0 .81-.26 2.62.98a9.1 9.1 0 0 1 4.76 0c1.81-1.24 2.62-.98 2.62-.98.52 1.31.19 2.28.09 2.52.62.67.99 1.52.99 2.56 0 3.66-2.23 4.47-4.36 4.71.34.29.64.86.64 1.74v2.58c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
                  </svg>
                </a>
                <button
                  className="hero-social-link"
                  data-tooltip="Download CV"
                  type="button"
                  onClick={openCvModal}
                  aria-label="Download CV"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 2.5h8.1L19.5 8v13.5H6V2.5Zm7.5 1.8v4.9h4.4l-4.4-4.9ZM8.5 12h8v1.5h-8V12Zm0 3h8v1.5h-8V15Z" />
                  </svg>
                </button>
              </div>
              <button
                className="hero-project-link"
                type="button"
                onClick={() => handleNavChange("work")}
                aria-label="Go to projects"
              >
                <span>Projects</span>
                <span className="hero-project-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <span>Pangasinan, Philippines</span>
        </div>
      </section>

      <section
        ref={aboutRef}
        className={`about-section ${visibleSections.includes("about") ? "is-revealed" : ""} ${aboutHasBeenViewed && visibleSections.includes("about") ? "about-has-been-viewed" : ""} ${aboutInView ? "about-is-visible" : ""}`}
        id="about"
        data-reveal="about"
      >
        <div className="section-heading">
          <p className="eyebrow">about me</p>
        </div>
        <div className="about-page-content">
          <div className="about-grid">
            <div className="about-intro-block">
              <h2>
                I’m a passionate <i>developer</i> who enjoys solving problems,
                creating intuitive UI/UX, and building efficient systems for web
                and mobile platforms.
              </h2>
              <div className="stack-group about-hobbies">
                <p className="stack-label">Hobbies</p>
                <div className="stack-space" aria-label="Hobbies list">
                  {[
                    "Gaming",
                    "Chess",
                    "Photography",
                    "Problem Solving",
                    "Learning",
                  ].map((hobby) => (
                    <span className="stack-item" key={hobby}>
                      <span className="stack-item-name">{hobby}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-details">
              <p>
                I keep on learning, improving and exploring new technologies
                everyday.
              </p>
              <div className="tech-stack-area">
                {stackGroups.map((group) => (
                  <StackCarousel key={group.label} {...group} />
                ))}
              </div>
            </div>
          </div>
          <blockquote className="about-quote">
            <p>
              “Do the best you can until you know better. Then when you know
              better, do better.”
            </p>
            <cite>— Maya Angelou</cite>
          </blockquote>
        </div>
      </section>

      <section
        className={`experience-section ${visibleSections.includes("experience") ? "is-revealed" : ""}`}
        id="experience"
        data-reveal="experience"
      >
        <div className="experience-inner">
          <div className="section-heading">
            <p className="eyebrow">Experience & achievements</p>
            <span>(02)</span>
          </div>
          <div className="experience-card-grid">
            <FlipCard
              className="experience-card"
              front={
                <div className="flip-card__content achievement-face">
                  <div>
                    <p className="flip-card__eyebrow">Achievements</p>
                    <h3>Current progress</h3>
                    <div className="achievement-details">
                      <p>
                        <strong>Currently studying in college</strong>
                        <br />
                        Continuing to grow through academic work, practice, and
                        new challenges.
                      </p>
                      <div className="certificate-panel">
                        <p className="certificate-label">Certifications</p>
                        <p>
                          Earn a certificate by completing focused training,
                          passing the required assessment, and submitting the
                          certification requirements.
                        </p>
                        <button
                          className="certificate-preview"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setCertificateModalOpen(true);
                          }}
                          aria-label="View certificate larger"
                        >
                          <img
                            src={certificateImage}
                            alt="Certificate preview"
                          />
                        </button>
                        <span className="certificate-hint">
                          Click certificate to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="flip-card__hint">
                    Click to view work experience
                  </p>
                </div>
              }
              back={
                <div className="flip-card__content experience-face">
                  <div className="experience-error-page">
                    <p className="experience-error-code">404</p>
                    <h3>Not Found</h3>
                    <p className="experience-error-message">
                      eager to learn for experience
                    </p>
                  </div>
                  <p className="flip-card__hint">Click to view achievements</p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {certificateModalOpen && (
        <div
          className="certificate-modal-backdrop"
          role="presentation"
          onClick={() => setCertificateModalOpen(false)}
        >
          <div
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="certificate-modal-close"
              type="button"
              onClick={() => setCertificateModalOpen(false)}
              aria-label="Close certificate preview"
            >
              &times;
            </button>
            <img src={certificateImage} alt="Certificate" />
          </div>
        </div>
      )}

      {cvModalOpen && (
        <div
          className={`cv-modal-backdrop ${cvModalClosing ? "is-closing" : ""}`}
          role="presentation"
          onClick={closeCvModal}
        >
          <div
            className={`cv-modal ${cvModalClosing ? "is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cv-modal-close"
              type="button"
              onClick={closeCvModal}
              aria-label="Close dialog"
            >
              &times;
            </button>
            <h2 id="cv-modal-title">
              Are you sure you want to download my CV?
            </h2>
            <div className="cv-modal-actions">
              <button
                className="cv-modal-button cv-modal-button-secondary"
                type="button"
                onClick={closeCvModal}
              >
                No
              </button>
              <a
                className="cv-modal-button cv-modal-button-primary"
                href={cvFile}
                download="Velasco CV.pdf"
                onClick={closeCvModal}
              >
                Yes
              </a>
            </div>
          </div>
        </div>
      )}

      <section
        className={`work-section ${visibleSections.includes("work") ? "is-revealed" : ""}`}
        id="work"
        data-reveal="work"
      >
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <span>(03)</span>
        </div>
        <div className="project-list">
          <article className="project project-sage">
            <div className="project-visual">
              <span>01</span>
              <strong>
                Field
                <br />
                notes
              </strong>
            </div>
            <div className="project-meta">
              <h2>Field Notes</h2>
              <p>Brand world / Digital experience</p>
              <span>2025</span>
            </div>
          </article>
          <article className="project project-coral">
            <div className="project-visual">
              <span>02</span>
              <strong>
                Soft
                <br />
                systems
              </strong>
            </div>
            <div className="project-meta">
              <h2>Soft Systems</h2>
              <p>Product design / Direction</p>
              <span>2024</span>
            </div>
          </article>
          <article className="project project-blue">
            <div className="project-visual">
              <span>03</span>
              <strong>
                Good
                <br />
                company
              </strong>
            </div>
            <div className="project-meta">
              <h2>Good Company</h2>
              <p>Campaign / Editorial</p>
              <span>2024</span>
            </div>
          </article>
        </div>
      </section>

      <footer
        id="contact"
        className={`site-footer ${visibleSections.includes("footer") ? "is-revealed" : ""}`}
        data-reveal="footer"
      >
        <a href="mailto:hello@example.com">hello@example.com</a>
        <div className="social-links">
          <a href="#work">Work</a>
          <a href="#top">Instagram</a>
          <a href="#top">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
