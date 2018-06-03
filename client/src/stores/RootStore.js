import { action, observable, decorate, computed } from 'mobx'
import BookingStore from './BookingStore'
import GuestStore from './GuestStore'
import RoomStore from './RoomStore'
import { Guest, Room } from '../Entities'

// Note: Annotating decorators in comments to reduce complexity in configuration.
// Decorators currently aren't an approved standard and requires config in babel to enable their use.
// To see the decorators for each Store, consult the decorate function at the bottom of each file before the export.
class RootStore {
  // @observable
  sideBarSelection = 'search'
  constructor(transport) {
    this.transport = transport
    this.guestStore = new GuestStore()
    this.bookingStore = new BookingStore()
    this.roomStore = new RoomStore()
  }

  fetchAll = () => {
    this.fetchUniqueGuests()
    this.fetchTotalBookings()
  }

  // @action
  fetchUniqueGuests = () => {
    this.transport.get('api/guests').then(rawGuests => {
      const guests = rawGuests.map(guest => {
        return new Guest(guest)
      })
      this.guestStore.add(guests)
    })
  }

  // @action
  fetchAllRooms = () => {
    this.transport.get('api/rooms').then(rawRooms => {
      const rooms = rawRooms.map(room => {
        return new Room(room)
      })
      this.roomStore.add(rooms)
    })
  }

  fetchTotalBookings = () => {
    this.transport.get()
  }

  // @computed
  get uniqueGuests() {
    return this.guestStore && this.guestStore.currentTotalGuests
  }

  // @computed
  get totalBookings() {
    return this.bookingStore && this.bookingStore.currentTotalBookings
  }

  // @action
  onSidebarChange = (name) => {
    this.sideBarSelection = name
  }
}

decorate(RootStore, {
  uniqueGuests: computed,
  totalBookings: computed,
  fetchUniqueGuests: action.bound,
  fetchAllRooms: action.bound,
  sideBarSelection: observable,
  onSidebarChange: action.bound,
})

export default RootStore
