import React from 'react'
import { useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import Area from './Area'

const WestworldMap = ({ selectHost, selectedHostId }) => {
  const areas = useSelector(state => state.areas)

  return <Segment id='map'>
    {
      areas.map(area =>
        <Area
          key={`area-${area.id}`}
          area={area}
          selectHost={selectHost}
          selectedHostId={selectedHostId}
        />
      )
    }
  </Segment>
}

export default WestworldMap
