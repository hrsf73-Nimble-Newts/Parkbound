var data = require('./ourNationalParks.js')
var fetch = require('node-fetch')

let parks = data.ourNationalParks

var pg = require('pg')
pg.defaults.ssl = true;
forecasts = [];

const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
pgp.pg.defaults.ssl = true;

let db = pgp('postgres://vapabobdrxlaco:c73e2ac093866955891b405a00186a4e45deb6fa00cfa23f7d2a6a6e28020297@ec2-54-225-182-108.compute-1.amazonaws.com:5432/d603o0tkht6u79');

db.query('DROP TABLE IF EXISTS forecast')
.then(function () {
	return db.query(' \
				CREATE TABLE IF NOT EXISTS forecast ( \
				id SERIAL PRIMARY KEY, \
				conditions VARCHAR(255), \
				park_id INT references parks(id), \
				high DOUBLE PRECISION, \
				date VARCHAR(255) \
				); \
			')
		}).then(function () {
			// getForecasts(parks.length-1)
			setIntervalX(getForecast, 500, parks.length+1)
		})

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = setInterval(function () {

       callback(x);

       if (++x === repetitions) {
           clearInterval(intervalID);
       }
    }, delay);
}

var getForecast = function(i) {
	if (i>parks.length-1) {
		console.log('i <0, forecast.length = ', forecasts.length, 'parks.length: ', parks.length)
		storeForecasts(forecasts)
	} else {
		let parkcode = parks[i].parkcode; 
		console.log('fetchin with parkcode: ', parkcode)
		fetch('http://api.wunderground.com/api/' + 'b8f5e3ff6275a5a9'+ '/forecast10day/q/'
	        	+ parks[i].latitude + ',' + parks[i].longitude + '.json').then(function(response) {
	        		return response.json()
	        	}).then(function(response) {
	        		 forecasts.push([response.forecast.simpleforecast.forecastday, parkcode])
	        	})
	        	
	        }
}



var storeForecasts = function(forecasts) {
		for (var j = 0; j<forecasts.length; j++) {
			let forecast = forecasts[j][0];
			let parkCode = forecasts[j][1]
			for (var i = 0; i<forecast.length; i++) {
				let queryParameters = [parkCode, forecast[i].high.fahrenheit, forecast[i].conditions, forecast[i].date.weekday]
		    	let q = 'INSERT INTO forecast (park_id, high, conditions, date) VALUES ((SELECT id FROM parks WHERE parkcode=$1), $2, $3, $4)'
		  		console.log('querying with: ', parkCode, queryParameters);
			    db.query(q, queryParameters)
			}
		}
}




// pg.connect('postgres://vapabobdrxlaco:c73e2ac093866955891b405a00186a4e45deb6fa00cfa23f7d2a6a6e28020297@ec2-54-225-182-108.compute-1.amazonaws.com:5432/d603o0tkht6u79', function(err, client) {
// 	  		if (err) throw err;
// 	  		console.log('Connected to postgres! Getting schemas...');

// 		  	client
// 		    .query('SELECT * FROM forecast')
// 		    .on('row', function(row) {
// 		      console.log(JSON.stringify(row));
// 		    });
// 		});


