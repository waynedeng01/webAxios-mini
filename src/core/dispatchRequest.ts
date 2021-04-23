import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { flattenHeaders } from '../helpers/headers'
import { buildUrl } from '../helpers/url'
import { transform } from './transform'

// 取代之前webAxios函数的功能 将其升级为混合对象
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponse(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponse(e.response)
      }
      return Promise.reject(e)
    }
  )
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformResponse(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
