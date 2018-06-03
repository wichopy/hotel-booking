import React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'
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

const DateItemDivVacantSelect = styled.div`
  width: 12%;
  cursor: pointer;
  background: #F3F3F3;
  border: 5px solid blue;
`;

const DateItem = ({ guestAndBooking, room, RootStore }) => {
  const { guest, booking, date, selected } = guestAndBooking
  let Wrapper = DateItemDivVacant

  if (booking && booking.status === 'confirmed') {
    Wrapper = DateItemDivBooked
  }

  if (booking && booking.status === 'cancelled') {
    Wrapper = DateItemDivCancelled
  }

  if (selected) {
    Wrapper = DateItemDivVacantSelect
  }
  return (
    <Wrapper onClick={!booking && (() => { RootStore.addNewBooking(room.id, date)}) }>
      <p>Status: {(booking && booking.status) || 'vacant'}</p>
      <p>{ guest && guest.name && <span>{guest.name}</span> }</p>
    </Wrapper>
  )
}

export default inject('RootStore')(DateItem)
