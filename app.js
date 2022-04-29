'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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