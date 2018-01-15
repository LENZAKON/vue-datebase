import axios from 'axios'
import qs from 'qs'

export function queryPatient(data) {
  const url = '/appointment'

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function casereportAdd(data) {
  const url = '/casereport/add'
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
