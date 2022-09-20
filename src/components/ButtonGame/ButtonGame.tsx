import "./ButtonGame.scss"
import cn from "classnames"
import bgSrc from "assets/images/snowballmapfloatshorts.webp"
import bg1Src from "assets/images/snowballmapfloatlong1.webp"

type Props = {
  onClick: () => void
  onTouchEnd?: () => void
  text: string
  disabled?: boolean
  className?: string
  long?: boolean
}

export const ButtonGame = ({ onClick, text, disabled, className, long, onTouchEnd }: Props): JSX.Element => {
  const el = document.getElementsByClassName("movable")[0]

  return (
    <button
      onMouseOver={() => {
        el?.classList.add("active")
      }}
      onMouseLeave={() => {
        el?.classList.remove("active")
      }}
      onTouchEnd={onTouchEnd}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundImage: `url(${long ? bg1Src : bgSrc})` }}
      className={cn("custom-button-game", className, {
        long: long,
      })}
    >
      {text}
    </button>
  )
}
