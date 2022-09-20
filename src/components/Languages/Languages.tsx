import { i18n } from "@lingui/core"
import { useState } from "react"
import cn from "classnames"

import { ReactComponent as EnIcon } from "assets/icons/langs/en.svg"
import { ReactComponent as DeIcon } from "assets/icons/langs/de.svg"
import { ReactComponent as EsIcon } from "assets/icons/langs/es.svg"
import { ReactComponent as FrIcon } from "assets/icons/langs/fr.svg"
import { ReactComponent as CnIcon } from "assets/icons/langs/cn.svg"
import { ReactComponent as CtIcon } from "assets/icons/langs/ct.svg"
import { ReactComponent as Arrow } from "assets/icons/arrow-down.svg"

import "./Languages.scss"

type Props = {
  className?: string
}

export const Languages = ({className}: Props): JSX.Element | null => {
  const [open, setOpen] = useState(false)
  const el = document.getElementsByClassName("movable")[0]
  const [activeLanguage, setAvtiveLanguage] = useState(localStorage.getItem("lang") || "en")

  const toggleOpen = () => setOpen(!open)

  const getIconForLang = () => {
    switch (activeLanguage) {
      case "en":
        return <EnIcon className="languages-icon" />
      case "fr":
        return <FrIcon className="languages-icon" />
      case "es":
        return <EsIcon className="languages-icon" />
      case "de":
        return <DeIcon className="languages-icon" />
      case "cn":
        return <CnIcon className="languages-icon" />
      case "ct":
        return <CtIcon className="languages-icon" />
    }
  }

  const langs = [
    {
      icon: <EnIcon className="languages-icon" />,
      value: "en",
    },
    {
      icon: <FrIcon className="languages-icon" />,
      value: "fr",
    },
    {
      icon: <DeIcon className="languages-icon" />,
      value: "de",
    },
    {
      icon: <EsIcon className="languages-icon" />,
      value: "es",
    },
    {
      icon: <CnIcon className="languages-icon" />,
      value: "cn",
    },
    {
      icon: <CtIcon className="languages-icon" />,
      value: "ct",
    },
  ]

  const onItemClick = (value: string) => {
    localStorage.setItem("lang", value)
    setAvtiveLanguage(value)
    i18n.activate(value)
    toggleOpen()
  }

  return (
    <div className={cn('languages', className)}>
      <button
        onMouseOver={() => {
          el?.classList.add("active")
        }}
        onMouseLeave={() => {
          el?.classList.remove("active")
        }}
        className="languages-preview"
        type="button"
        onClick={toggleOpen}
      >
        {getIconForLang()}
        <Arrow
          className={cn("languages-arrow", {
            active: open,
          })}
        />
      </button>
      {open && (
        <div className="languages-dropdown">
          {langs.map((i, index) => (
            <button
              onMouseOver={() => {
                el?.classList.add("active")
              }}
              onMouseLeave={() => {
                el?.classList.remove("active")
              }}
              onClick={() => onItemClick(i.value)}
              key={index}
              type="button"
              className="languages-dropdown-item"
            >
              {i.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
