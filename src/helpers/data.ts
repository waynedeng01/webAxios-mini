import { isPlainObject } from './util'

export function transformRequestData(data: any): any {
  if (isPlainObject(data)) return JSON.stringify(data)
  return data
}
