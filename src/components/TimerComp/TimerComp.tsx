import { useState } from "react"

import "./Timer.scss"

type Props = {
  time?: string
  setRevert?: () => void
}

export const TimerComp = ({ time = "2022-08-15T12:30:00Z", setRevert }: Props): JSX.Element => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const countDownDate = new Date(time).getTime()

  setInterval(function () {
    const now = new Date().getTime()
    const timeLeft = countDownDate - now

    if (timeLeft < 0) {
      setRevert && setRevert()
      const newLeftTime = now - countDownDate

      setDays(Math.floor(newLeftTime / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((newLeftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((newLeftTime % (1000 * 60 * 60)) / (1000 * 60)))
      setSeconds(Math.floor((newLeftTime % (1000 * 60)) / 1000))

      return
    }

    // Calculating the days, hours, minutes and seconds left
    setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)))
    setHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)))
    setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000))
  }, 1000)

  return (
    <div className="timer-wrapper">
      <div className="timer-value-wrapper">
        <div className="timer-desc">days</div>
        <div className="timer-value">{days.toString().replace("-", "")}</div>
      </div>
      :
      <div className="timer-value-wrapper">
        <div className="timer-desc">hours</div>
        <div className="timer-value">{hours.toString().replace("-", "")}</div>
      </div>
      :
      <div className="timer-value-wrapper">
        <div className="timer-desc">min</div>
        <div className="timer-value">{minutes.toString().replace("-", "")}</div>
      </div>
      :
      <div className="timer-value-wrapper">
        <div className="timer-desc">sec</div>
        <div className="timer-value">{seconds.toString().replace("-", "")}</div>
      </div>
    </div>
  )
}
