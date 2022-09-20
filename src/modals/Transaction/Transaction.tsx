import { useState } from "react"

import { ButtonModal, Modal } from "components"

import npcSrc from "assets/images/npc/matilda.webp"
import { ReactComponent as ExportIcon } from "assets/icons/export.svg"
import "./Transaction.scss"
import cn from "classnames"
import { t } from "@lingui/macro"

type Props = {
  onClose: () => void
  isOpen: boolean
  transactions: any[]
}

export const Transaction = ({ onClose, isOpen, transactions }: Props): JSX.Element => {
  const [changeView, setChangeView] = useState(false)
  const el = document.getElementsByClassName("movable")[0]

  const toggleView = () => setChangeView(!changeView)

  console.log(transactions)

  return (
    <Modal
      withoutBorder
      secondImg={npcSrc}
      secondTitle="Matilda"
      secondModal={<div>{t`helloSummoner`}</div>}
      className="transactions"
      isOpen={isOpen}
      onClose={onClose}
      variant='big'
      height={610}
      title={t`transactions`}
    >
      <div className="transactions-btns">
        <ButtonModal
          onClick={toggleView}
          text={t`summonPolish`}
          className={cn("transactions-btns-item", {
            opacity: changeView,
          })}
        />
        <ButtonModal
          onClick={toggleView}
          text={t`expandProgram`}
          className={cn({
            opacity: !changeView,
          })}
        />
      </div>
      {changeView ? (
        <div className="table-wrapper">
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
        </div>
      ) : (
        <div className="transactions-wrapper">
          {transactions?.map((i, index) => (
            <div key={index} className="transactions-block">
              <button
                onMouseOver={() => {
                  el?.classList.add("active")
                }}
                onMouseLeave={() => {
                  el?.classList.remove("active")
                }}
                onClick={() => alert("Success!")}
                className="transactions-block-left"
              >
                <div className="transactions-block-sign">{i.method === "buyMiners" ? "-" : "+"}</div>
                <div className="transactions-block-title">
                  {i.method === "buyMiners" ? t`summonELF` : t`polishEvergreen`}
                </div>
              </button>
              <button
                onMouseOver={() => {
                  el?.classList.add("active")
                }}
                onMouseLeave={() => {
                  el?.classList.remove("active")
                }}
                onClick={() => alert("Success!")}
                className={cn({
                  "transactions-block-green": i.method === "buyMiners",
                  "transactions-block-purple": i.method === "sellTokens",
                })}
              >
                {i.method === "buyMiners" ? "+" : "-"} {i.amount} BUSD
              </button>
              <div className="transactions-block-right">
                <a
                  href={`https://testnet.bscscan.com/tx/${i.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  onMouseOver={() => {
                    el?.classList.add("active")
                  }}
                  onMouseLeave={() => {
                    el?.classList.remove("active")
                  }}
                  className="transactions-block-right-link"
                >
                  <ExportIcon />
                </a>
                {i.timeAgo}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}