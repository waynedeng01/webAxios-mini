import cookie from '../helpers/cookie'
import { parseResponseData } from '../helpers/data'
import { createError } from '../helpers/error'
import { transformResponseHeaders } from '../helpers/headers'
import { isSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      url,
      data = null,
      headers = {},
      responseType = 'text',
      timeout,
      withCredentials,
      cancelToken,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()

    // 交由浏览器自己设定Content-Type
    if (isFormData(data)) {
      delete headers['Content-Type']
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    // 同源或跨域携带cookie的请求
    if ((isSameOrigin(url!) || withCredentials) && xsrfCookieName) {
      const cookieVal = cookie.read(xsrfCookieName)
      if (cookieVal) {
        headers[xsrfHeaderName!] = cookieVal
      }
    }

    if (cancelToken) {
      // setting a pending promise
      // when exec() called
      // promise resolved 之后自动执行内部逻辑
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.open(method, url!, true)
    if (responseType) {
      request.responseType = responseType
    }

    // only called if there's an error at the network level.
    request.onerror = function() {
      reject(createError('Network Error', config, null, request))
    }
    request.onreadystatechange = function() {
      // timeout 控制的超时并不会阻断已发送的请求，数据仍然会回传
      // 所以之前的逻辑依然会收到超时的数据，不会抛出错误
      // 应当return掉status为0的所有请求
      const status = request.status
      if (status === 0) return
      if (request.readyState !== XMLHttpRequest.DONE) return
      if (status >= 200 && status < 400) {
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
        reject(
          createError(`Request failed with status code ${request.status}`, config, null, request)
        )
      }
    }

    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress
    }
    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress
    }

    // reject timeout
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function() {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
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
