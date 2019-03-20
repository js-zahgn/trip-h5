const path = require('path')
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: '#FBC415',
          blue: '#FBC415',
          orange: '#FBC415',
          'text-color': '#323436'
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/var.less')]
    }
  }
}
