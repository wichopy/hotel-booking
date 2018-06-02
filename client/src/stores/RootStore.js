import { action, observable, decorate, computed } from 'mobx'
import BookingStore from './BookingStore'
import GuestStore from './GuestStore'
import { Guest } from '../Entities'

class RootStore {
  sideBarSelection = 'search'
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
    this.transport.get('api/guests').then(rawGuests => {
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
    return this.guestStore && this.guestStore.currentTotalGuests
  }

  get totalBookings() {
    return this.bookingStore && this.bookingStore.currentTotalBookings
  }

  onSidebarChange = (name) => {
    this.sideBarSelection = name
  }
}

decorate(RootStore, {
  uniqueGuests: computed,
  totalBookings: computed,
  fetchUniqueGuests: action.bound,
  sideBarSelection: observable,
  onSidebarChange: action.bound,
})

export default RootStore
