import React, { ReactNode, useEffect, useRef } from "react"
import cn from "classnames"
import { useMedia } from "use-media"

import { mixins, useClickOutside } from "utils"
import { ButtonClose } from "components"

import bg3Src from "assets/images/modal-second.webp"
import bgBigSrc from "assets/images/big-npc.webp"
import bgBigMobileSrc from "assets/images/big-npc-mobile.webp"
import bg3MobileSrc from "assets/images/modal-second-mobile.webp"
import "./NpcModal.scss"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: number
  height?: number
  title?: string
  className?: string
  secondImg?: string
  noBorder?: boolean
  big?: boolean
}

export const NpcModal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  secondImg,
  noBorder,
  big,
}: Props): JSX.Element | null => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const body = document.body
  const isM = useMedia({ maxWidth: mixins.m })

  useEffect(() => {
    if (isOpen) {
      body.style.overflow = "hidden"
    }
  }, [isOpen, body.style.overflow])

  const handleClose = () => {
    body.style.overflow = "scroll"
    onClose()
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    })
    return () => {
      document.removeEventListener("keydown", e => e)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    body.style.overflow = "scroll"
  }

  return (
    <div
      className={cn("modal", {
        show: isOpen,
      })}
    >
      <div className="modal-backdrop" />
      <div
        ref={wrapperRef}
        style={{
          maxWidth: isM ? 348 : 736,
          backgroundImage: `url(${isM ? (big ? bgBigMobileSrc : bg3MobileSrc) : big ? bgBigSrc : bg3Src})`,
        }}
        className={cn("modal-content-second", className, {
          active: isOpen,
          big: big,
        })}
      >
        {title && <h2 className={cn("modal-header-title2")}>{title}</h2>}
        <ButtonClose smallOne onClick={handleClose} />
        <div className="modal-content-second-inside">
          <img
            src={secondImg}
            alt="npc"
            className={cn("modal-content-second-inside-img", {
              noBorder: noBorder,
            })}
          />
          <div className="modal-content-second-inside-text">{children}</div>
        </div>
      </div>
    </div>
  )
}
