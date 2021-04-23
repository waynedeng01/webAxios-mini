import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios
  .post(
    'http://127.0.0.1:8088/more/server2',
    {},
    {
      // 携带的是请求域（8088）的cookie去访问这个接口
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })
