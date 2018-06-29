var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'admin': './src/pages/admin/main.js',
    'store': './src/pages/store/main.js',
    'warehouse': './src/pages/warehouse/main.js'
    // TODO Login Auth Entry
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['admin'],
      inject: 'body',
      hash: true,
      title: 'CMS-ADMIN',
      filename: 'admin.html',
      template: 'index.ejs',
    }),
    new HtmlWebpackPlugin({
      chunks: ['store'],
      inject: 'body',
      hash: true,
      title: 'CMS-STORE',
      filename: 'store.html',
      template: 'index.ejs',
    }),
    new HtmlWebpackPlugin({
      chunks: ['warehouse'],
      inject: 'body',
      hash: true,
      title: 'CMS-WAREHOUSE',
      filename: 'warehouse.html',
      template: 'index.ejs',
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'iview': 'iview',
    'axios': 'axios',
    'qs': 'Qs',
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: 9000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8541',
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
