module.exports = ({ context, onGetWebpackConfig }) => {
  // 这里面可以写哪些，具体请查看插件开发章节
  onGetWebpackConfig((config) => {
    config.mode = 'development';
    config.output.publicPath = '/static/1bs/';
    config.optimization.minimize = false;
    config.optimization.minimizer = [];
    console.log('q=>config', config.toConfig());
  });
};
