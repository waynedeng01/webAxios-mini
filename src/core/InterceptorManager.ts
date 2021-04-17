import { Interceptor, ResolvedFn, RejectedFn } from '../types/index'

export class InterceptorManager<T> {
  private readonly handlers: Array<Interceptor<T> | null>

  constructor() {
    this.handlers = []
  }

  add(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.handlers.push({
      resolved,
      rejected
    })
    return this.handlers.length - 1
  }

  delete(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  forEach(cb: (interceptor: Interceptor<T>) => void): void {
    this.handlers.forEach((interceptor) => {
      if (interceptor !== null) {
        cb(interceptor)
      }
    })
  }
}
