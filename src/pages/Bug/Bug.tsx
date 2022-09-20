import { useEffect, useState } from "react"

import { Header, Loading } from "components"

import "./Bug.scss"
import { mixins, useWindowHeight } from "utils"
import { useMedia } from "use-media"

export const Bug = (): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState(true)
  const height = useWindowHeight()
  const isM = useMedia({ maxWidth: mixins.m })

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false)
    }, 1500)
  }, [setFirstLoad])

  return (
    <div className="bug" style={{ minHeight: height }}>
      {firstLoad && <Loading />}
      <Header defaultPos />
      <div className="bug-content">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScJsh9T-P2zWNoBi0b51Ghw3ifB9h-xJ6ubKU7i2LBA3IqUUg/viewform?embedded=true"
          width={isM ? 300 : 600}
          height={isM ? 1100 : 600}
          frameBorder="0"
          data-aos="fade-up"
          className="aos-init aos-animate"
        />
      </div>
    </div>
  )
}
