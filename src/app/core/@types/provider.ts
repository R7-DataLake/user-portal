export interface IProvider {
  code: string
  cid: string
  fname: string
  lname: string
  prename: string
  birth: string
  sex: string
  provider_type: string
  start_date: string
  end_date: string
  register_no: string
  // council: string
  created_at: string
  updated_at: string
}

export interface IProviderCreate {
  code: string
  cid: string
  fname: string
  lname: string
  prename: string
  birth: string
  sex: string
  provider_type: string
  start_date: string
  end_date: string
  register_no: string
  // council: string
}

export interface IProviderUpdate {
  cid: string
  fname: string
  lname: string
  prename: string
  birth: string
  sex: string
  provider_type: string
  start_date: string
  end_date: string
  register_no: string
  // council: string
}
