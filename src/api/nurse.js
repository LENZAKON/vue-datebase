import axios from 'axios'
import qs from 'qs'

export function queryAppointmentDoc(data) {
  const url = '/appointment/doctor'

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function addAppointment(data) {
  const url = '/appointment/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function medicineUppay() {
  const url = '/medicine/unpay'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

export function medicinePay(data) {
  const url = '/medicine/pay'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
