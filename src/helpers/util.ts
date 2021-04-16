const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

// 保留关键字
export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 混合对象
export function extend<T, U>(to: T, from: U): T & U {
  // for...in 取到原型上的数据一同扩展
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
