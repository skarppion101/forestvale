export const scrollToElement = (id: string, small?: boolean) => {
  const element = document.getElementById(id)
  const elementPosition = element?.offsetTop

  if (elementPosition) {
    window.scrollTo({
      top: elementPosition - (small ? 20 : 100),
      behavior: "smooth",
    })
  }
}
