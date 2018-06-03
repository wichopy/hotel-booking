import { action, observable, decorate, computed } from 'mobx'
import BookingStore from './BookingStore'
import GuestStore from './GuestStore'
import RoomStore from './RoomStore'
import { Guest, Room, Booking } from '../Entities'
import moment from 'moment'
import { extendMoment } from 'moment-range'

const momentRange = extendMoment(moment)

// Note: Annotating decorators in comments to reduce complexity in configuration.
// Decorators currently aren't an approved standard and requires config in babel to enable their use.
// To see the decorators for each Store, consult the decorate function at the bottom of each file before the export.
class RootStore {
  // @observable
  sideBarSelection = 'search'
  currentDateRange
  ready = false
  constructor(transport) {
    this.transport = transport
    this.guestStore = new GuestStore(this.transport)
    this.bookingStore = new BookingStore(this.transport)
    this.roomStore = new RoomStore(this.transport)

    this.currentDateRange = Array.from(
      momentRange.range(
        moment().startOf('isoWeek'),
        moment().endOf('isoWeek')
      ).by('day')
    )
  }

  fetchAll = () => {
    Promise.all([
      this.fetchAllGuests(),
      this.fetchAllBookings(),
      this.fetchAllRooms(),
    ]).then(res => {
      this.ready = true
    })
  }

  // @action
  fetchAllGuests = () => {
    return this.transport.get('api/guests').then(rawGuests => {
      const guests = rawGuests.map(guest => {
        return new Guest(guest)
      })
      this.guestStore.cache(guests)
    })
  }

  // @action
  fetchAllRooms = () => {
    return this.transport.get('api/rooms').then(rawRooms => {
      const rooms = rawRooms.map(room => {
        return new Room(room)
      })
      this.roomStore.cache(rooms)
    })
  }

  fetchAllBookings = () => {
    // This should only fetch the bookings for a specific range, the default should be for the current week.
    return this.transport.get('api/bookings').then(rawBookings => {
      const bookings = rawBookings.map(booking => {
        return new Booking(booking)
      })
      this.bookingStore.cache(bookings)
    })
  }

  guestAndBookingForDayAndRoom(day, roomId) {
    const booking = this.bookingStore.bookingOnDayInRoom(day, roomId)
    let guest
    if (booking) {
      guest = this.guestStore.byId(booking.guestId)
    }
    return {
      booking: booking,
      guest: guest
    }
  }

  bookingsAndGuestsForRoomByWeek(roomId) {
    if (this.ready === false) {
      return []
    }
    return this.currentDateRange
      .map(day => {
        const guestAndBooking = this.guestAndBookingForDayAndRoom(day.format('YYYY-MM-DD'), roomId)
        const { guest, booking } = guestAndBooking
        return {
          date: day.format('YYYY-MM-DD'),
          guest,
          booking,
        }
      })
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
  fetchAllGuests: action.bound,
  fetchAllRooms: action.bound,
  sideBarSelection: observable,
  onSidebarChange: action.bound,
  ready: observable,
})

export default RootStore
