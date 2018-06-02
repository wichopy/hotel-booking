import { action, observable, decorate, computed } from 'mobx'
import BookingStore from './BookingStore'
import GuestStore from './GuestStore'
import { Guest } from '../Entities'

class RootStore {
  constructor(transport) {
    this.transport = transport
    this.guestStore = new GuestStore()
    this.bookingStore = new BookingStore()
  }

  fetchAll = () => {
    this.fetchUniqueGuests()
    this.fetchTotalBookings()
  }

  fetchUniqueGuests = () => {
    this.transport.get().then(rawGuests => {
      const guests = rawGuests.map(guest => {
        return new Guest(guest)
      })
      this.guestStore.add(guests)
    })
  }

  fetchTotalBookings = () => {
    this.transport.get()
  }

  get uniqueGuests() {
    return this.guestStore.currentTotalGuests
  }

  get totalBookings() {
    return this.bookingStore.currentTotalBookings
  }
}

decorate(RootStore, {
  uniqueGuests: computed,
  totalBookings: computed,
  fetchUniqueGuests: action.bound,
})

export default RootStore
