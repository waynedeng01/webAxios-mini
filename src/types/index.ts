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

export type TransformFn = {
  (data: any, headers?: any): any
}

// cancel
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export type AxiosRequestConfig = {
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  cancelToken?: CancelToken
  withCredentials?: boolean
  transformRequest?: TransformFn | TransformFn[]
  transformResponse?: TransformFn | TransformFn[]
  url?: string // api support
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [index: string]: any
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

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 对外暴露的接口类型
export interface Axios {
  defaults: AxiosRequestConfig
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
  // use function overload for TS check
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create: (config?: AxiosRequestConfig) => AxiosInstance
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

// xsrf
export interface resolvedUrl {
  protocol: string
  host: string
}
