import { buildUrl } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
}

function webAxios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default webAxios
