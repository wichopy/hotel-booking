import React from 'react'
import {inject} from 'mobx-react'

class NameSelector extends React.Component{
  render() {
    return <button onClick={(ev) => {
        ev.preventDefault()
        this.props.RootStore.selectGuestProfile(this.props.guest.id)
      }}>
      {this.props.guest && this.props.guest.name}
    </button>
  }
}

export default inject('RootStore')(NameSelector)
