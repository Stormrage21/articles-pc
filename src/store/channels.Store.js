import { makeAutoObservable } from "mobx"
import { http } from '@/utils'
class channelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }
}
export default channelStore