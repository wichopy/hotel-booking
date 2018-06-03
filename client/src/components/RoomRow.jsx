import React from 'react'
import DateItem from './DateItem'
const RoomRow = ({ room, sun, mon, tues, wed, thurs, fri, sat}) => {
  return (
    <div className="row">
      <div className="room-item">{room.number}</div>
      <DateItem guestAndBooking={sun} room={room}  />
      <DateItem guestAndBooking={mon} room={room}  />
      <DateItem guestAndBooking={tues} room={room} />
      <DateItem guestAndBooking={wed} room={room}  />
      <DateItem guestAndBooking={thurs} room={room}  />
      <DateItem guestAndBooking={fri} room={room}  />
      <DateItem guestAndBooking={sat} room={room}  />
    </div>
  )
}

export default RoomRow
