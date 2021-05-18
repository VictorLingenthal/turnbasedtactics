
import { v4 as uuidv4 } from 'uuid'
import { IDBUser } from '../models/user.model'


export interface IActiveUser {
  username: String
  userID: String
  sessionID: String
  lastlogin: Number
}

export interface IUserService {
  activeUsers:IActiveUser[]
  addUser(userModel:IDBUser):IActiveUser|null
  findUserBySessionID(sessionID:String):IActiveUser|undefined
  findUserByUserID(userID:String):IActiveUser|undefined
  findUserByName(username:String):IActiveUser|undefined
}

export class UserService implements IUserService {

  private static instance: UserService;
  public activeUsers: IActiveUser[]

  private constructor() {
    this.activeUsers = []
  }

  public static getInstance():UserService {
    if (!UserService.instance)
        UserService.instance = new UserService()

    return UserService.instance
  }

  public findUserBySessionID = (sessionID:String) =>
    this.activeUsers.filter(activeUser => activeUser.sessionID === sessionID)[0]

  public findUserByUserID = (userID:String) =>
    this.activeUsers.filter(activeUser => activeUser.userID === userID)[0]

  public findUserByName = (username:String) =>
    this.activeUsers.filter(activeUser => activeUser.username === username)[0]

  public addUser = (dbUser:IDBUser) => {

    const user = this.findUserByName(dbUser.username);

    if (user === undefined) {

      const newActiveUser:IActiveUser = {
        username: dbUser.username,
        userID: dbUser.userID,
        sessionID: uuidv4(),
        lastlogin: Date.now(),
      }

      this.activeUsers = [...this.activeUsers, newActiveUser]
      return newActiveUser

    } else
      return null

  }

}
