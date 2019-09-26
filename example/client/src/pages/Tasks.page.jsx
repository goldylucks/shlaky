import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar'
import ListIcon from '@material-ui/icons/List'
import Paper from '@material-ui/core/Paper'

import { withShlaky } from '../shlaky'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

class TasksPage extends React.Component {
  componentDidMount() {
    this.tasks.populate()
  }

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
            <h1 style={{ textAlign: 'center', color: 'grey'}}>Task List</h1>
          </div>
          <div style={{ marginRight: '10%', marginTop: 13 }}>
            <IconButton>
              <ListIcon />
            </IconButton>
          </div>
        </div>

        <TaskList />
        <br />
        <div style={{ marginLeft: '5%' }}>
          <AddTask />
        </div>
        <Snackbar
          message="task deleted"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </Paper>
    )
  }
}

export default withShlaky(TasksPage)
