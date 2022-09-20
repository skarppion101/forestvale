import "./ButtonConnect.scss"
import cn from "classnames"
import bgSrc from "assets/images/button-modal.webp"

type Props = {
  onClick?: () => void
  href?: string
  text: string
  disabled?: boolean
  className?: string
}

export const ButtonConnect = ({ onClick, text, disabled, className, href }: Props): JSX.Element => {
  const el = document.getElementsByClassName("movable")[0]

  if (href) {
    return (
      <a
        onMouseOver={() => {
          el?.classList.add("active")
        }}
        onMouseLeave={() => {
          el?.classList.remove("active")
        }}
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ backgroundImage: `url(${bgSrc})` }}
        className={cn("custom-button-connect", className)}
      >
        {text}
      </a>
    )
  }

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
      disabled={disabled}
      style={{ backgroundImage: `url(${bgSrc})` }}
      className={cn("custom-button-connect", className)}
    >
      {text}
    </button>
  )
}
