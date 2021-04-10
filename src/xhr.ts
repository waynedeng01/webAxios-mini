import { parseResponseData } from './helpers/data'
import { transformResponseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      url,
      data = null,
      headers = {},
      responseType = 'text',
      timeout
    } = config
    const request = new XMLHttpRequest()
    request.open(method, url)
    if (responseType) {
      request.responseType = responseType
    }

    // only called if there's an error at the network level.
    request.onerror = function() {
      reject(new Error('Network Error!!!'))
    }
    // reject timeout
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function() {
      reject(new Error(`Timeout Error: ${timeout}ms`))
    }

    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        const status = request.status
        if (status === 0 || (status >= 200 && status < 400)) {
          const responseHeaders = request.getAllResponseHeaders()
          const response: AxiosResponse = {
            data: parseResponseData(
              responseType !== 'text' ? request.response : request.responseText
            ),
            status: request.status,
            statusText: request.statusText,
            headers: transformResponseHeaders(responseHeaders),
            config,
            request
          }
          resolve(response)
        } else {
          reject(new Error(`Request failed with status code ${request.status}`))
        }
      }
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
