// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
//const fs = require('fs');
//const fsp = require('fs').promises
//const pickObject = require('lodash').pick;
//const helpers = require('../app_lib/helpers')
//const SpotairPict = require('../app_lib/SpotairPict')
//const Sharp = require('sharp')
//const db = require('../app_api/models/db')
//const probe = require('probe-image-size')


console.log("START")

function centeredSlice(array, center=0, radius=1) {

	function concatNTimes(array, n, output = []) {
		if (n <= 0) return output
		const x = output.concat(array)
		return concatNTimes(array, n-1, x)
	}
	
	radius = Math.abs(radius)
	const l = array.length
	center = center % l
	const n_float = _.max([(radius-center)/l, (radius+center)/l])
	const n = _.ceil(n_float)
	const extendedArray = concatNTimes(array, (2*n + 1))
	let LH = center - radius + n*l
	let RH = center + radius + 1 + n*l
	return extendedArray.slice(LH, RH)
}
 

const c = 8
const r = 10
//const A = [0,1,2,3,4,5,6]
const A = [...Array(150).keys()]
let output = centeredSlice(A, c, r)
console.log(A)
console.log(output)
output =  centeredSlice(A, c+10, r)
console.log(output)
