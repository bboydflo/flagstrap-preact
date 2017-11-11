const fs = require('fs');
const qs = require('qs');
const path = require('path');
const webpack = require('webpack');
// const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// import babel rc json file
let babelrc = JSON.parse(fs.readFileSync('.babelrc'));

// is production flag
let isProduction = process.env.NODE_ENV === 'production';

// is target == web
let isWeb = process.env.target === 'web';

// var sourceMapQueryStr = !isProduction ? '+sourceMap' : '-sourceMap';
let sourceMapQueryStr = '+sourceMap';

// webpack used paths
const PATHS = {
  js: path.join(__dirname, 'src', 'js'),
  dist: path.join(__dirname, 'dist'),
  vendor: path.join(__dirname, 'src', 'js', 'vendor'),
  assets: path.join(__dirname, 'src', 'assets')
};

// define source-map type
let srcMapsType = isProduction ? 'source-map' : 'eval-source-map';

// define date
const today = new Date();
const day = today.getUTCDate();
const year = today.getFullYear() + '';
let month = today.getUTCMonth() + 1;

// let seconds = today.getSeconds();
let hour = today.getHours();
let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();

// update month
month = month < 10 ? '0' + month : month;

// production version
const version = `v ${day}.${month}.${year.substring(2, 4)} - ${hour}:${minutes}`;

// update process env version
process.env.version = version;

// define plugins array
let plugins = [
  new CleanWebpackPlugin([
    PATHS.dist,
    'index.html'
  ], {root: __dirname}),

  new CopyWebpackPlugin([
    { from: PATHS.assets, to: PATHS.dist }
  ]),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.version': JSON.stringify(version)
  }),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery'
  }),

  // new BabiliPlugin(),
  // new webpack.optimize.UglifyJsPlugin({ sourceMap: srcMapsType }),

  // generate index.html
  new HtmlWebpackPlugin({
    // will not automatically inject files in the template
    // improve this to automatically generate the html file for
    // an SPA
    inject: false,
    // this is relative to output path
    filename: '../index.html',
    template: path.join(__dirname, 'src', 'html', 'index.ejs'),
    title: 'SmartPigs ' + version,
    manifest: isWeb && isProduction
  }),

  new ExtractTextPlugin({
    // filename: 'css/[name].[hash].css',
    filename: 'css/[name].css'
    // allChunks: true,
  })

  // new webpack.NamedModulesPlugin(),
];

// check if it's production
if (isProduction) {

  // update plugins
  plugins.splice(4, 0, new webpack.optimize.UglifyJsPlugin({ sourceMap: srcMapsType }));
}

// exports
let webpackConfig = {
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.
  entry: {
    app: path.join(__dirname, 'src', 'js', 'app.js'),
    core: path.join(__dirname, 'src', 'sass', 'core.scss')
    // styles: path.join(__dirname, 'src', 'sass', 'smartpigs-main.scss')
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
        exclude: PATHS.vendor,
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
        exclude: [path.join(__dirname, 'node_modules'), PATHS.vendor],

        // **Actions**
        // Apply loaders the matched files.
        // use: 'babel-loader',
        use: {
          // loader: 'babel-loader',
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
    extensions: ['.js', '.jsx'],
    alias: {
      'flagstrap': path.resolve(__dirname, 'src', 'js', 'vendor', 'jquery-flagstrap.min.js')
    }
  },

  plugins: plugins,

  // Disable performance hints during development
  performance: {
    hints: false
  }
};

// simple dll optimization
module.exports = webpackConfig;
