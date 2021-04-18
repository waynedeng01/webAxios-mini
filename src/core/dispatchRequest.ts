import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import { buildUrl } from '../helpers/url'
import { transformRequestData } from '../helpers/data'

// 取代之前webAxios函数的功能 将其升级为混合对象
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequestData(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
