var http = require('http');

const mysql = require('mysql2');
 
//// create the connection to database
//const connection = mysql.createConnection({
  //host: 'db',
  //user: 'root',
  //password: 'example',
  //database: 'spotair'
//});

//// simple query
//connection.query(
  //'SELECT * FROM `comments` WHERE `id` = "234"',
  //function(err, results, fields) {
    //console.log(results); // results contains rows returned by server
  //}
//);

// using sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:example@db/spotair');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//create a server object:
http.createServer(function (req, res) {
  res.write('Hello world!'); //write a response to the client
  res.end(); //end the response
}).listen(3000); //the server object listens on port 8080 
