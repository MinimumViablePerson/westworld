import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

class LogPanel extends Component {
  state = {
    active: false
  }

  toggleAllActive = () => {
    const { active } = this.state
    const { activateAllHosts, deactivateAllHosts } = this.props

    active ? activateAllHosts() : deactivateAllHosts()
    this.setState({ active: !active })
  }

  render () {
    const { active } = this.state
    const { logs } = this.props
    const { toggleAllActive } = this
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
}

export default LogPanel
