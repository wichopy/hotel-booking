import React from 'react'
import styled from 'styled-components'

const DateItemDivBooked = styled.div`
  width: 12%;
  cursor: pointer;
  background-color: #68AB63;
  border: 1px solid black;
`;

const DateItemDivCancelled = styled.div`
  width: 12%;
  cursor: pointer;
  background: red;
  border: 1px solid black;
`;

const DateItemDivVacant = styled.div`
  width: 12%;
  cursor: pointer;
  background: #F3F3F3;
  border: 1px solid black;
`;

const DateItem = ({ guestAndBooking }) => {
  const { guest, booking } = guestAndBooking
  let Wrapper = DateItemDivVacant
  if (booking && booking.status === 'confirmed') {
    Wrapper = DateItemDivBooked
  }

  if (booking && booking.status === 'cancelled') {
    Wrapper = DateItemDivCancelled
  }
  return (
    <Wrapper>
      <p>Status: {(booking && booking.status) || 'vacant'}</p>
      <p>{ guest && guest.name && <span>{guest.name}</span> }</p>
    </Wrapper>
  )
}

export default DateItem
