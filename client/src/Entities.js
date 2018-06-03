import moment from 'moment'
import { extendMoment } from 'moment-range'

const momentRange = extendMoment(moment)

const hasRequiredFields = (fields, entity) => {
  fields.forEach(field => {
    if (!entity[field]) {
      throw new Error(`Missing ${field}.`)
    }
  })
}
export class Guest {
  constructor (guest) {
    hasRequiredFields(this.requiredFields, guest)
    this.id = guest.id
    this.name = guest.name
  }

  requiredFields = ['id']
}

export class Room {
  constructor (room) {
    hasRequiredFields(this.requiredFields, room)
    this.id = room.id
    this.number = room.number
  }

  requiredFields = ['id', 'number']
}

export class Booking {
  constructor (booking) {
    hasRequiredFields(this.requiredFields, booking)
    this.id = booking.id
    this.checkIn = booking.checkIn
    this.checkOut = booking.checkOut
    this.status = booking.status
    this.guestId = booking.guestId
    this.roomId = booking.roomId
    this.momentRange = momentRange.range(this.checkIn, this.checkOut)
    this.range = Array.from(this.momentRange.by('day')).map(day => day.format('YYYY-MM-DD'))
  }

  requiredFields = ['id', 'status', 'guestId', 'roomId']

  // expects an iso date string
  isInRange(date) {
    return moment(date).within(this.momentRange)
  }

}
