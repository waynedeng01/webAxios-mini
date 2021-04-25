import { encode, isDate, isPlainObject, isUrlSearchParams } from './util'
import _ from 'lodash'
import { resolvedUrl } from '../types'

export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) return url

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isUrlSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const res: string[] = []
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') return
      let values: string[] = []
      if (Array.isArray(val)) {
        values = _.flattenDeep(val)
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        res.push(`${encode(key)}=${encode(val)}`)
      })
    })
    serializedParams = res.join('&')
  }

  if (serializedParams) {
    // 丢弃hash标记
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += url.indexOf('?') !== -1 ? '&' : '?'
    url += serializedParams
  }
  return url
}

// xsrf
const currentUrl = window.location.href

export function isSameOrigin(url: string): boolean {
  const parsedOrigin = resolveUrl(url)
  const currentOrigin = resolveUrl(currentUrl)
  return (
    currentOrigin.protocol === parsedOrigin.protocol && currentOrigin.host === parsedOrigin.host
  )
}

export function resolveUrl(url: string): resolvedUrl {
  const ele = document.createElement('a')
  ele.setAttribute('href', url)
  const { protocol, host } = ele
  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
