/**
 * Script for legacy spotair image migration
 * Example
 * node migrateImages.js --fromId 1000 --toId 2000 --source http://spotair.org/repupload/original/ --container OVH
 * will copy images from http://spotair... into OVH container
 * ranging from 1000.jpg to 2000.jpg
 */
 
require('dotenv').config({path: '../../.env'})
const CopyImage = require('./CopyImage')
const db = require('../../app_api/models/db')
const Sharp = require('sharp')
const _ = require('lodash')
const OVH = require('../../app_lib/OVH')
const LocalStorage = require('../../app_lib/LocalStorage')
const asyncPool = require('tiny-async-pool')

var argv = require('minimist')(process.argv.slice(2), {
  string: [ 'source', 'container' ],
  alias: { f: 'fromId', t: 'toId', s: 'source', i: 'id', c: 'container' },
  default: {
		source: "http://spotair.org/repupload/original/",
		container: "LOCAL"
		},
})

const ids = (argv.id)? [argv.id] : _.range(argv.fromId, argv.toId + 1)
const source = argv.source
const container = (argv.container === "OVH")? new OVH() : new LocalStorage()

var started = new Date()
asyncPool(2, ids, migrateAndLog)
	.then(() => console.log("\nFINISHED"))

console.timestamp = function () {
  var now = new Date();
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift((now - started), 'ms');
  process.stdout.write('\n' + args.join(' '));
}

function delay(ms) {
	return new Promise((resolve, reject) =>	setTimeout(() => resolve(ms), ms))	
}

async function migrateAndLog(id) {
	console.timestamp(`${id}: start`)
	return migrate(id)
		.then(() => console.timestamp(`${id}: end`))
		.catch(err => {
			console.timestamp(`${id}: ${err.name}: ${err.message}`)
			if (err.message == "ALREADY DONE") return
			if (err.message == "No record in database") return
			if (err.message == "429 Too Many Requests") return delay(10000)
			log(id, err.toString())
			return
		})
}
	
async function migrate(id) {
	return db.LogMigration.count({where: {idOrigin: id, log: ""}})
		.then(count => {
			if(count > 0) throw new Error("ALREADY DONE")
			else return true
		})
		.then(() => new CopyImage(id, source, container))
		.then(img => img.migrate(id))
		.then(() => log(id))
}
	
async function log(id, message="") {
	const record = {idOrigin: id, log: message}
	return db.LogMigration.upsert(record)
}



