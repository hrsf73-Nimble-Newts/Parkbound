import {tenDayForecast} from './actions.js'
import axios from 'axios';


export const getTenDayForecast = (id) => {
  return (dispatch) => {
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