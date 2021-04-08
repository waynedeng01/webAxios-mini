import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { method = 'get', url } = config
  const request = new XMLHttpRequest()
  request.open(method, url)
  request.send()
}
