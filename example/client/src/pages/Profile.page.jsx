import React from 'react'

class ProfilePage extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.currentUser.get().email}
          onChange={handleChange('name')}
          margin="normal"
          fullWidth
        />
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          fullWidth
        />
      </div>
    )
  }
}
