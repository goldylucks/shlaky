import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'

import { withShlaky } from 'shlaky-client'

class UsersList extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}>
        {this.users.all().map(user => {
          const labelId = `checkbox-list-label-${user._id}`

          return (
            <ListItem key={user.name} role={undefined} dense button>
              <ListItemText id={labelId} primary={user.name} />
              <ListItemSecondaryAction onClick={this.onDelete}>
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

  onDelete = () =>
    global.alert(
      "Hey! you can't just go deleting other users. Who the hell do you think you are eh???"
    )
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

export default withShlaky(UsersList, { styles })
