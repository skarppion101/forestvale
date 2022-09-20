import React, { ReactNode, useEffect } from "react"
import cn from "classnames"

import "./RoomModal.scss"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: number
  height?: number
  className?: string
}

export const RoomModal = ({
  isOpen,
  onClose,
  children,
  width = 1266,
  height = 523,
  className,
}: Props): JSX.Element | null => {
  const body = document.body

  useEffect(() => {
    if (isOpen) {
      body.style.overflow = "hidden"
    }
  }, [isOpen, body.style.overflow])

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
      className={cn("room-modal", {
        show: isOpen,
      })}
    >
      <div className="room-modal-backdrop" />
      <div
        style={{
          maxWidth: width,
          maxHeight: height,
        }}
        className={cn("room-modal-content", className, {
          active: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  )
}
