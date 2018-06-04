import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import DateItem from './components/DateItem'
import GuestHistory from './components/GuestHistory'
import RoomRow from './components/RoomRow'

import logo from './hotel-alfred.png'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

// Grid container.
const MainContainer = styled.div`
  padding: 1em;
  width: 100%;
  background-color: #7064AD;
  display: grid;
  color: e3e3e3;
  grid-template-columns: [first] auto [line2] 300px [end];
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

// Grid Item
const CalendarContainer = styled.div`
grid-column-start: first;
grid-column-end: line2;
grid-row-start: row1-start;
grid-row-end: row1-end;
`;

// Grid Item
const SidebarContainer = styled.div`
grid-column-start: line2;
grid-column-end: end;
grid-row-start: row1-start;
grid-row-end: row1-end;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: #32248a;
  text-align: center;
`;

class App extends Component {
  componentDidMount() {
    // Gather all the datas
    this.props.RootStore.fetchAll()
  }
  calendarHeaderFormat = 'ddd MMM DD'
  onSidebarClick = (ev) => {
    this.props.RootStore.onSidebarChange(ev.target.name)
  }

  render() {
    return (
      <div className="App">
        <DevTools/>
        <Header>
          <span>
            <img style={{ height: '100px'}}src={logo} alt="logo"/>
          </span>
        </Header>
        <section>
          Unique guests: {this.props.RootStore.uniqueGuests}
          Total overall bookings: {this.props.RootStore.bookingStore.currentTotalBookings}
        </section>
        <MainContainer>
          <CalendarContainer>
            <h2>Calendar</h2>
            <div className="header">
              <div className="room-header">Room Number</div>
              {
                this.props.RootStore.currentDateRange && this.props.RootStore.currentDateRange.map((date, i) => {
                  return <div key={i} className="date-header">{date.format(this.calendarHeaderFormat)}</div>
                })
              }
            </div>
            {this.props.RootStore.ready && this.props.RootStore.roomStore.rooms.map(room => {
              let bookings = this.props.RootStore.bookingsAndGuestsForRoomByWeek(room.id)
              return <RoomRow
                key={room.id}
                room={room}
                sun={bookings[0]}
                mon={bookings[1]}
                tues={bookings[2]}
                wed={bookings[3]}
                thurs={bookings[4]}
                fri={bookings[5]}
                sat={bookings[6]}
              />
            })}
          </CalendarContainer>
          <SidebarContainer>
            <span>
              <button name="search" onClick={this.onSidebarClick}> Search rooms</button>
              <button name="guestHistory" onClick={this.onSidebarClick}>Guest Profile</button>
              <button name="bookingForm" onClick={this.onSidebarClick}>Booking form</button>
            </span>
            {
              this.props.RootStore.sideBarSelection === "search" &&
              <span>Search</span>
            }
            { this.props.RootStore.sideBarSelection === "guestHistory" &&
              <GuestHistory
                name={this.props.RootStore.selectedGuestName}
                pastBookings={this.props.RootStore.pastBookings}
              />
            }
            {
              this.props.RootStore.sideBarSelection === "bookingForm" &&
              <span>Book form here</span>
            }
          </SidebarContainer>
        </MainContainer>
        <pre>{JSON.stringify(this.props.RootStore, null, 2)}</pre>
      </div>
    );
  }
}

export default inject('RootStore')(observer(App));
