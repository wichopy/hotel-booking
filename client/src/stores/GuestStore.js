import { Guest } from '../Entities'

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
  }

  get currentTotalGuests () {
    return this.guests.length
  }
}

export default GuestStore


