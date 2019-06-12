import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

import useActions from './actions'
import './stylesheets/App.css'

const App = () => {
  const { fetchAreas, fetchHosts, fetchLogs } = useActions(useDispatch())

  useEffect(() => {
    fetchAreas()
    fetchHosts()
    fetchLogs()
  }, [])

  return <Segment id='app'>
    <WestworldMap />
    <Headquarters />
  </Segment>
}

export default App
