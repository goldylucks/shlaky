import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { withShlaky } from '../shlaky'

class AddTask extends React.Component {
  state = { taskInput: '' }
  onSubmit = evt => {
    evt.preventDefault()
    const { taskInput } = this.state
    if (taskInput === '') return
    var form = document.getElementById('myForm')
    form.reset()
    this.tasks.add({ title: taskInput })
    this.setState({ taskInput: '' })
  }

  render() {
    return (
      <div>
        <form id="myForm" onSubmit={this.onSubmit}>
          <Paper style={{ width: '90%', leftMargin: '15px' }}>
            <div style={{ marginLeft: '10px' }}>
              <TextField
                className="AddText"
                fullWidth
                onChange={evt => this.setState({ taskInput: evt.target.value })}
              ></TextField>
            </div>
          </Paper>
          <br />
          <Button type="submit" color="primary">Add task</Button>
        </form>
      </div>
    )
  }
}

export default withShlaky(AddTask)
