import { useState } from "react";
import { CiFloppyDisk } from "react-icons/ci";
import { FaLaptopCode } from "react-icons/fa6";
import "./FolderFloat.css";

const DEFAULT_ITEMS = [
  { label: "Flood Watch", value: "flood-watch" },
  { label: "AuriSign", value: "aurisign" },
  { label: "My Crew Manager", value: "my-crew-manager" },
];

const PROGRAMMER_ROUTES = [
  {
    path: "M 176 260 H 145 V 140 H 40",
    mobilePath: "M 100 260 H 145 V 140 H 40",
    iconX: "4%",
    iconY: "23.3%",
  },
  {
    path: "M 790 260 H 900 V 30 H 400",
    mobilePath: "M 900 260 H 950 V 30 H 400",
    iconX: "40%",
    iconY: "5%",
  },
  {
    path: "M 824 260 H 930 V 100 H 960",
    mobilePath: "M 900 300 H 970 V 100 H 960",
    iconX: "96%",
    iconY: "16.7%",
  },
  {
    path: "M 176 305 H 110 V 355 H 40",
    mobilePath: "M 100 305 H 110 V 355 H 40",
    iconX: "4%",
    iconY: "59.2%",
  },
  {
    path: "M 176 430 H 40 V 470",
    mobilePath: "M 100 430 H 40 V 470",
    iconX: "4%",
    iconY: "78.3%",
  },
  {
    path: "M 824 430 H 950 V 470 H 970",
    mobilePath: "M 900 430 H 950 V 470 H 970",
    iconX: "97%",
    iconY: "78.3%",
  },
  {
    path: "M 410 486 V 555 H 350 V 585",
    mobilePath: "M 410 486 V 555 H 350 V 585",
    iconX: "35%",
    iconY: "97.5%",
  },
  {
    path: "M 590 486 V 555 H 680 V 585",
    mobilePath: "M 590 486 V 555 H 680 V 585",
    iconX: "68%",
    iconY: "97.5%",
  },
];

function FolderFloat({
  items = DEFAULT_ITEMS,
  label = "Academic projects",
  sublabel = "3 projects",
  onSelect,
}) {
  const [open, setOpen] = useState(false);

  const choose = (item, index) => {
    onSelect?.(item.value, index);
  };

  return (
    <div
      className={`folder-float${open ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="folder-float__items" aria-label="Projects">
        {items.slice(0, 4).map((item, index) => (
          <button
            className="folder-float__item"
            key={item.value}
            type="button"
            style={{ "--item-index": index }}
            onClick={() => choose(item, index)}
            aria-haspopup="dialog"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="folder-float__routes" aria-hidden="true">
        <svg
          className="folder-float__route-svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {PROGRAMMER_ROUTES.map((route, index) => (
            <g
              key={`desktop-${route.path}`}
              className="folder-float__route-desktop"
              style={{ "--route-index": index }}
            >
              <path className="folder-float__route-base" d={route.path} />
              <path
                className="folder-float__route-progress"
                d={route.path}
                pathLength="1"
              />
            </g>
          ))}
          {PROGRAMMER_ROUTES.map((route, index) => (
            <g
              key={`mobile-${route.path}`}
              className="folder-float__route-mobile"
              style={{ "--route-index": index }}
            >
              <path className="folder-float__route-base" d={route.mobilePath} />
              <path
                className="folder-float__route-progress"
                d={route.mobilePath}
                pathLength="1"
              />
            </g>
          ))}
        </svg>
        {PROGRAMMER_ROUTES.map((route, index) => (
          <FaLaptopCode
            className="folder-float__programmer-icon"
            key={route.path}
            style={{
              "--route-index": index,
              "--icon-x": route.iconX,
              "--icon-y": route.iconY,
            }}
          />
        ))}
      </div>
      <button
        className="folder-float__trigger"
        type="button"
        aria-expanded={open}
        aria-label={`${label}, ${sublabel}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <span className="folder-float__back" aria-hidden="true" />
        <span className="folder-float__paper" aria-hidden="true" />
        <span className="folder-float__front">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__sub">{sublabel}</span>
        </span>
      </button>
      <span className="folder-float__connector" aria-hidden="true">
        <span className="folder-float__line" />
        <CiFloppyDisk className="folder-float__icon" />
      </span>
    </div>
  );
}

export default FolderFloat;
