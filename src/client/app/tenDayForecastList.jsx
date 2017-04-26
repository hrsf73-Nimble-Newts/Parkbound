import React from 'react';
// import TenDayForecastListItem from './tenDayForecastListItem.jsx'

const TenDayForecastList = (props) => {
  return (
    <table>
    <thead>
      <tr>
      <th className='weatherHeader' colSpan='4'>Ten Day Forecast</th>
      </tr>
      </thead>
      <tbody>
      <tr>
    {props.tenDayForecast.map((dayForecast, index) => {
        return (<td><img src={dayForecast.icon_url}/></td>)
      })}
    </tr>
      <tr>
    {props.tenDayForecast.map((dayForecast, index) => {
        return (<td>{dayForecast.date.weekday}</td>)
      })}
    </tr>
      <tr>
    {props.tenDayForecast.map((dayForecast, index) => {
        return (<td>{`${dayForecast.high.fahrenheit}°F/${dayForecast.low.fahrenheit}°F`}</td>)
      })}
    </tr>
    </tbody>
    </table>
    )
};

export default TenDayForecastList;