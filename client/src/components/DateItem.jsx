import React from 'react'
import styled from 'styled-components'

const DateItemDivBooked = styled.div`
  width: 12%;
  cursor: pointer;
  background: #68AB63;
  border: 1px solid black;
`;

const DateItemDivVacant = styled.div`
  width: 12%;
  cursor: pointer;
  background: #F3F3F3;
  border: 1px solid black;
`;

const DateItem = ({ status, name }) => {
  let Wrapper = DateItemDivVacant
  if (status === 'booked') {
    Wrapper = DateItemDivBooked
  }

  return (
    <Wrapper>
      Status: {status || 'vacant'}
      { name && <span>{name}</span> }
    </Wrapper>
  )
}

export default DateItem
