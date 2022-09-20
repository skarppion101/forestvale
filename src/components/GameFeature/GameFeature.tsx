import { useNavigate } from "react-router"
import cn from "classnames"
import { useSearchParams } from "react-router-dom"
import { t } from "@lingui/macro"

import { routes } from "utils"

import "./GameFeature.scss"

import img1Src from "assets/gifs/snowballswap.gif"
import img2Src from "assets/gifs/snowballpool.gif"
import img3Src from "assets/gifs/icecastle.gif"
import img4Src from "assets/gifs/eskimocampfire.gif"
import imgbackSrc from "assets/images/back.webp"
import { ButtonGame } from "../ButtonGame"

type Props = {
  animation: boolean
}

export const GameFeature = ({ animation }: Props): JSX.Element => {
  // const el = document.getElementsByClassName("movable")[0]
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const items = [
    {
      title: t`summonCollect`,
      img: img1Src,
      id: "",
      className: "animate__animated animate__fadeInLeft show",
      desc: <p>{t`ELFAreMagicalCreatures`}</p>,
    },
    {
      title: t`reCollect`,
      img: img2Src,
      id: "",
      className: "animate__animated animate__fadeInLeft animate__delay-05s show",
      desc: <p>{t`playersWhoPlay`}</p>,
    },
    {
      title: t`treeCastle`,
      img: img3Src,
      id: "castle",
      className: "animate__animated animate__fadeInLeft animate__delay-1s show",
      desc: <p>{t`ageOfMiningHasSeveral`}</p>,
    },
    {
      title: t`referrals`,
      id: "referral",
      className: "animate__animated animate__fadeInLeft animate__delay-15s show",
      img: img4Src,
      desc: <p>{t`inviteMoreSummoner`}</p>,
    },
  ]
  return (
    <div id="features" className="game-feature" style={{ backgroundImage: `url(${imgbackSrc})` }}>
      <h2 className="game-feature-title">{t`gameFeatures`}</h2>
      <div className="game-feature-content">
        {items.map((item, index) => (
          <div key={index} className={cn("game-feature-content-item", `${animation && item.className}`)}>
            <ButtonGame
              className="game-feature-content-item-btn"
              onClick={() => navigate(`${routes.connect}?id=${item.id}&${search.toString()}`)}
              text={item.title}
            />
            <div className="game-feature-content-item-img-wrapper">
              <img src={item.img} alt="placeholder" className="game-feature-content-item-img" />
            </div>
            {item.desc}
          </div>
        ))}
      </div>
    </div>
  )
}