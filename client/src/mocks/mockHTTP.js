const mockHTTP = {
  get: (endpoint) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        let result
        switch (endpoint) {
          case 'api/guests':
            result = [
              { id: 1, name: 'John'},
              { id: 2, name: 'Bob'},
              { id: 3, name: 'Rebecca'},
              { id: 4, name: 'Emily' },
            ]
            break;
          case 'api/rooms':
            result = [
              { id: 1,   number: 101 },
              { id: 2,   number: 102 },
              { id: 3,   number: 103 },
              { id: 4,   number: 104 },
              { id: 5,   number: 201 },
              { id: 6,   number: 202 },
              { id: 7,   number: 203 },
              { id: 8,   number: 204 },
              { id: 9,   number: 301 },
              { id: 10,  number: 302 },
              { id: 11,  number: 303 },
              { id: 12,  number: 304 },
            ]
            break;
          case 'api/bookings/?guest=1':
            result = [
                { date: 'Nov 1 2012', room: 103 },
                { date: 'Nov 6 2013', room: 405 },
                { date: 'Nov 23 2014', room: 303 },
                { date: 'Nov 30 2015', room: 203 },
                { date: 'Nov 30 2015', room: 406 },
            ]
            break;
          case 'api/bookings/?guest=4':
            result = [
                { date: 'Nov 1 2012', room: 101 },
                { date: 'Nov 2 2013', room: 405 },
            ]
            break;
          case 'api/bookings':
            result = [
              {
                id: 'af3va',
                checkIn: '2018-06-01',
                checkOut: '2018-06-04',
                status: 'confirmed',
                guestId: 1,
                roomId: 1,
              },
              {
                id: 'bac34',
                checkIn: '2018-06-02',
                checkOut: '2018-06-03',
                status: 'cancelled',
                guestId: 4,
                roomId: 3,
              }
            ]
            break;
          default:
            result = []
        }
        return res({ data: result })
      }, 500)
    })
  }
}

export default mockHTTP
