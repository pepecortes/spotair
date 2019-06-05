/**
 * Webpack configuration file xxx
 */
let path = require('path');
let Dotenv = require('dotenv-webpack');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  
  entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		adminApp: path.resolve(__dirname, 'src/admin.js'),
		pictaddApp: path.resolve(__dirname, 'src/pictadd.js'),
		// TEST
		testApp: path.resolve(__dirname, 'src/test.js'),
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
      {
				test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000' 
			},
    ],
  },
  
  plugins: [
    new Dotenv(),
    new VueLoaderPlugin()
  ]
};
