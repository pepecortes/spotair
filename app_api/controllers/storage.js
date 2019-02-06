const debug = require('debug')('app:api:storage')
const helpers = require('../../app_lib/helpers')
const sendJSON = helpers.sendJSON


const SwiftClient = require('openstack-swift-client')
const authURL = "http://swift:8080/auth/v1.0"
const username = "test:tester"
const password =  "testing"
const authenticator = new SwiftClient.SwiftAuthenticator(authURL, username, password)


/**
 * @Object
 * @desc DOC IN PROGRESS
 * @param DOC IN PROGRESS
 */
 
var storageController = {}

storageController.getFile = function(req, res) {
	try {
		const TESTNAME = "hola.pepe"
		const client = new SwiftClient(authenticator)
		const container = client.container(process.env.CONTAINER_NAME)
		container.get(TESTNAME, stream)
			.then(output => sendJSON.ok(res, output))	
			.catch(err => sendJSON.serverError(res, err))
			
	} catch {err => sendJSON.serverError(res, err)}
}

module.exports = storageController
