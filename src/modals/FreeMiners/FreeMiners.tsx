import { ButtonModal, Modal } from "components"

import npcSrc from "assets/images/npc/elvina2.webp"
import "./FreeMiners.scss"

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const FreeMiners = ({ onClose, isOpen }: Props): JSX.Element => {
  return (
    <Modal
      withoutBorder
      secondTitle="Elvina"
      secondModal={
        <div>
          I will find some ELF willing to help you , but they won&apos;t <br /> help you re-collect and polish until{" "}
          <br /> you summon an ELF {">"}50 BUSD!
        </div>
      }
      secondImg={npcSrc}
      className="free-miners"
      isOpen={isOpen}
      onClose={onClose}
      title="Elvina"
    >
      <ButtonModal onClick={() => {}} text="Get 10 BUSD worth of ELF to work for you" className="free-miners-btn" />
    </Modal>
  )
}