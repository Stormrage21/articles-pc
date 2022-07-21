//把所有的模块做统一处理
import React from "react"
import LoginStore from './login.Store'
// const { default: loginStore } = require("./login.Store")
import ChannelStore from './channels.Store'

import UserStore from './user.Store'
// 导出一个统一的方法 useStore
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}


const context = React.createContext(new RootStore())
const useStore = () => React.useContext(context)
export { useStore }