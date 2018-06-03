import BookingStore from './BookingStore'
import { Booking } from '../Entities'

describe('BookingStore', () => {
  let bookingStore
  beforeEach(() => {
    bookingStore = new BookingStore()
  })

  it('can return the booking giving the date and room', () => {
    const booking1 = new Booking({
      id: 'af3va',
      checkIn: '2018-06-01',
      checkOut: '2018-06-04',
      status: 'confirmed',
      guestId: 1,
      roomId: 1,
    })
    const booking2 = new Booking({
      id: 'bac34',
      checkIn: '2018-06-02',
      checkOut: '2018-06-03',
      status: 'cancelled',
      guestId: 4,
      roomId: 3,
    })
    bookingStore.bookings = [
      booking1,
      booking2,
    ]
    const date = '2018-06-03'
    const roomId = 1
    expect(bookingStore.bookingOnDayInRoom(date, roomId)).toEqual(booking1)
  })
})
