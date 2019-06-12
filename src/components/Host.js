import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'semantic-ui-react'

import useActions from '../actions'
import '../stylesheets/Host.css'

const Host = ({ host }) => {
  const selected = useSelector(state => host.id === state.selectedHostId)
  const { selectHost } = useActions(useDispatch())

  const handleClick = () => selectHost(host)

  return <Card
    className={`host ${selected ? 'selected' : ''}`}
    onClick={handleClick}
    image={host.imageUrl}
    raised
  />
}

export default Host
