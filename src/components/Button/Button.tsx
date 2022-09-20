import "./Button.scss"
import cn from "classnames"

type Props = {
  onClick: () => void
  text: string
  disabled?: boolean
  className?: string
  fullWidth?: boolean
  animate?: boolean
  variant?: "default" | "dark"
}

export const Button = ({
  onClick,
  text,
  disabled,
  className,
  fullWidth,
  animate,
  variant = "default",
}: Props): JSX.Element => {
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
      disabled={disabled}
      className={cn("custom-button", variant, className, {
        animate: animate,
        fullWidth: fullWidth,
      })}
    >
      {text}
    </button>
  )
}
