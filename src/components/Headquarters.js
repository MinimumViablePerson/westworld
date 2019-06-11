import React from 'react'
import '../stylesheets/Headquarters.css'
import { Grid } from 'semantic-ui-react'

import Details from './Details'
import LogPanel from './LogPanel'
import ColdStorage from './ColdStorage'

const Headquarters = ({ areas,
  hosts,
  selectHost,
  selectedHost,
  logs,
  toggleActiveHost,
  changeHostArea,
  activateAllHosts,
  deactivateAllHosts,
  selectedHostId
}) =>
  <Grid celled='internally'>
    <Grid.Column width={8}>
      <ColdStorage
        hosts={hosts}
        selectHost={selectHost}
        selectedHostId={selectedHostId}
      />
    </Grid.Column>
    <Grid.Column width={5}>
      <Details
        changeHostArea={changeHostArea}
        toggleActiveHost={toggleActiveHost}
        areas={areas}
        host={selectedHost}
      />
    </Grid.Column>
    <Grid.Column width={3}>
      <LogPanel logs={logs} activateAllHosts={activateAllHosts} deactivateAllHosts={deactivateAllHosts} />
    </Grid.Column>
  </Grid>

export default Headquarters
