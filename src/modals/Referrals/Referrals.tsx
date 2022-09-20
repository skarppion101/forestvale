import { ButtonModal, Collapse, Modal } from "components"

import usersSrc from "assets/images/users.webp"
import goldSrc from "assets/images/gold.webp"
import gifSrc from "assets/gifs/eskimocampfire.gif"
import npcSrc from "assets/images/npc/alice.webp"
import "./Referrals.scss"
import { routes } from "../../utils"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  people: number
  money: number
  address: string
}

export const Referrals = ({ onClose, isOpen, people, money, address }: Props): JSX.Element => {
  function copyToClipboard(text) {
    const elem = document.createElement("textarea")
    elem.value = text
    document.body.appendChild(elem)
    elem.select()
    document.execCommand("copy")
    document.body.removeChild(elem)
  }

  const copy = () => {
    copyToClipboard(`${window.location.origin}${routes.game}?ref=${address}`)
    alert("Link is copied!")
  }

  return (
    <Modal
      height={953}
      secondTitle="Alicy"
      secondModal={<div>{t`somethingTellsMe`}</div>}
      variant="ref"
      secondImg={npcSrc}
      className="referrals"
      isOpen={isOpen}
      onClose={onClose}
      title={t`referrals`}
    >
      <div className="referrals-content">
        <p className="referrals-desc">{t`inviteMoreSummoner`}</p>
        <div className="referrals-block">
          <div className="referrals-block-left">
            <div className="referrals-block-left-title">
              <img src={usersSrc} alt="people" />
              {t`referrals`}
            </div>
            <div className="referrals-block-left-desc">({t`numberOfYourReferrals`})</div>
          </div>
          {people > 0 ? people : 0}
        </div>
        <div className="referrals-block">
          <div className="referrals-block-left">
            <div className="referrals-block-left-title">
              <img src={goldSrc} alt="gold" />
              {t`referralRewards`}
            </div>
            <div className="referrals-block-left-desc">({t`earnedFromReferrals`})</div>
          </div>
          {money > 0 ? money : 0} BUSD
        </div>
        <div className="referrals-footer">
          <img src={gifSrc} alt="eskimos" className="referrals-footer-gif" />
          <ButtonModal onClick={copy} text={t`copyReferralLink`} className="referrals-footer-btn" />
        </div>
        <div className="referrals-collapse">
          <Collapse
            opened
            desc={
              <table>
                <tr>
                  <th>{t`unlockYourLevel`}</th>
                  <th>{t`minSummon`}</th>
                  <th>{t`whenSummoning`}</th>
                  <th>{t`whenPolishing`}</th>
                </tr>
                <tr>
                  <td>1 {t`level`}</td>
                  <td>100 BUSD</td>
                  <td>5%</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2 {t`level`}</td>
                  <td>250 BUSD</td>
                  <td>4%</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3 {t`level`}</td>
                  <td>500 BUSD</td>
                  <td>3%</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>4 {t`level`}</td>
                  <td>1000 BUSD</td>
                  <td>2%</td>
                  <td>1%</td>
                </tr>
                <tr>
                  <td>5 {t`level`}</td>
                  <td>2500 BUSD</td>
                  <td>3%</td>
                  <td>1%</td>
                </tr>
                <tr>
                  <td>6 {t`level`}</td>
                  <td>5000 BUSD</td>
                  <td>4%</td>
                  <td>1%</td>
                </tr>
                <tr>
                  <td>7 {t`level`}</td>
                  <td>10000 BUSD</td>
                  <td>5%</td>
                  <td>1%</td>
                </tr>
              </table>
            }
            title={t`information`}
          />
        </div>
      </div>
    </Modal>
  )
}