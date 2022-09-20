import { t } from "@lingui/macro"
import { hrefs, routes } from "utils"

export const links = () => [
  {
    title: t`map`,
    onClick: "map",
  },
  {
    title: t`lostTemple`,
    onClick: "lostTemple",
  },
  {
    title: t`treeCastle`,
    onClick: "castle",
  },
  {
    title: t`dungeon`,
    onClick: "dungeon",
  },
  {
    title: t`wishWell`,
    onClick: "wishing",
  },
  {
    title: t`docs`,
    link: hrefs.docs,
  },
  {
    title: t`twitter`,
    link: hrefs.twitter,
  },
  {
    title: t`telegram`,
    link: hrefs.telegram,
  },
  {
    title: t`BSCScan`,
    link: hrefs.scan,
  },
  {
    title: t`homepage`,
    route: routes.index,
  },
]
