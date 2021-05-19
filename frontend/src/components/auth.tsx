import { FC, useState, useEffect} from 'react'

import './scss/auth.scss'
import { UserService } from "../services/userService"
import { cookieService, CookieNameEnum } from "../services/cookieService"
import { IloginResult } from '../interfaces/loginResult'

let Auth: FC<{

}> = (props) => {

  const userService = UserService.getInstance()

  const [awaitResponse, setAwaitResponse] = useState<Boolean>(false)

  const [showRegister, setShowRegister] = useState<Boolean>(false)
  const [loginMessage, setLoginMessage] = useState<IloginResult>({
    userID: null,
    sessionID: null,
    message: "",
  })

  useEffect(() => {
    const userID = userService.userID
    const sessionID = userService.sessionID
    userService.checkAuth()
    .then(res =>  {
      if (res.checkAuth.userID) {
        setLoginMessage({
          userID,
          sessionID,
          message: res.checkAuth.message,
        })
      }
    })
    .catch(err => {
      console.log('checkAuth Error')
      console.log(err.login)
    })
  },[])

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const { username, password, confirmPassword } = loginData

  const onInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (awaitResponse) {
      setLoginMessage({
        ...loginMessage,
        message: "Waiting for Server",
      })
      return
    }
    setAwaitResponse(true)
    if (!showRegister) {
      userService.login(loginData)
      .then(res =>  {
        setAwaitResponse(false)
        cookieService.setCookie(CookieNameEnum.SESSIONID, res.login.sessionID, 1)
        setLoginMessage(res.login)
      })
      .catch(err => {
        setAwaitResponse(false)
        console.log('loginResult Error')
        console.log(err.login)
      })
    } else {
      userService.register(loginData)
      .then(res => {
        setAwaitResponse(false)
        setLoginMessage(res.register)
      })
      .catch(err => {
        setAwaitResponse(false)
        console.log('registerResult Error')
        console.log(err.register)
      })
    }

  }

  const onClickRegister = (e) =>
    setShowRegister(true)

  const onClickLogin = (e) =>
    setShowRegister(false)

  return (
    <div className="auth">
      <div className="user">
      { !loginMessage.sessionID &&
        <div>
          <div className="authlinks">
            <span
              className="authlink"
              onClick={onClickLogin}
            >Login</span>
            <span> / </span>
            <span
              className="authlink"
              onClick={onClickRegister}
            >Register</span>
          </div>

          <form onSubmit={onSubmit}>
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={onInputChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            {
              showRegister &&
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onInputChange}
                />
              </div>
            }
            <button type="submit">Submit</button>
          </form>
        </div>
      }
        <div
          className={loginMessage.sessionID ? "loginMessage success" : "loginMessage failure"}
        >{loginMessage.message}</div>
      </div>
    </div>
  )
}


export default Auth
