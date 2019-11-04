import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People'
import Paper from '@material-ui/core/Paper'
import { withShlaky } from 'shlaky-client'

import UsersList from '../components/UsersList'

class UsersPage extends React.Component {
  render() {
    return (
      <Paper
        style={{
          paddingBottom: '20px',
          marginTop: 100,
          marginBottom: 100,
          marginRight: 20,
          marginLeft: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <div style={{ marginLeft: '44%' }}>
            <h1 style={{ textAlign: 'center', color: 'grey'}}>Users List</h1>
          </div>
          <div style={{ marginRight: '10%', marginTop: 13 }}>
            <IconButton>
              <PeopleIcon />
            </IconButton>
          </div>
        </div>

        <UsersList />
        <br />
      </Paper>
    )
  }
}

export default withShlaky(UsersPage)
