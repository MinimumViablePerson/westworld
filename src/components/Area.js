import React from 'react'

import HostList from './HostList'
import '../stylesheets/Area.css'

const Area = ({ area, hosts, selectHost, selectedHostId }) =>
  <div className='area' id={area.name}>
    <h3 className='labels'>{area.name.replace(/_/g, ' ')}</h3>
    <HostList
      hosts={hosts}
      selectHost={selectHost}
      selectedHostId={selectedHostId}
    />
  </div>

export default Area
