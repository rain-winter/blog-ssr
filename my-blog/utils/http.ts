import axios from 'axios'

const http = axios.create({
  baseURL: '/',
})
//
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res?.data
    } else {
      return {
        code: -1,
        msg: '未知错误----来自http.ts',
      }
    }
  },
  (err) => Promise.reject(err)
)

export default http