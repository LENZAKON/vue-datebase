import axios from 'axios'
import qs from 'qs'

export function login(data) {
  const url = '/login'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
