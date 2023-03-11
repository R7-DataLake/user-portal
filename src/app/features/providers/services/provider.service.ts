import { Inject, Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IProviderCreate, IProviderUpdate } from '../../../core/@types/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private axiosInstance!: AxiosInstance;

  constructor (@Inject('API_URL') private apiUrl: any) {

    this.axiosInstance = axios.create({
      baseURL: `${this.apiUrl}/libs/providers`
    })

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

  async save(drug: IProviderCreate): Promise<AxiosResponse> {
    return await this.axiosInstance.post('/new', drug)
  }

  async update(code: any, drug: IProviderUpdate): Promise<AxiosResponse> {
    return await this.axiosInstance.put(`/${code}/update`, drug)
  }

}
