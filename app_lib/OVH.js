/**
 * OVH class for accessing OVH remote storage
 * @module /app_lib/OVH
 */ 
const debug = require('debug')('app:lib:OVH')
const fs = require('fs')
const OVHStorage = require('node-ovh-storage')
const imgType = require('./helpers').imgType

class OVH extends OVHStorage {
	
	constructor() {
		const config =  {
			username:	process.env.OVH_USERNAME,
			password:	process.env.OVH_PASSWORD,
			authURL:	process.env.OVH_AUTH_URL,
			tenantId: process.env.OVH_TENTANT_ID,
			region: 	process.env.OVH_REGION
		}
		super(config)
	}
	
	/**
	 * @function buildPath
	 * @desc Creates OVH remote path related to images types
	 * @param {String} id	- id to build the filename as id.jpg
	 * @param {Integer} type - see imgType
	 * @return {String} remote path + filename
	 */
	static buildPath(id, type=imgType.picture) {
		var folder = ""
		switch(type) {
			case imgType.upload:
				folder = process.env.UPLOAD_LOCATION
				break
			case imgType.thumbnail:
				folder = process.env.THUMBNAIL_LOCATION
				break
			default:
				folder = process.env.PICTURE_LOCATION
		}
		const filepath = `/${process.env.CONTAINER_NAME}/${folder}${id}.jpg`
		return filepath
	}
	
	async connect() {
		return new Promise((resolve, reject) => this.getToken((err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	async getFileListAsync(folderPath) {
		return new Promise((resolve, reject) => this.getFileList(folderPath, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	async getFileAsync(path) {
		return new Promise((resolve, reject) => this.getFile(path, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	async putFileAsync(localpath, remotepath) {
		return new Promise((resolve, reject) => this.putFile(localpath, remotepath, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	async putStreamAsync(file, path) {
		return new Promise((resolve, reject) => this.putStream(file, path, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	async deleteFileAsync(path) {
		return new Promise((resolve, reject) => this.deleteFile(path, (err, data) => {
			if (err !== null) reject(err)
			else resolve(data)
		}))
	}
	
	/**
	 * @function list
	 * @return {Promise} Return the contents of the container
	 */
	async list(folderPath = `/${process.env.CONTAINER_NAME}`) {			
		return this.connect().then(() => this.getFileListAsync(folderPath))
	}
	
	/**
	 * @function read
	 * @param {String} path
	 * @return {Promise} Return a buffer of the file read
	 */
	async read(path) {			
		return this.connect().then(() => this.getFileAsync(path))
	}
	
	/**
	 * @function write
	 * @desc Copy a local file to the container
	 * @param {String | Stream} source	- path on the local filesystem or a stream
	 * @param {String} remotepath
	 */
	async write(source, remotepath) {
		if (typeof source === 'string') {
			return this.connect().then(() => this.putFileAsync(source, remotepath))
		} else {
			return this.connect().then(() => this.putStreamAsync(source, remotepath))
		}
	}
	
	/**
	 * @function readUploaded
	 * @desc read an uploaded image
	 * @param {Integer} id
	 * @return {Promise} Return a buffer of the image
	 */
	async readUploaded(id) {
		return this.read(OVH.buildPath(id, imgType.upload))
	}	
	
	/**  @desc see readUploaded */
	async readPicture(id) {
		return this.read(OVH.buildPath(id, imgType.picture))
	}	
	
	/**  @desc see readUploaded */
	async readThumbnail(id) {
		return this.read(OVH.buildPath(id, imgType.thumbnail))
	}
	
	/**
	 * @function writeUploaded
	 * @desc write a local file to the remote container uploaded images location
	 * @param {String} localpath	- path on the local filesystem
	 * @param {Integer} id
	 */
	async writeUploaded(localpath, id) {
		return this.write(localpath, OVH.buildPath(id, imgType.upload))
	}
	
	/**  @desc see writeUploaded */
	async writePicture(localpath, id) {
		return this.write(localpath, OVH.buildPath(id, imgType.picture))
	}
	
	/**  @desc see writeUploaded */
	async writeThumbnail(localpath, id) {
		return this.write(localpath, OVH.buildPath(id, imgType.thumbnail))
	}
	
	

}

module.exports = OVH
