import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import portfolioPic from "./assets/portfolio_pic.jpg";
import cvFile from "./assets/Velasco CV.pdf";
import certificateImage from "./assets/certify.png";
import floodWatchLogo from "./assets/floodwatch/Flood-Watch.png";
import floodWatch1 from "./assets/floodwatch/floodwatch1.jpg";
import floodWatch2 from "./assets/floodwatch/floodwatch2.jpg";
import floodWatch3 from "./assets/floodwatch/floodwatch3.png";
import floodWatch4 from "./assets/floodwatch/floodwatch4.png";
import floodWatch5 from "./assets/floodwatch/floodwatch5.png";
import auriSignLogo from "./assets/aurisign/AuriSign.png";
import auriSign1 from "./assets/aurisign/aurisign1.png";
import auriSign2 from "./assets/aurisign/aurisign2.png";
import auriSign3 from "./assets/aurisign/aurisign3.png";
import auriSign4 from "./assets/aurisign/aurisign4.jpg";
import auriSign5 from "./assets/aurisign/aurisign5.png";
import aslSignH from "./assets/aurisign/signs/h.png";
import aslSignI from "./assets/aurisign/signs/i.png";
import aslSignR from "./assets/aurisign/signs/r.png";
import aslSignE from "./assets/aurisign/signs/e.png";
import aslSignM from "./assets/aurisign/signs/m.png";
import myCrewManagerLogo from "./assets/mycrewmanager/My-Crew-Manager.png";
import myCrew1 from "./assets/mycrewmanager/mycrewmanager1.png";
import myCrew2 from "./assets/mycrewmanager/mycrewmanager2.png";
import myCrew3 from "./assets/mycrewmanager/mycrewmanager3.png";
import myCrew4 from "./assets/mycrewmanager/mycrewmanager4.png";
import myCrew5 from "./assets/mycrewmanager/mycrewmanager5.png";
import JellyRadio from "./JellyRadio";
import FlipCard from "./FlipCard";
import FolderFloat from "./FolderFloat";
import "./App.css";

const nameWords = "Joshuaa Nickk Velasco";
const nameParts = nameWords.split(" ");
const contactEmail = "velasco.joshuanick@gmail.com";
const maxContactMessageLength = 5000;
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
const contactComets = [
  { id: 1, "--left": "8%", "--top": "24%", "--delay": "0s" },
  { id: 2, "--left": "31%", "--top": "68%", "--delay": "0.9s" },
  { id: 3, "--left": "52%", "--top": "14%", "--delay": "1.8s" },
  { id: 4, "--left": "76%", "--top": "43%", "--delay": "2.7s" },
  { id: 5, "--left": "91%", "--top": "78%", "--delay": "3.6s" },
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
    items: [
      ["Python"], 
      ["Java"], 
      ["JavaScript"], 
      ["TypeScript"], 
      ["C#"], 
      ["Dart"], 
      ["Kotlin"],
    ],
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

const IMAGE_MAX_RETRIES = 2;

function ProjectShot({ src, alt }) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setStatus("loaded");
    }
  }, []);

  const handleError = () => {
    if (attempt < IMAGE_MAX_RETRIES) {
      setAttempt((current) => current + 1);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  };

  const retry = () => {
    setAttempt((current) => current + 1);
    setStatus("loading");
  };

  const imageSrc = attempt > 0 ? `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}` : src;

  return (
    <span className={`project-modal-shot is-${status}`}>
      {status !== "error" && (
        <img
          key={imageSrc}
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          onLoad={() => setStatus("loaded")}
          onError={handleError}
        />
      )}
      {status === "loading" && (
        <span className="project-modal-shot-loader" role="status" aria-label="Loading image">
          <span className="project-modal-spinner" />
        </span>
      )}
      {status === "error" && (
        <span className="project-modal-shot-error" role="alert">
          <span>Image could not be loaded.</span>
          <button type="button" onClick={retry}>Try again</button>
        </span>
      )}
    </span>
  );
}

function ProjectGallery({ title, images }) {
  return (
    <div className="project-modal-image" tabIndex={0} aria-label={`${title} screenshots`}>
      {images.map((src, i) => (
        <ProjectShot key={src} src={src} alt={`${title} screenshot ${i + 1}`} />
      ))}
    </div>
  );
}

