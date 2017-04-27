import React from 'react';
import axios from 'axios';
import {individualPark} from '../reducers/getParkReducer.js'
import {getPark} from '../actions/getPark.js';
import {connect} from 'react-redux'
import {getCampgrounds} from '../actions/getCampgrounds.js'
import ParkMapView from './singlePageMapView.jsx';
import WeatherForecast from './tenDayForecastList.jsx'
import ActivitiesList from './activitiesList.jsx';
import SinglePageNavBar from './singlePageNavBar.jsx';
import {getTenDayForecast} from '../actions/getTenDayForecast.js';
import {getLodging} from '../actions/getLodging.js';
import {getDistance} from '../actions/getDistance.js';
import {getTrails} from '../actions/getTrails.js';
import {Link} from 'react-router-dom'
import {Message, Container, Divider, Grid} from 'semantic-ui-react'
import HistoricalWeatherDropdown from './historicalWeatherDataDropDown.jsx'
import NavBar from './NavBar.jsx';
import UnconnectedTrailList from './UnconnectedTrailList.jsx';
import ConnectedTrailList from './ConnectedTrailList.jsx';


class ParkView extends React.Component {
  componentWillMount() {
    this.props.getPark(this.props.match.params.code)
    .then((result) => {
      this.props.getCampgrounds(result[1][0].id)
      return result
    }).then((result) => {
      this.props.getLodging(result[1][0].latitude, result[1][0].longitude)
      return result
    }).then((result) => {
      this.props.getTenDayForecast(result[1][0].latitude, result[1][0].longitude)
      return result
    }).then((result) => {
      this.props.getTrails(result[1][0].id)
      return result;
    }).then((result) => {
      this.props.getDistance();
    })
  }
  render() {
    return(
      <div>
        {this.props.park && <div> <NavBar parks={this.props.parks} />
        <ParkMapView parkCode = {this.props.match.params.code} id = {this.props.park[1][0].id} lat={this.props.park[1][0].latitude} lon={this.props.park[1][0].longitude} campgrounds={this.props.campgrounds} lodgings={this.props.lodgings}/>
        <h1 className='parkname'>{this.props.park[1][0].name}</h1>
        <Container fluid>
        <Grid columns={2} relaxed>
        <Grid.Column>
        <Message>
           <Message.Header>
           Park Description
           </Message.Header>
        <h3>{this.props.park[1][0].description}</h3>
        </Message>
        </Grid.Column>
        <Grid.Column>
        <ActivitiesList activities={this.props.park[0]}/>
        </Grid.Column>
        </Grid>
        </Container>
        <Container fluid>
        { this.props.tenDayForecast && <WeatherForecast tenDayForecast={this.props.tenDayForecast} />}
        </Container>
        <Container>
        {this.props.trails !== undefined && this.props.trails.length !== 0  && this.props.distance === '' && <UnconnectedTrailList trails={this.props.trails} />}
        {this.props.trails !== undefined && this.props.trails.length !== 0  && this.props.distance !== '' && <ConnectedTrailList distance={this.props.distance} trails={this.props.trails} />}
        </Container>
        <Container>
        Put places here
        </Container>
            <div>
            <HistoricalWeatherDropdown />
            </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      park: state.individualPark.individualPark,
      campgrounds: state.getCampgrounds.campgrounds,
      tenDayForecast: state.getTenDayForecast.tenDayForecast,
      lodgings: state.getLodging.lodging,
      trails: state.getTrails.trails,
      distance: state.getDistance.distance
    }
  }

const mapDispatchToProps = (dispatch) => {
  return {
    getPark: (code) => dispatch(getPark(code)),
    getCampgrounds: (id) => dispatch(getCampgrounds(id)),
    getTenDayForecast: (latitude, longitude) => dispatch(getTenDayForecast(latitude, longitude)),
    getLodging: (latitude, longitude) => dispatch(getLodging(latitude, longitude)),
    getTrails: (id) => dispatch(getTrails(id)),
    getDistance: () => dispatch(getDistance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkView);

