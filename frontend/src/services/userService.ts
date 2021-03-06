
import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient'
import { cookieService, CookieNameEnum } from './cookieService'

export interface ILoginData {
  username:string
  password:string
  confirmPassword:string
}

export interface IUserService {
  userID:string
  sessionID:string
  getUserID():string|false
  login(loginData:ILoginData):Promise<any>
  register(loginData:ILoginData):Promise<any>
  checkAuth():Promise<any>
}

export class UserService implements IUserService {

  public userID:string
  public sessionID:string
  private static instance: IUserService
  private setLoginMessage

  private constructor (setLoginMessage) {
    this.sessionID = cookieService.getCookie(CookieNameEnum.SESSIONID)
    this.setLoginMessage = setLoginMessage
  }

  public static getInstance(setLoginMessage?): IUserService {
    if (!UserService.instance)
      UserService.instance = new UserService(setLoginMessage)

    return UserService.instance
  }

  getUserID = () => {
    if (this.userID)
      return this.userID
    else {
      if (this.setLoginMessage)
        this.setLoginMessage({
          userID: null,
          sessionID: null,
          message: "Please Login/Register first",
        })
      else console.warn('userService - getUserID(): setLoginMessage not set')
      return false
    }
  }

  public async checkAuth() {
    return await apolloClient.mutate({
      variables: {
        sessionID: this.sessionID,
      },
      mutation: gql`
        mutation CheckAuth(
          $sessionID: String
        ) {
          checkAuth(
            sessionID: $sessionID
          ) {
            userID
            message
          }
        }
      `
    })
    .then(res => {
      this.userID = res.data.checkAuth.userID
      return res.data
    })
    .catch(err => {
      console.log('checkAuth Error')
      console.log(err)
      console.log(err.data?.login)
      return err.data
    })
  }

  public async login(loginData) {
    return await apolloClient.mutate({
      variables: {
        username: loginData.username,
        password: loginData.password,
      },
      mutation: gql`
        mutation Login(
          $username: String
          $password: String
        ) {
          login(
            username: $username
            password: $password
          ) {
            userID
            sessionID
            message
          }
        }
      `
    })
    .then(res => {
      this.userID = res.data.login.userID
      this.sessionID = res.data.login.sessionID
      return res.data
    })
    .catch(err => {
      console.log('Login Error')
      console.log(err)
      console.log(err.data.login)
      return err.data
    })
  }

  public async register(loginData) {
    return apolloClient.mutate({
      variables: {
        username: loginData.username,
        password:loginData.password,
        confirmPassword:loginData.confirmPassword,
      },
      mutation: gql`
        mutation Register(
          $username: String
          $password: String
          $confirmPassword: String
        ) {
          register(
            username: $username
            password: $password
            confirmPassword: $confirmPassword
          ) {
            userID
            sessionID
            message
          }
        }
      `
    })
    .then(res => {
      this.userID = res.data.register.userID
      this.sessionID = res.data.register.sessionID
      return res.data
    })
    .catch(err => {
      console.log('Register Error')
      console.log(err)
      console.log(err.data.login)
      return err.data
    })
  }

}
