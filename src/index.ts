import { transformRequestData } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { buildUrl } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
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
}

function webAxios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default webAxios
