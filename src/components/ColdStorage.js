import React from 'react'
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'

const ColdStorage = ({ hosts, selectHost, selectedHostId }) =>
  <Segment.Group className='HQComps'>
    <Segment compact>
      <h3 className='labels'>ColdStorage</h3>
    </Segment>
    <Segment compact>
      <HostList
        hosts={hosts}
        selectHost={selectHost}
        selectedHostId={selectedHostId}
      />
    </Segment>
  </Segment.Group>

export default ColdStorage
