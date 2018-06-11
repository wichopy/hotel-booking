/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Moment = require('moment')
const MomentRange = require('moment-range')
const momentRange = MomentRange.extendMoment(Moment)

module.exports = {

  // Given either a date range or a date, check all the bookings inside of a room to see if there are any conflicts.
  // If there are no conflicts, the room will get `availability: 'available'` added to its properties.
  // If there are conflicts, the room will get `availability: 'conflict'` added to its properties.
  availability: async (req, res) => {
    let bookingConflictFinder

    if (req.param('date')) {

      const date = Moment(req.param('date'))

      bookingConflictFinder = booking => {
        const rangeOfBooking = momentRange.range(booking.checkIn, booking.checkOut)

        return !date.within(rangeOfBooking)
      }

    } else if (req.param('checkIn') && req.param('checkOut')) {

      const rangeToCheck = momentRange.range(req.param('checkIn'), req.param('checkOut'))

      bookingConflictFinder = booking => {
        const rangeOfBooking = momentRange.range(booking.checkIn, booking.checkOut)

        return !rangeOfBooking.overlaps(rangeToCheck)
      }

    }

    const allRooms = await Room.find({}).populate('bookings')

    const roomsWithAvailabilityStatus = allRooms.map(room => {
      const roomWithoutConflicts = room.bookings.filter(bookingConflictFinder)

      delete room.bookings

      if (roomWithoutConflicts.length !== 0) {
        return {...room, availability: 'available' }
      } else {
        return {...room, availability: 'conflict' }
      }
    })

    return res.json(roomsWithAvailabilityStatus)

  }


};

