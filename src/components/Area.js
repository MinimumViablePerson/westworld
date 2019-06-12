import React from 'react'
import { useSelector } from 'react-redux'

import HostList from './HostList'
import '../stylesheets/Area.css'

const Area = ({ area }) => {
  const hostsForThisArea = useSelector(state => state.hosts.filter(host => host.area === area.name && host.active))
  const areaName = area.name.replace(/_/g, ' ')

  return <div className='area' id={area.name}>
    <h3 className='labels'>{areaName}</h3>
    <HostList hosts={hostsForThisArea} />
  </div>
}

export default Area
