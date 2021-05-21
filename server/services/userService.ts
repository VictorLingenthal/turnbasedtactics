
import { v4 as uuidv4 } from 'uuid'
import User, { IDBUser } from '../models/user.model'
import mongoose from "mongoose"
import hash  from 'object-hash'

import { IloginResult } from '../../frontend/src/interfaces/loginResult'

export interface IActiveUser {
  username: string
  userID: string
  sessionID: string
  lastlogin: number
}

export interface IUserService {
  activeUsers:IActiveUser[]
  checkAuth(sessionID:string):IloginResult
  loginUser(args:any):Promise<IloginResult>
  registerUser(args:any):Promise<IloginResult>
  findUserByUserID(userID:string):IActiveUser|undefined
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

  public checkAuth = (sessionID:string) => {
    const auth:IloginResult = {
      userID: null,
      sessionID: null,
      message: "Session expired"
    }
    const userLoggedin = this.findUserBySessionID(sessionID)

    if (userLoggedin) {
      auth.userID = userLoggedin.userID
      auth.message = "Welcome back " + userLoggedin.username
    } else {
      console.log('No user with that sessionID')
    }

    return auth
  }

  public async loginUser(args:any) {

    const login:IloginResult = {
     userID: null,
     sessionID: null,
     message: "No login Message set"
   }

   if (mongoose.connection.readyState != 1) {
     login.message = "Database Server not connected, please try again later"
     return login
   }

   const user = await User.findOne({ username: args.username })

   if (!user)
     login.message = "No user by that name"

   else if (user.password !== hash(args.password))
     login.message = "Passwords do not match"

   else {
     const newActiveUser = this.addUser(user)

     if (newActiveUser) {
       login.message = newActiveUser.username + " logged in successfully "
       login.userID = newActiveUser.userID
       login.sessionID = newActiveUser.sessionID
     } else
       login.message = args.username + " already logged in"
   }

   return login

  }

  public async registerUser(args:any) {

    const register:IloginResult = {
      userID: null,
      sessionID: null,
      message: "No register Message set"
    }

    if (mongoose.connection.readyState != 1) {
      register.message = "Database Server not connected, please try again later"
      return register
    }
    const user = await User.findOne({ username: args.username })

    if (args.password !== args.confirmPassword)
      register.message = "Passwords do not match"

    else if (args.username.length < 3)
      register.message = "username too short"

    else if (user)
      register.message =  "username already taken"

    else {
      const newUser:IDBUser = new User({
        username: args.username,
        password: hash(args.password),
        userID: uuidv4()
      })

      await newUser.save()

      const newActiveUser = this.addUser(newUser)

      if (newActiveUser) {
        register.message =  'Newuser "' + newActiveUser.username+ '" created and logged in succesfully!'
        register.sessionID = newActiveUser.sessionID
        register.userID = newActiveUser.userID
      } else
        register.message =  'There was a problem with registration'

    }

    return register

  }

  private findUserBySessionID = (sessionID:string) =>
    this.activeUsers.filter(activeUser => activeUser.sessionID === sessionID)[0]

  public findUserByUserID = (userID:string) =>
    this.activeUsers.filter(activeUser => activeUser.userID === userID)[0]

  private findUserByUsername = (username:string) =>
    this.activeUsers.filter(activeUser => activeUser.username === username)[0]

  private addUser = (dbUser:IDBUser) => {

    const user = this.findUserByUsername(dbUser.username);

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
