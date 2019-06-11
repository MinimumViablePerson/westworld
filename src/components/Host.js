import React from 'react'
import { Card } from 'semantic-ui-react'
import '../stylesheets/Host.css'

const Host = ({ host, handleClick, selected }) =>
  <Card
    className={`host ${selected ? 'selected' : ''}`}
    onClick={handleClick}
    image={host.imageUrl}
    raised
  />

export default Host
