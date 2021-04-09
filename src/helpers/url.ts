// 存放解析url的工具方法

import { encode, isDate, isPlainObject } from './util'

export function buildUrl(url: string, params?: any): string {
  if (!params) return url
  const res: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') return
    let values: string[] = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      // 嵌套array的情况？
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      res.push(`${encode(key)}=${encode(val)}`)
    })
  })
  const serelizedParams = res.join('&')
  if (serelizedParams) {
    // 丢弃hash标记
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += url.indexOf('?') !== -1 ? '&' : '?'
    url += serelizedParams
  }
  return url
}
