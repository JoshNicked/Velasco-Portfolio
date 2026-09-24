import { useState } from "react";
import { motion } from "motion/react";
import "./FlipCard.css";

function FlipCard({
  front,
  back,
  width = 320,
  height = 320,
  radius = 22,
  background = "#111a39",
  color = "#eef5ff",
  className = "",
}) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((current) => !current);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`flip-card ${className}`}
      role="button"
      tabIndex="0"
      aria-pressed={flipped}
      aria-label="Flip card"
      onClick={toggle}
      onKeyDown={handleKeyDown}
      style={{
        "--fc-w": `${width / 16}rem`,
        "--fc-h": `${height / 16}rem`,
        "--fc-radius": `${radius / 16}rem`,
        "--fc-bg": background,
        "--fc-ink": color,
      }}
    >
      <motion.div
        className="flip-card__rotor"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 170, damping: 20 }}
      >
        <div className="flip-card__face flip-card__face--front">{front}</div>
        <div className="flip-card__face flip-card__face--back">{back}</div>
      </motion.div>
    </div>
  );
}

export default FlipCard;
