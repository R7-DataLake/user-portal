export interface IDrug {
  code: string
  name: string
  f43: string
  tmt: string
  created_at: string
  updated_at: string
}

export interface IDrugCreate {
  code: string
  name: string
}

export interface IDrugUpdate {
  name: string
}

export interface IDrugMapping {
  code: string
  f43: string
  tmt: string
}