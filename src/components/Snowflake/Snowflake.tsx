import "./Snowflake.scss"
import cn from "classnames"
import { t } from "@lingui/macro"

import bnbSrc from "assets/images/bnbiconhd.webp"
import snowSrc from "assets/images/snowballlogohdrender.webp"

export const Snowflake = ({ animation }: { animation: boolean }): JSX.Element => {
  return (
    <div className="snowflake">
      <div
        className={cn("snowflake-left", {
          "animate__animated animate__fadeInLeft show": animation,
        })}
      >
        <h2 className="snowflake-left-title">{t`evergreen`}</h2>
        <p className="snowflake-left-desc">
          {t`summonELFToHelpYouCollect`} <br /> {t`evergreenAndConvertThemToBUSD`}
        </p>
      </div>
      <div
        className={cn("snowflake-right", {
          "animate__animated animate__fadeInRight show": animation,
        })}
      >
        <img src={snowSrc} alt="snow" className="snowflake-right-img" />
        <img src={bnbSrc} alt="bnb" className="snowflake-right-img" />
      </div>
    </div>
  )
}