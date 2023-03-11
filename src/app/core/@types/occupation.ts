export interface IOccupation {
  code: string
  name: string
  f43: string
  nhso: string
  created_at: string
  updated_at: string
}

export interface IOccupationCreate {
  code: string
  name: string
}

export interface IOccupationUpdate {
  name: string
}

export interface IOccupationMapping {
  code: string
  f43: string
  nhso: string
}