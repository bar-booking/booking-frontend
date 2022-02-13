const swcLoader = require('swc-loader')
const { loaderByName, removeLoaders, addAfterLoader } = require('@craco/craco')

module.exports = {
  /**
   * To process the js/ts files we replace the babel-loader with the swc-loader
   */
  overrideWebpackConfig: ({ webpackConfig, context: { paths } }) => {
    // add swc-loader
    addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: swcLoader,
      options: {
        jsc: {
          externalHelpers: true,
          target: `es2015`,
          parser: {
            syntax: `typescript`,
            tsx: true,
            dynamicImport: true,
          },
        },
      },
    })

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName(`babel-loader`))

    return webpackConfig
  },
}
