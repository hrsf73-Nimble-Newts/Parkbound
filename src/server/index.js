const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../db/index.js');
const data = require('../../data/ourNationalParks.js');
const filters = require('./handlers/filtersRequestHelper.js')
const individualParkData = require('../db/models/getIndividualParksInfo.js');
const tenDayForecast = require('./handlers/weatherHandlers/tenDayForecastHandler.js')
const campgroundsData = require('../db/models/getCampgroundsInfo.js');

app.use('/', express.static(path.join(__dirname, '../client/public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/parks', (req, res) => {
	db.db.query('SELECT * from parks')
	.then((result) => {
		res.status(201).send(result)
	})
	.catch((err) => {
		res.send(data.ourNationalParks)
		// res.status(404).send(err + 'there was an error');
	})
})

app.post('/api/park/tenDayForecast', tenDayForecast.getForecast);
	// res.send(data.ourNationalParks);
});

app.get('/api/park/', (req, res) => {
	individualParkData(req.query.parkcode)
	.then((data) => {
		let park = data;
		res.status(200).send(data);
	})
})

app.get('/api/campgrounds', (req, res) => {
	campgroundsData(req.query.parkId)
	.then((data) => {
			res.status(203).send(data)
	})
})

app.get('/filterparks', (req, res) => {
	filters.activities(req.query.filteredActivities).then((response) => {
		res.status(200).send(response);
	})
})

app.get('*', (req, res) => {
	res.redirect('/');
})

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;
