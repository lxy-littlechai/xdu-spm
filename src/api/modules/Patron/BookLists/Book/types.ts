export interface BookParams {
  id: string,
  name: string,
  author: string,
  label: Array<string>,
  resNumber: number
}

export interface IdBookParams {
  id: string
}

export interface ResBookParams {
  success: boolean
}
