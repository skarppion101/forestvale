import "./Video.scss"
import React, { useEffect, useRef, useState } from "react"

import { ReactComponent as PlayIcon } from "assets/icons/play-video.svg"
import bgSrc from "assets/videos/video.mp4"

import { useClickOutside } from "utils"

type Props = {
  endLoad: () => void
}

export const Video = ({ endLoad }: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState("https://www.youtube.com/embed/w8066Ya-1Yo?autoplay=1&loop=1&playlist=w8066Ya-1Yo")
  const el = document.getElementsByClassName("movable")[0]
  const wrapperRef = useRef<HTMLDivElement>(null)
  const body = document.body

  const onPlay = () => {
    setOpen(true)
    setSrc("https://www.youtube.com/embed/w8066Ya-1Yo?autoplay=1&loop=1&playlist=w8066Ya-1Yo")
  }

  useClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  useEffect(() => {
    if (open) {
      body.style.overflow = "hidden"
    }
  }, [open, body.style.overflow])

  if (!open) {
    body.style.overflow = "scroll"
  }

  return (
    <div className="video">
      <div className="video-content">
        <video onLoadedData={endLoad} muted autoPlay className="video-img">
          <source src={bgSrc} type="video/mp4" />
        </video>
        <div className="video-shadow" />
        <PlayIcon
          onMouseOver={() => {
            el?.classList.add("active")
          }}
          onMouseLeave={() => {
            el?.classList.remove("active")
          }}
          className="video-play"
          onClick={onPlay}
        />
      </div>
      {open && (
        <div className="video-modal">
          <div className="video-modal-bg" />
          <div ref={wrapperRef} className="video-modal-content animate__animated animate__fadeInDown">
            <iframe
              width={`400px`}
              height={`300px`}
              src={src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}