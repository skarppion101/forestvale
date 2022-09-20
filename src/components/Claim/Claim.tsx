import { useNavigate } from "react-router"

import "./Claim.scss"

import imgbgSrc from "assets/images/claim-bg.webp"
import imgbackSrc from "assets/images/back-2.webp"
import { ReactComponent as Twitter } from "assets/icons/twitter.svg"
import { hrefs, routes } from "utils"
import { ReactComponent as Telegram } from "assets/icons/telegram.svg"
import { ReactComponent as Bscsan } from "assets/icons/bscscan.svg"
import { ReactComponent as Youtube } from "assets/icons/youtube.svg"
import { Button } from "../Button"
import { useSearchParams, Link } from "react-router-dom"
import { t } from "@lingui/macro"

type Props = {
  onPlay: () => void
}

export const Claim = ({ onPlay }: Props): JSX.Element => {
  // const [input, setInput] = useState("")
  const el = document.getElementsByClassName("movable")[0]
  // const [focused, setFocused] = useState(false)
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const links = [
    {
      icon: <Twitter />,
      href: hrefs.twitter,
    },
    {
      icon: <Telegram />,
      href: hrefs.telegram,
    },
    {
      icon: <Bscsan />,
      href: hrefs.scan,
    },
    {
      icon: <Youtube />,
      href: hrefs.youtube,
    },
  ]

  return (
    <div className="claim" style={{ backgroundImage: `url(${imgbackSrc})` }}>
      <div className="claim-block" style={{ backgroundImage: `url(${imgbgSrc})` }}>
        <div className="claim-block-title">{t`itsTimeToCollectYourBUSD`}</div>
        <Button
          className="claim-block-btn animate__animated animate__infinite animate__pulse"
          variant="dark"
          onClick={() => {
            onPlay()
            navigate(`${routes.connect}?${search.toString()}`)
          }}
          text="START PLAYING"
        />
      </div>
      <h2 className="claim-title">{t`followUs`}</h2>
      <div className="claim-links">
        {links.map((social, index) => (
          <a
            onMouseOver={() => {
              el?.classList.add("active")
            }}
            onMouseLeave={() => {
              el?.classList.remove("active")
            }}
            className="header-links-item"
            rel="noreferrer"
            key={index}
            href={social.href}
            target="_blank"
          >
            {social.icon}
          </a>
        ))}
      </div>
      {/*<h3 className="claim-subtitle">Subscribe to our Newsletter</h3>*/}
      {/*<div className="claim-form">*/}
      {/*  <input*/}
      {/*    onBlur={() => setFocused(false)}*/}
      {/*    onFocus={() => setFocused(true)}*/}
      {/*    onChange={e => setInput(e.target.value)}*/}
      {/*    value={input}*/}
      {/*    type="email"*/}
      {/*    placeholder={focused ? "" : "Email address"}*/}
      {/*    className="claim-form-input"*/}
      {/*  />*/}
      {/*  <Button className="claim-form-btn" onClick={() => {}} text="SUBSCRIBE" />*/}
      {/*</div>*/}
      <div className="claim-other">
        <Link
          onMouseOver={() => {
            el?.classList.add("active")
          }}
          onMouseLeave={() => {
            el?.classList.remove("active")
          }}
          to={routes.contact}
          target="_blank"
          rel="noreferrer"
          className="claim-other-item"
        >
          {t`connectUs`}
        </Link>
        <Link
          onMouseOver={() => {
            el?.classList.add("active")
          }}
          onMouseLeave={() => {
            el?.classList.remove("active")
          }}
          to={hrefs.bug}
          target="_blank"
          rel="noreferrer"
          className="claim-other-item"
        >
          {t`bugReport`}
        </Link>
      </div>
    </div>
  )
}