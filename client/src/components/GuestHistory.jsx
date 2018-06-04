import React from 'react'
// import styled from 'styled-components';

// const GuestHistoryWrapper = styled.div`
//   background-color: light-grey;
// `;

const GuestHistory = ({ name, pastBookings}) => {
  return (
    <div style={{ backgroundColor: 'lightgrey', width: '100%', textAlign: 'left'}}>
      <h2>Guest history</h2>
      <div>Name: {name}</div>
      <div>Total visits: {pastBookings && pastBookings.length}</div>
      <div>
        Past Bookings:
      </div>
        {pastBookings === undefined && <p>LOADING ... </p>}
        {pastBookings && pastBookings.length === 0 && <span>No previous bookigs.</span>}
        {pastBookings && pastBookings.length > 0 && pastBookings.map((booking,i) => {
          return <li key={booking.date + i}>{booking.date} @ {booking.room}</li>
        })}
    </div>
  )
}

export default GuestHistory
