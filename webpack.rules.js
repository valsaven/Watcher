module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
      },
      {
        loader: 'vue-svg-inline-loader',
      }
    ]
  },
  {
    test: /parsers\.js$/,
    loader: 'string-replace-loader',
    options: {
      search: 'module.exports = parsers;',
      replace: 'export default parsers;',
    }
  }
];
