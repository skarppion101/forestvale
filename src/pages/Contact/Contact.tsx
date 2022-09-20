import { useEffect, useState } from "react"

import { Header, Loading } from "components"

import "./Contact.scss"
import { useMedia } from "use-media"
import { mixins } from "utils"

export const Contact = (): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState(true)
  const isM = useMedia({ maxWidth: mixins.m })

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false)
    }, 1500)
  }, [setFirstLoad])

  return (
    <div className="contact">
      {firstLoad && <Loading />}
      <Header defaultPos />
      <div className="contact-content">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd7MPvYGxR5NILT--J4MOgSBnX9DyxDVEcPotGJFFDmgEaUiA/viewform?embedded=true"
          width={isM ? 300 : 640}
          height={isM ? 2000 : 1470}
          frameBorder="0"
          data-aos="fade-up"
          className="aos-init aos-animate"
        />
      </div>
    </div>
  )
}
