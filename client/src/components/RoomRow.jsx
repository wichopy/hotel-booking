import React from 'react'
import DateItem from './DateItem'
const RoomRow = ({ roomNumber, sun, mon, tues, wed, thurs, fri, sat}) => {
  return (
    <div className="row">
      <div className="room-item">{roomNumber}</div>
      <DateItem status={sun} />
      <DateItem status={mon} />
      <DateItem status={tues} />
      <DateItem status={wed} />
      <DateItem status={thurs} />
      <DateItem status={fri} />
      <DateItem status={sat} />
    </div>
  )
}

export default RoomRow
