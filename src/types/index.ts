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

export interface Axios {
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

// 本身为一个function，同时原型上有Axios上的method
export interface AxiosInstance extends Axios {
  <T = any>(url: any, config?: AxiosRequestConfig): AxiosPromise<T>
}
