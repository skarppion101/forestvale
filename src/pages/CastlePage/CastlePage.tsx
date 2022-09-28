import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ethers } from "ethers"
import { useMedia } from "use-media"
import { MapInteractionCSS } from "react-map-interaction"
import { useNavigate } from "react-router"
import { useWeb3React } from "@web3-react/core"
const abiDecoder = require("abi-decoder")

import {ButtonClose, ButtonGame, Hives, Languages, Loading, Map} from "components"
import {Referrals, Stats, Calculator, Timer, Calculator2} from "modals"
import { contractAddress } from "abi"
import abi from "abi/abi.json"
import { mixins, routes, useWindowHeight } from "utils"
import { connectors } from "utils/connectors"

import bg from "assets/images/loading.webp"
import gifSrc from "assets/gifs/forestshirogifpp.gif"
import "./CastlePage.scss"
import { api } from "service/api/api"
import cn from "classnames"
import { links } from "../Game/utils"
import menuSrc from "../../assets/images/snowballmenu.gif.webp"
import { t } from "@lingui/macro"
import snowSrc from "../../assets/images/snow-small.webp";

export const CastlePage = (): JSX.Element => {
  const [search] = useSearchParams()
  const height = useWindowHeight()
  const { account, activate } = useWeb3React()
  const navigate = useNavigate()
  const [referral, setReferral] = useState(false)
  const [stats, setStats] = useState(false)
  const [referralPeople, setReferralPeople] = useState(0)
  const [referralCount, setReferralCount] = useState(0)
  const [token, setToken] = useState(0)
  const [miners, setMiners] = useState(0)
  const [iceBucket, setIceBucket] = useState(0)
  const [dropdown, setDropdown] = useState(false)
  const [totalMembers, setTotalMembers] = useState(0)
  const [total, setTotal] = useState(0)
  const [workMiners, setWorkMiners] = useState(0)
  const [marketTokens, setMarketTokens] = useState(0)
  const [calculator, setCalculator] = useState(false)
  const [timer, setTimer] = useState(false)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [allTransactionsCount, setAllTransactionsCount] = useState(0)
  const isM = useMedia({ maxWidth: mixins.m })
  const busd = 1000000000000000000
  const el = document.getElementsByClassName("movable")[0]
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const id = search.get("id") || ""
    switch (id) {
      case "stats":
        setStats(true)
        break
      case "referral":
        setReferral(true)
        break
      case "timer":
        setTimer(true)
        break
      case "calculator":
        setCalculator(true)
        break
    }
  }, [search])

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider]).catch(() => navigate(`${routes.index}?${search.toString()}`))
    } else {
      navigate(`${routes.index}?${search.toString()}`)
    }
  }, [])

  const getAllInfo = async () => {
    // @ts-ignore
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    api.getBalance(account || '').then((r: any) => {
      setBalance((Number(r.result) / busd)  - 0.02)
    })

    const nftContract = new ethers.Contract(contractAddress, abi, provider)
    const totalUsers = await nftContract.countUsers()
    setTotalMembers(Number(totalUsers))

    const workMinersData = await nftContract.SECONDS_WORK_MINER()
    setWorkMiners(Number(workMinersData))

    const marketTokensData = await nftContract.marketTokens()
    setMarketTokens(Number(marketTokensData))

    const tokenData = await nftContract.getMyTokens(account)
    setToken(Number(tokenData))

    const minersData = await nftContract.getMyMiners(account)
    setMiners(Number(minersData))

    const refData = await nftContract.referralsCount(account)
    const refRew = await nftContract.referralReward(account)
    setReferralPeople(Number(refData))
    setReferralCount(Number(refRew) / busd)

    api.getBalanceOther().then((r: any) => {
      setTotal(Number(r.result) / 1000000000000000000 || 0)
    })

    abiDecoder.addABI(abi)

    api.getData().then((r: any) => {
      setAllTransactionsCount(r.result.length)
    })

    if (Number(tokenData) > 0) {
      const basket = await nftContract.calculateTokensSell(tokenData.toString())
      console.log(Number(basket))
      setIceBucket(Number(basket) / busd)
    }
  }

  useEffect(() => {
    getAllInfo()
  }, [setTotal, account])

  const defaultValue = {
    scale: 0.5,
    translation: {
      x: window.innerWidth < 600 ? -100 : 350,
      y: window.innerWidth < 600 ? 300 : 100,
    },
  }

  const handleClick = (value: string) => {
    switch (value) {
      case "map":
        return navigate(`${routes.game}?${search.toString()}`)
      case "castle":
        return navigate(`${routes.castle}?${search.toString()}`)
      case "lostTemple":
        return navigate(`${routes.lostTemple}?${search.toString()}`)
      case "dungeon":
        return navigate(`${routes.dungeon}?${search.toString()}`)
      case "wishing":
        return navigate(`${routes.game}?id=wishing&?${search.toString()}`)
      case "referrals":
        return navigate(`${routes.castle}?id=referrals&?${search.toString()}`)
    }
  }

  return (
    <div className="castle-page-wrapper" style={{ backgroundImage: `url(${bg})`, minHeight: height }}>
      <button onClick={() => setDropdown(true)} className="game-content-open">
        <img src={snowSrc} alt="snow" />
      </button>
      <Hives
        balance={balance}
        updateState={getAllInfo}
        token={token}
        miners={miners}
        bonus={iceBucket}
        isModal={isM ? () => setDropdown(false) : undefined}
        className={cn("game-content-user", {
          show: dropdown,
        })}
      />
      <Languages className='game-lang' />
      <div className="game-content-menu">
        <button
          onMouseOver={() => {
            el?.classList.add("active")
          }}
          onMouseLeave={() => {
            el?.classList.remove("active")
          }}
          onClick={() => setMenu(!menu)}
          className="game-content-menu-btn"
        >
          <img src={menuSrc} alt="menu" />
        </button>
        {menu && (
          <div className="game-content-menu-content">
            {links().map((social, index) => (
              <>
                {social.onClick ? (
                  <button
                    onMouseOver={() => {
                      el?.classList.add("active")
                    }}
                    onMouseLeave={() => {
                      el?.classList.remove("active")
                    }}
                    key={index}
                    className="game-content-menu-content-btn"
                    onClick={() => handleClick(social.onClick)}
                  >
                    {social.title}
                  </button>
                ) : (
                  <a
                    onMouseOver={() => {
                      el?.classList.add("active")
                    }}
                    onMouseLeave={() => {
                      el?.classList.remove("active")
                    }}
                    className="game-content-menu-content-btn"
                    key={index}
                    href={social.route ? social.route : social.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.title}
                  </a>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <MapInteractionCSS
        defaultValue={defaultValue}
        minScale={0.45}
        translationBounds={{
          xMax: isM ? 500 : 700,
          yMax: isM ? 1000 : 700,
          xMin: isM ? -1100 : -200,
          yMin: isM ? -1200 : -300,
        }}
      >
        <ButtonClose inRoomModal onClick={() => navigate(`${routes.game}?${search.toString()}`)} />
        <div className="castle-page" style={{ minHeight: height }}>
          <ButtonGame
            onTouchEnd={isM ? () => setTimer(true) : undefined}
            text={t`timer`}
            onClick={() => setTimer(true)}
            className="castle-page-timer"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setReferral(true) : undefined}
            text={t`elfEnvoy`}
            onClick={() => setReferral(true)}
            className="castle-page-ref"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setCalculator(true) : undefined}
            text={t`tangela`}
            onClick={() => setCalculator(true)}
            className="castle-page-calc"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setStats(true) : undefined}
            text={t`elvina`}
            onClick={() => setStats(true)}
            className="castle-page-elvina"
          />
          <img onLoad={() => setLoading(false)} src={gifSrc} alt="background" className="castle-page-img" />
        </div>
      </MapInteractionCSS>
      {loading && <Loading />}
      <Referrals
        address={account as string}
        people={referralPeople}
        money={referralCount}
        onClose={() => setReferral(false)}
        isOpen={referral}
      />
      <Stats
        profit={iceBucket}
        total={total}
        transactions={allTransactionsCount}
        totalMembers={totalMembers}
        onClose={() => setStats(false)}
        isOpen={stats}
      />
      <Calculator2
        balance={total}
        marketTokens={marketTokens}
        workMiners={workMiners}
        onClose={() => setCalculator(false)}
        isOpen={calculator}
      />
      <Timer onClose={() => setTimer(false)} isOpen={timer} />
      <Map />
    </div>
  )
}
