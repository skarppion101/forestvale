import { RefObject, useEffect } from "react"

// Handling click outside of component
// Watch component by `ref`
export function useClickOutside(
  ref: RefObject<HTMLButtonElement> | RefObject<HTMLDivElement>,
  onClick: () => void,
  exclude: RefObject<HTMLElement>[] = [],
): void {
  useEffect(() => {
    const { current } = ref

    const handler = (e: MouseEvent): void => {
      if (!current) {
        return
      }

      const target: any = e.target

      if (!current.contains(target)) {
        for (let i = 0; i < exclude.length; i += 1) {
          const item = exclude[i].current

          if (!item) {
            break
          }

          if (item.contains(target)) {
            e.preventDefault()

            return
          }
        }

        onClick()
      }
    }

    if (current) {
      document.addEventListener("mousedown", handler)
    }

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [ref, onClick, exclude])
}
