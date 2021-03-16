/**
 * Webpack COMMON configuration file
 */
let path = require('path')
let Dotenv = require('dotenv-webpack')
let VueLoaderPlugin = require('vue-loader/lib/plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {

  entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		adminApp: path.resolve(__dirname, 'src/admin.js'),
		loginApp: path.resolve(__dirname, 'src/login.js'),
	},
	
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath setting for route lazy loading with webpack
    publicPath: '/dist/',
  },
	
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
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
				use: ['url-loader?limit=100000']
			},
    ],
  },
  
  optimization: {
		splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
        },
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				},
      }
		},
	},
  
  plugins: [
    new Dotenv(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
  ]
};
