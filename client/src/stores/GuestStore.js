import { Guest } from '../Entities'
import { action, observable, decorate, computed } from 'mobx'
class GuestStore {
  // @observable
  guests = []

  constructor() {

  }

  cache (guests) {
    if (!Array.isArray(guests)) {
      throw new Error('Must be an array')
    }
    if (guests.length === 0) {
      return
    }
    guests.forEach(guest => {
      if (guest instanceof Guest !== true) {
        throw new Error('Must be an array of guests')
      }
    })

    this.guests = this.guests.concat(guests)
  }

  // @action
  // expects an array of Guests
  add (guests) {

  }

  byId = (id) => {
    return this.guests.find(guest => guest.id === id)
  }

  // @computed
  get currentTotalGuests () {
    return this.guests && this.guests.length
  }
}

decorate(GuestStore, {
  cache: action.bound,
  guests: observable,
  currentTotalGuests: computed,
  add: action.bound,
})

export default GuestStore


