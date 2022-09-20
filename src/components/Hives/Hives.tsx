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
import { approveAddress, contractAddress } from "abi"
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
}

export const Hives = ({ className, isModal, bonus, miners, token, updateState }: Props): JSX.Element => {
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
    const web3 = new Web3(library.provider)

    // @ts-ignore
    const tokenContract = new web3.eth.Contract(abiApprove, approveAddress)

    await tokenContract.methods
      .approve(contractAddress, "999999999999999999999999")
      .send({ from: account })
      .then(res => {
        console.log(res)
        updateState()
      })
  }

  const buy = async () => {
    if (!input.length) {
      alert("Fill input value")
      return
    }

    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)

    // @ts-ignore
    // @ts-ignore
    const web3Contract = new web3.eth.Contract(abi, contractAddress)

    // @ts-ignore
    await web3Contract.methods
      .buyMiners(search?.get("ref") ? search.get("ref") : "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394", toWei(input))
      .send({
        from: account,
      })
      .then(() => updateState())
  }

  const buySecond = async () => {
    const web3 = new Web3(library.provider)
    // @ts-ignore
    const web3Contract = new web3.eth.Contract(abi, contractAddress)
    // @ts-ignore
    await web3Contract.methods
      .reinvest()
      .send({
        from: account,
        to: contractAddress,
      })
      .then(() => updateState())
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