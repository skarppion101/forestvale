export type Nav = {
  title: string
  link?: string
  outOfSite?: boolean
  links?: {
    title: string
    link: string
    outOfSite?: boolean
  }[]
}

export type Option = {
  value: any
  label: string
}

export type HistoryStatus = "done" | "process"

export type CommonStatuses = "success" | "failed"