import { action, observable, decorate, computed, transaction, reaction } from 'mobx'
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
  // @observable
  currentDateRange
  // @obserable
  ready = false
  // @obserable
  roomToBook
  // @obserable
  bookOnDate
  // @observable
  guestProfileId
  // @observable
  pastBookings
  constructor(transport) {
    this.transport = transport
    this.guestStore = new GuestStore(this.transport)
    this.bookingStore = new BookingStore(this.transport)
    this.roomStore = new RoomStore(this.transport)

    // TODO: Handle any date. To keep scope narrow, only handle the current week we are on.
    this.currentDateRange = Array.from(
      momentRange.range(
        moment().startOf('isoWeek'),
        moment().endOf('isoWeek')
      ).by('day')
    )
    // When guestProfileId changes, fetch their past bookings
    reaction(
      () => this.guestProfileId,
      (guestId) => {
        this.pastBookings = undefined
        this.fetchGuestBookingHistory(guestId)
      }
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
    return this.transport.get('api/guests').then(res => {
      let rawGuests = res.data
      const guests = rawGuests.map(guest => {
        return new Guest(guest)
      })
      this.guestStore.cache(guests)
    })
  }

  //@action
  fetchGuestBookingHistory = (guestId) => {
    return this.transport.get('api/bookings/?guest=' + guestId).then(res => {
      this.pastBookings = res.data
    })
  }

  // @action
  fetchAllRooms = () => {
    return this.transport.get('api/rooms').then(res => {
      let rawRooms = res.data
      const rooms = rawRooms.map(room => {
        return new Room(room)
      })
      this.roomStore.cache(rooms)
    })
  }

  fetchAllBookings = () => {
    // This should only fetch the bookings for a specific range, the default should be for the current week.
    return this.transport.get('api/bookings').then(res => {
      let rawBookings = res.data
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
        let selected = false
        if (roomId === this.roomToBook && day.format('YYYY-MM-DD') === this.bookOnDate) {
          selected = true
        }
        return {
          date: day.format('YYYY-MM-DD'),
          guest,
          booking,
          selected,
        }
      })
  }

  // @computed
  get uniqueGuests() {
    const uniqueGuestsTable = {}
    this.bookingStore.bookings.forEach(booking => {
      if (!uniqueGuestsTable[booking.guestId]) {
        uniqueGuestsTable[booking.guestId] = 1
      }
    })

    return Object.keys(uniqueGuestsTable).length
  }

  // @computed
  get totalBookings() {
    return this.bookingStore && this.bookingStore.currentTotalBookings
  }

  // @action
  onSidebarChange = (name) => {
    this.sideBarSelection = name
  }

  // @action
  addNewBooking = (roomId, date) => {
    // Prevent multiple renders, state mutations inside of transaction are ignored by observable tracker.
    transaction(() => {
      this.roomToBook = roomId
      this.bookOnDate = date
    })
    this.sideBarSelection = 'bookingForm'
  }

  // @action
  selectGuestProfile = (guestId) => {
    this.guestProfileId = guestId
    this.sideBarSelection = 'guestHistory'
  }

  get selectedGuestName() {
    const selectedGuest = this.guestStore.byId(this.guestProfileId)
    return selectedGuest && selectedGuest.name
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
  currentDateRange: observable,
  roomToBook: observable,
  bookOnDate: observable,
  guestProfileId: observable,
  pastBookings: observable,
  selectedGuestName: computed,
})

export default RootStore
