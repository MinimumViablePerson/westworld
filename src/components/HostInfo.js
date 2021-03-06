import React from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import useActions from '../actions'
import '../stylesheets/HostInfo.css'

const HostInfo = () => {
  const { activateHost, decomissionHost, changeHostArea } = useActions(useDispatch())

  const host = useSelector(state => state.hosts.find(host => host.id === state.selectedHostId))
  const areas = useSelector(state => state.areas)
  const areaOptions = areas
    .map(area => ({ key: area.id, text: area.name.replace(/_/g, ' '), value: area.name }))

  const handleChange = (_, { value: area }) => {
    changeHostArea(host, area)
  }

  const toggle = () => {
    host.active ? decomissionHost(host) : activateHost(host)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={host.imageUrl}
          floated='left'
          size='small'
          className='hostImg'
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {host.firstName} | <Icon name={host.gender.toLowerCase()} />
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={toggle}
                label={host.active ? 'Active' : 'Decomissioned'}
                checked={host.active}
                slider
              />
            </Card.Meta>

            <Divider />
              Current Area:
            <Dropdown
              onChange={handleChange}
              value={host.area}
              options={areaOptions}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}

export default HostInfo
