export interface IInsurance {
  code: string
  name: string
  f43: string
  nhso: string
  created_at: string
  updated_at: string
}

export interface IInsuranceCreate {
  code: string
  name: string
}

export interface IInsuranceUpdate {
  name: string
}

export interface IInsuranceMapping {
  code: string
  f43: string
  nhso: string
}