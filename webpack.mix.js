let mix = require('laravel-mix');

const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sourceMaps();
mix.disableNotifications();

mix.webpackConfig(webpack => {
  let plugins = [];

  if (mix.inProduction()) {
    // 生产环境中打包时先清理旧的打包文件
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins.push(new CleanWebpackPlugin('js', {
      root: path.join(__dirname, 'public'),
      // exclude:  ['shared.js'],
      verbose: true,
      dry: false
    }));

    // 包体分析
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: path.resolve(__dirname, 'resources/assets/js'),
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false
          }
        }
      ]
    },
    output: {
      chunkFilename: 'js/[name].js'
    },
    plugins: plugins
  }
})

mix.js('resources/assets/js/shop/index.js', 'js/shop.js')
  .js('resources/assets/js/admin/index.js', 'js/admin.js')
  .extract(['vue', 'vuex', 'vue-router', 'axios', 'vue-axios'])
  .sass('resources/assets/sass/shop.scss', 'css/shop.css')
  .sass('resources/assets/sass/admin.scss', 'css/admin.css');

mix.browserSync({
  proxy: 'willshop.app/shop',
  files: [
    'app/**/*.php',
    'resources/views/**/*.php',
    'public/js/**/*.js',
    'public/css/**/*.css',
    'public/build/**/*.js',
  ]
});
