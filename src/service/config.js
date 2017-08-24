/**
 * Created by atzcl on 2017/1/13.
 */
import Qs from 'qs'

export default{
  url: '/route',
  baseURL: 'https://master.fstuis.com/api/v1/',
  method: 'POST',
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  transformResponse: [function (data) {
    return data
  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  params: '',
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  data: {},
  timeout: 5000,
  withCredentials: false,
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  maxRedirects: 5
}
