/**
 * BookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
const MomentRange = require('moment-range')
const momentRange = MomentRange.extendMoment(moment)

module.exports = {

  // This is a re implementation of the create endpoint to understand the inner workings on the default create endpoint with some extra logic that neesd to be checked when creating a new booking.
  // Could also create using url params, eg: http://localhost:1337/booking/create?status=confirmed&guest=1&room=1&checkIn=2018-06-03&checkout=2018-06-04
  new: async function(req, res) {
    const checkIn = req.param('checkIn')
    const checkOut = req.param('checkOut')
    // TODO: Verify the room the user is trying to book is available.
    // const roomAvailability = await Booking.find({
    //     checkIn: { '>=': new Date(moment(checkIn).toISOString()), '<=': new Date(moment(checkOut).toISOString()) },
    //     checkOut: { '>=': new Date(moment(checkIn).toISOString()), '<=': new Date(moment(checkOut).toISOString()) },
    // })

    // console.log('room availability:', roomAvailability)

    const guest = await Guest
      .findOne({
        id: req.param('guest')
      })

    if (!guest) {
      return res.notFound('Could not find guest')
    }

    const room = await Room
      .findOne({
        id: req.param('room')
      })

    if (!room) {
      return res.notFound('Could not find room')
    }

    const initialValues = {
      checkIn: moment(checkIn).toISOString(),
      checkOut: moment(checkOut).toISOString(),
      status: req.param('status'),
      guest: guest.id,
      room: room.id,
    }

    const booking = await Booking.create(initialValues).fetch()
    return res.json(booking)

  },

  total: async (req, res) => {
    const type = req.param('type')
    let count
    if (type) {
      count = await Booking.count({ status: type })
    } else {
      count = await Booking.count({})
    }

    sails.log(`Found ${type ? type : 'all'} bookings total of : + ${count}`)
    return res.json(count)
  },
};

