const expect = require("chai").expect;
//const mysql = require('mysql2');
const Sequelize = require('sequelize');
 
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

describe("Sequelize database connection", function() {
	
	const sequelize = new Sequelize('mysql://rooto:example@db/spotair');
	
	//beforeEach(function() {
		//sequelize
			//.authenticate()
			//.then(() => {
					//console.log('Connection has been established successfully.');
			//})
			//.catch(err => {
				//console.error('Unable to connect to the database:', err);
			//});		
	//});
	
  describe("Simple sequelize connection TEST", function() {
			expect(1).to.equal(1);
	});
   
});