const aslSignImages = {
  H: aslSignH,
  I: aslSignI,
  R: aslSignR,
  E: aslSignE,
  M: aslSignM,
};

function SignLetterCard({ letter }) {
  return (
    <span className={`project-modal-sign-card project-modal-sign-card--${letter.toLowerCase()}`}>
      <img src={aslSignImages[letter]} alt={`${letter} in ASL fingerspelling`} />
    </span>
  );
}

function App() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [portraitVisible, setPortraitVisible] = useState(false);
  const [typedWords, setTypedWords] = useState(() => nameParts.map(() => ""));
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const contactSectionRef = useRef(null);
  const [contactHasBeenViewed, setContactHasBeenViewed] = useState(false);
  const [contactAnimationActive, setContactAnimationActive] = useState(false);
  const [contactAnimationComplete, setContactAnimationComplete] = useState(false);
  const [contactSectionInView, setContactSectionInView] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvModalClosing, setCvModalClosing] = useState(false);
  const [topbarVisible, setTopbarVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("top");
  const heroRef = useRef(null);
  const navTargetRef = useRef(null);
  const aboutRef = useRef(null);
  const [aboutHasBeenViewed, setAboutHasBeenViewed] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificateModalClosing, setCertificateModalClosing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalClosing, setProjectModalClosing] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalClosing, setContactModalClosing] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState("");
  const [contactErrors, setContactErrors] = useState({});
  const [contactCaptchaToken, setContactCaptchaToken] = useState("");
  const contactTriggerRef = useRef(null);
  const contactDialogRef = useRef(null);
  const contactNameRef = useRef(null);
  const contactEmailRef = useRef(null);
  const contactCaptchaRef = useRef(null);

  const projectDetails = {
    "flood-watch": {
      theme: "flood-watch",
      logo: floodWatchLogo,
      title: "Flood Watch",
      role: "Worked as Frontend Developer",
      category: "Mobile app / Flood monitoring",
      images: [floodWatch1, floodWatch2, floodWatch3, floodWatch4, floodWatch5],
      description:
        "A Flutter-based mobile application designed to help its users within Brgy. Bonuan Boquig to stay informed about flood conditions and water levels of the area. It combines data from Arduino sensors, and historical flood data to determine and update the current flood levels and future predictions. ",
      tags: ["Alerts", "Monitoring", "Analytics"],
    },
    aurisign: {
      theme: "aurisign",
      logo: auriSignLogo,
      title: "AuriSign",
      role: "Worked as Frontend Developer",
      description:
        "An educational cross-platform application that utilizes gesture recognition to assist individual on learning Filipino Sign Language. It contains learning modules on the different FSL signs, and a gesture recognition feature that allows the user to test their knowledge on the learned signs.",
      category: "Product app / Digital signing",
      images: [auriSign1, auriSign2, auriSign3, auriSign4, auriSign5],
      tags: ["Gesture Recognition", "Cross Platform", "Media Pipeline"],
    },
    "my-crew-manager": {
      theme: "my-crew-manager",
      logo: myCrewManagerLogo,
      title: "My Crew Manager",
      role: "Worked as QA Tester",
      category: "Web app / Project management",
      images: [myCrew1, myCrew2, myCrew3, myCrew4, myCrew5],
      description:
        "An application that helps organizations and groups to meet their deadline in time. This is by setting up kanban boards for the developers to stay motivated in finishing the project at hand. Moreover, all of this is possible through the use of artificial intelligence that aids the group to finish their projects on time. ",
      tags: ["Scheduling", "Coordination", "Management"],
    },
  };

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

  const closeCertificateModal = () => {
    setCertificateModalClosing(true);
    window.setTimeout(() => {
      setCertificateModalOpen(false);
      setCertificateModalClosing(false);
    }, 220);
  };

  const closeProjectModal = () => {
    if (projectModalClosing) return;
    setProjectModalClosing(true);
    window.setTimeout(() => {
      setSelectedProject(null);
      setProjectModalClosing(false);
    }, 220);
  };

  const projectModalOpen = Boolean(selectedProject);
  const handleWorkPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const folder = event.currentTarget.querySelector(".folder-float");
    if (!folder) return;

    if (folder.classList.contains("is-open")) {
      folder.style.setProperty("--magnet-x", "0px");
      folder.style.setProperty("--magnet-y", "0px");
      return;
    }

    const sectionBounds = event.currentTarget.getBoundingClientRect();
    const folderBounds = folder.getBoundingClientRect();
    const offsetX =
      (event.clientX - (folderBounds.left + folderBounds.width / 2)) /
      (sectionBounds.width / 2);
    const offsetY =
      (event.clientY - (folderBounds.top + folderBounds.height / 2)) /
      (sectionBounds.height / 2);
    const clamp = (value) => Math.max(-1, Math.min(1, value));

    folder.style.setProperty("--magnet-x", `${clamp(offsetX) * 10}px`);
    folder.style.setProperty("--magnet-y", `${clamp(offsetY) * 8}px`);
  };
  const handleWorkPointerLeave = (event) => {
    const folder = event.currentTarget.querySelector(".folder-float");
    folder?.style.setProperty("--magnet-x", "0px");
    folder?.style.setProperty("--magnet-y", "0px");
  };

  useEffect(() => {
    Object.values(projectDetails).forEach((project) => {
      project.images?.forEach((src) => {
        new Image().src = src;
      });
    });
  }, []);

  useEffect(() => {
    if (!projectModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        document.querySelector(".project-modal-close")?.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectModalOpen]);

  const openContactModal = (event) => {
    contactTriggerRef.current = event.currentTarget;
    setContactModalClosing(false);
    setContactResult("");
    setContactErrors({});
    setContactCaptchaToken("");
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    if (contactModalClosing) return;
    setContactModalClosing(true);
    window.setTimeout(() => {
      setContactModalOpen(false);
      setContactModalClosing(false);
      contactTriggerRef.current?.focus();
    }, 220);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const captchaResponse = contactCaptchaToken.trim();
    const errors = {};

    if (!name) errors.name = "Please enter your name.";
    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (contactEmailRef.current?.validity.typeMismatch) {
      errors.email = "Please enter a valid email address.";
    }
    if (!subject) errors.subject = "Please enter a subject.";
    if (!message) errors.message = "Please enter a message.";
    if (message.length > maxContactMessageLength) {
      errors.message = `Please keep your message under ${maxContactMessageLength.toLocaleString()} characters.`;
    }
    if (!captchaResponse) errors.captcha = "Please complete the security check.";

    setContactErrors(errors);
    setContactResult("");
    if (Object.keys(errors).length > 0) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setContactResult("error");
      return;
    }

    formData.set("access_key", accessKey);
    formData.set("name", name);
    formData.set("email", email);
    formData.set("replyto", email);
    formData.set("subject", subject);
    formData.set("message", message);
    formData.set("h-captcha-response", captchaResponse);

    setContactSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setContactResult("success");
    } catch {
      setContactResult("error");
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleCaptchaVerify = (token) => {
    setContactCaptchaToken(token || "");
    setContactErrors((current) => ({ ...current, captcha: "" }));
  };

  const handleCaptchaFailure = () => {
    setContactCaptchaToken("");
    setContactErrors((current) => ({
      ...current,
      captcha: "Unable to load the security check. Please refresh and try again.",
    }));
  };

  const handleCaptchaExpire = () => {
    setContactCaptchaToken("");
    setContactErrors((current) => ({
      ...current,
      captcha: "Please complete the security check again.",
    }));
  };

  const clearContactFeedback = (field) => {
    setContactErrors((current) => ({ ...current, [field]: "" }));
    setContactResult("");
  };

  useEffect(() => {
    if (!contactModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactNameRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        contactDialogRef.current
          ?.querySelector(".contact-modal-close")
          ?.click();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = Array.from(
        contactDialogRef.current?.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled])',
        ) || [],
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactModalOpen]);

  const handleNavChange = (value) => {
    navTargetRef.current = value;
    setActiveNav(value);

    if (value === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const target = document.getElementById(value);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }

    window.location.hash = value === "work" ? "projects" : value;
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
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = contactSectionRef.current;
    if (!section) return undefined;

    let hasStartedAnimation = false;
    let startTimer;
    let animationTimer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactSectionInView(entry.isIntersecting);
        if (!entry.isIntersecting || hasStartedAnimation) return;

        hasStartedAnimation = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setContactHasBeenViewed(true);
          setContactAnimationComplete(true);
          return;
        }

        startTimer = window.setTimeout(() => {
          setContactHasBeenViewed(true);
          setContactAnimationActive(true);
          animationTimer = window.setTimeout(
            () => {
              setContactAnimationActive(false);
              setContactAnimationComplete(true);
            },
            3400,
          );
        }, 250);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(startTimer);
      window.clearTimeout(animationTimer);
    };
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
      { id: "experience", element: document.getElementById("experience") },
      { id: "work", element: document.getElementById("work") },
      { id: "contact", element: document.getElementById("contact") },
    ].filter((section) => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        if (navTargetRef.current) return;
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

    // Release the click-navigation lock once the destination is reached,
    // or when the user takes over scrolling manually.
    const releaseLock = () => {
      if (!navTargetRef.current) return;
      navTargetRef.current = null;
      const marker = window.innerHeight * 0.18;
      const current = observedSections
        .filter((section) => section.element.getBoundingClientRect().top <= marker + 1)
        .pop();
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const last = observedSections[observedSections.length - 1];
      const next = atBottom ? last : current;
      if (next) setActiveNav(next.id);
    };
    const handleScroll = () => {
      const targetId = navTargetRef.current;
      if (!targetId) return;
      const target = observedSections.find((section) => section.id === targetId);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const top = targetId === "top" ? window.scrollY : target?.element.getBoundingClientRect().top;
      const targetIsLast = target === observedSections[observedSections.length - 1];
      if ((atBottom && targetIsLast) || Math.abs(top ?? 0) <= 2) navTargetRef.current = null;
    };
    const cancelLock = () => releaseLock();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScroll);
    window.addEventListener("wheel", cancelLock, { passive: true });
    window.addEventListener("touchstart", cancelLock, { passive: true });
    window.addEventListener("keydown", cancelLock);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScroll);
      window.removeEventListener("wheel", cancelLock);
      window.removeEventListener("touchstart", cancelLock);
      window.removeEventListener("keydown", cancelLock);
    };
  }, []);

  const navigationVisible = topbarVisible || activeNav !== "top";
  const contactSkyActive = contactSectionInView && contactAnimationComplete;

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
      <div
        className={`space-field ${contactSkyActive ? "is-contact-active" : ""}`}
        aria-hidden="true"
      >
        {stars.map((star) => (
          <i className="star" key={star.id} style={star} />
        ))}
        {comets.map((comet) => (
          <i className="comet" key={comet.id} style={comet} />
        ))}
        {contactComets.map((comet) => (
          <i
            className="comet is-contact-comet"
            key={`contact-${comet.id}`}
            style={comet}
          />
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
                  &rarr;
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
        <div className="section-title">
          <p className="eyebrow">about me</p>
        </div>
        <div className="about-page-content">
          <div className="about-grid">
            <div className="about-intro-block">
              <h2>
                I&rsquo;m a passionate <i>developer</i> who enjoys solving problems,
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
              "Do the best you can until you know better. Then when you know
              better, do better."
            </p>
            <cite>- Maya Angelou</cite>
          </blockquote>
        </div>
      </section>

      <section
        className={`experience-section ${visibleSections.includes("experience") ? "is-revealed" : ""}`}
        id="experience"
        data-reveal="experience"
      >
        <div className="experience-inner">
          <div className="section-title">
            <p className="eyebrow">Experience & achievements</p>
          </div>
          <div className="experience-card-grid">
            <FlipCard
              className="experience-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
              front={
                <div className="flip-card__content achievement-face">
                  <div>
                    <p className="flip-card__eyebrow">Achievements</p>
                    <h3>PHINMA University of Pangasinan</h3>
                    <div className="achievement-details">
                      <p className="achievement-year">2023 &ndash; Present</p>
                      <p>
                        Pursuing the program of Bachelor of Science in Information Technology with the specialization in System Development.
                      </p>
                      
                    </div>
                  </div>
                  <p className="flip-card__hint">
                    Click to view work experience
                  </p>
                </div>
              }
              back={
                <div className="flip-card__content experience-face">
                  <div className="experience-error-wrap">
                    <p className="flip-card__eyebrow">Experience</p>
                    <div className="experience-error-page">
                      <p className="experience-error-code">404</p>
                      <h3>Not Found</h3>
                      <p className="experience-error-message">
                        eager to learn for experience
                      </p>
                    </div>
                  </div>
                  <p className="flip-card__hint">Click to view achievements</p>
                </div>
              }
            />

            <div className="certifications-card-wrap">
              <p className="certifications-title">Certifications</p>
              <div className="certifications-card">
                <button
                  className="certificate-preview"
                  type="button"
                  onClick={() => setCertificateModalOpen(true)}
                  aria-label="View certificate larger"
                >
                  <img src={certificateImage} alt="Certificate preview" />
                </button>
                <p className="certificate-description">
                  Completed a certification in cloud programming from Zuitt, a bootcamp that teaches the core principles of Amazon Web Services. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {certificateModalOpen && (
        <div
          className={`certificate-modal-backdrop ${certificateModalClosing ? "is-closing" : ""}`}
          role="presentation"
          onClick={closeCertificateModal}
        >
          <div
            className={`certificate-modal ${certificateModalClosing ? "is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="certificate-modal-close"
              type="button"
              onClick={closeCertificateModal}
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
        onPointerMove={handleWorkPointerMove}
        onPointerLeave={handleWorkPointerLeave}
      >
        <div className="section-title">
          <p className="eyebrow">projects</p>
        </div>
        <div className="work-body">
          <FolderFloat
            items={Object.entries(projectDetails).map(([value, project]) => ({
              value,
              label: project.title,
              logo: project.logo,
            }))}
            onSelect={(value) => setSelectedProject(projectDetails[value])}
          />
        </div>
      </section>

      {selectedProject && (
        <div
          className={`project-modal-backdrop${selectedProject.theme ? ` project-modal-backdrop--${selectedProject.theme}` : ""} ${projectModalClosing ? "is-closing" : ""}`}
          role="presentation"
          onClick={closeProjectModal}
        >
          {selectedProject.theme === "flood-watch" && (
            <>
              <div className="project-modal-backdrop-rain" aria-hidden="true">
                <span className="project-modal-storm-clouds" />
                <span className="project-modal-lightning-flash" />
                <span className="project-modal-lightning-bolt project-modal-lightning-bolt--one" />
                <span className="project-modal-lightning-bolt project-modal-lightning-bolt--two" />
                <span className="project-modal-rain project-modal-rain--back" />
                <span className="project-modal-rain project-modal-rain--front" />
              </div>
              <div className="project-modal-floodwater" aria-hidden="true">
                <span className="project-modal-fish project-modal-fish--one">
                  <svg viewBox="0 0 100 48" focusable="false">
                    <path className="project-modal-fish-tail" d="M27 24 5 7v34l22-17Z" />
                    <path className="project-modal-fish-body" d="M19 24C35 3 70 5 87 24 70 43 35 45 19 24Z" />
                    <path className="project-modal-fish-fin" d="m48 10 10-8 9 9M47 38l11 8 9-9" />
                    <path className="project-modal-fish-gill" d="M70 15c-6 5-6 14 0 19" />
                    <circle className="project-modal-fish-eye" cx="78" cy="21" r="2.2" />
                  </svg>
                </span>
                <span className="project-modal-fish project-modal-fish--two">
                  <svg viewBox="0 0 100 48" focusable="false">
                    <path className="project-modal-fish-tail" d="M27 24 5 7v34l22-17Z" />
                    <path className="project-modal-fish-body" d="M19 24C35 3 70 5 87 24 70 43 35 45 19 24Z" />
                    <path className="project-modal-fish-fin" d="m48 10 10-8 9 9M47 38l11 8 9-9" />
                    <path className="project-modal-fish-gill" d="M70 15c-6 5-6 14 0 19" />
                    <circle className="project-modal-fish-eye" cx="78" cy="21" r="2.2" />
                  </svg>
                </span>
                <span className="project-modal-fish project-modal-fish--three">
                  <svg viewBox="0 0 100 48" focusable="false">
                    <path className="project-modal-fish-tail" d="M27 24 5 7v34l22-17Z" />
                    <path className="project-modal-fish-body" d="M19 24C35 3 70 5 87 24 70 43 35 45 19 24Z" />
                    <path className="project-modal-fish-fin" d="m48 10 10-8 9 9M47 38l11 8 9-9" />
                    <path className="project-modal-fish-gill" d="M70 15c-6 5-6 14 0 19" />
                    <circle className="project-modal-fish-eye" cx="78" cy="21" r="2.2" />
                  </svg>
                </span>
              </div>
            </>
          )}
          {selectedProject.theme === "my-crew-manager" && (
            <div className="project-modal-office" aria-hidden="true">
              <span className="project-modal-office-window" />
              <span className="project-modal-office-light" />
              <span className="project-modal-office-worker project-modal-office-worker--one">
                <i />
                <b />
              </span>
              <span className="project-modal-office-worker project-modal-office-worker--two">
                <i />
                <b />
              </span>
              <span className="project-modal-office-worker project-modal-office-worker--three">
                <i />
                <b />
              </span>
              <span className="project-modal-office-desk project-modal-office-desk--one">
                <i />
                <b />
              </span>
              <span className="project-modal-office-desk project-modal-office-desk--two">
                <i />
                <b />
              </span>
              <span className="project-modal-office-desk project-modal-office-desk--three">
                <i />
                <b />
              </span>
              <span className="project-modal-office-walker">
                <i />
                <b />
              </span>
            </div>
          )}
          {selectedProject.theme === "aurisign" && (
            <div
              className="project-modal-sign-scene"
              role="img"
              aria-label="Hire me, fingerspelled in American Sign Language as H, I, R, E, M, E."
            >
              <span className="project-modal-sign-orbit project-modal-sign-orbit--one" />
              <span className="project-modal-sign-orbit project-modal-sign-orbit--two" />
              <span className="project-modal-sign-particle project-modal-sign-particle--one" />
              <span className="project-modal-sign-particle project-modal-sign-particle--two" />
              <span className="project-modal-sign-particle project-modal-sign-particle--three" />
              <span className="project-modal-sign-particle project-modal-sign-particle--four" />
              <div className="project-modal-sign-sequence" aria-hidden="true">
                <div className="project-modal-sign-column project-modal-sign-column--hire">
                  <SignLetterCard letter="H" />
                  <SignLetterCard letter="I" />
                  <SignLetterCard letter="R" />
                  <SignLetterCard letter="E" />
                </div>
                <div className="project-modal-sign-column project-modal-sign-column--me">
                  <SignLetterCard letter="M" />
                  <SignLetterCard letter="E" />
                </div>
              </div>
              <span className="project-modal-sign-scanline" />
            </div>
          )}
          <div
            className={`project-modal ${projectModalClosing ? "is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-label={selectedProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-modal-close"
              type="button"
              onClick={closeProjectModal}
              aria-label="Close project"
            >
              &times;
            </button>
            <div className="project-modal-header">
              <img
                className="project-modal-logo"
                src={selectedProject.logo}
                alt={`${selectedProject.title} logo`}
              />
              <div className="project-modal-heading">
                <h2 id="project-modal-title">{selectedProject.title}</h2>
                <p className="project-modal-category">
                  {selectedProject.category}
                </p>
                {selectedProject.role && (
                  <p className="project-modal-role">{selectedProject.role}</p>
                )}
              </div>
            </div>
            <div className="project-modal-body">
              <ProjectGallery
                key={selectedProject.title}
                title={selectedProject.title}
                images={
                  selectedProject.images ?? [
                    selectedProject.image ?? selectedProject.logo,
                  ]
                }
              />
              <p className="project-modal-description">
                {selectedProject.description}
              </p>
              <div className="project-modal-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {selectedProject.link && (
                <div className="project-modal-actions">
                  <a
                    className="cv-modal-button cv-modal-button-primary project-modal-link"
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedProject.linkLabel ?? "View project"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section
        id="contact"
        ref={contactSectionRef}
        className={`contact-section site-footer ${visibleSections.includes("contact") ? "is-revealed" : ""}`}
        data-reveal="contact"
      >
        <div className="section-title">
          <p className="eyebrow">contact</p>
        </div>
        <div className="contact-body">
          <div
            className={`contact-shell ${contactHasBeenViewed ? "is-revealed" : ""} ${contactAnimationActive ? "is-animating" : ""} ${contactAnimationComplete ? "is-complete" : ""}`}
          >
            <div className="contact-content">
              <div className="contact-copy">
                <h2>Let's work, grow and innovate together</h2>
                <p>
                  I'm Available for Frontend work, QA Testing, Software
                  Development, and Collaborative Projects.
                </p>
              </div>
              <div className="contact-actions">
                <button
                  className="contact-card"
                  type="button"
                  onClick={openContactModal}
                  aria-haspopup="dialog"
                  aria-label={`Email ${contactEmail}. Open contact form`}
                >
                  <span className="contact-label">Email</span>
                  <span className="contact-card-email">{contactEmail}</span>
                </button>

                <div className="social-links" aria-label="Contact links">
                  <a
                    className="social-link-text"
                    href="https://www.linkedin.com/in/joshua-nick-velasco"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="social-link-text"
                    href="https://calendly.com/velasco-joshuanick"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Calendly
                  </a>
                  <a
                    className="social-link-text"
                    href="https://www.whatsapp.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {contactModalOpen &&
        createPortal(
          <div
            className={`contact-modal-backdrop ${contactModalClosing ? "is-closing" : ""}`}
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeContactModal();
            }}
          >
            <section
              ref={contactDialogRef}
              className={`contact-modal ${contactModalClosing ? "is-closing" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <button
                className="contact-modal-close"
                type="button"
                onClick={closeContactModal}
                aria-label="Close contact form"
              >
                &times;
              </button>
              <h2 id="contact-modal-title">Contact Me</h2>
              <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
                <input
                  type="hidden"
                  name="access_key"
                  value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ""}
                />
                <input
                  className="contact-honeypot"
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="contact-form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    ref={contactNameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(contactErrors.name)}
                    aria-describedby={contactErrors.name ? "contact-name-error" : undefined}
                    onChange={() => clearContactFeedback("name")}
                  />
                  {contactErrors.name && (
                    <span className="contact-field-error" id="contact-name-error">
                      {contactErrors.name}
                    </span>
                  )}
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    ref={contactEmailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(contactErrors.email)}
                    aria-describedby={contactErrors.email ? "contact-email-error" : undefined}
                    onChange={() => clearContactFeedback("email")}
                  />
                  {contactErrors.email && (
                    <span className="contact-field-error" id="contact-email-error">
                      {contactErrors.email}
                    </span>
                  )}
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    aria-invalid={Boolean(contactErrors.subject)}
                    aria-describedby={contactErrors.subject ? "contact-subject-error" : undefined}
                    onChange={() => clearContactFeedback("subject")}
                  />
                  {contactErrors.subject && (
                    <span className="contact-field-error" id="contact-subject-error">
                      {contactErrors.subject}
                    </span>
                  )}
                </div>
                <div className="contact-form-field contact-form-message">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    maxLength={maxContactMessageLength}
                    required
                    aria-invalid={Boolean(contactErrors.message)}
                    aria-describedby={contactErrors.message ? "contact-message-error" : undefined}
                    onChange={() => clearContactFeedback("message")}
                  />
                  {contactErrors.message && (
                    <span className="contact-field-error" id="contact-message-error">
                      {contactErrors.message}
                    </span>
                  )}
                </div>
                <div className="contact-captcha-field">
                  <HCaptcha
                    ref={contactCaptchaRef}
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={false}
                    onVerify={handleCaptchaVerify}
                    onExpire={handleCaptchaExpire}
                    onError={handleCaptchaFailure}
                  />
                  {contactErrors.captcha && (
                    <span className="contact-field-error" role="alert">
                      {contactErrors.captcha}
                    </span>
                  )}
                </div>
                {contactResult === "success" && (
                  <p className="contact-form-result is-success" role="status">
                    Your message has been sent successfully. Iâ€™ll get back to you as soon as possible.
                  </p>
                )}
                {contactResult === "error" && (
                  <p className="contact-form-result is-error" role="alert">
                    Something went wrong while sending your message. Please try again.
                  </p>
                )}
                <button
                  className="contact-form-submit"
                  type="submit"
                  disabled={contactSubmitting || contactResult === "success"}
                >
                  {contactSubmitting
                    ? "Sending..."
                    : contactResult === "success"
                      ? "Message Sent!"
                      : "Send Message"}
                </button>
              </form>
            </section>
          </div>,
          document.body,
        )}
    </main>
  );
}

export default App;
