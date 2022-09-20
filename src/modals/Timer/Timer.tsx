import { Modal, TimerComp } from "components"

import "./Timer.scss"
import { useState } from "react"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const Timer = ({ onClose, isOpen }: Props): JSX.Element => {
  const [revertTime, setRevertTime] = useState(false)

  return (
    <Modal className="referrals" isOpen={isOpen} onClose={onClose} title="Timer">
      <p className="referrals-desc">
        {revertTime ? t`hereIsHowLongOurProjectHasBeenRunning` : t`thisIsHowLongUntilTheProjectLaunch`}
      </p>
      <TimerComp setRevert={() => setRevertTime(true)} />
    </Modal>
  )
}