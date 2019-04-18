/**
 * lass for accessing a local filesystem storage
 * @module /app_lib/LocalStorage.js
 */ 
const debug = require('debug')('app:lib:LocalStorage')
const path = require('path')
const fs = require('fs')
const fsp = require('fs').promises
const imgType = require('./helpers').imgType

class LocalStorage {
	
	static get rootPath() {
		return path.resolve(process.env.APP_ROOT, process.env.LOCAL_STORAGE_LOCATION)
	}
	
	/**
	 * @function buildPath
	 * @desc Creates a local path related to images types
	 * @param {String} id	- id to build the filename as id.jpg
	 * @param {Integer} type - see imgType
	 * @return {String} path + filename
	 */
	static buildPath(id, type=imgType.picture) {
		var filepath = LocalStorage.rootPath
		switch(type) {
			case imgType.upload:
				filepath = path.resolve(filepath, process.env.UPLOAD_LOCATION)
				break
			case imgType.thumbnail:
				filepath = path.resolve(filepath, process.env.THUMBNAIL_LOCATION)
				break
			default:
				filepath = path.resolve(filepath, process.env.PICTURE_LOCATION)
		}
		filepath = path.resolve(filepath, `${id}.jpg`)
		return filepath
	}
	

	/**
	 * @function list
	 * @return {Promise} Return the contents of the container
	 */
	async list(folderPath = "") {
		return fsp.readdir(path.resolve(LocalStorage.rootPath, folderPath))
	}
	
	/**
	 * @function read
	 * @param {String} path
	 * @return {Promise} Return a buffer of the file read
	 */
	async read(filepath) {
		return fsp.readFile(path.resolve(LocalStorage.rootPath, filepath))
	}
	
	/**
	 * @function write
	 * @desc Copy a local file to the container
	 * @param {String | Buffer} source	- filepath
	 * @param {String} destination			- filepath
	 */
	async write(source, destination) {
		var destPath = path.resolve(LocalStorage.rootPath, destination)
		if (typeof source === 'string') {
			const srcPath = path.resolve(LocalStorage.rootPath, source)	
			return fsp.copyFile(srcPath, destPath)		
		} else {
			return fsp.writeFile(destPath, source)
		}
	}
	
	/**
	 * @function delete
	 * @desc remove a file
	 * @param {String} filepath
	 */
	 async delete(filepath) {
		 var destPath = path.resolve(LocalStorage.rootPath, filepath)
		 return fsp.unlink(destPath)
	 }
	
	/**
	 * @function readUploaded
	 * @desc read an uploaded image
	 * @param {Integer} id
	 * @return {Promise} Return a buffer of the image
	 */
	async readUploaded(id) {
		return this.read(LocalStorage.buildPath(id, imgType.upload))
	}	
	
	/**  @desc see readUploaded */
	async readPicture(id) {
		return this.read(LocalStorage.buildPath(id, imgType.picture))
	}	
	
	/**  @desc see readUploaded */
	async readThumbnail(id) {
		return this.read(LocalStorage.buildPath(id, imgType.thumbnail))
	}
	
	/**
	 * @function writeUploaded
	 * @desc write a local file to the container uploaded images location
	 * @param {String | Buffer} source	- filepath
	 * @param {Integer} id
	 */
	async writeUploaded(source, id) {
		return this.write(source, LocalStorage.buildPath(id, imgType.upload))
	}
	
	/**  @desc see writeUploaded */
	async writePicture(source, id) {
		return this.write(source, LocalStorage.buildPath(id, imgType.picture))
	}
	
	/**  @desc see writeUploaded */
	async writeThumbnail(source, id) {
		return this.write(source, LocalStorage.buildPath(id, imgType.thumbnail))
	}
	 
	 async deleteUploaded(id) {
		 return this.delete(LocalStorage.buildPath(id, imgType.upload))
	 }
	 
	 async deletePicture(id) {
		 return this.delete(LocalStorage.buildPath(id, imgType.picture))
	 }
	 
	 async deleteThumbnail(id) {
		 return this.delete(LocalStorage.buildPath(id, imgType.thumbnail))
	 }
	

}

module.exports = LocalStorage
