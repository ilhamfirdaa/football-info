import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Area from './pages/Area'
import Club from './pages/Club'
import Continent from './pages/Continent'
import Home from './pages/Home'
import League from './pages/League'
import NotFound from './pages/NotFound'
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
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
