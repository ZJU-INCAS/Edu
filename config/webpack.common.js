const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js'
  },

  module: {
    rules: [{
        test: /\.[jt]sx?$/,
        include: [
          path.join(__dirname, '../', 'src'),
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      // {
      //   test: /\.less$/,
      //   include: /node_modules/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         javascriptEnabled: true
      //       }
      //     },
      //   ]
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: 4096,
          outputPath: 'static/',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ]
  },

  resolve: {
    // notice this settting should sync with tsconfig.json
    alias: {
      '@': path.resolve('./src'),
    },

    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
    }),

    // workbox: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    // new WorkboxPlugin.GenerateSW({
    //   swDest: "service-worker.js",
    //   importWorkboxFrom: 'local',
    //   skipWaiting: true,
    //   clientsClaim: true,
    // }),
  ],
}
