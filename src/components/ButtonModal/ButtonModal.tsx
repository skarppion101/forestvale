import "./ButtonModal.scss"
import cn from "classnames"
import bgSrc from "assets/images/button-modal.webp"
import bg2Src from "assets/images/btn-hover.webp"

type Props = {
  onClick: () => void
  text: string
  disabled?: boolean
  className?: string
  dark?: boolean
}

export const ButtonModal = ({ onClick, text, disabled, className, dark }: Props): JSX.Element => {
  const el = document.getElementsByClassName("movable")[0]

  return (
    <button
      onMouseOver={() => {
        el?.classList.add("active")
      }}
      onMouseLeave={() => {
        el?.classList.remove("active")
      }}
      type="button"
      onClick={onClick}
      style={{ backgroundImage: `url(${dark ? bg2Src : bgSrc})` }}
      className={cn("custom-button-modal", className, {
        disabled: disabled
      })}
    >
      {text}
    </button>
  )
}
