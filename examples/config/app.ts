import axios from '../../src/index'
import qs from 'qs'
import { TransformFn } from '../../src/types'

// axios.defaults.headers.common['test2'] = 123

// // axios({

// // })

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [
//     function(data, headers) {
//       headers.post['test_transform'] = 132
//       return qs.stringify(data)
//     },
//     function(data, headers) {
//       headers.post['test_transform'] += 1
//     },
//     ...(axios.defaults.transformRequest as TransformFn[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as TransformFn[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then(res => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as TransformFn[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as TransformFn[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

const newInstance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as TransformFn[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as TransformFn[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 456
      }
      return data
    }
  ]
})

newInstance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 123
  }
}).then(res => {
  console.log(res.data)
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
