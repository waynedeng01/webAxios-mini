import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

export function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
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

// parse string to object
export function transformResponseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\n').forEach(line => {
    const [k, v] = line.split(':')
    // "" at last
    if (!k) {
      return
    }
    if (v) {
      parsed[`${k.trim().toUpperCase()}`] = v.trim()
    }
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  // 提取 common 以及 对应 method 下的headers 到一级
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
