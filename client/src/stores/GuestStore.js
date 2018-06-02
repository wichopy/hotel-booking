import { Guest } from '../Entities'
import { action, observable, decorate, computed } from 'mobx'
class GuestStore {
  //
  guests = []

  constructor() {

  }

  // expects an array of Guests
  add (guests) {
    if (!Array.isArray(guests)) {
      throw new Error('Must be an array')
    }
    if (guests.length === 0) {
      throw new Error('Cannot be an empty array')
    }
    guests.forEach(guest => {
      if (guest instanceof Guest !== true) {
        throw new Error('Must be an array of guests')
      }
    })

    this.guests = this.guests.concat(guests)
    console.log(this.guests)
  }

  get currentTotalGuests () {
    return this.guests && this.guests.length
  }
}

decorate(GuestStore, {
  guests: observable,
  currentTotalGuests: computed,
})

export default GuestStore


