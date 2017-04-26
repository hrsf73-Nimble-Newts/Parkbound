const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const pgSession = require('connect-pg-simple')(session);

const db = require('../db/index.js');
const data = require('../../data/ourNationalParks.js');
const filters = require('./handlers/filtersRequestHelper.js')
const individualParkData = require('../db/models/getIndividualParksInfo.js');
const tenDayForecast = require('./handlers/weatherHandlers/tenDayForecastHandler.js')
const googleHelpers = require('./handlers/gHelpers.js')
const campgroundsData = require('../db/models/getCampgroundsInfo.js');
const trails = require('../db/models/getTrailsInfo.js');
const forecast = require('../db/models/getForecast.js');
const sendEmail = require('./handlers/emailHandler.js');
const getHistoricalData = require('./handlers/weatherHandlers/historicalWeatherData.js')

const app = express();

const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(keySecret);

app.use('/', express.static(path.join(__dirname, '../client/public')));

app.use(session({
	store: new pgSession({
		pg: db.pgp.pg,
		conString: process.env.DATABASE_URL || db.connection
	}),
	secret: 'Victoria\'s',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: new Date(Date.now() + 600000) }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/sendEmail', sendEmail);

app.get('/api/shoppingcart', function(req, res, next) {
  console.log('get api shoppingcart received!!!')
  res.status(200).send(req.session.shoppingcart)
});

app.post('/api/shoppingcart', function(req, res, next) {
  req.session.shoppingcart = req.body.params
  console.log(req.session)
  res.status(200).send('works!')
});


app.post("/charge", (req, res) => {
  
  console.log(req.body, 'req.body req.body req.body req.body req.body' )
  sendEmail(req, res)
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    
  })
  .then(customer => {
    stripe.charges.create({
        amount: req.body.amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      })
    .then((charge) => {
      console.log(charge, 'CHARGE CHARGE CHARGE')
      res.status(200).send();
    })
  })
});

app.post('/api/park/tenDayForecast', (req, res) => {
	console.log('in tendayforecast, sending to model with params', req.query)
	forecast(req.query.id).then((forecast) => {
		res.status(200).send(forecast);
		console.log("this is the forecast", forecast)
	})
})

app.get('/api/trails', (req, res) => {
	trails(req.query.parkId).then((trails) => {
		res.status(200).send(trails);
	})
})

app.get('/api/historicalWeatherData', getHistoricalData);

app.get('/api/park/lodgings', (req, res) => {
	googleHelpers.places({lat: req.query.lat, lng: req.query.lon})
	.then((result) => {
		res.status(201).send(result);
	})
})

app.get('/api/park/', (req, res) => {
  console.log(req.session.id, 'SESSION ID IS THIS ONE')
	console.log(req.session, 'this is the session');
	console.log(req.session.ID, 'this is the session id');
	console.log(req.session.views, 'these are the views');
	console.log(req.cookies, 'these are the cookies');
	individualParkData(req.query.parkcode)
	.then((data) => {
		let park = data;
		res.status(200).send(data);
	})
})

app.get('/api/parks', (req, res) => {

  console.log(req.query.filters)

	const filtersState = req.query.filters.map((filter) => {
		return JSON.parse(filter)
	}) 

	const filtersArray = filtersState.filter((filter) => {
		return filter.isSelected === true && filter.name !== 'Most Visited' && filter.name !== 'Least Visited';
	})

	const filterNames = filtersArray.map((filter) => {
		return filter.name
	})

	console.log(filterNames, 'FILTERS FILTERS FILTERS')
	if (filterNames.length > 0) {
		filters.activities(filterNames).then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			console.log(error)
		})
	} else {
		db.db.query('SELECT * from parks')
		.then((result) => {
			res.status(201).send(result)
		})
		.catch((err) => {
			res.send(data.ourNationalParks)
			// res.status(404).send(err + 'there was an error');
		})
	}
})

app.get('/api/campgrounds', (req, res) => {
	campgroundsData(req.query.parkId)
	.then((data) => {
			res.status(203).send(data)
	})
})


app.get('*', (req, res) => {
	res.redirect('/');
})

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;
