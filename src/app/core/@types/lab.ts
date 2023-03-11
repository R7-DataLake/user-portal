export interface ILab {
  code: string
  name: string
  f43: string
  loinc: string
  lab_group_code: string
  lab_group_name: string
  created_at: string
  updated_at: string
}

export interface ILabCreate {
  code: string
  name: string
  lab_group_code: string
}

export interface ILabUpdate {
  name: string
  lab_group_code: string
}

export interface ILabMapping {
  code: string
  f43: string
  loinc: string
}