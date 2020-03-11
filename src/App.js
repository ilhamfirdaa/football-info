import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Continent from './pages/Continent'
import Area from './pages/Area'
import League from './pages/League'
import Club from './pages/Club'
import Player from './pages/Player'

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
