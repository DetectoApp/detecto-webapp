const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const webpackPlugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html',
  }),
  new DotenvWebpackPlugin({
    path: './.env', // Path to .env file (this is the default)
    systemvars: true,
  }),
  new CopyPlugin({
    patterns: [
      { from: './public/favicon.ico', to: '' },
      { from: './public/printHeader.png', to: '' },
      { from: './public/manifest.json', to: '' },
      { from: './public/ownBrand/', to: 'ownBrand' },
    ],
  }),
];

webpackPlugins.push(
  new InjectManifest({
    swSrc: './src/src-sw.js',
    maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
    swDest: 'service-worker.js',
  })
);

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js',
    publicPath: '/detecto-webapp',
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    /*headers: {
          //'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },*/
  },
  devtool: 'source-map',
  resolve: {
    fallback: {
      crypto: false,
      path: false,
      fs: false,
    },
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.svg',
      'was',
    ],
    modules: ['src', 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/, /\.d\.ts$/],
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|svg|jpg|jpeg|gif|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: webpackPlugins,
};
