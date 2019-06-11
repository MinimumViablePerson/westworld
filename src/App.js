import React, { useState, useEffect } from 'react'
import { Segment } from 'semantic-ui-react'

import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

import api from './services/api'
import { Log } from './services/Log'
import './stylesheets/App.css'

const App = () => {
  const [areas, setAreas] = useState([])
  const [hosts, setHosts] = useState([])
  const [logs, setLogs] = useState([])
  const [selectedHostId, setSelectedHostId] = useState(null)

  const log = type => message => {
    const newLog = Log[type](message)
    api.addLog(newLog)
    setLogs([newLog, ...logs])
  }

  const logger = {
    error: log('error'),
    notify: log('notify'),
    warn: log('warn')
  }

  const findHostById = id => hosts.find(host => host.id === id)

  const hostsInThisArea = area => hosts.filter(host => host.area === area.name)

  const limitReachedForThisArea = area => hostsInThisArea(area).length === area.limit

  const formatAreaName = areaName => areaName.replace(/_/g, ' ')

  const accessDenied = (host, area) => !host.authorized && area.auth_req

  const selectedHost = findHostById(selectedHostId)
  const activeHosts = hosts.filter(host => host.active)
  const decomissionedHosts = hosts.filter(host => !host.active)

  const activateAllHosts = () => {
    logger.warn(`Activating all hosts.`)
    const activatedHosts = hosts.map(host => ({ ...host, active: true }))
    activatedHosts.forEach(api.updateHost)
    setHosts(activatedHosts)
  }

  const deactivateAllHosts = () => {
    logger.notify(`Decomissioning all hosts.`)
    const decomissionedHosts = hosts.map(host => ({ ...host, active: false }))
    decomissionedHosts.forEach(api.updateHost)
    setHosts(decomissionedHosts)
  }

  const toggleActiveHost = id => {
    const updatedHosts = hosts.map(host => host.id === id
      ? { ...host, active: !host.active }
      : host
    )

    const host = updatedHosts.find(host => host.id === id)

    host.active
      ? logger.warn(`Activated ${host.firstName}.`)
      : logger.notify(`Decomissioned ${host.firstName}.`)

    api.updateHost(host)
    setHosts(updatedHosts)
  }

  const invalidAccess = (host, area) => {
    if (accessDenied(host, area)) {
      logger.error(`Access denied. ${host.firstName} is no authorized to enter ${formatAreaName(area.name)}.`)
      return true
    }

    if (limitReachedForThisArea(area)) {
      logger.error(`Too many hosts. Cannot add ${host.firstName} to ${formatAreaName(area.name)}.`)
      return true
    }
    return false
  }

  const changeHostArea = id => areaName => {
    const host = hosts.find(host => host.id === id)
    const area = areas.find(area => area.name === areaName)

    if (invalidAccess(host, area)) return

    logger.notify(`${selectedHost.firstName} set in area: ${formatAreaName(area.name)}.`)

    const updatedHosts = hosts.map(host => host.id === id
      ? { ...host, area: area.name }
      : host
    )
  
    const updatedHost = updatedHosts.find(host => host.id === id)
    api.updateHost(updatedHost)
    setHosts(updatedHosts)
  }

  const selectHost = host => setSelectedHostId(host.id)

  useEffect(() => {
    api.getAreas().then(setAreas)
    api.getHosts().then(setHosts)
    api.getLogs().then(setLogs)
  }, [])

  return (
    <Segment id='app'>
      <WestworldMap
        areas={areas}
        hosts={activeHosts}
        selectHost={selectHost}
        selectedHostId={selectedHostId}
      />
      <Headquarters
        toggleActiveHost={toggleActiveHost}
        areas={areas}
        hosts={decomissionedHosts}
        selectHost={selectHost}
        selectedHost={selectedHost}
        logs={logs}
        changeHostArea={changeHostArea}
        activateAllHosts={activateAllHosts}
        deactivateAllHosts={deactivateAllHosts}
        selectedHostId={selectedHostId}
      />
    </Segment>
  )
}

export default App
