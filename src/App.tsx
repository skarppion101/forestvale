import "animate.css"
import { I18nProvider } from "@lingui/react"
import { i18n } from "@lingui/core"

import "service/i18n"

import { Router } from "./service/router/Router"

import "styles/global.scss"

export const App = (): JSX.Element => {
  return (
    <I18nProvider i18n={i18n}>
      <Router />
    </I18nProvider>
  )
}
