'use strict';

const express = require('express');
const logger = require('morgan');
const jsonParser = require('body-parser').json;
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

app.use(function (req, res, next)	{
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
	// res.render('error');
	res.json({
		error: {
			message: err.message
		}
	});
});

// SEND DATA
// app.use(jsonParser());

// app.use(function (req, res, next) {
// 	if (req.body) {
// 		console.log('The sky is', req.body.color);
// 	} else {
// 		console.log('there is no body property on the request');
// 	}
// 	next();
// });

// GET DATA
// app.use(function (req, res, next) {
// 	console.log('first piece of midddleware');
// 	req.myMessage = 'custom message from first middleware';
// 	next();
// })

// app.use('/different/:id', function (req, res, next) {
// 	console.log('second piece of midddleware, ID:', req.params.id);
// 	console.log(req.myMessage);

// 	// mengambil value dari query localhost:3000/different?color=red
// 	console.log('the colour is', req.query.color);
// 	next();
// })

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});