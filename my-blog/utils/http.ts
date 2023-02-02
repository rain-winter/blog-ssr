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
      message.error('http error')
      console.log(res)
    }
  },
  (err) => {
    console.log(err)
  }
)

export default http
