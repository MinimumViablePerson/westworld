import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

class HostInfo extends Component {
  get areaOptions () {
    return this.props.areas
      .map(area => ({ key: area.id, text: area.name.replace(/_/g, ' '), value: area.name }))
  }

  handleChange = (e, {value}) => {
    this.props.changeHostArea(value)
  }

  toggle = () => {
    const { toggleActiveHost, host } = this.props
    toggleActiveHost(host.id)
  }

  render () {
    const { host } = this.props
    const { areaOptions, handleChange, toggle } = this

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
                {host.firstName} | { host.gender.toLowerCase() === 'male' ? <Icon name='man' /> : <Icon name='woman' />}
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
}

export default HostInfo
