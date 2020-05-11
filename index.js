const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

// In prod we have to keep a config file where we can define our an env variable.
// and use that variable to declare the database name in the connect method.
mongoose.connect("mongodb://localhost/poc", options)
	.then(() => console.log('Mongodb connection established...'))
	.catch((err) => console.error("Could not establish connection...", err));

const courseRoutes = require('./routes/course');
app.use('/api/courses', courseRoutes);

const server = app.listen(5100, function() {
  console.log('listening on 5100...');
});

module.exports = server;