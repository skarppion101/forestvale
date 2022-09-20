import { Collapse, Modal } from "components"

import npcSrc from "assets/images/npc/lucifer.webp"
import "./FAQ.scss"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const FAQ = ({ onClose, isOpen }: Props): JSX.Element => {
  return (
    <Modal
      secondTitle="Lucifer"
      secondImg={npcSrc}
      secondModal={<div>{t`demonAngel`}</div>}
      width={762}
      height={939}
      variant="faq"
      className="faq"
      isOpen={isOpen}
      onClose={onClose}
      title={t`FAQ`}
    >
      <p className="faq-desc">{t`FAQDesc`}</p>
      <div className="faq-content-wrapper">
        <div className="faq-scroll">
          <Collapse desc={t`faq1Desc`} title={t`faq1`} />
          <Collapse desc={t`faq2Desc`} title={t`faq2`} />
          <Collapse desc={t`faq3Desc`} title={t`faq3`} />
          <Collapse desc={t`faq4Desc`} title={t`faq4`} />
          <Collapse desc={t`faq5Desc`} title={t`faq5`} />
          <Collapse desc={t`faq6Desc`} title={t`faq6`} />
          <Collapse desc={t`faq7Desc`} title={t`faq7`} />
          <Collapse title={t`faq8`} desc={t`faq8Desc`} />
          <Collapse desc={t`faq9Desc`} title={t`faq9`} />
          <Collapse desc={t`faq10Desc`} title={t`faq10`} />
          <Collapse desc={t`faq11Desc`} title={t`faq11`} />
          <Collapse desc={t`faq12Desc`} title={t`faq12`} />
          <Collapse desc={t`faq13Desc`} title={t`faq13`} />
          <Collapse desc={t`faq14Desc`} title={t`faq14`} />
          <Collapse desc={t`faq15Desc`} title={t`faq15`} />
          <Collapse desc={t`faq16Desc`} title={t`faq16`} />
          <Collapse desc={t`faq17Desc`} title={t`faq17`} />
          <Collapse desc={t`faq18Desc`} title={t`faq18`} />
          <Collapse desc={t`faq19Desc`} title={t`faq19`} />
          <Collapse desc={t`faq20Desc`} title={t`faq20`} />
        </div>
      </div>
    </Modal>
  )
}