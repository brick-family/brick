const FormContainerMeta = {
  componentName: 'FormContainer',
  title: '表单',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  hidden: true,
  // "schema": {hidden: true},
  category: '基础字段',
  npm: {
    package: 'contain-ui-material',
    version: '0.1.4',
    exportName: 'FormContainer',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      {
        title: {
          label: {
            'type': 'i18n',
            'en-US': 'cols',
            'zh-CN': '列数',
          },
        },
        name: 'cols',
        supportVariable: false,
        setter: {
          title: '列数',
          componentName: 'RadioGroupSetter',
          isRequired: true,
          props: {
            options: [
              {
                label: '1列',
                value: 1,
              },
              {
                label: '2列',
                value: 2,
              },
              // {
              //   "label": "3列",
              //   "value": 3,
              // }, {
              //   "label": "4列",
              //   "value": 4
              // }
            ],
          },
          initialValue: 1,
        },
      },
    ],
    supports: {
      // "style": true
      // events: ['saveField', 'onSubmit', 'onChange'],
    },
    component: {
      isContainer: true,
      isMinimalRenderUnit: true,
      // 允许拖入的组件白名单
      // childWhitelist: ['Table', 'Button'],
      // 同理也可以设置该组件允许被拖入哪些父组件里
      // parentWhitelist: ['Tab'],
    },
  },
};
const snippets = [
  {
    title: '表单',
    screenshot: '',
    // "hidden": true,
    schema: {
      componentName: 'FormContainer',
      props: {
        cols: 2,
      },
    },
  },
];

export default {
  ...FormContainerMeta,
  snippets,
};
