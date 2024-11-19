import { routes } from './src/routes';
import { defineConfig } from '@umijs/max';

// 是否使用本地物料库联调开发
const LOCAL_UI_MATERIAL = process.env.LOCAL_UI_MATERIAL || false;

const LOCAL_PROXY = process.env.LOCAL_PROXY || false;

// 服务器地址
const apiUrlServer = 'http://101.42.26.70';
const apiUrlLocal = 'http://localhost:8888';
// const apiUrl = 'http://13bdbf58.r7.cpolar.top';

// 静态资源地址
const staticeUrl =
  (process.env.NODE_ENV === 'production' ? apiUrlServer : 'http://localhost:8000') + '/static-cdn';

export default defineConfig({
  // layout: {
  //   title: 'Brick',
  // },
  npmClient: 'pnpm',
  // reactQuery: {},
  plugins: [],
  hash: true,
  esbuildMinifyIIFE: true,
  define: {
    'process.env.LOCAL_UI_MATERIAL': LOCAL_UI_MATERIAL,
  },
  routes,
  // 如果开启 monorepoRedirect后，也可以开启monorepoRedirect
  mfsu: true,
  // 是否开启monorepo重定向
  monorepoRedirect: {
    srcDir: ['packages', 'src'],
    peerDeps: true,
  },
  // legacy: {
  //   nodeModulesTransform: true,
  // },
  // extraBabelIncludes: [/@brick\//],
  model: {},
  // 禁用ts类型检查
  // forkTSChecker: {},
  externals: {
    'react': 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var window.PropTypes',
    '@alifd/next': 'var window.Next',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
    '@alilc/lowcode-editor-core': 'var window.AliLowCodeEngine.common.editorCabin',
    '@alilc/lowcode-editor-skeleton': 'var window.AliLowCodeEngine.common.skeletonCabin',
    '@alilc/lowcode-designer': 'var window.AliLowCodeEngine.common.designerCabin',
    '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
    '@ali/lowcode-engine': 'var window.AliLowCodeEngine',
    'moment': 'var window.moment',
    'lodash': 'var window._',
    'antd': 'var window.antd',
    'dayjs': 'var window.dayjs',
  },
  title: 'brick',
  styles: [
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/css/engine-core.css',
    // 'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.css',
    'https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light/0.2.0/next.min.css',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/css/engine-ext.css',
  ],
  headScripts: [
    // 先不使用React 18, React 18升级目前还有很多警告
    // TODO: development 生产环境需改成 production, 生产环境导致热更新失效
    {
      src: 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.development.min.js',
      defer: false,
    },
    {
      src: 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/18.2.0/umd/react-dom.development.min.js',
      defer: false,
    },
    // {
    //   src: 'https://g.alicdn.com/code/lib/react/17.0.2/umd/react.development.js',
    //   defer: false,
    // },
    // {
    //   src: 'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.development.js',
    //   defer: false,
    // },
    {
      src: 'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
      defer: false,
    },
    // {
    //   src: 'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
    //   defer: false,
    // },
    {
      src: 'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
      defer: false,
    },
    {
      src: 'https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js',
      defer: false,
    },
    {
      src: 'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js',
      defer: false,
    },
    {
      src: `${staticeUrl}/dayjs.min.js`,
      defer: false,
    },
    {
      src: `${staticeUrl}/antd.min.js`,
      defer: false,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js',
      defer: false,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js',
      defer: false,
    },
  ],
  proxy: {
    '/api': {
      target: LOCAL_PROXY ? apiUrlLocal : apiUrlServer,
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
