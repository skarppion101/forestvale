import { HttpClient } from "./http-client"

const apiUrl = "https://api.bscscan.com"
if (!apiUrl) {
  throw new Error("API URL env must be set!")
}

export class Api extends HttpClient {
  public constructor() {
    super(apiUrl as string)
  }

  public getData = () => {
    return this.instance.get<any[]>(
      `/api?module=account&action=txlist&address=0xd236a4c897cbdd937f199f2977c22570f64efb24&startblock=1&endblock=99999999&sort=desc&apikey=Z9T7GVUPQ9S8K4TY79R52YUUE54AAUA1H5`,
    )
  }
  public getBalance = () => {
    return this.instance.get<any[]>(
      `/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0xa125d893577f264eDC7Eb42d01550aCA2229dB9D&tag=latest&apikey=Z9T7GVUPQ9S8K4TY79R52YUUE54AAUA1H5`,
    )
  }

  public getBalanceOther = () => {
    return this.instance.get<any[]>(
      `/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0xd236a4c897cbdd937f199f2977c22570f64efb24&tag=latest&apikey=Z9T7GVUPQ9S8K4TY79R52YUUE54AAUA1H5`,
    )
  }
  public fetch() {
    return this.instance.get("")
  }
}

const api = new Api()

export { api }
