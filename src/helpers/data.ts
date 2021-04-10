import { isPlainObject } from './util'

export function transformRequestData(data: any): any {
  if (isPlainObject(data)) return JSON.stringify(data)
  return data
}

export function parseResponseData(data: any): any {
  try {
    if (typeof data === 'string') {
      return JSON.parse(data)
    }
  } catch (error) {
    // nothing todo
  }
  return data
}
