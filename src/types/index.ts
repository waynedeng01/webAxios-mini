import { InterceptorManager } from '../core/InterceptorManager'

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export type AxiosRequestConfig = {
  url?: string // api support
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  // default 0 -- never timeout
  timeout?: number
}

export type AxiosResponse<T = any> = {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// export interface AxiosError extends Error {
//   config: AxiosRequestConfig
//   code?: string
//   request?: any
//   response?: AxiosResponse
//   isAxiosError: boolean
// }

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

// 对外暴露的接口类型
export interface Axios {
  interceptors: {
    req: InterceptorManager<AxiosRequestConfig>
    res: InterceptorManager<AxiosResponse>
  }
  // 支持 (url,config) 的调用方式 以及 (config)的调用方式
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(url: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// -- interceptor

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export interface DioInterceptorManager<T> {
  // both sync and async
  add(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  delete(id: number): void

  // forEach(cb: ((interceptor: Interceptor<T>) => void)): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
