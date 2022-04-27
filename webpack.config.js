const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 打包前清理dist文件夹

    environment: {
      // 不使用箭头函数,const(对不支持es6浏览器的兼容)
      arrowFunction: false,
      const: false
    }
  },

  mode: "development",

  // 指定打包时要使用的模块
  module: {
    // 指定加载的规则
    rules: [
      {
        // 指定规则生效的文件
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          // 配置babel
          { // 加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [// 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11",
                    },
                    // 指定core-js的版本
                    "corejs": "3",
                    // 使用core-js的方式:"usage"-按需加载
                    "useBuiltIns": "usage",
                  }]
              ]
            }
          },
          'ts-loader'],
      },
      {
        // 匹配css,less文件
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          // 引入postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[
                  "postcss-preset-env",
                  {
                    brosers: 'last 2 versions'
                  }
                ]]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  // 插件
  plugins: [
    // 生成html入口文件
    new HTMLWebpackPlugin({
      template: './src/index.html',
      title: 'GreedySnake',
    })
  ],

  // 设置引用模块
  resolve: {
    extensions: ['.js', '.ts']
  }
}