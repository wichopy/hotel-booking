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
            ]
            break;
          case 'api/rooms':
            result = [
              { id: 1, number: 101, status: 'booked'},
              { id: 2, number: 102, status: 'booked'},
              { id: 3, number: 202, status: 'booked'},
              { id: 4, number: 406, status: 'booked'},
            ]
            break;
          case 'api/booking':
            result = [
              {
                id: 'af3va',
                checkIn: '2018-01-01',
                checkOut: '2018-01-08',
                status: 'confirmed',
                guestId: 1,
                roomId: 1,
              }
            ]
          default:
            result = []
        }

        return res(result)
      }, 500)
    })
  }
}

export default mockHTTP
