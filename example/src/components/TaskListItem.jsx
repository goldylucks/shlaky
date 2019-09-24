import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'

class Task extends React.Component {
  onToggle() {
    const { id } = this.props
    this.tasks.destroy(id)
  }

  render() {
    const { title } = this.props

    return (
      <ListItem
        style={{ width: '90%' }}
        rightIconButton={
          <div style={{ display: 'flex' }}>
            <IconButton
              tooltip="remove"
              tooltipPosition="bottom-right"
              onClick={this.onClick}
              iconStyle={{ color: red600 }}
            >
              <DeleteIcon />
            </IconButton>
            <Checkbox onCheck={this.onCheck} style={{ marginTop: 12 }} />
          </div>
        }
      >
        <div style={{ display: 'flex' }}>
          <li style={listStyles}>{title}</li>
        </div>
        <Divider />
      </ListItem>
    )
  }
}

export default Task
