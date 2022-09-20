import cn from "classnames"
import {ReactChild, useState} from "react"
import { useMedia } from "use-media"

import bgSrc from "assets/images/input.webp"
import bgMobileSrc from "assets/images/input-mobile.webp"
import "./InputBg.scss"
import { mixins } from "utils"
import ReactTooltip from "react-tooltip";

type Props = {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  className?: string
  append?: ReactChild | string
  type?: "text" | "number"
  small?: boolean
}

export const InputBg = ({ onChange, value, placeholder, className, append, type = "number", small }: Props): JSX.Element => {
  const [focused, setFocused] = useState(false)
  const isM = useMedia({ maxWidth: mixins.m })

  return (
    <div
      className={cn("custom-input-wrapper-bg", className, {
        small: small
      })}
      style={{ backgroundImage: `url(${(isM || small) ? bgMobileSrc : bgSrc})` }}
    >
      <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChange={e => onChange(e.target.value)}
        value={value}
        type={type}
        placeholder={focused ? "" : placeholder}
        className={cn("custom-input-bg", {
          withAppend: append,
        })}
      />
      {append && <div className="custom-input-bg-append">{append}</div>}

      {/*@ts-ignore*/}
      <ReactTooltip html={true} />
    </div>
  )
}
