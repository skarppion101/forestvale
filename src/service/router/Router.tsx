import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useRef, useState } from "react"

import CursorProvider from "utils/cursorProvider"

import { NotFound, Home, Game, Connect, Contact, Bug, CastlePage, LostTemple, Dungeon } from "pages"
import { routes } from "utils"
import { Player } from "components"

export const Router = (): JSX.Element => {
  const wrapperRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const onPause = () => {
    wrapperRef?.current?.pause()
    setIsPlaying(false)
  }

  const onPlay = () => {
    wrapperRef?.current?.play()
    setIsPlaying(true)
  }

  return (
    <CursorProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.index} element={<Home onPlay={onPlay} />} />
          <Route path={routes.game} element={<Game />} />
          <Route path={routes.connect} element={<Connect />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.bug} element={<Bug />} />
          <Route path={routes.castle} element={<CastlePage />} />
          <Route path={routes.lostTemple} element={<LostTemple />} />
          <Route path={routes.dungeon} element={<Dungeon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Player wrapperRef={wrapperRef} isPlaying={isPlaying} onPause={onPause} onPlay={onPlay} />
      </BrowserRouter>
    </CursorProvider>
  )
}
