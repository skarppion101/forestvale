import { ReactChild, useRef, useState } from "react"
import cn from "classnames"

import { ReactComponent as ArrowIcon } from "assets/icons/collapse-arrow.svg"
import "./Collapse.scss"
import { useClickOutside } from "../../utils"

type Props = {
  desc: string | ReactChild
  title: string
  opened?: boolean
}

export const Collapse = ({ desc, title, opened = false }: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLButtonElement>(null)
  const el = document.getElementsByClassName("movable")[0]
  const [isOpen, setIsOpen] = useState(opened)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useClickOutside(wrapperRef, () => {
    if (!opened) {
      setIsOpen(false)
    }
  })

  return (
    <div
      ref={wrapperRef}
      className={cn("collapse-wrapper", {
        open: isOpen,
      })}
    >
      <button
        onMouseOver={() => {
          el?.classList.add("active")
        }}
        onMouseLeave={() => {
          el?.classList.remove("active")
        }}
        ref={titleRef}
        type="button"
        onClick={toggleOpen}
        className="collapse-title"
      >
        {title}
        <ArrowIcon className="collapse-arrow" />
      </button>
      <div className="collapse-content">
        <div className="collapse-content-desc">{desc}</div>
      </div>
    </div>
  )
}
