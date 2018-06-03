import {observable, action, decorate} from 'mobx'
import { Room } from '../Entities'
class RoomStore {
  // @observable
  rooms = []

  constructor() {

  }

  // @action
  add (rooms) {
    if (!Array.isArray(rooms)) {
      throw new Error('Must be an array')
    }
    if (rooms.length === 0) {
      return
    }
    rooms.forEach(room => {
      if (room instanceof Room !== true) {
        throw new Error('Must be an array of rooms')
      }
    })

    this.rooms = this.rooms.concat(rooms)
  }

}

decorate(RoomStore, {
  rooms: observable,
  add: action.bound,
})

export default RoomStore
