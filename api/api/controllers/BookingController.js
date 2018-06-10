/**
 * BookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')

module.exports = {

  // This is a re implementation of the create endpoint to understand the inner workings on the default endpoints for each model.
  new: async function(req, res) {

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
      checkIn: req.param('checkIn'),
      checkOut: req.param('checkOut'),
      status: req.param('status'),
      guest: guest.id,
      room: room.id,
    }
    const booking = await Booking.create(initialValues).fetch()
    return res.json(booking)

  }
};

