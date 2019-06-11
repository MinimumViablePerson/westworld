import React from 'react'
import { Segment } from 'semantic-ui-react'

import Area from './Area'

const WestworldMap = ({ areas, hosts, selectHost, selectedHostId }) =>
  <Segment id='map' >
    {
      areas.map(area =>
        <Area
          key={`area-${area.id}`}
          area={area}
          hosts={hosts.filter(host => host.area === area.name)}
          selectHost={selectHost}
          selectedHostId={selectedHostId}
        />
      )
    }
  </Segment>

export default WestworldMap
