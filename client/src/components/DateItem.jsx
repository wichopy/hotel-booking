import React from 'react'
import styled from 'styled-components'

const DateItemDiv = styled.div`
  width: 12%;
  cursor: pointer;
  background: purple;
  border: 1px solid black;
`;

const DateItem = ({ status, name }) => {
  return (
    <DateItemDiv>
      Status: {status}
      { name && <span>{name}</span> }
    </DateItemDiv>
  )
}

export default DateItem
