const webpack = require('webpack');
const path = require('path');
const cssModuleLoader = require('./webpack/css-module-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LAUNCH_COMMAND = process.env.npm_lifecyle_event;
/* NODE_ENV only 'development' | 'production'; APP_ENV is real env */
const { IP, NODE_ENV, APP_ENV } = process.env;
const isProduction = NODE_ENV === 'production' || LAUNCH_COMMAND === 'production';

function findBuildDir() {
  switch (APP_ENV || NODE_ENV) {
    case 'production':
      return 'build/production';
    case 'staging':
      return 'build/staging';
    default:
      return 'build';
  }
}

const extractStyles = new ExtractTextPlugin({
  filename: 'css/application.css',
  disable: !isProduction,
  allChunks: true,
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const PATHS = {
  // this app will be the entry point;
  app: [
    path.join(__dirname, 'src/javascript/index.tsx'),
    path.join(__dirname, 'src/css/shared.scss'),
  ],
  // this will be the output path;
  build: path.resolve(__dirname, findBuildDir()),
};

const environment = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
    APP_ENV: JSON.stringify(APP_ENV),
    IP: `'${IP}'`,
  },
});

if (isProduction) {
  console.log('Bundling using production config...');
} else {
  PATHS.app.push('webpack-hot-middleware/client');
  console.log('Bundling using development config...');
}

// this is for vendor caching
const VENDOR_LIBS = [ ];

const isVendor = module => (
  module.context && module.context.indexOf('node_modules') !== -1
);

const entryPoint = isProduction
  ?
  {
    bundle: PATHS.app,
    vendor: VENDOR_LIBS,
  }
  :
  {
    bundle: PATHS.app,
  };

const base = {
  entry: entryPoint,
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: extractStyles.extract({ // this loader will disable in production
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
          ],
          // use style-loader in development
          fallback: 'style-loader',
          publicPath: '/build',
        }),
      },
      { // module css files
        test: /\.css$/,
        exclude: [
          'node_modules',
          'bower_components',
        ],
        use: cssModuleLoader(isProduction, true),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
    ],
  },
};

const developmentBuild = {
  devtool: 'inline-source-map',
  plugins: [
    extractStyles,
    HtmlWebpackPluginConfig,
    environment,
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const productionBuild = {
  plugins: [
    extractStyles,
    HtmlWebpackPluginConfig,
    environment,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => isVendor(module),
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, minimize: true }),
  ],
};

module.exports = Object.assign({}, base, isProduction
  ? productionBuild
  : developmentBuild);
