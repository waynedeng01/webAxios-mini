import { AxiosInstance } from './types'
import WebAxios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new WebAxios()
  const instance = WebAxios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axiosInstance = createInstance()

export default axiosInstance
