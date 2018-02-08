import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
    appbar: {
        margin: 0
    }
}

export default class Header extends Component {
  render() {
      return (
        <AppBar style={styles.appbar} position="static">
            <Toolbar>
            <Typography variant="title" color="inherit">
                {this.props.title}
            </Typography>
            </Toolbar>
        </AppBar>
      );
  }
}