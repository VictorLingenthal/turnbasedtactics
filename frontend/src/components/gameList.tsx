
import { FC, useState, useEffect } from 'react'

import { GameListService, IGameStub } from '../services/gameListService'
import './scss/gameList.scss'

import { GameStateEnum } from '../model/gameStates.model'

export let GameList: FC<{
  setRoute: Function
}> = (props) => {

  const gameListService = GameListService.getInstance()
  const [gameList, setGameList] = useState<IGameStub[]>(gameListService.activeGames)

  useEffect(() => {
    gameListService.getGameList(setGameList, props.setRoute)
  }, [])

  return (
    <div className="gameListComponent">

      <h1>Gamelist</h1>
      <div className="openGame">
        <button onClick={e => gameListService.openGame()}>Open New Game</button>
      </div>

      <table className="gameList">
        <tr>
          <th>Game Status</th>
          <th>Game Name</th>
          <th>No of Players</th>
          <th>Players</th>
        </tr>
        {
          gameListService.activeGames.map(game => (
            <tr>
              <td>{
                game.gameState === GameStateEnum.OPEN &&
                  <button
                    onClick={e => gameListService.joinGame(game)}
                  >Join</button>
                  || game.gameState
              }</td>
              <td>{game.gameName}</td>
              <td>{game.players.length}</td>
              <td>{
                game.players.map((player, idx) =>
                  player.username +
                  (game.players.length-1 === idx ? '' : ', ')
                )}
              </td>
            </tr>
            )
        )}
      </table>

    </div>
  )
}
