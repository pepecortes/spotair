const debug = require('debug')('app:api:storage')
const helpers = require('../../app_lib/helpers')
const sendJSON = helpers.sendJSON
const fs = require('fs')

const SwiftClient = require('openstack-swift-client')
const authURL = "http://swift:8080/auth/v1.0"
const username = "test:tester"
const password =  "testing"
const authenticator = new SwiftClient.SwiftAuthenticator(authURL, username, password)

var OVHStorage = require('node-ovh-storage')
var configOVH = {
	username: 'sJm6rkJbMD8h',
	password: '3478wfekYQEwWQNN5TaWEpRx6sHsYBqw',
	authURL: 'https://auth.cloud.ovh.net/v2.0/',
  tenantId: '204701acb74a4804903a0a7699535282',
  region:   'GRA5'
}

/**
 * @function
 * @desc Store the file in the current container
 * @param {string} fileName
 * @param {string} filePath		- (temp) path of the file to store
 * @return {Promise} Promise that resolves or error
 */
function storeToContainer(fileName, filePath) {
	const client = new SwiftClient(authenticator)
	const container = client.container(process.env.CONTAINER_NAME)
	var stream = fs.createReadStream(filePath)
	return container.create(fileName, stream)
}

function listContainer() {
	//const client = new SwiftClient(authenticator)
	//const container = client.container(process.env.CONTAINER_NAME)
	//return container.list()
	
	//ERROR: this actually list containers, not files
	var storage = new OVHStorage(configOVH)
	
	var getTokenPromise = new Promise((resolve, reject) => storage.getToken((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
	
	var getListPromise = new Promise((resolve, reject) => storage.getFileList((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
	
	return getTokenPromise.getListPromise
	
	//var promise = new Promise(function(resolve, reject) {
		//storage.getToken(function(err) {
			//if (err !== null) reject(err)
			//else {
				//storage.getFileList("/", function(err, data) {
					//if (err !== null) reject(err)
					//else resolve(data)
				//})
			//}
		//})
	//})
	//return promise
	
	
}

/**
 * @Object
 * @desc DOC IN PROGRESS
 * @param DOC IN PROGRESS
 */
 
var storageController = {}

storageController.postFile = function(req, res) {
	var formidable = require('formidable')
	var form = new formidable.IncomingForm()
	form.parse(req, function(err, fields, files) {
		var file = files.myfile
		storeToContainer(file.name, file.path)
			.then(output => sendJSON.ok(res, output))	
			.catch(err => {
				debug(err)
				sendJSON.serverError(res, err)
			})
	})
}

storageController.list = function(req, res) {
	listContainer()
		.then(output => sendJSON.ok(res, output))	
		.catch(err => {
			debug(err)
			sendJSON.serverError(res, err)
		})
}

module.exports = storageController
