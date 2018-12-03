// MANAGE MYSQL DATABASE CONNECTION
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  if (err) console.error('mysql connection error');
  else console.log('connected to database ' + process.env.DB_DATABASE);
});

// report connection errors
connection.on('error', function(err) {
	console.log('mysql connection error: ' + JSON.stringify(err));
});

// call this if the process is restarted or terminated
function gracefulShutdown(msg, callback) {
	connection.end(function(err) {
		console.log('mysql disconnected through ' + msg);
		callback();
	});
}

// For nodemon restarts
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

// For SIGTERM termination
process.on('SIGTERM', function() {
	gracefulShutdown('SIGTERM termination', function() {
		process.exit(0);
	});
});

// BRING IN YOUR SCHEMAS & MODELS
require('./models');
