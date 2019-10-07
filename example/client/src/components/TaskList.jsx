import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { withShlaky } from 'shlaky'

class TaskList extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}>
        {this.tasks.all().map(task => {
          const labelId = `checkbox-list-label-${task._id}`

          return (
            <ListItem
              key={task._id}
              role={undefined}
              dense
              button
              onClick={() => this.toggle(task._id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.isDone}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.title} />
              <ListItemSecondaryAction
                onClick={this.registerOnDelete(task._id)}
              >
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    )
  }

  toggleTask(id) {
    this.tasks.update(id)
  }

  registerOnDelete = id => {
    return () => this.tasks.destroy(id)
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

export default withShlaky(TaskList, { styles })
