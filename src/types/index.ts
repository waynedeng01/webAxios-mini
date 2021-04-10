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

// 支持传入的请求配置
export type AxiosRequestConfig = {
  url: string
  method?: Method
  // post/patch 等
  data?: any
  // get
  params?: any
  headers?: any
}
