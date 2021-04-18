import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse, ResolvedFn, RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import { InterceptorManager } from './InterceptorManager'
import { mergeConfig } from './mergeConfig'

type MyInterceptor = {
  req: InterceptorManager<AxiosRequestConfig>
  res: InterceptorManager<AxiosResponse>
}

type PromiseChain<T> = {
  // inceptors or mainRequest
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class WebAxios {
  defaults: AxiosRequestConfig
  interceptors: MyInterceptor

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      req: new InterceptorManager<AxiosRequestConfig>(),
      res: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)

    // interceptors
    let chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    const reqChain: any[] = []

    this.interceptors.req.forEach(interceptor => {
      reqChain.push(interceptor)
    })

    this.interceptors.res.forEach(interceptor => {
      chain.push(interceptor)
    })

    chain = reqChain.concat(chain)

    let promise = Promise.resolve(config!)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }


  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
