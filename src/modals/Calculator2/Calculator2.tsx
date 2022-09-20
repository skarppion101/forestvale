import { InputBg, Modal } from "components"

import arrowSrc from "assets/images/arrow.webp"
import "./Calculator2.scss"
import { useEffect, useState } from "react"
import {t} from "@lingui/macro"
import {ReactComponent as TooltipIcon} from "assets/icons/info.svg";
import ReactTooltip from "react-tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        autoSkip: true,
        minTicksLimit: 50
      }
    },
  },
};


type Props = {
  onClose: () => void
  isOpen: boolean
  balance: number
  workMiners: number
  marketTokens: number
}

export const Calculator2 = ({ onClose, isOpen, balance, workMiners, marketTokens }: Props): JSX.Element => {
  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")
  const [result2, setResult2] = useState("")
  const [elfs, setElfs] = useState("")
  const [token, setToken] = useState("")
  const [days, setDays] = useState('')
  const [data, setData] = useState<any>()

  const multiplyPercents = (days: number, value: number) => {
    let i = days;
    let result = value

    while (i) {
      result = (105 / 100) * result
      i--;
    }

    return Math.floor(result)
  }

  const getAllInfo = (newCalc: string) => {
    if (Number(newCalc) > 0) {
      const resultValue = Math.floor(Number(newCalc) / (Number(newCalc) + 500000 + balance) * marketTokens / workMiners)
      setResult(resultValue.toString())

      if (Number(days) > 0) {
        setData({
          labels: Array.from({length: Number(days)}, (_, i) => (i + 1).toString()),
          datasets: [
            {
              label: t`yourTotalELF`,
              backgroundColor: "#331606",
              data: Array.from({length: Number(days)}, (i, index) => {
                return (multiplyPercents(Number(index + 1), Number(resultValue))).toString()
              })
            }
          ],
        })
        const tokenValue = Math.floor((105 / 100) * (resultValue * 86400 * Number(days)))
        setToken(tokenValue.toString())
        // setResult2((tokenValue / (tokenValue + marketTokens) * balance).toFixed(4).toString())

        setElfs((multiplyPercents(Number(days), resultValue)).toString())
      }
    } else {
      setResult("0")
      setToken("0")
      setResult2("0")
      setElfs("0")
    }
  }

  const getAllInfo2 = (newDays: string, resultNew: string) => {
    if (Number(newDays) > 0 && Number(calc) > 0) {
      const tokenValue = Math.floor((105 / 100) * (Number(resultNew) * 86400 * Number(newDays)))
      setToken(tokenValue.toString())
      // setResult2((tokenValue / (tokenValue + marketTokens) * balance).toFixed(4).toString())
      multiplyPercents(Number(newDays), Number(resultNew))
      setElfs((multiplyPercents(Number(newDays), Number(resultNew))).toString())

      setData({
        labels: Array.from({length: Number(newDays)}, (_, i) => (i + 1).toString()),
        datasets: [
          {
            label: t`yourTotalELF`,
            backgroundColor: "#331606",
            data: Array.from({length: Number(newDays)}, (i, index) => {
            return (multiplyPercents(Number(index + 1), Number(resultNew))).toString()
          })
        }
        ],
      })
    } else {
      setToken("0")
      setResult2("0")
      setElfs("0")
    }
  }

  useEffect(() => {
    getAllInfo(calc)
    getAllInfo2(days, result)

  }, [])

  return (
    <Modal
      width={852}
      height={867}
      variant='calc' className="calculator2" isOpen={isOpen} onClose={onClose} title={t`calculator`}>
      {/*<p className="calculator2-desc">{`some text`}</p>*/}
      <div className='calculator2-wrapper'>
        <div className='calculator2-content'>
          <InputBg
            className="calculator2-input"
            placeholder="50"
            onChange={v => {
              setCalc(v)
              getAllInfo(v)
            }}
            small
            append={<div>BUSD <TooltipIcon data-tip={t`yourInitialBUSDAmount`} /></div>}
            value={calc}
          />
          <img src={arrowSrc} alt="arrow" className="calculator2-arrow" />
          <InputBg
            className="calculator2-input"
            placeholder="..."
            append={<div>ELF <TooltipIcon data-tip={t`yourInitialELFAmount`} /></div>}
            onChange={v => {
              setResult(v)
              getAllInfo(calc)
            }}
            small
            value={result}
          />
          {/*<div className='calculator2-tooltip'>{t`info`} <TooltipIcon data-tip={t`yourNextReinvestment`} /></div>*/}
        </div>
        <div className='calculator2-plus'></div>
        <div className='calculator2-content second'>
          <InputBg
            className="calculator2-input"
            placeholder="1"
            onChange={v => {
              setDays(v)
              getAllInfo2(v, result)
            }}
            small
            append={<div><span style={{textTransform: 'uppercase'}}>{t`days`}</span> <TooltipIcon data-tip={t`fillInTheNumberOfDaysToCalculate`} /></div>}
            value={days}
          />
          <img src={arrowSrc} alt="arrow" className="calculator2-arrow" />
          <InputBg
            className="calculator2-input"
            placeholder="..."
            append={<div>Evergreen <TooltipIcon data-tip={`${t`howManyEvergreenYouCanCollectPerDayAfter`} ${days} ${t`days`}`} /></div>}
            onChange={v => {
              setToken(v)
              getAllInfo2(days, result)
            }}
            small
            value={token}
          />
          <img src={arrowSrc} alt="arrow" className="calculator2-arrow" />
          <InputBg
            className="calculator2-input"
            placeholder="..."
            append={<div>ELF <TooltipIcon data-tip={t`howManyNewELFWorkForYouAfter`} /></div>}
            onChange={v => {
              setElfs(v)
              getAllInfo2(days, result)
            }}
            small
            value={elfs}
          />
        </div>
      </div>

      <div className='calculator2-bar'>
        {!!data && <Bar options={options} data={data} />}
      </div>
      {/*@ts-ignore*/}
      <ReactTooltip html={true} />
    </Modal>
  )
}