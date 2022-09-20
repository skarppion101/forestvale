import { t } from "@lingui/macro"

export const timeSince = timestamp => {
  var txDate = new Date(timestamp * 1000)
  // @ts-ignore
  var seconds = Math.floor((new Date() - txDate) / 1000)
  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + t``
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + t`months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + t`days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + t`hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + t`minutes`
  }
  return Math.floor(seconds) + t`seconds`
}