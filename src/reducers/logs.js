import { FETCHED_LOGS_SUCCESS, CHANGE_HOST_AREA, ACTIVATE_HOST, DECOMISSION_HOST, ACTIVATE_ALL_HOSTS, DECOMISSION_ALL_HOSTS } from "../actions/types"
import Log from '../services/Log'

const formatAreaName = areaName => areaName.replace(/_/g, ' ')

export default (logs = [], action) => {
  switch (action.type) {
    case FETCHED_LOGS_SUCCESS:
      return [Log.notify(`Successfully retrieved log data from remote source.`), ...action.logs]
    case ACTIVATE_HOST:
      return [Log.warn(`Activated host: ${action.host.firstName}.`), ...logs]
    case DECOMISSION_HOST:
      return [Log.notify(`Decomissioned host: ${action.host.firstName}.`), ...logs]
    case CHANGE_HOST_AREA:
      return [Log.notify(`${action.host.firstName} set in area: ${formatAreaName(action.area)}.`) ,...logs]
    case ACTIVATE_ALL_HOSTS:
      return [Log.warn(`Activating all hosts.`) ,...logs]
    case DECOMISSION_ALL_HOSTS:
      return [Log.notify(`Decomissioning all hosts.`) ,...logs]
    default:
      return logs
  }
}
