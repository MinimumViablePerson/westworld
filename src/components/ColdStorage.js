import React from 'react'
import { useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import HostList from './HostList'

const ColdStorage = () => {
  const decomissionedHosts = useSelector(state => state.hosts.filter(host => !host.active))

  return <Segment.Group className='HQComps'>
    <Segment compact>
      <h3 className='labels'>ColdStorage</h3>
    </Segment>
    <Segment compact>
      <HostList hosts={decomissionedHosts} />
    </Segment>
  </Segment.Group>
}

export default ColdStorage
