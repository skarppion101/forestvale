import cn from "classnames"
import { useState } from "react"

import "./Input.scss"

type Props = {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  className?: string
  append?: string
  type?: "text" | "number"
  variant?: "default" | "no-padding" | "dark"
}

export const Input = ({
  onChange,
  value,
  placeholder,
  className,
  append,
  type = "text",
  variant = "default",
}: Props): JSX.Element => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={cn("custom-input-wrapper", className)}>
      <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChange={e => onChange(e.target.value)}
        value={value}
        type={type}
        placeholder={focused ? "" : placeholder}
        className={cn("custom-input", variant, {
          withAppend: append,
        })}
      />
      {append && <div className="custom-input-append">{append}</div>}
    </div>
  )
}
