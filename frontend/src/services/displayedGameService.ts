
import { IClientGameService } from './clientGameService'

export interface IDisplayedGameService {
  setDisplayedGameService(gameService:IClientGameService):void
  getDisplayedGameService():IClientGameService
}

export class DisplayedGameService implements IDisplayedGameService {

  private static instance: DisplayedGameService
  private displayedGameService: IClientGameService

  public static getInstance():DisplayedGameService {
    if (!DisplayedGameService.instance)
      DisplayedGameService.instance = new DisplayedGameService()

    return DisplayedGameService.instance
  }

  public setDisplayedGameService = (gameService:IClientGameService) =>
    this.displayedGameService = gameService

  public getDisplayedGameService = () =>
    this.displayedGameService

}
