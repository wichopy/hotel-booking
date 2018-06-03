import { observable, action, computed, decorate } from 'mobx'
import { Booking } from '../Entities'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

class BookingStore {
  // The bookings for the current time range, default is a week.
  bookings = []
  // A Map as keys will be added dynamically.
  bookingsByWeek = new Map()

  constructor() {

  }

  // @action
  cache (bookings) {
    if (!Array.isArray(bookings)) {
      throw new Error('Must be an array')
    }
    if (bookings.length === 0) {
      return
    }
    bookings.forEach(booking => {
      if (booking instanceof Booking !== true) {
        throw new Error('Must be an array of bookings')
      }
    })

    this.bookings = this.bookings.concat(bookings)
  }

  // expect an array
  add () {
    // Add a new booking to server
  }

  remove () {

  }

  edit () {
    // Edit an existing booking
  }

  get currentTotalBookings () {
    return this.bookings.length
  }

  bookingOnDayInRoom(day, roomId) {
    return this.bookings.find(booking => {
      return (
        booking.isInRange(day) &&
        booking.roomId === roomId
      )
    })
  }

  bookingsForGuest(guestId) {
    return this.bookings.filter(booking => booking.guestId === guestId)
  }
}

decorate(BookingStore, {
  bookings: observable,
  add: action.bound,
  cache: action.bound,
})

export default BookingStore
