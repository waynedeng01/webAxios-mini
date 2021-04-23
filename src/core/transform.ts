import { TransformFn } from '../types'

export function transform(data: any, headers: any, fns?: TransformFn | TransformFn[]): any {
  if (!fns) return data
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
