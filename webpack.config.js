/**
 * Created by amit on 1/2/2016.
 */
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './app')
]
module.exports = {
    entry: {
        'app': './app/boot.ts',
        'vendor': './app/vendor.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"


    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js','.sass'],
        modulesDirectories: ['app', 'node_modules']
    },


    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }
        ],
        noParse: [ /angular2\/bundles\/.+/ ]
    },

    devServer: {
        historyApiFallback: true
    }
};
