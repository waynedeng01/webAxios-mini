import { isPlainObject } from './util'

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
