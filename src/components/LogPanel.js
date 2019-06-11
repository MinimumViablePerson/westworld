import React, { useState } from 'react'
import { Segment, Button } from 'semantic-ui-react'

const LogPanel = ({ logs, activateAllHosts, deactivateAllHosts }) => {
  const [active, setActive] = useState(true)

  const toggleAllActive = () => {
    active ? activateAllHosts() : deactivateAllHosts()
    setActive(!active)
  }

  return (
    <Segment className='HQComps' id='logPanel'>
      <pre>
        {
          logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)
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
