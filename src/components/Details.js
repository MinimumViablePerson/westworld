import React from 'react'
import { useSelector } from 'react-redux'
import { Segment, Image } from 'semantic-ui-react'

import { westworldLogo } from '../services/Images'
import HostInfo from './HostInfo'

const Details = () => {
  const hostIsSelected = useSelector(state => state.selectedHostId !== null)

  return <Segment id='details' className='HQComps'>
    {
      hostIsSelected
        ? <HostInfo />
        : <Image size='medium' src={westworldLogo} />
    }
  </Segment>
}

export default Details
