const fs = require('fs');
const qs = require('qs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// babel rc json file
let babelrc = JSON.parse(fs.readFileSync('.babelrc'));

let isProduction = process.env.NODE_ENV === 'production';

let sourceMapQueryStr = '+sourceMap';

const PATHS = {
  js: path.join(__dirname, 'src', 'js'),
  dist: path.join(__dirname, 'dist'),
  assets: path.join(__dirname, 'src', 'assets')
};

// define source-map type
let srcMapsType = isProduction ? 'source-map' : 'eval-source-map';

// define date
const today = new Date();
const day = today.getUTCDate();
const year = today.getFullYear() + '';
let month = today.getUTCMonth() + 1;
let hour = today.getHours();
let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();

// update month
month = month < 10 ? '0' + month : month;

const version = `v ${day}.${month}.${year.substring(2, 4)} - ${hour}:${minutes}`;

// update process env version
process.env.version = version;

// define plugins array
let plugins = [
  new CleanWebpackPlugin([
    PATHS.dist,
    'index.html'
  ], {root: __dirname}),

  new CopyWebpackPlugin(
    [{
      from: PATHS.assets, to: PATHS.dist
    }]
  ),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.version': JSON.stringify(version)
  }),

  new HtmlWebpackPlugin({
    // will not automatically inject files in the template
    // improve this to automatically generate the html file for
    // an SPA
    inject: false,
    // this is relative to output path
    filename: '../index.html',
    template: path.join(__dirname, 'src', 'html', 'index.ejs'),
    title: 'Flagstrap Preact example ' + version
  }),

  new ExtractTextPlugin({
    // filename: 'css/[name].[hash].css',
    filename: 'css/[name].css'
    // allChunks: true,
  })
];

// check if it's production
if (isProduction) {

  // update plugins
  plugins.splice(4, 0, new webpack.optimize.UglifyJsPlugin({ sourceMap: srcMapsType }));
}

let webpackConfig = {
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.
  entry: {
    app: path.join(__dirname, 'src', 'js', 'app.js'),
    core: path.join(__dirname, 'src', 'sass', 'core.scss'),
    flagstrap: path.join(__dirname, 'src', 'sass', 'app.scss')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  target: 'web',

  // enable source maps
  // check link: https://survivejs.com/webpack/building/source-maps/
  devtool: srcMapsType,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: PATHS.js,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      /* {
        test: /\.js$/,
        include: PATHS.js,
        use: 'babel-loader'
      }, */
      {
        // **Conditions**
        // Match files against RegExp or a function.
        test: /\.jsx?$/,

        // **Restrictions**
        // Restrict matching to a directory. This
        // also accepts an array of paths or a function.
        // The same applies to `exclude`.
        include: PATHS.js,

        /* exclude(path) {
          // You can perform more complicated checks
          // through functions if you want.
          return path.match(/node_modules/);
        }, */
        exclude: [path.join(__dirname, 'node_modules')],

        // Apply loaders the matched files.
        use: {
          loader: 'babel-loader?' + JSON.stringify(Object.assign({}, babelrc, {cacheDirectory: true}))
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/sass'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [`css-loader?${sourceMapQueryStr}&minimize=true`]
        })
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/sass'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          publicPath: '../',
          loader: [
            `css-loader?${sourceMapQueryStr}&minimize=true`,
            `resolve-url-loader?${sourceMapQueryStr}`,
            `sass-loader?${sourceMapQueryStr}`
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|xml|json)$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          `file-loader?${qs.stringify({
            name: 'images/[name].[ext]'
          })}`
        ]
      },
      {
        test: /\.(ttf|eot)$/,
        include: path.resolve(__dirname, 'src'),
        loader: `file-loader?${qs.stringify({
          name: 'fonts/[name].[ext]'
        })}`
      },
      {
        test: /\.woff2?$/,
        include: path.resolve(__dirname, 'src'),
        loader: `url-loader?${qs.stringify({
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]'
        })}`
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: plugins,

  // Disable performance hints during development
  performance: {
    hints: false
  }
};

module.exports = webpackConfig;
