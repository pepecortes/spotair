const debug = require('debug')('app:api:storage')
const helpers = require('../../app_lib/helpers')
const sendJSON = helpers.sendJSON
const fs = require('fs')
const formidable = require('formidable')

const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL") 

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
 * @param {Object} file		- File object given by the http req
 * @param {String} path		- Path where the file is stored in the container
 * @return {Promise} Promise that resolves or error
 */
function storeToContainer(file) {
	debug("IN STORE TO CONTAINER")
	var stream = fs.createReadStream(file.path)
	const container = getContainer()
	if (LOCAL_STORAGE) return container.create(file.name, stream)
	// if OVH remote storage...
	function putFilePromise() {
		const path = "/" + process.env.CONTAINER_NAME + "/" + file.name
		return new Promise((resolve, reject) =>
			container.putStream(stream, path, (err, data) => {
				if (err !== null) reject(err)
				else resolve(data)
			}))
	}
	return getOVHToken(container).then(() => putFilePromise())
}

function listContainer() {
	const container = getContainer()
	if (LOCAL_STORAGE) return container.list()
	// if OVH remote storage...
	function getListPromise() {
		return new Promise((resolve, reject) =>
			container.getFileList("/" + process.env.CONTAINER_NAME, (err, data) => {
				if (err !== null) reject(err)
				else resolve(data)
			}))
	}
	return getOVHToken(container).then(() => getListPromise())
}

/**
 * @function
 * @desc Returns a container, whether local or remote depends in the environment variables
 */
function getContainer() {
	if (LOCAL_STORAGE) return new SwiftClient(authenticator).container(process.env.CONTAINER_NAME)
	else return new OVHStorage(configOVH)
}

/** @function
 * @desc Needed for getting access to OVH container
 * @param {Container} container
 * @return {Promise} Promise that resolves if the token is obtained
 */
function getOVHToken(container) {
	return new Promise((resolve, reject) => container.getToken((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
}


/**
 * @Object
 * @desc DOC IN PROGRESS
 * @param DOC IN PROGRESS
 */
 
var storageController = {}

storageController.postFile = function(req, res) {
	var form = new formidable.IncomingForm()
	form.parse(req, function(err, fields, files) {
		storeToContainer(files.myfile)
			.then(output => sendJSON.ok(res, output))	
			.catch(err => sendJSON.serverError(res, err))
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
