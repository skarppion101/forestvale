import { RefObject } from "react"
import cn from "classnames"
import { useLocation } from "react-router-dom"

import { ReactComponent as PauseIcon } from "assets/icons/pause.svg"
import { ReactComponent as PlayIcon } from "assets/icons/play.svg"

import "./Player.scss"

const playlist = [require("assets/music/main.mp3").default]

type Props = {
  wrapperRef: RefObject<HTMLAudioElement>
  isPlaying: boolean
  onPause: () => void
  onPlay: () => void
}

export const Player = ({ wrapperRef, isPlaying, onPlay, onPause }: Props): JSX.Element | null => {
  const location = useLocation()
  const el = document.getElementsByClassName("movable")[0]

  const containerProps = {
    className: cn("player-wrapper", {
      hide: location.pathname === "/",
    }),
  }

  return (
    <div {...containerProps}>
      <div className="player-content">
        {isPlaying ? (
          <button
            onMouseOver={() => {
              el?.classList.add("active")
            }}
            onMouseLeave={() => {
              el?.classList.remove("active")
            }}
            className="player-btn"
            type="button"
            onClick={onPause}
          >
            <PlayIcon />
          </button>
        ) : (
          <button
            onMouseOver={() => {
              el?.classList.add("active")
            }}
            onMouseLeave={() => {
              el?.classList.remove("active")
            }}
            className="player-btn"
            type="button"
            onClick={onPlay}
          >
            <PauseIcon />
          </button>
        )}
      </div>
      <audio autoPlay loop controls className="player" ref={wrapperRef}>
        {playlist.map((song, index) => (
          <source key={index} src={song} type="audio/wav" />
        ))}
      </audio>
    </div>
  )
}
