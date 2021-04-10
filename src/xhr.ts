import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { method = 'get', url, data = null, headers = {} } = config
  const request = new XMLHttpRequest()
  request.open(method, url)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
