var express = require('express');
var app = express();
require('dotenv').config();


// STRIPE
const keyPublishable = process.env.STRIPE_PUBLISHABLE;
const keySecret = process.env.STRIPE_SECRET;
const stripe = require("stripe")(keySecret);

// MAILGUN
var api_key = 'key-65a9efc2db95a9c1b3a78513ab70ad81';
var domain = 'mg.woebot.io';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

// This is the pricing page
app.get('/pricing', function (req, res) {
	console.log("Got a GET request for the pricing page");
	res.sendFile( __dirname + "/public/" + "pricing.htm" );
})


// This is the home page
app.get('/', function (req, res) {
	console.log("Got a GET request for the homepage");
	res.sendFile( __dirname + "/public/" + "index.htm" );
})

function sendMail(email){
	var data = {
		from: 'Alison Darcy <admin@woebot.io>',
		to: email,
		subject: 'Hello',
		text: 'Testing some Mailgun awesomness!'
	};

	mailgun.messages().send(data, function (error, body) {
		console.log(body);
	});
}



app.post('/chargeWeekly', function (req, res) {
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	}, function(err, customer) {
		if (err) {
			res.send(err);
		} else {
			stripe.subscriptions.create({
				customer: customer.id,
				plan: 'weekly',
			}, function(err, subscription) {
				if(err) {
					res.send('oops');
				} else {
					res.send('success');
					sendMail(req.body.stripeEmail);
				}
			})
		}
	});
})

app.post('/chargeMonthly', function (req, res) {

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken

	}, function(err,customer) {
		if(err) {
			res.send('error');
		} else {
			stripe.subscriptions.create({
				customer: customer.id,
				plan: 'monthly',
			}, function(err, subscription) {
				if(err) {
					res.send('error');
				} else {
					res.send('success');
					sendMail(req.body.stripeEmail);
				}
			})
		}
	});
})

app.post('/chargeAnnually', function (req, res) {

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	}, function(err,customer) {
		if(err) {
			res.send("error");
		} else {
			stripe.subscriptions.create({
				customer: customer.id,
				plan: "annual",
			}, function(err, subscription) {
			// asynchronously called
			if(err) {
				res.send("error");
			} else {
				res.send("success");
				sendMail(req.body.stripeEmail);
			}
		})
		}
	});
})

app.post('/chargeSelect', function(req, res, next) {
	var stripeToken = req.body.stripeToken;
	var planChoice = req.body.plan;
	var email = req.body.stripeEmail;

	stripe.customers.create({
		email: email,
		source: req.body.stripeToken
	}, function(err,customer) {
		if(err) {
			res.send("error1: " + JSON.stringify(err));
		} else {
			stripe.subscriptions.create({
				customer: customer.id,
				plan: planChoice
			}, function(err, subscription) {
				// asynchronously called
				if(err) {
					res.send("token: " + req.body.stripeToken + " " + JSON.stringify(err));
				} else {
					res.send("success w/email= " + email);
					sendMail(email);
				}
			})
		}
	});
});


// // Used in development
// var server = app.listen(8081, function () {
// 	var host = server.address().address
// 	var port = server.address().port
//
// 	console.log("Example app listening at http://%s:%s", host, port)
// })
