import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Segment, Button } from 'semantic-ui-react'

import useActions from '../actions'
import Log from './Log';

const LogPanel = () => {
  const logs = useSelector(state => state.logs)
  const { activateAllHosts, decomissionAllHosts } = useActions(useDispatch())

  const [active, setActive] = useState(true)

  const toggleAllActive = () => {
    active ? activateAllHosts() : decomissionAllHosts()
    setActive(!active)
  }

  return (
    <Segment className='HQComps' id='logPanel'>
      <pre>
        {
          logs.map((log, i) => <Log key={i} log={log} />)
        }
      </pre>

      <Button
        fluid
        color={active ? 'green' : 'red'}
        content={active ? 'ACTIVATE ALL' : 'DECOMISSION ALL'}
        onClick={toggleAllActive}
      />
    </Segment>
  )
}

export default LogPanel
