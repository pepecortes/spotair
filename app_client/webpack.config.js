/**
 * Webpack configuration file xxx
 */
let path = require('path');
let Dotenv = require('dotenv-webpack');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  
  entry: {
		app: './src/index.js',
		app: path.resolve(__dirname, 'src/index.js'),
		loginApp: path.resolve(__dirname, 'src/login.js'),
		adminApp: path.resolve(__dirname, 'src/admin.js'),
	},
	
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
   },
  
	devtool: 'eval-source-map',
	 
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
        test: /\.pug$/,
        use: ['pug-plain-loader']
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
