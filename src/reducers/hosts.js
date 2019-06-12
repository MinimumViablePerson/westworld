import { FETCHED_HOSTS_SUCCESS, ACTIVATE_HOST, DECOMISSION_HOST, CHANGE_HOST_AREA, ACTIVATE_ALL_HOSTS, DECOMISSION_ALL_HOSTS } from "../actions/types"

const activateHost = (hosts, id) => hosts
  .map(host => host.id === id ? {...host, active: true} : host)

const decomissionHost = (hosts, id) => hosts
  .map(host => host.id === id ? {...host, active: false} : host)

const changeHostArea = (hosts, id, area) => hosts
  .map(host => host.id === id ? {...host, area} : host)

const activateAllHosts = hosts => hosts.map(host => ({ ...host, active: true }))

const decomissionAllHosts = hosts => hosts.map(host => ({ ...host, active: false }))

export default (hosts = [], action) => {
  switch (action.type) {
    case FETCHED_HOSTS_SUCCESS:
      return action.hosts
    case ACTIVATE_HOST:
      return activateHost(hosts, action.host.id)
    case DECOMISSION_HOST:
      return decomissionHost(hosts, action.host.id)
    case CHANGE_HOST_AREA:
      return changeHostArea(hosts, action.host.id, action.area)
    case ACTIVATE_ALL_HOSTS:
      return activateAllHosts(hosts)
    case DECOMISSION_ALL_HOSTS:
      return decomissionAllHosts(hosts)
    default:
      return hosts
  }
}
