import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function webAxios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default webAxios
