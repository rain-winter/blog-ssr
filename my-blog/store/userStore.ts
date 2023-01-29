export type IUserInfo = {
  id?: number
  nickname?: string
  avatar?: string
}  | any
export interface IUserStore {
  userInfo: IUserInfo
  setUserInfo: (value: IUserInfo) => void
}

const userStore = (): IUserStore => {
  return {
    userInfo: {}
    ,
    setUserInfo(value) {
      this.userInfo = value
    },
  }
}

export default userStore
