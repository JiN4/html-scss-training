const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const outputFilePath = "/images/"

module.exports = {
  context: path.join(__dirname, './'),
  // ここがどのscssをみるか
  entry: "./index.scss",
  output: {
    // どのディレクトリにどんな名前でbuild後のcssを吐くか
    path: path.join(__dirname, ''),
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 使用するプラグイン
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath : outputFilePath,
              publicPath : function(path){
                console.log("pathは" + path);
                return './' + outputFilePath + path;
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}

