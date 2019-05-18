// Sandbox for short term testing
require('dotenv').config({path: '../.env'})

const _ = require('lodash');
const fs = require('fs');
const fsp = require('fs').promises
const pickObject = require('lodash').pick;
const helpers = require('../app_lib/helpers')
const SpotairPict = require('../app_lib/SpotairPict')
const Sharp = require('sharp')
//const db = require('../app_api/models/db')
const probe = require('probe-image-size')

console.log("START TEST")

const path = "./pluto.jpg"
const pathResized = "./pluto_resized.jpg"

//fsp.readFile(path)
	//.then(buffer => (new SpotairPict(buffer)).watermark())
	////.then(img => img.toBuffer())
	//.then(img => img.toFile(pathResized))
	////.then(() => fsp.readFile(pathResized))
	////.then(buffer => (new SpotairPict(buffer)))
	////.then(img => img.metadata())
	////.then(img => img.dimensions())
	//.then(data => console.log(data))


const { registerFont, createCanvas } = require('canvas');

registerFont( 'watermarkFont.ttf', { family: "WatermarkFont" } );
registerFont( 'AGaramondPro-Italic.otf', { family: "AGaramondPro" } );

const H = 600
const rate = 0.05
const h = rate * H

var canvas = createCanvas( H, 300 );
var ctx = canvas.getContext( '2d' );

ctx.fillStyle = '#ffffff';
ctx.fillRect( 0, 0, canvas.width, canvas.height );

//ctx.font = `${h}px WatermarkFont`
ctx.font = `${h}px WatermarkFont`
console.log(ctx.font)
ctx.fillStyle = '#000000';
ctx.fillText( "Now is the time for all good men.", 0, H );

const buffer = canvas.toBuffer()
const img = new SpotairPict(buffer)
img.toFile("koko.jpg")


