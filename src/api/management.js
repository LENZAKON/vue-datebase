import axios from 'axios'
import qs from 'qs'

export function queryJobTitles() {
  const url = '/admin/titles'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

export function updateJobTitles(data) {
  const url = '/admin/title/update'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function deleteJobTitles(data) {
  const url = '/admin/title/delete'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function addJobTitles(data) {
  const url = '/admin/title/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function queryDesps() {
  const url = '/admin/departments'

  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

export function updateDep(data) {
  const url = '/admin/department/update'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function deleteDep(data) {
  const url = '/admin/department/delete'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function addDep(data) {
  const url = '/admin/department/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function oneDepConsultingRoom(data) {
  const url = '/admin/consultingroom'

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function updateDepConsultingRoom(data) {
  const url = '/admin/consultingroom/update'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function deleteDepConsultingRoom(data) {
  const url = '/admin/consultingroom/delete'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function addDepConsultingRoom(data) {
  const url = '/admin/consultingroom/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
