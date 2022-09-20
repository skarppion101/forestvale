import { InputBg, Modal } from "components"

import arrowSrc from "assets/images/arrow.webp"
import "./Calculator.scss"
import { useEffect, useState } from "react"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  balance: number
  workMiners: number
  marketTokens: number
}

export const Calculator = ({ onClose, isOpen, balance, workMiners, marketTokens }: Props): JSX.Element => {
  const [calc, setCalc] = useState("1")
  const [result, setResult] = useState("")

  const getAllInfo = (newCalc: string) => {
    if (Number(newCalc) > 0) {
      setResult(Math.floor(Number(newCalc) / (Number(newCalc) + 500000 + balance) * marketTokens / workMiners).toString())
    } else {
      setResult("0")
    }
  }

  useEffect(() => {
    getAllInfo(calc)
  }, [])

  return (
    <Modal className="calculator" isOpen={isOpen} onClose={onClose} title={t`summonPrice`}>
      <p className="calculator-desc">{t`checkHowMuchBUSD`}</p>
      <InputBg
        className="calculator-input"
        placeholder="1"
        onChange={v => {
          setCalc(v)
          getAllInfo(v)
        }}
        append="BUSD"
        value={calc}
      />
      <img src={arrowSrc} alt="arrow" className="calculator-arrow" />
      <InputBg
        className="calculator-input"
        placeholder="..."
        append="ELF"
        onChange={v => setResult(v)}
        value={result}
      />
    </Modal>
  )
}