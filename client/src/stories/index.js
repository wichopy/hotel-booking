import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import GuestHistory from '../components/GuestHistory'
storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

  storiesOf('Guest History', module)
    .add('with previous booking history', () => {
      const pastBookings = [
        { date: 'Nov 1 2012', room: 103 },
        { date: 'Nov 6 2013', room: 405 },
        { date: 'Nov 23 2014', room: 303 },
        { date: 'Nov 30 2015', room: 203 },
        { date: 'Nov 30 2015', room: 406 },
      ]
      return <GuestHistory
        name="John Doe"
        totalVisits={pastBookings.length}
        pastBookings={pastBookings}
      />
    })
    .add('without previous booking history', () => {
      const pastBookings = []
      return <GuestHistory
        name="John Doe"
        totalVisits={pastBookings.length}
        pastBookings={pastBookings}
      />
    })
