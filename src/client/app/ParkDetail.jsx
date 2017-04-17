import React from 'react';
import Axios from 'axios';
import ParkMapView from './singlePageMapView.jsx';
import WeatherForecast from './tenDayForecastList.jsx'
import ActivitiesList from './activitiesList.jsx';
import {Link} from 'react-router-dom'
// import Climate from 
class ParkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenDayForecast: null,
      climate: null,
      lodgings: null
    }
    this.getTenDayForecast = this.getTenDayForecast.bind(this);
    // this.getMonthlyClimate = this.getMonthlyClimate.bind(this);
    let climate = null;
  }

  componentDidMount() {
    this.getTenDayForecast(this.props.park.latitude, this.props.park.longitude);
    Axios.get('/api/park/lodgings', {
      params: {
        lat: this.props.park.latitude,
        lon: this.props.park.longitude
      }
    })
    .then(res => {
      this.setState({lodgings: res.data});
    })
    .catch(err => console.log(err));
  }

  getTenDayForecast(latitude, longitude) {
    let config = {
      url: '/api/park/tenDayForecast',
      method: 'post',
      data: {
        latitude: latitude,
        longitude: longitude
      }
    }
    return Axios(config)
    .then(data => {
      this.setState({tenDayForecast: data['data']['simpleforecast']['forecastday']})
    })
    .catch(err => {
      console.log(err);
    })
  }

  getMonthlyClimate(latitude, longitude) {
    let config = {
      url: '/api/park/climate',
      method: 'post',
      data: {
        latitude: latitude,
        longitude: longitude,
        date: climate
      }
    }
    return Axios(config)
    .then(data => {
      this.setState({climate: data['data']})
    })
    .catch(err => {
      console.log(err);
    })
  }
  render() {
    return(
      <div>
        <ParkMapView lat={this.props.park.latitude} lon={this.props.park.longitude} campgrounds={this.props.campgrounds} lodgings={this.state.lodgings}/>
           <h1 className='parkname'>{this.props.park.name}</h1>
        <h3>{this.props.park.description}</h3>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
          <ActivitiesList activities={this.props.activities}/> 
            </div>
            <div className='col-md-6'>
        { this.state.tenDayForecast && <WeatherForecast tenDayForecast={this.state.tenDayForecast} />}
            </div>
          </div>
        </div>
        <Link to='/'><h1>HOME</h1></Link>
      </div>
    );
  }
}

export default ParkDetail;