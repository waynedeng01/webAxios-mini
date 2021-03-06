import { transformRequestData, parseResponseData } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { AxiosRequestConfig } from '../types'

const methodsNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']
const defaults: AxiosRequestConfig = {
  validStatus: (status: number) => {
    return status >= 200 && status < 400
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequestData(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return parseResponseData(data)
    }
  ],
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
