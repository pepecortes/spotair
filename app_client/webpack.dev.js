/**
 * Webpack DEVELOPMENT configuration file
 */
let path = require('path')
let merge = require('webpack-merge')
let common = require('./webpack.common.js')

module.exports = merge(common, {
	
  mode: 'development',
  
	devtool: 'eval-source-map',
  
  entry: {
		testApp: path.resolve(__dirname, 'src/test.js'),
	},

})
