import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../../environments/environment';
import { ILabCreate, ILabMapping, ILabUpdate } from '../../../core/@types/lab';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/libs/labs`
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

  save(usage: ILabCreate): Promise<AxiosResponse> {
    return this.axiosInstance.post('/new', usage)
  }

  update(code: any, lab: ILabUpdate): Promise<AxiosResponse> {
    return this.axiosInstance.put(`/${code}/update`, lab)
  }

  mapping(lab: ILabMapping): Promise<AxiosResponse> {
    return this.axiosInstance.post(`/mapping`, lab)
  }
}
