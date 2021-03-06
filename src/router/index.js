import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Management from 'components/management/management'
import QueryDoc from 'components/management/children/queryDoc'
import QueryNur from 'components/management/children/queryNur'
import AddNur from 'components/management/children/addNur'
import AddDoc from 'components/management/children/addDoc'
import QueryJobTitle from 'components/management/children/queryJobTitle'
import AddJobTitle from 'components/management/children/addJobTitle'
import QueryDep from 'components/management/children/queryDep'
import AddDep from 'components/management/children/addDep'
import QueryConsultingRoom from 'components/management/children/queryConsultingRoom'
import AddConsultingRoom from 'components/management/children/addConsultingRoom'
import QueryMedicine from 'components/management/children/queryMedicine'
import AddMedicine from 'components/management/children/addMedicine'

import Doctor from 'components/doctor/doctor'
import QueryPatient from 'components/doctor/children/queryPatient'

import Nurse from 'components/nurse/nurse'
import Appointment from 'components/nurse/children/appointment'
import Charge from 'components/nurse/children/charge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/loginsy'
    },
    {
      path: '/loginsy',
      component: Login
    },
    {
      path: '/management',
      redirect: '/management/queryDoc',
      component: Management,
      children: [
        {
          path: 'queryJobTitle',
          component: QueryJobTitle
        },
        {
          path: 'queryDoc',
          component: QueryDoc
        },
        {
          path: 'queryNur',
          component: QueryNur
        },
        {
          path: 'addNur',
          component: AddNur
        },
        {
          path: 'addDoc',
          component: AddDoc
        },
        {
          path: 'addMedicine',
          component: AddMedicine
        },
        {
          path: 'queryMedicine',
          component: QueryMedicine
        },
        {
          path: 'addJobTitle',
          component: AddJobTitle
        },
        {
          path: 'queryDep',
          component: QueryDep
        },
        {
          path: 'addDep',
          component: AddDep
        },
        {
          path: 'queryConsultingRoom',
          component: QueryConsultingRoom
        },
        {
          path: 'addConsultingRoom',
          component: AddConsultingRoom
        }
      ]
    },
    {
      path: '/doctor',
      component: Doctor,
      redirect: '/doctor/queryPatient',
      children: [
        {
          path: 'queryPatient',
          component: QueryPatient
        }
      ]
    },
    {
      path: '/nurse',
      component: Nurse,
      redirect: '/nurse/charge',
      children: [
        {
          path: 'charge',
          component: Charge
        },
        {
          path: 'appointment',
          component: Appointment
        }
      ]
    }
  ]
})
