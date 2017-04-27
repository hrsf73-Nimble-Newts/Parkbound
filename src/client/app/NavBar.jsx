import React, { Component } from 'react'
import { Input, Menu, Segment, Label } from 'semantic-ui-react'
import SearchBar from './SearchBar.jsx'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {getDistance} from '../actions/getDistance.js';

class NavBar extends Component {

  componentDidMount(){
    this.props.getDistance()
  }

  render() {
    
    return (
      <div>
        <Menu>
          <Menu.Item name='logo'>Park Bound</Menu.Item>
          <Menu.Item  as={Link} to='/' name='home'>Home</Menu.Item>
          <Menu.Item disabled={this.props.distance > 0} href="/auth/fitbit" > 
            <Label color={(this.props.distance !== '') ?  'green' : 'red'} > 
              {(this.props.distance !== '') ?  'Fitbit Connected' : 'Fitbit Not Connected'}
            </Label>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item >
              <SearchBar />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      distance: state.getDistance.distance
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDistance: () => dispatch(getDistance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);