import { useNavigate } from "react-router"

import { ReactComponent as MapIcon } from "assets/icons/map.svg"
import { routes } from "utils"

import "./Map.scss"
import { t } from "@lingui/macro"
import {useSearchParams} from "react-router-dom";

export const Map = (): JSX.Element | null => {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const el = document.getElementsByClassName("movable")[0]

  return (
    <button
      onMouseOver={() => {
        el?.classList.add("active")
      }}
      onMouseLeave={() => {
        el?.classList.remove("active")
      }}
      className="map"
      type="button"
      onClick={() => navigate(`${routes.game}?${search.toString()}`)}
    >
      <MapIcon /> {t`map`}
    </button>
  )
}
