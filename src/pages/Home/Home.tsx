import { useNavigate } from "react-router"
import { useState } from "react"
import { useMedia } from "use-media"
import { useSearchParams } from "react-router-dom"
import { t } from "@lingui/macro"

import { mixins, routes, useScrollPosition, useWindowHeight } from "utils"
import { Button, Claim, GameFeature, Header, Loading, Roadmap, Snowflake, Video } from "components"

import bgSrc from "assets/images/snowballfrontpagegoldbg.webp"
// import bgMobileSrc from "assets/images/bg-mobile.webp"
import "./Home.scss"

type Props = {
  onPlay: () => void
}

export const Home = ({ onPlay }: Props): JSX.Element => {
  const navigate = useNavigate()
  const [firstLoad, setFirstLoad] = useState(true)
  const [search] = useSearchParams()
  const height = useWindowHeight()
  const scroll = useScrollPosition()
  const isM = useMedia({ maxWidth: mixins.m })

  return (
    <div className="home">
      {firstLoad && <Loading />}
      <Header onPlay={onPlay} scroll={scroll} />
      <div className="home-content" style={{ backgroundImage: `url(${bgSrc})`, height: !isM ? height : "380px" }}>
        <h3 className="animate__animated animate__fadeInUp">{t`welcomeToTheAmazingAge`}</h3>
        <h1 className="animate__animated animate__fadeInUp">{t`startEarning`}</h1>
        <Button
          onClick={() => {
            onPlay()
            navigate(`${routes.connect}?${search.toString()}`)
          }}
          animate
          text={t`startPlaying`}
        />
      </div>
      <Video endLoad={() => setFirstLoad(false)} />
      <Snowflake animation={isM ? scroll > 100 : scroll > 460} />
      <GameFeature animation={isM ? scroll > 250 : scroll > 760} />
      <Roadmap animation={scroll > 1960} />
      <Claim onPlay={onPlay} />
    </div>
  )
}
