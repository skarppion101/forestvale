
import { Modal } from "components"

import clockSrc from "assets/images/clock.webp"
import chestSrc from "assets/images/chest.webp"
import "./Wishing.scss"
import { useEffect, useState } from "react"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  money: number
  time: number
  address: string
}

export const Wishing = ({ onClose, isOpen, money, address, time }: Props): JSX.Element => {
  const [newTime, setNewTime] = useState(0)
  const [writeTime, setWriteTime] = useState('00:00')

  useEffect(() => {
    setNewTime(time)
  }, [time])

  useEffect(() => {
    // Timer that decrements itself each second and updates the mins/seconds downwards
    const timerInterval = setInterval(() => {
      // Get current timestamp
      const currentTime = new Date().getTime();
      // Calculate distance
      const distance = (time * 1000 + 3600000) - currentTime;

      if (distance > 0) {

        let minutes = Math.floor((distance / 1000 / 60) % 60);
        let seconds = Math.floor((distance / 1000) % 60);

        if (seconds < 10) { // @ts-ignore
          seconds = '0' + seconds
        }
        if (minutes < 10) { // @ts-ignore
          minutes = '0' + minutes;
        }

        setWriteTime(minutes + ':' + seconds)

      } else {
        setWriteTime("00:00")
      }

      // console.log(distance);

    }, 1000);

    return () => {
      clearInterval(timerInterval)
    }
  }, [newTime])

  return (
    <Modal className="wishing" isOpen={isOpen} onClose={onClose} title="Wish Well">
      <div className="wishing-time">
        <div className="wishing-time-time">
          <img src={clockSrc} alt="clock" />
          {t`wishWell`}
        </div>
        <div>{writeTime}</div>
        <div>{money} BUSD</div>
      </div>
      <div className="wishing-block">
        <div className="wishing-block-left-title">
          <img src={chestSrc} alt="chest" />
          {t`lastWalletAddress`}
        </div>
        <div className="wishing-block-value">{address}</div>
      </div>
      <div className="wishing-desc">{t`ifThereAreNoPurchases`}</div>
    </Modal>
  )
}