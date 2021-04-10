// 有 data 无 headers的 请求添加headers
// 无 data 有 headers的 请求去掉headers

import { isPlainObject } from './util'

export function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
