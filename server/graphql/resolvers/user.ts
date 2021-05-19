
import { UserService, IActiveUser } from './../../services/userService'

let activeUsers:IActiveUser[] = []

export const userResolver = {
  Mutation : {
    checkAuth : async (__:any, args:any) =>
      UserService.getInstance().checkAuth(args.sessionID),
    login: async (__:any, args:any) =>
      await UserService.getInstance().loginUser(args),
    register: async (__:any, args:any) =>
      await UserService.getInstance().registerUser(args),
  }
}
