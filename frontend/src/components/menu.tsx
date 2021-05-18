
import { FC, useState } from 'react'

import './scss/menu.scss'
import Auth from './auth'
import { routeStates } from '../model/routeStates.model'

let Menu: FC<{
  routeState:[String,Function]
}> = (props) => {

  let [route, setRoute] = props.routeState

  return (
    <div className="menu">

      <Auth />

      <ul className="menulist">
        <li onClick={e => setRoute(routeStates.GAMELIST)}>
          GameList
          {route === routeStates.GAMELIST && <span> &lt;-</span>}
        </li>
        <li onClick={e => setRoute(routeStates.GAME)}>
          Game
          {route === routeStates.GAME && <span> &lt;-</span>}
        </li>
      </ul>

    </div>
  )
}


export default Menu
