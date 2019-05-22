// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const helpers = require('../app_lib/helpers')
const Sharp = require('sharp')
const db = require('../app_api/models/db')


console.log("START TEST")
const lunr = require('lunr')
 
const lookup = "gah"

function lnrIndex(documents) {
	return function() {
		const me = this
		me.ref('text')
		me.field('text')
		documents.forEach(doc => me.add(doc), me)
	}
}

db.Appareil
	.findAll({include: [{all:true, nested:true}]})
		.then(records => {
				var idx = lunr(lnrIndex(records))
				var result = idx.search(lookup)
				console.log(result)
				console.log("LOOKUP: " + lookup)
		})






