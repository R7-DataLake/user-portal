export interface INation {
  code: string
  name: string
  f43: string
  nhso: string
  created_at: string
  updated_at: string
}

export interface INationCreate {
  code: string
  name: string
}

export interface INationUpdate {
  name: string
}

export interface INationMapping {
  code: string
  f43: string
  nhso: string
}