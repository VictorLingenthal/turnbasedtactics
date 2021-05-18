
import User, { IDBUser } from '../../models/user.model'
import mongoose from "mongoose"
import { UserService, IActiveUser } from './../../services/userService'
import { v4 as uuidv4 } from 'uuid'
import { IloginResult } from '../../../frontend/src/interfaces/loginResult'

let activeUsers:IActiveUser[] = []

export const userResolver = {
  Mutation : {
    checkAuth : async (__:any, args:any) => {

      let sessionID = args.sessionID

      const auth:IloginResult = {
        userID: null,
        sessionID: null,
        message: "Session expired"
      }

      if (sessionID) {
        const userService = UserService.getInstance()
        const userLoggedin = userService.findUserBySessionID(sessionID)

        if (userLoggedin) {
          auth.userID = userLoggedin.userID
          auth.message = "Welcome back " + userLoggedin.username
        } else {
          console.log('No user with that sessionID')
        }
      }

      return auth

    },

    login: async (__:any, args:any) => {

      console.log('login')

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

      else if (user.password !== args.password)
        login.message = "Passwords do not match"

      else {
        const userService = UserService.getInstance()
        const newActiveUser = userService.addUser(user)

        if (newActiveUser) {
          login.message = newActiveUser.username + " logged in successfully "
          login.userID = newActiveUser.userID
          login.sessionID = newActiveUser.sessionID
        } else
          login.message = args.username + " already logged in"
      }

      return login
    },
    register: async (__:any, args:any) => {

      console.log('register')

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
          password: args.password,
          userID: uuidv4()
        })

        await newUser.save()
        register.message =  'Newuser "' + newUser.username+ '" created succesfully!'
        register.userID = newUser.userID
      }

      return register
    },
  }
}
