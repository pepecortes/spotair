// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const helpers = require('../app_lib/helpers')
const Sharp = require('sharp')
const db = require('../app_api/models/db')


console.log("START TEST")
const FuzzySearch = require('fuzzy-search')
 
const people = [{
  name: {
    firstName: 'Jesse',
    lastName: 'Bowen',
  },
  state: 'Seattle',
}];


db.Appareil
	.findAll({include: [{all:true, nested:true}]})
		.then(record => {
				const searcher = new FuzzySearch(record, ['text'], {caseSensitive: false, sort: true})
				const result = searcher.search('PGV')
				console.log(result.length)
				result.forEach((value, index, arr) => console.log(value.text))
		})
 








