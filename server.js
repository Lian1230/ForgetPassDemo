const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

const env = process.env.NODE_ENV;

switch (env) {
  case 'development': {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    const webpackCompiler = webpack(webpackConfig);

    app.use(webpackMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false,
        'errors-only': true,
      },
    }));
    app.use(webpackHotMiddleware(webpackCompiler));

    const dir = loc => path.join(__dirname, `./build${loc}`);
    app.get('*', (req, res) => res.sendFile(dir('/index.html')));
    break;
  }
  default:
    app.use(express.static('./'));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
    break;
}
/* for logging by sumologic */
app.post('/log', (req, res) => {
  res.status(202).json({ message: 'OK' });
});

const port = process.env.PORT || (env !== 'development' && 3000) || 4010;

app.listen(port, () => console.log('\x1b[32m%s\x1b[0m', `listening: ${port}...`));
