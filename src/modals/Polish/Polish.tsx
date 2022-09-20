import { ModalSmall } from "components"
import "./Polish.scss"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  miners: number
}

export const Polish = ({ onClose, isOpen, miners }: Props): JSX.Element => {
  const getSell = () => {
    if (miners < 100) {
      return "100 - 105"
    }
    if (miners < 200) {
      return "200 - 210"
    }
    if (miners < 300) {
      return "300 - 315"
    }
    if (miners < 400) {
      return "400 - 420"
    }
    if (miners < 500) {
      return "500 - 525"
    }
    if (miners < 600) {
      return "600 - 630"
    }
    if (miners < 700) {
      return "700 - 735"
    }
  }
  return (
    <ModalSmall className="polish" isOpen={isOpen} onClose={onClose}>
      {t`youCanSellEvergreen`} {getSell()} ELF.
    </ModalSmall>
  )
}