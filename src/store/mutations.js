import * as types from './mutation-types'

const mutations = {
  [types.SET_DOCTORID](state, doctorId) {
    state.doctorId = doctorId
  },
  [types.SET_ISQUERYDOC](state, isQueryDoc) {
    state.isQueryDoc = isQueryDoc
  },
  [types.SET_NURSEID](state, nurseId) {
    state.nurseId = nurseId
  },
  [types.SET_ISQUERYNURSE](state, isQueryNurse) {
    state.isQueryNur = isQueryNurse
  },
  [types.SET_PATIENTID](state, patientId) {
    state.patientId = patientId
  },
  [types.SET_DIAGNOSISINGDOC](state, diagnosisingDoc) {
    state.diagnosisingDoc = diagnosisingDoc
  }
}

export default mutations
