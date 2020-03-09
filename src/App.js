import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Continent from './components/Continent'
import Area from './components/Area'
import League from './components/League'
import Club from './components/Club'
import Player from './components/Player'

import './App.css'

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/continent/:continentId" component={Continent} />
      <Route path="/area/:areaId" component={Area} />
      <Route path="/league/:leagueId" component={League} />
      <Route path="/club/:clubId" component={Club} />
      <Route path="/player/:playerId" component={Player} />
    </Switch>
  )
}

export default App
