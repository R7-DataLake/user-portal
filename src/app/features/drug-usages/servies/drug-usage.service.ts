import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../../environments/environment';
import { IDrugUsageCreate, IDrugUsageUpdate } from '../../../core/@types/drug_usage';

@Injectable({
  providedIn: 'root'
})
export class DrugUsageService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/libs/drug-usages`
  })

  constructor () {
    this.axiosInstance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, error => {
      return Promise.reject(error)
    })
  }

  getList(query: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    const url = `/list?query=${query}&limit=${limit}&offset=${offset}`
    return this.axiosInstance.get(url)
  }

  remove(code: any): Promise<AxiosResponse> {
    const url = `/${code}/delete`
    return this.axiosInstance.delete(url)
  }

  save(usage: IDrugUsageCreate): Promise<AxiosResponse> {
    return this.axiosInstance.post('/new', usage)
  }

  update(code: any, drug: IDrugUsageUpdate): Promise<AxiosResponse> {
    return this.axiosInstance.put(`/${code}/update`, drug)
  }

}
