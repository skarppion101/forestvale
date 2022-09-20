import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ethers } from "ethers"
import { useMedia } from "use-media"
import { MapInteractionCSS } from "react-map-interaction"
import { useNavigate } from "react-router"
import { useWeb3React } from "@web3-react/core"
import Web3 from "web3"

import {ButtonClose, ButtonGame, Hives, Languages, Loading, Map} from "components"
import { Harvest, Castle, Polish } from "modals"
import { contractAddress } from "abi"
import abi from "abi/abi.json"
import { mixins, routes, useWindowHeight } from "utils"
import { connectors } from "utils/connectors"

import bgSrc from "assets/gifs/forestdungeonpp.gif"
import bg from "assets/images/loading.webp"
import "./Dungeon.scss"
import cn from "classnames"
import { links } from "../Game/utils"
import menuSrc from "../../assets/images/snowballmenu.gif.webp"
import { t } from "@lingui/macro"
import snowSrc from "../../assets/images/snow-small.webp";

export const Dungeon = (): JSX.Element => {
  const [search] = useSearchParams()
  const { account, activate, library } = useWeb3React()
  const height = useWindowHeight()
  const navigate = useNavigate()
  const [bonus, setBonus] = useState(0)
  const [miners, setMiners] = useState(0)
  const [iceBucket, setIceBucket] = useState(0)
  const [harvest, setHarvest] = useState(false)
  const [castle, setCastle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [polish, setPolish] = useState(false)
  const [menu, setMenu] = useState(false)
  const [token, setToken] = useState(0)
  const [dropdown, setDropdown] = useState(false)
  const isM = useMedia({ maxWidth: mixins.m })
  const el = document.getElementsByClassName("movable")[0]
  const busd = 1000000000000000000

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider]).catch(() => navigate(`${routes.index}?${search.toString()}`))
    } else {
      navigate(`${routes.index}?${search.toString()}`)
    }
  }, [])

  useEffect(() => {
    const id = search.get("id") || ""
    switch (id) {
      case "harvest":
        setHarvest(true)
        break
      case "castle":
        setCastle(true)
        break
    }
  }, [search])

  const getAllInfo = async () => {
    // @ts-ignore
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    const nftContract = new ethers.Contract(contractAddress, abi, provider)

    const tokenData = await nftContract.getMyTokens(account)
    setToken(Number(tokenData))

    const minersData = await nftContract.getMyMiners(account)
    setMiners(Number(minersData))

    if (Number(tokenData) > 0) {
      const reward = await nftContract.MyReward(account)

      setBonus(Number(reward) / busd)

      const basket = await nftContract.calculateTokensSell(tokenData.toString())
      console.log(Number(basket))
      setIceBucket(Number(basket) / busd)
    }
  }

  useEffect(() => {
    getAllInfo()
  }, [setMiners, account])

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
        return navigate(`${routes.game}?id=wishing&${search.toString()}`)
      case "referrals":
        return navigate(`${routes.castle}?id=referrals&${search.toString()}`)
    }
  }

  const defaultValue = {
    scale: 0.55,
    translation: {
      x: window.innerWidth < 600 ? -100 : 250,
      y: window.innerWidth < 600 ? 100 : 0,
    },
  }

  const onPolish = () => {
    if (
      (miners > 99 && miners < 106) ||
      (miners > 199 && miners < 211) ||
      (miners > 299 && miners < 316) ||
      (miners > 399 && miners < 421) ||
      (miners > 499 && miners < 526) ||
      (miners > 599 && miners < 631) ||
      miners > 699
    ) {
      const web3 = new Web3(library.provider)
      // @ts-ignore
      const web3Contract = new web3.eth.Contract(abi, contractAddress)
      // @ts-ignore
      const toWei = amount => Web3.utils.toWei(amount)
      // @ts-ignore
      web3Contract.methods
        .sellTokens(toWei(miners.toString()))
        .send({
          from: account,
          to: contractAddress,
        })
        .then(() => getAllInfo())
    } else {
      setPolish(true)
    }
  }

  console.log(miners)

  return (
    <div className="dungeon-wrapper" style={{ backgroundImage: `url(${bg})`, minHeight: height }}>
      <button onClick={() => setDropdown(true)} className="game-content-open">
        <img src={snowSrc} alt="snow" />
      </button>
      <Hives
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
        <ButtonClose onClick={() => navigate(`${routes.game}?${search.toString()}`)} />
        <div className="dungeon" style={{ minHeight: height }}>
          <ButtonGame
            onTouchEnd={isM ? () => setCastle(true) : undefined}
            text={t`summoner`}
            onClick={() => setCastle(true)}
            className="dungeon-summoner"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setHarvest(true) : undefined}
            text="Alisha"
            onClick={() => setHarvest(true)}
            className="dungeon-alisha"
          />
          <img onLoad={() => setLoading(false)} src={bgSrc} alt="dungeon" className="dungeon-img" />
        </div>
      </MapInteractionCSS>
      {loading && <Loading />}
      <Harvest
        miners={miners}
        openPolish={onPolish}
        disableClosing={polish}
        iceBucket={iceBucket}
        onClose={() => setHarvest(false)}
        isOpen={harvest}
      />
      <Polish miners={miners} onClose={() => setPolish(false)} isOpen={polish} />
      <Castle updateState={getAllInfo} miners={miners} bonus={bonus} onClose={() => setCastle(false)} isOpen={castle} />
      <Map />
    </div>
  )
}
