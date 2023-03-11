import { Inject, Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private axiosInstance!: AxiosInstance;

  constructor (@Inject('API_URL') private apiUrl: any) {

    this.axiosInstance = axios.create({
      baseURL: `${this.apiUrl}/tables`
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

  getPerson(query: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    const url = `/person?query=${query}&limit=${limit}&offset=${offset}`
    return this.axiosInstance.get(url)
  }

  getOpd(dateServ: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    let url: any = '';
    if (dateServ) {
      url = `/opd?date_serv=${dateServ}&limit=${limit}&offset=${offset}`
    } else {
      url = `/opd?limit=${limit}&offset=${offset}`
    }
    return this.axiosInstance.get(url)
  }

  getIpd(datedsc: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    let url: any = '';
    if (datedsc) {
      url = `/ipd?datedsc=${datedsc}&limit=${limit}&offset=${offset}`
    } else {
      url = `/ipd?limit=${limit}&offset=${offset}`
    }
    return this.axiosInstance.get(url)
  }


}
