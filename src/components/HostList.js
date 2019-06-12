import React from 'react'
import { Card } from 'semantic-ui-react'

import Host from './Host'

const HostList = ({ hosts }) =>
  <Card.Group itemsPerRow={6}>
    {
      hosts.map(host => <Host key={`host-${host.id}`} host={host} />)
    }
  </Card.Group>

export default HostList
