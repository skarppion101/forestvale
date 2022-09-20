import "./Roadmap.scss"
import { t } from "@lingui/macro"

import { ReactComponent as ArrowIcon } from "assets/icons/roadmap.svg"
import cn from "classnames"

type Props = {
  animation: boolean
}

export const Roadmap = ({ animation }: Props): JSX.Element => {
  return (
    <div id="roadmap" className="roadmap">
      <h2 className="roadmap-title">{t`roadmap`}</h2>
      <div className="roadmap-content">
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInRight show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q2 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>{t`dappDevelopment`}</li>
            <li>{t`contractDevelopment`}</li>
            <li>{t`dappAnimation`}</li>
            <li>{t`ageOfMiningLanding`}</li>
            <li>{t`ageOfMiningDappLaunch`}</li>
            <li>{t`buildCommunity`}</li>
            <li>{t`dappMobileVersion`}</li>
            <li>{t`audit`}</li>
            <li>{t`marketingCampaign`}</li>
            <li>{t`updateDappInterface`}</li>
            <li>{t`musicProduction`}</li>
          </ul>
        </div>
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInLeft animate__delay-1s show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q3 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>{t`marketingCampaign`}</li>
            <li>{t`dappAnimationUpdate`}</li>
            <li>{t`BUSDMiner`}</li>
            <li>{t`networkExpansion`}</li>
            <li>{t`newContractsWithNewMechanics`}</li>
            <li>{t`newContractAudit`}</li>
            <li>{t`FTMNetworkMiner`}</li>
          </ul>
        </div>
        <div
          className={cn("roadmap-content-item", {
            "animate__animated animate__fadeInLeft animate__delay-2s show": animation,
          })}
        >
          <ArrowIcon className="roadmap-content-item-arrow" />
          <div className="roadmap-content-item-title">Q4 2022</div>
          <ul className="roadmap-content-item-desc">
            <li>{t`marketingCampaign`}</li>
            <li>{t`ageOfMiningAnimatedSeries`}</li>
            <li>{t`AVAXNetworkMiner`}</li>
            <li>{t`NFTMechanism`}</li>
            <li>{t`swapSystem`}</li>
            <li>{t`swapContractAudit`}</li>
            <li>{t`polygonNetworkMiner`}</li>
            <li>{t`roadmapUpdate`}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}