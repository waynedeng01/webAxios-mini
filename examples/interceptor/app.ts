import axios from '../../src/index'

// 设计为线形结构，按照调用顺序执行
// req: 123 res: 123

axios.interceptors.req.add(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.req.add(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.req.add(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.res.add(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.res.add(res => {
  res.data += '2'
  return res
})
axios.interceptors.res.add(res => {
  res.data += '3'
  return res
})

axios.interceptors.res.delete(interceptor)

// res: 13

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
