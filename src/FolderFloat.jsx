import { useState } from "react";
import { CiFloppyDisk } from "react-icons/ci";
import "./FolderFloat.css";

const DEFAULT_ITEMS = [
  { label: "Flood Watch", value: "flood-watch" },
  { label: "AuriSign", value: "aurisign" },
  { label: "My Crew Manager", value: "my-crew-manager" },
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
