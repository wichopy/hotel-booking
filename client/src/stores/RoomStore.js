import {observable, action, decorate} from 'mobx'
import { Room } from '../Entities'
class RoomStore {
  // @observable
  rooms = []

  constructor() {

  }
  //@action
  cache (rooms) {
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

  // @action
  add (room) {
    // Shouldn't need to do this after the first time
  }

  delete (room) {
    // Shouldn't need to  delete a room.
  }
  edit (room) {
    // TODO: Edit the properties inside of a room.
    // Currently a room has no details, in the future there could be:
    // Smoke free?
    // # of beds?
    // # of washrooms?
    // Amenities like TV and fridge?
  }

}

decorate(RoomStore, {
  rooms: observable,
  add: action.bound,
  cache: action.bound,
})

export default RoomStore
