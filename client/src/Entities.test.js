import { Booking } from './Entities'
import moment from 'moment'

const booking = new Booking({
  id: 'af3va',
  checkIn: '2018-01-01',
  checkOut: '2018-01-03',
  status: 'confirmed',
  guestId: 1,
  roomId: 1,
})

describe('Booking', () => {
  it('should instantiate a Booking', () => {
    expect(booking instanceof Booking).toEqual(true)
    expect(booking.checkIn).toEqual('2018-01-01')
    expect(booking.checkOut).toEqual('2018-01-03')
    expect(booking.range).toEqual([
      '2018-01-01',
      '2018-01-02',
      '2018-01-03',
    ])
  })

  it('can determine if a date is in its range', () => {
    expect(booking.isInRange('2018-01-01')).toEqual(true)
  })

  it('can determine if a date is not in its range', () => {
    expect(booking.isInRange('2018-01-06')).toEqual(false)
  })
})
