import { AxiosRequestConfig, AxiosStatic } from './types'
import WebAxios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './core/default'
import { mergeConfig } from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new WebAxios(config)
  const instance = WebAxios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

// 默认单例，通过defauls构建
const axiosInstance = createInstance(defaults)

// 传入配置及默认配置构建
axiosInstance.create = function(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axiosInstance
