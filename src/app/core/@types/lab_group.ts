export interface ILabGroup {
  code: string
  name: string
  created_at: string
  updated_at: string
}

export interface ILabGroupCreate {
  code: string
  name: string
}

export interface ILabGroupUpdate {
  name: string
}
