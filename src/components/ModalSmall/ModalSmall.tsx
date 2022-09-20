import React, { ReactNode, useEffect, useRef } from "react"
import cn from "classnames"
import { useMedia } from "use-media"

import { mixins, useClickOutside } from "utils"
import { ButtonClose } from "components"

import bgSrc from "assets/images/small-modal.webp"
import "./ModalSmall.scss"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  disableClosing?: boolean
}

export const ModalSmall = ({ isOpen, onClose, children, className, disableClosing }: Props): JSX.Element | null => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const body = document.body
  const isM = useMedia({ maxWidth: mixins.m })

  useEffect(() => {
    if (isOpen) {
      body.style.overflow = "hidden"
    }
  }, [isOpen, body.style.overflow])

  const handleClose = () => {
    if (disableClosing) {
      return
    }
    body.style.overflow = "scroll"
    onClose()
  }

  useClickOutside(wrapperRef, () => {
    handleClose()
  })

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && isOpen) {
        if (disableClosing) {
          return
        }
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
      <div className="modal-wrapper">
        <div
          ref={wrapperRef}
          style={{
            maxWidth: 348,
            height: 182,
            backgroundImage: `url(${bgSrc})`,
          }}
          className={cn("modal-content", className, {
            active: isOpen,
          })}
        >
          <ButtonClose smallModal onClick={handleClose} />
          <div className="modal-small">{children}</div>
        </div>
      </div>
    </div>
  )
}
