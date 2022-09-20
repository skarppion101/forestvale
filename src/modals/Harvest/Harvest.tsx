import ReactTooltip from "react-tooltip"

import { ButtonModal, Collapse, Modal } from "components"

import snowSrc from "assets/images/snow-small.webp"
import giftSrc from "assets/images/gift.webp"
import { ReactComponent as TooltipIcon } from "assets/icons/info.svg"
import "./Harvest.scss"
import alishaSrc from "assets/images/npc/alisha.webp"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  openPolish: () => void
  isOpen: boolean
  iceBucket: number
  miners: number
  disableClosing: boolean
}

export const Harvest = ({ onClose, isOpen, iceBucket, disableClosing, openPolish, miners }: Props): JSX.Element => {
  return (
    <Modal
      disableClosing={disableClosing}
      height={600}
      variant="big"
      secondTitle="Alisha"
      secondImg={alishaSrc}
      secondModal={<div>{t`thisIsJustOurWayOfSayingThanks`}</div>}
      className="harvest"
      isOpen={isOpen}
      onClose={onClose}
      title={t`polishEvergreen`}
    >
      <div className="harvest-content">
        <div className="harvest-block">
          <div className="harvest-block-left">
            <div className="harvest-block-left-title">
              <img src={snowSrc} alt="snow" />
              {t`basket`}
              <TooltipIcon data-tip={t`yourProfit`} />
            </div>
            <div className="harvest-block-left-desc">({t`collectedEvergreen`})</div>
          </div>
          {iceBucket > 0 ? iceBucket.toFixed(4) : 0} BUSD
        </div>
        {/*<div className="harvest-block">*/}
        {/*  <div className="harvest-block-left">*/}
        {/*    <div className="harvest-block-left-title">*/}
        {/*      <img src={clockSrc} alt="gold" />*/}
        {/*      Bucket Fills In*/}
        {/*      <TooltipIcon data-tip={`The rewards will stop growing <br /> when the timer expires`} />*/}
        {/*    </div>*/}
        {/*    <div className="harvest-block-left-desc">(Re-collect to fill basket)</div>*/}
        {/*  </div>*/}
        {/*  {timeOther > 0 && timeOther < 172800 ? convert(timeOther) : "Null"}*/}
        {/*</div>*/}
        <div className="harvest-block">
          <div className="harvest-block-left">
            <div className="harvest-block-left-title">
              <img src={giftSrc} alt="gift" />
              {t`reCollectBonus`}
              <TooltipIcon data-tip={t`yourNextReinvestment`} />
            </div>
            <div className="harvest-block-left-desc">({t`bonusForReCollect`})</div>
          </div>
          5%
        </div>
        <div className="harvest-btns">
          <ButtonModal onClick={openPolish} text={t`polish`} />
        </div>
        <div className="harvest-collapse">
          <Collapse desc={<div className="harvest-collapse-more">{t`harvestCollapse`}</div>} title={t`moreDetails`} />
        </div>
      </div>
      {/*@ts-ignore*/}
      <ReactTooltip html={true} />
    </Modal>
  )
}