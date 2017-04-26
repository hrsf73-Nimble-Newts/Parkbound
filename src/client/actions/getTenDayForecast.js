import {tenDayForecast} from './actions.js'
import axios from 'axios';


export const getTenDayForecast = (id) => {
  return (dispatch) => {
    console.log('getting forecast with id: ', id)
    let config = {
    url: '/api/park/tenDayForecast',
    method: 'post',
    data: {
      id: id
    }
  }
  axios(config)
    .then((forecast) => {
      dispatch(tenDayForecast(forecast))
      })
    .catch(err => {
      console.log(err);
    })
  }
}