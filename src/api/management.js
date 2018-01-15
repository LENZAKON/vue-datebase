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

export function addAcount(data) {
  const url = '/admin/user/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function queryAllMedicines() {
  const url = '/admin/medicines'

  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

export function updateMedicine(data) {
  const url = '/admin/medicine/update'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function deleteMedicine(data) {
  const url = '/admin/medicine/delete'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function addMedicine(data) {
  const url = '/admin/medicine/add'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function queryAllDocs() {
  const url = '/admin/user'

  return axios.get(url, {
    params: {
      titleId: '1'
    }
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function queryAllNurs() {
  const url = '/admin/user'

  return axios.get(url, {
    params: {
      titleId: '2'
    }
  }).then((res) => {
    return Promise.resolve(res)
  })
}

export function updateUser(data) {
  const url = '/admin/user/update'

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}

export function deleteUser(data) {
  const url = '/admin/user/delete'
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
