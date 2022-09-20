import { useNavigate } from "react-router"
import cn from "classnames"
import { useState } from "react"
import { t } from "@lingui/macro"

import { Button, Languages } from "components"
import { hrefs, routes, scrollToElement } from "utils"

import { ReactComponent as Twitter } from "assets/icons/twitter.svg"
import { ReactComponent as Telegram } from "assets/icons/telegram.svg"
import { ReactComponent as Bscsan } from "assets/icons/bscscan.svg"
import { ReactComponent as Youtube } from "assets/icons/youtube.svg"
import { ReactComponent as Arrow } from "assets/icons/arrow-down.svg"
import { ReactComponent as Burger } from "assets/icons/burger.svg"
import { ReactComponent as Close } from "assets/icons/close-header.svg"
import logoSrc from "assets/images/logo-gold.webp"
import "./Header.scss"
import { Link, useSearchParams } from "react-router-dom"

type Props = {
  scroll?: number
  defaultPos?: boolean
  onPlay?: () => void
}

export const Header = ({ scroll = 0, defaultPos, onPlay }: Props): JSX.Element => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)
  const el = document.getElementsByClassName("movable")[0]
  const [sidebar, setSidebar] = useState(false)
  const [search] = useSearchParams()

  const toggleSidebar = () => {
    setSidebar(!sidebar)
  }

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
    <div
      className={cn("header", {
        offset: scroll > 50 || defaultPos,
      })}
    >
      <div className="header-mobile">
        <button type="button" onClick={toggleSidebar} className="header-mobile-btn">
          {sidebar ? <Close /> : <Burger />}
        </button>
        <img alt="logo" src={logoSrc} className="header-mobile-logo" />
        <div
          className={cn("header-mobile-sidebar", {
            active: sidebar,
          })}
        >
          <div className="header-logo-wrapper-links">
            <a
              href="https://atlantis.ageofmining.io/"
              target="_blank"
              rel="noreferrer"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              Atlantis
            </a>
            <button
              onClick={() => {
                onPlay && onPlay()
                navigate(`${routes.connect}?id=castle&${search.toString()}`)
              }}
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`forestvale`}
            </button>
            <a
              href="https://icevale.ageofmining.io/"
              target="_blank"
              rel="noreferrer"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`icevale`}
            </a>
            <button
              type="button"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => {
                toggleSidebar()
                scrollToElement("features", true)
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`features`}
            </button>
            <button
              type="button"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => {
                toggleSidebar()
                scrollToElement("roadmap", true)
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`roadmap`}
            </button>
            <a
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              href={hrefs.docs}
              target="_blank"
              rel="noreferrer"
              className="header-logo-wrapper-links-item"
            >
              {t`docs`}
            </a>
            <button
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => setDropdown(!dropdown)}
              className={cn("header-logo-wrapper-links-item", {
                active: dropdown,
              })}
            >
              {t`other`} <Arrow className="header-logo-wrapper-links-item-arrow" />
              {dropdown && (
                <div className="header-logo-wrapper-links-dropdown">
                  <a
                    href={hrefs.audit}
                    target="_blank"
                    rel="noreferrer"
                    className="header-logo-wrapper-links-dropdown-item"
                  >
                    {t`audit`}
                  </a>
                  <Link to={routes.contact} className="header-logo-wrapper-links-dropdown-item">
                    {t`connectUs`}
                  </Link>
                  <Link to={routes.bug} className="header-logo-wrapper-links-dropdown-item">
                    {t`bugReport`}
                  </Link>
                  <a
                    href={hrefs.analitic}
                    target="_blank"
                    rel="noreferrer"
                    className="header-logo-wrapper-links-dropdown-item"
                  >
                    {t`analytics`}
                  </a>
                </div>
              )}
            </button>
            <Languages className='header-lang' />
          </div>
          <div className="header-links">
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
          <Button
            animate
            onClick={() => {
              onPlay && onPlay()
              navigate(`${routes.connect}?${search.toString()}`)
            }}
            text={t`play`}
          />
        </div>
      </div>
      <div className="header-content">
        <div className="header-links">
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
        <div className="header-logo-wrapper">
          <div className="header-logo-wrapper-links">
            <a
              href="https://atlantis.ageofmining.io/"
              target="_blank"
              rel="noreferrer"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              Atlantis
            </a>
            <button
              onClick={() => {
                navigate(`${routes.connect}?id=castle&${search.toString()}`)
                onPlay && onPlay()
              }}
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`forestvale`}
            </button>
            <a
              href="https://icevale.ageofmining.io/"
              target="_blank"
              rel="noreferrer"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`icevale`}
            </a>
            <button
              type="button"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => {
                navigate(`${routes.index}?${search.toString()}`)
                scrollToElement("features")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`features`}
            </button>
            <button
              type="button"
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => {
                navigate(`${routes.index}?${search.toString()}`)
                scrollToElement("roadmap")
              }}
              className="header-logo-wrapper-links-item"
            >
              {t`roadmap`}
            </button>
            <a
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              href={hrefs.docs}
              target="_blank"
              rel="noreferrer"
              className="header-logo-wrapper-links-item"
            >
              {t`docs`}
            </a>
            <button
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => setDropdown(!dropdown)}
              className={cn("header-logo-wrapper-links-item", {
                active: dropdown,
              })}
            >
              {t`other`} <Arrow className="header-logo-wrapper-links-item-arrow" />
              {dropdown && (
                <div className="header-logo-wrapper-links-dropdown">
                  <a
                    href={hrefs.audit}
                    target="_blank"
                    rel="noreferrer"
                    className="header-logo-wrapper-links-dropdown-item"
                  >
                    {t`audit`}
                  </a>
                  <Link to={routes.contact} className="header-logo-wrapper-links-dropdown-item">
                    {t`connectUs`}
                  </Link>
                  <Link to={routes.bug} className="header-logo-wrapper-links-dropdown-item">
                    {t`bugReport`}
                  </Link>
                  <a
                    href={hrefs.analitic}
                    target="_blank"
                    rel="noreferrer"
                    className="header-logo-wrapper-links-dropdown-item"
                  >
                    {t`analytics`}
                  </a>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="header-btn-wrapper">
          <Languages className='header-lang' />
          <Button
            animate
            onClick={() => {
              onPlay && onPlay()
              navigate(`${routes.connect}?${search.toString()}`)
            }}
            text={t`play`}
          />
        </div>
      </div>
    </div>
  )
}
