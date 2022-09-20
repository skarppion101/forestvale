import loading from "assets/gifs/snowballloading.gif"
import bg from "assets/images/loading.webp"
import "./Loading.scss"

type Props = {
  isBg?: boolean
}

export const Loading = ({ isBg }: Props): JSX.Element => (
  <div className="loading" style={{ backgroundImage: isBg ? `url(${bg})` : "" }}>
    {!isBg && <div className="loading-backdrop" />}
    <img src={loading} alt="loading" />
  </div>
)