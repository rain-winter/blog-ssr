import { message } from 'antd'
import axios from 'axios'
const http = axios.create({
  baseURL: '/api',
})
//
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res?.data
    } else {
      console.log(res)
      message.error('http error')
    }
  },
  (err) => {
    console.log(err)
    message.error('http err error')
    return Promise.reject(err.message)
  }
)

export default http
