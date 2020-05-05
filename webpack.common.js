const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // enntry file
    entry: './src/index.js',
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
    filename: "[hash].js",
    path: path.resolve(__dirname + "/build")
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
          },
          {
            test: /\.(png|jpg|svg|ico)$/,
            use: [ {
              loader : 'file-loader',
              options : {
                name: '[path][hash].[ext]'
              }
            }],
          },
          {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            ]
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
          }
        ]
      },
      plugins : [
        new HtmlWebPackPlugin({
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            template :  path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html', // output으로 출력할 파일은 index.html 이다.
          }),
        new MiniCssExtractPlugin({
            filename : '[hash].css'
        }),
        new CleanWebpackPlugin()
    ]
};