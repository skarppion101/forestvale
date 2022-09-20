import React from "react"
import ReactDOM from "react-dom"
import smoothscroll from "smoothscroll-polyfill"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

import { App } from "./App"

import "./styles/global.scss"

function getLibrary(provider) {
  return new Web3Provider(provider)
}

smoothscroll.polyfill()

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById("root"),
)
