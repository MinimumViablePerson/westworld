import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import { westworldLogo } from '../services/Images'
import HostInfo from './HostInfo'

const Details = ({ host, areas, toggleActiveHost, changeHostArea }) => {
  const renderHostInfo = () => host
    ? <HostInfo changeHostArea={changeHostArea(host.id)} toggleActiveHost={toggleActiveHost} host={host} areas={areas} />
    : <Image size='medium' src={westworldLogo} />

  return (
    <Segment id='details' className='HQComps'>
      { renderHostInfo() }
    </Segment>
  )
}

export default Details
