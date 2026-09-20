import { useState } from 'react'
import { motion } from 'motion/react'
import './JellyRadio.css'

function JellyRadio({ items = [], defaultValue, value, onChange, ariaLabel = 'Options', className = '' }) {
  const [innerValue, setInnerValue] = useState(defaultValue ?? items[0]?.value)
  const current = value ?? innerValue

  const selectItem = (item, index) => {
    if (item.disabled || item.value === current) return
    if (value === undefined) setInnerValue(item.value)
    onChange?.(item.value, index)
  }

  return (
    <div className={`jelly-radio ${className}`} role="radiogroup" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <button
          className="jelly-radio__chip"
          key={item.value}
          type="button"
          role="radio"
          aria-checked={item.value === current}
          disabled={item.disabled}
          onClick={() => selectItem(item, index)}
        >
          {item.value === current && (
            <motion.span className="jelly-radio__active" layoutId="jelly-radio-active" transition={{ type: 'spring', stiffness: 520, damping: 30 }} />
          )}
          <span className="jelly-radio__label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default JellyRadio
