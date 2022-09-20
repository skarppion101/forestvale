import React, { useEffect, useState } from "react"
import cx from "classnames"
import cursorDefaultSrc from "assets/images/snowballmouseo.webp"
import cursorPointerSrc from "../assets/images/snowballmousex.webp"

export const CursorContext = React.createContext("cursorContext")

const SUPPORTED_CURSORS = [false, "pointer", "right", "left"]

const CursorProvider = ({ children }: { children: any }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursor, setCursor] = useState(false)

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event
    setMousePosition({ x, y })
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  })

  const { x, y } = mousePosition

  const onCursor = cursorType => {
    cursorType = (SUPPORTED_CURSORS.includes(cursorType) && cursorType) || false
    setCursor(cursorType)
  }

  const el = document.getElementsByClassName("movable")[0]

  if (el) {
    if (el.classList.contains("active")) {
      // @ts-ignore
      el.style.backgroundImage = `url(${cursorPointerSrc})`
    } else {
      // @ts-ignore
      el.style.backgroundImage = `url(${cursorDefaultSrc})`
    }
  }

  return (
    // @ts-ignore
    <CursorContext.Provider value={{ onCursor }}>
      <ins
        className={cx("movable", {
          active: !!cursor,
          [`cursor-${cursor}`]: !!cursor,
        })}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
      {children}
    </CursorContext.Provider>
  )
}

export default CursorProvider
