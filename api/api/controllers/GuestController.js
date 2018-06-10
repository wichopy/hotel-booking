/**
 * GuestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // The default api can do this call already by running guest/id/bookings, rewrote it here to show the inner workings.
  'with-booking-history' : async function(req, res) {
    const guest = await Guest.findOne({ id: req.param('id')})
      .populate('bookings')
    res.json(guest)
  },
  total: async (req, res) => {
    const guestCount = await Guest.count({})
    sails.log('Found a total of :' + guestCount)
    return res.json(guestCount)
  },

  'total-visits': async (req, res) => {
    const guest = await Guest.findOne({ id: req.param('id') })
      .populate('bookings')

    const guestVisitCount = guest
      .bookings
      .filter(booking => booking.status === 'confirmed')
      .length

    sails.log(`This guest has visited the hotel ${guestVisitCount} times.`)
    res.json(guestVisitCount)
  }
};

