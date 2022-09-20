import React from "react"
import { t } from "@lingui/macro"

import { Modal } from "components"

import lockSrc from "assets/images/lock.webp"
import usersSrc from "assets/images/users.webp"
import goldSrc from "assets/images/gold.webp"
import coinSrc from "assets/images/coin.webp"
import chestSrc from "assets/images/chest.webp"
import giftSrc from "assets/images/gift.webp"
import dolarSrc from "assets/images/dolar.webp"
import elvinaSrc from "assets/images/npc/elvina.webp"
import "./Stats.scss"

type Props = {
  onClose: () => void
  isOpen: boolean
  totalMembers: number
  transactions: number
  total: number
  profit: number
}

export const Stats = ({ onClose, isOpen, totalMembers, transactions, total, profit }: Props): JSX.Element => {
  return (
    <Modal
      secondTitle="Elvina"
      secondImg={elvinaSrc}
      secondModal={<div>{t`weAreFairyTail`}</div>}
      variant="big"
      height={610}
      className="referrals"
      isOpen={isOpen}
      onClose={onClose}
      title={t`stats`}
    >
      <p className="referrals-desc">{t`theRealTime`}</p>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={lockSrc} alt="lock" />
            {t`contractBalance`}
          </div>
        </div>
        {total > 0 ? total : 0} BUSD
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={coinSrc} alt="lock" />
            {t`contractTransactions`}
          </div>
        </div>
        {transactions}
      </div>
      {/*<div className="referrals-block">*/}
      {/*  <div className="referrals-block-left">*/}
      {/*    <div className="referrals-block-left-title">*/}
      {/*      <img src={profitSrc} alt="lock" />*/}
      {/*      Contract Turnover*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  +{userDeposit} BUSD*/}
      {/*</div>*/}
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={usersSrc} alt="people" />
            {t`totalMembers`}
          </div>
        </div>
        {totalMembers}
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={chestSrc} alt="chest" />
            {t`myProfit`}
          </div>
        </div>
        {profit > 0 ? profit.toFixed(4) : "0"} BUSD
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={goldSrc} alt="gold" />
            {t`dailyReturn`}
          </div>
          <div className="referrals-block-left-desc">({t`theAmountOfEvergreen`})</div>
        </div>
        0.8% ~ ∞%
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={giftSrc} alt="gold" />
            {t`reCollectBonus`}
          </div>
        </div>
        5%
      </div>
      <div className="referrals-block">
        <div className="referrals-block-left">
          <div className="referrals-block-left-title">
            <img src={dolarSrc} alt="dolar" />
            {t`devFee`}
          </div>
        </div>
        5%
      </div>
    </Modal>
  )
}