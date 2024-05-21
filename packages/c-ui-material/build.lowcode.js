const { library } = require('./build.json');

module.exports = {
  alias: {
    '@': './src',
    'lowcode': './lowcode',
    // '@/lowcode/*': ['./lowcode/*'],
  },
  plugins: [
    [
      // '@alifd/build-plugin-lowcode', //插件名称做了调整
      'brick-build-plugin-lowcode',
      {
        library,
        engineScope: '@alilc',
        extends: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@brick/processor': 'BrickProcessor',
        },
      },
    ],
  ],
};
