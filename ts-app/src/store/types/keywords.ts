export interface Keyword {
  id: string
  keyword: string
  use: boolean
}

export interface NormalizedKeywords {
  byId: Record<string, Keyword>
  allIds: Array<string>
}
