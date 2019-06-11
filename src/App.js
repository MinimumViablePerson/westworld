import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

import { getAreas, getHosts } from './services/api'
import { Log } from './services/Log'
import './stylesheets/App.css'

class App extends Component {
  state = {
    areas: [],
    hosts: [],
    selectedHostId: null,
    logs: []
  }

  log = type => message => this.setState({ logs: [Log[type](message), ...this.state.logs] })
  logger = {
    error: this.log('error'),
    notify: this.log('notify'),
    warn: this.log('warn')
  }

  get selectedHost () {
    const { hosts, selectedHostId } = this.state
    return hosts.find(host => host.id === selectedHostId)
  }

  get decomissionedHosts () {
    const { hosts } = this.state
    return hosts.filter(host => !host.active)
  }

  get activeHosts () {
    const { hosts } = this.state
    return hosts.filter(host => host.active)
  }

  activateAllHosts = () => {
    this.logger.warn(`Activating all hosts.`)
    const hosts = this.state.hosts.map(host => ({ ...host, active: true }))
    this.setState({ hosts })
  }

  deactivateAllHosts = () => {
    this.logger.notify(`Decomissioning all hosts.`)
    const hosts = this.state.hosts.map(host => ({ ...host, active: false }))
    this.setState({ hosts })
  }

  toggleActiveHost = id => {
    const hosts = this.state.hosts.map(host => host.id === id
      ? { ...host, active: !host.active }
      : host
    )

    const host = hosts.find(host => host.id === id)
    host.active
      ? this.logger.warn(`Activated ${host.firstName}.`)
      : this.logger.notify(`Decomissioned ${host.firstName}.`)

    this.setState({ hosts })
  }

  findHostById = id => this.state.hosts.find(host => host.id === id)

  hostsInThisArea = area => this.state.hosts.filter(host => host.area === area.name)

  limitReachedForThisArea = area => this.hostsInThisArea(area).length === area.limit

  formatAreaName = areaName => areaName.replace(/_/g, ' ')

  accessDenied = (host, area) => !host.authorized && area.auth_req

  invalidAccess = (host, area) => {
    if (this.accessDenied(host, area)) {
      this.logger.error(`Access denied. ${host.firstName} is no authorized to enter ${this.formatAreaName(area.name)}.`)
      return true
    }

    if (this.limitReachedForThisArea(area)) {
      this.logger.error(`Too many hosts. Cannot add ${host.firstName} to ${this.formatAreaName(area.name)}.`)
      return true
    }
    return false
  }

  changeHostArea = id => areaName => {
    const host = this.state.hosts.find(host => host.id === id)
    const area = this.state.areas.find(area => area.name === areaName)

    if (this.invalidAccess(host, area)) return

    this.logger.notify(`${this.selectedHost.firstName} set in area: ${this.formatAreaName(area.name)}.`)

    const hosts = this.state.hosts.map(host => host.id === id
      ? { ...host, area: area.name }
      : host
    )
    this.setState({ hosts })
  }

  updateState = name => value => this.setState({ [name]: value })

  updateAreas = this.updateState('areas')
  updateHosts = this.updateState('hosts')

  selectHost = host => this.setState({ selectedHostId: host.id })
  deselectHost = () => this.setState({ host: null })

  componentDidMount () {
    getAreas().then(this.updateAreas)
    getHosts().then(this.updateHosts)
  }

  render () {
    const { areas, selectedHostId, logs } = this.state
    const {
      selectHost,
      toggleActiveHost,
      selectedHost,
      changeHostArea,
      activateAllHosts,
      deactivateAllHosts,
      activeHosts,
      decomissionedHosts
    } = this

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
}

export default App
