import { AxiosRequestConfig } from '../types'

const methodsNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    // all method with common headers
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults



