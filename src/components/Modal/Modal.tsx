import React, { ReactNode, useEffect, useRef } from "react"
import cn from "classnames"
import { useMedia } from "use-media"

import { mixins, useClickOutside } from "utils"
import { ButtonClose } from "components"

import bgSrc from "assets/images/snowballframeout.webp"
import bg2Src from "assets/images/modal-big.webp"
import bg3Src from "assets/images/modal-second.webp"
import bgRefSrc from "assets/images/bg-ref.webp"
import bgCalcSrc from "assets/images/calc-bg.webp"
import bgRefMobileSrc from "assets/images/bg-ref-mobile.webp"
import bg3MobileSrc from "assets/images/modal-second-mobile.webp"
import bgMobileSrc from "assets/images/modal-mobile.webp"
import bgMobileFaqSrc from "assets/images/faq-mobile.webp"
import bgMobileCastleSrc from "assets/images/castle-mobile.webp"
import bgBiggerSrc from "assets/images/modal-bigger.webp"
import "./Modal.scss"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  secondModal?: ReactNode
  secondTitle?: string
  width?: number
  height?: number
  title?: string
  className?: string
  variant?: "castle" | "faq" | "default" | "big" | "ref" | "calc"
  secondImg?: string
  withoutBorder?: boolean
  disableClosing?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  width = 852,
  height = 523,
  variant = "default",
  title,
  className,
  secondModal,
  secondTitle,
  secondImg,
  withoutBorder,
  disableClosing,
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
    if (disableClosing) {
      return
    }

    document.addEventListener("keydown", e => {
      if (disableClosing) {
        return
      }

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

  const getMobileImage = () => {
    if (variant === "castle" || variant === "big") {
      return bgMobileCastleSrc
    }
    if (variant === "faq" || variant === "calc") {
      return bgMobileFaqSrc
    }
    if (variant === "ref") {
      return bgRefMobileSrc
    }

    return bgMobileSrc
  }

  const getDesktopImage = () => {
    if (variant === "big") {
      return bgBiggerSrc
    }
    if (variant === "faq") {
      return bg2Src
    }
    if (variant === "ref") {
      return bgRefSrc
    }
    if (variant === "calc") {
      return bgCalcSrc
    }

    return bgSrc
  }

  const getMobileHeight = () => {
    if (variant === "castle" || variant === "big") {
      return 566
    }
    if (variant === "faq" || variant === "calc") {
      return 966
    }
    if (variant === "ref") {
      return 916
    }

    return 466
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
            maxWidth: isM ? 348 : width,
            height: isM ? getMobileHeight() : height,
            backgroundImage: `url(${isM ? getMobileImage() : getDesktopImage()})`,
          }}
          className={cn("modal-content", className, {
            active: isOpen,
          })}
        >
          <div className="modal-header">
            {title && <h2 className={cn("modal-header-title")}>{title}</h2>}
            <ButtonClose onClick={handleClose} />
          </div>
          {children}
        </div>
        {secondModal && (
          <div
            style={{
              maxWidth: isM ? 348 : 736,
              backgroundImage: `url(${isM ? bg3MobileSrc : bg3Src})`,
            }}
            className={cn("modal-content-second", className, {
              active: isOpen,
            })}
          >
            {secondTitle && <h2 className={cn("modal-header-title2")}>{secondTitle}</h2>}
            <ButtonClose smallOne onClick={handleClose} />
            <div className="modal-content-second-inside">
              <img
                src={secondImg}
                alt="npc"
                className={cn("modal-content-second-inside-img", {
                  noBorder: withoutBorder,
                })}
              />
              <div className="modal-content-second-inside-text">{secondModal}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
