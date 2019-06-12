import { combineReducers } from 'redux'

import hosts from './hosts'
import areas from './areas'
import logs from './logs'
import selectedHostId from './selectedHostId'

export default combineReducers({
  hosts,
  areas,
  logs,
  selectedHostId
})
