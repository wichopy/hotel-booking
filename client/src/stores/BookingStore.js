class BookingStore {
  bookings = []
  constructor() {

  }

  // expect an array
  add () {

  }

  remove () {

  }

  edit () {

  }

  get currentTotalBookings () {
    return this.bookings.length
  }
}

export default BookingStore

class Booking {
  date
  roomNumber
  guestId
}
