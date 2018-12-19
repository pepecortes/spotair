/**
 * Webpack configuration file xxx
 */
let path = require('path');
let Dotenv = require('dotenv-webpack');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './app_client/src/index.js',
  output: {
		
    path: path.resolve(__dirname, 'app_client/dist/'),
    filename: 'bundle.js'
  },
  
	devtool: 'inline-source-map',
	 
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'full vue + compiler for development: consider runtime only for production
    }
  },
  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss|.css$/,
        use: [ // loaders for style files
					'vue-style-loader',
					'css-loader',
					'sass-loader'
        ],
      },
    ],
  },
  
  plugins: [
    new Dotenv(),
    new VueLoaderPlugin()
  ]
};
