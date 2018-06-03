import React from 'react'
import DateItem from './DateItem'
const RoomRow = ({ roomNumber, sun, mon, tues, wed, thurs, fri, sat}) => {
  return (
    <div className="row">
      <div className="room-item">{roomNumber}</div>
      <DateItem guestAndBooking={sun} />
      <DateItem guestAndBooking={mon} />
      <DateItem guestAndBooking={tues} />
      <DateItem guestAndBooking={wed} />
      <DateItem guestAndBooking={thurs} />
      <DateItem guestAndBooking={fri} />
      <DateItem guestAndBooking={sat} />
    </div>
  )
}

export default RoomRow
