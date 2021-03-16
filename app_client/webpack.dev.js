/**
 * Webpack DEVELOPMENT configuration file
 */
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	
  mode: 'development',
  
	devtool: 'eval-source-map',
  
  entry: {
		testApp: path.resolve(__dirname, 'src/test.js'),
	},

})
