const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
	filename: "css/[name][chunkhash:8].css",
	disable: process.env.NODE_ENV === "development"
});

module.exports = env => {
	if (!env) {
		env = {}
	}
	let plugins = [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './app/views/index.html',
			filename: 'index.html',
			inject: true,
			chunks: ['main','viewport'],
			minify: {
				removeAttributeQuotes: true, //移出属性的引号
				collapseWhitespace: true,
				removeComments: true
			},
			hash: true
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		extractSass
	];
	if (env.production) {
		plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			})
		);
	}
	return {
		devtool:'inline-source-map',
		entry: {
			main: path.resolve(__dirname, 'app/js/main.js'),
			viewport:path.resolve(__dirname,'app/js/viewport.js')
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		devServer: {
			contentBase: './dist',
			// hot: true,
			compress: true,
			inline:true,
			port: 9300,
			host:"192.168.1.134"
			// clientLogLevel: 'none'
			// quiet: true
		},
		module: {
			rules: [{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader:"px2rem-loader",
						options:{
							remUnit:40,
							remPrecision:8
						}
					},{
						loader: "sass-loader"
					}],
					fallback: "style-loader"
				})
			}, {
				test: /\.(jpg|svg|gif|png|ttf|svg|eot|)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: 'img/[name].[ext]',
						publicPath: '../'
					}
				}]
			},{
				test:require.resolve('jquery'),
				use:[{
					loader:'expose-loader',
					options:'jQuery'
				},{
					loader:'expose-loader',
					options:'$'
				}]
			}]
		},
		resolve: {
			extensions: [
				'.js', '.json'
			]
		},
		plugins
	};
};