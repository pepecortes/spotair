// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

// connect database and models
//const db = require('../app_api/models/db');


const object = {a: 1, b: 2, c: 3};
console.log(object);
const modified = equis(object, ['a', 'b']);
console.log(modified);


function equis(object, arrayOfProperties) {
	var output = {};
	for (const p of arrayOfProperties) {
		console.log("p is " + p);
		output[p] = object[p];
	}
	return output;
}


