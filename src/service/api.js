/**
 * Created by atzcl on 2017/1/13.
 */
import axios from 'axios'
import config from './config'

// 可以在 main.js 里面把这些方法设置成指令，或者在需要使用的页面用 import 导入使用
export default {
  // GET 请求
  Get (url, params) {
    config.url = url
    config.params = params
    // 返回 Promise
    return axios.get(url, config)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data

        } else {

          if (res.data.code === 403 || res.data.code === 406) {
            console.log(res.data.msg)
          }

          return res.data
        }
      })
      .catch((error) => {
        return error
      })
  },
  // POST 请求
  Post (url, param) {
    config.data = param
    config.params = null
    return axios.post(url, {}, config)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data
        } else {

          if (res.data.code === 403 || res.data.code === 406) {
            console.log(res.data.msg)
          }

          return res.data
        }
      })
      .catch((error) => {
        return error
      })
  },
  // PUT 请求
  Put (url, param) {
    config.data = param
    config.params = null
    return axios.put(url, {}, config)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data
        } else {
          if (res.data.code === 403 || res.data.code === 406) {
            console.log(res.data.msg)
          }
          return false
        }
      })
      .catch((error) => {
        return error
      })
  },
  // DELETE 请求
  Delete (url, param, params) {
    config.data = param
    config.params = null
    return axios.delete(url, config)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data
        } else {

          if (res.data.code === 403 || res.data.code === 406) {
            console.log(res.data.msg)
          }

          return false
        }
      })
      .catch((error) => {
        return error
      })
  }
}

