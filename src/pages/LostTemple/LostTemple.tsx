import React, { useEffect, useState } from "react"
import { useMedia } from "use-media"
import { MapInteractionCSS } from "react-map-interaction"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"

import {ButtonClose, ButtonGame, Hives, Languages, Loading, Map, NpcModal} from "components"
import { FAQ } from "modals"
import { mixins, routes, useWindowHeight } from "utils"

import bg from "assets/images/loading.webp"
import gifSrc from "assets/gifs/forestlostpp.gif"
import slimeSrc from "assets/images/npc/slime.webp"
import "./LostTemple.scss"
import cn from "classnames"
import { connectors } from "../../utils/connectors"
import { ethers } from "ethers"
import { contractAddress } from "../../abi"
import abi from "../../abi/abi.json"
import { useWeb3React } from "@web3-react/core"
import menuSrc from "../../assets/images/snowballmenu.gif.webp"
import { links } from "../Game/utils"
import { t } from "@lingui/macro"
import snowSrc from "../../assets/images/snow-small.webp";

export const LostTemple = (): JSX.Element => {
  const [search] = useSearchParams()
  const { account, activate } = useWeb3React()
  const navigate = useNavigate()
  const [faq, setFaq] = useState(false)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(0)
  const [miners, setMiners] = useState(0)
  const [iceBucket, setIceBucket] = useState(0)
  const [dropdown, setDropdown] = useState(false)
  const [slime, setSlime] = useState(false)
  const isM = useMedia({ maxWidth: mixins.m })
  const height = useWindowHeight()
  const busd = 1000000000000000000
  const el = document.getElementsByClassName("movable")[0]
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const id = search.get("id") || ""
    switch (id) {
      case "faq":
        setFaq(true)
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

    const nftContract = new ethers.Contract(contractAddress, abi, provider)
    const tokenData = await nftContract.getMyTokens(account)
    setToken(Number(tokenData))

    const minersData = await nftContract.getMyMiners(account)
    setMiners(Number(minersData))

    if (Number(tokenData) > 0) {
      const basket = await nftContract.calculateTokensSell(tokenData.toString())
      console.log(Number(basket))
      setIceBucket(Number(basket) / busd)
    }
  }

  useEffect(() => {
    getAllInfo()
  }, [setMiners, account])

  const defaultValue = {
    scale: 0.55,
    translation: {
      x: window.innerWidth < 600 ? -100 : 350,
      y: window.innerWidth < 600 ? 100 : 200,
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
        return navigate(`${routes.game}?id=wishing&${search.toString()}`)
      case "referrals":
        return navigate(`${routes.castle}?id=referrals&${search.toString()}`)
    }
  }

  return (
    <div className="lost-temple-wrapper" style={{ backgroundImage: `url(${bg})`, minHeight: height }}>
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
        minScale={0.5}
        defaultValue={defaultValue}
        translationBounds={{
          xMax: isM ? 500 : 700,
          yMax: isM ? 1000 : 600,
          xMin: isM ? -1100 : -200,
          yMin: isM ? -1200 : -100,
        }}
      >
        <ButtonClose inRoomModal onClick={() => navigate(`${routes.game}?${search.toString()}`)} />
        <div className="lost-temple" style={{ minHeight: height }}>
          <ButtonGame
            onTouchEnd={isM ? () => setSlime(true) : undefined}
            text="Slime"
            onClick={() => setSlime(true)}
            className="lost-temple-slime"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setFaq(true) : undefined}
            text={t`devilEnvoy`}
            onClick={() => setFaq(true)}
            className="lost-temple-faq"
          />
          <img onLoad={() => setLoading(false)} src={gifSrc} alt="lost-temple" className="lost-temple-img" />
        </div>
      </MapInteractionCSS>
      {loading && <Loading />}
      <FAQ onClose={() => setFaq(false)} isOpen={faq} />
      <NpcModal title="???" secondImg={slimeSrc} isOpen={slime} onClose={() => setSlime(false)}>
        ... ....
      </NpcModal>
      <Map />
    </div>
  )
}
