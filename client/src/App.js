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
    this.props.RootStore.fetchUniqueGuests()
    this.props.RootStore.fetchAllRooms()
  }

  onSidebarClick = (ev) => {
    this.props.RootStore.onSidebarChange(ev.target.name)
  }

  render() {
    const pastBookings = [
      { date: 'Nov 1 2012', room: 103 },
      { date: 'Nov 6 2013', room: 405 },
      { date: 'Nov 23 2014', room: 303 },
      { date: 'Nov 30 2015', room: 203 },
      { date: 'Nov 30 2015', room: 406 },
    ]

    return (
      <div className="App">
        <DevTools/>
        <Header>
          <span>
            <img style={{ height: '100px'}}src={logo} alt="logo"/>
          </span>
        </Header>
        <section>
          Unique guests: {this.props.RootStore.guestStore.currentTotalGuests}
          Total bookings for today: 34/100
          Total bookings for the next month: 2084/3000
        </section>
        <MainContainer>
          <CalendarContainer>
            <h2>Calendar</h2>
            <div className="header">
              <div className="room-header">Room Number</div>
              <div className="date-header">Sunday</div>
              <div className="date-header">Monday</div>
              <div className="date-header">Tuesday</div>
              <div className="date-header">Wednesday</div>
              <div className="date-header">Thursday</div>
              <div className="date-header">Friday</div>
              <div className="date-header">Saturday</div>
            </div>
            <div className="row">
              <div className="room-item">101</div>
              <DateItem status="booked" />
              <div className="date-item">vacant</div>
              <div className="date-item">booked</div>
              <div className="date-item">booked</div>
              <div className="date-item">booked</div>
              <div className="date-item">booked</div>
              <div className="date-item">booked</div>
            </div>
            <RoomRow
              roomNumber="322"
              sun={'booked'}
              mon={'booked'}
              tues={'vacant'}
              wed={'vacant'}
              thurs={'vacant'}
              fri={'vacant'}
              sat={'booked'}
            />
            {this.props.RootStore.roomStore.rooms.map(room => {
              return <RoomRow key={room.id} roomNumber={room.number}/>
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
                name="John Doe"
                totalVisits={pastBookings.length}
                pastBookings={pastBookings}
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
