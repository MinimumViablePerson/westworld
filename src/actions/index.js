import {
  FETCHING_AREAS,
  FETCHED_AREAS_SUCCESS,
  FETCHED_AREAS_ERROR,
  FETCHING_HOSTS,
  FETCHED_HOSTS_SUCCESS,
  FETCHED_HOSTS_ERROR,
  FETCHING_LOGS,
  FETCHED_LOGS_SUCCESS,
  FETCHED_LOGS_ERROR,
  ACTIVATE_HOST,
  DECOMISSION_HOST,
  SELECT_HOST,
  CHANGE_HOST_AREA,
  DECOMISSION_ALL_HOSTS,
  ACTIVATE_ALL_HOSTS
} from './types'
import api from '../services/api'
import { store } from '../index'

export default dispatch => ({
  fetchAreas () {
    dispatch({ type: FETCHING_AREAS })
    api.getAreas()
      .then(areas => dispatch({ type: FETCHED_AREAS_SUCCESS, areas }))
      .catch(error => dispatch({ type: FETCHED_AREAS_ERROR, error }))
  },
  fetchHosts () {
    dispatch({ type: FETCHING_HOSTS })
    api.getHosts()
      .then(hosts => dispatch({ type: FETCHED_HOSTS_SUCCESS, hosts }))
      .catch(error => dispatch({ type: FETCHED_HOSTS_ERROR, error }))
  },
  fetchLogs () {
    dispatch({ type: FETCHING_LOGS })
    api.getLogs()
      .then(logs => dispatch({ type: FETCHED_LOGS_SUCCESS, logs }))
      .catch(error => dispatch({ type: FETCHED_LOGS_ERROR, error }))
  },
  activateHost (host) {
    host = { ...host, active: true }
    api.updateHost(host)
    dispatch({ type: ACTIVATE_HOST, host })
  },
  decomissionHost (host) {
    host = { ...host, active: false }
    api.updateHost(host)
    dispatch({ type: DECOMISSION_HOST, host })
  },
  selectHost (host) {
    dispatch({ type: SELECT_HOST, host })
  },
  changeHostArea (host, area) {
    host = { ...host, area }
    api.updateHost(host)
    dispatch({ type: CHANGE_HOST_AREA, host, area })
  },
  activateAllHosts () {
    const { hosts } = store.getState()
    const activatedHosts = hosts.map(host => ({ ...host, active: true }))
    activatedHosts.forEach(api.updateHost)
    dispatch({ type: ACTIVATE_ALL_HOSTS, hosts: activatedHosts })
  },
  decomissionAllHosts () {
    const { hosts } = store.getState()
    const deactivatedHosts = hosts.map(host => ({ ...host, active: false }))
    deactivatedHosts.forEach(api.updateHost)
    dispatch({ type: DECOMISSION_ALL_HOSTS, hosts: deactivatedHosts })
  }
})
