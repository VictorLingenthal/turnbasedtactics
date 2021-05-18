import { useState } from 'react';

import './App.scss';
import Menu from './components/menu'
import { Game } from './components/game'
import { GameList } from './components/gameList'

import { routeStates } from './model/routeStates.model'

function App() {

  const routeState = useState<String>(routeStates.GAMELIST)
  const [route, setRoute] = routeState

  return (
    <div className="App">

      <Menu routeState={routeState} />

      {route === routeStates.GAMELIST && <GameList setRoute={setRoute}/>}
      {route === routeStates.GAME && <Game setRoute={setRoute}/>}

    </div>
  );
}

export default App;
