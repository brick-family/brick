import { ScreenshotPrefix } from '../_utils/util';
import { getComponentNameProps } from '../common';

const FieldLayoutColMeta = {
  componentName: 'FieldLayoutCol',
  title: '布局',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldLayoutCol',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldLayoutCol'),
      // {
      //   title: {
      //     label: '列数',
      //   },
      //   name: 'colNumber',
      //   supportVariable: false,
      //   setter: {
      //     componentName: NumberSetter,
      //     props: {},
      //     initialValue: 2,
      //   },
      // },
      // {
      //   title: {
      //     label: '列比例',
      //   },
      //   name: 'proportion',
      //   supportVariable: false,
      //   setter: {
      //     componentName: StringSetter,
      //     props: {},
      //     initialValue: '12:12',
      //   },
      // },
      // {
      //   title: {
      //     label: '行间距',
      //   },
      //   name: 'rowSpace',
      //   supportVariable: false,
      //   setter: {
      //     componentName: SelectSetter,
      //     props: {
      //       options: LayoutSpace,
      //     },
      //     initialValue: 16,
      //   },
      // },
    ],
    supports: {
      style: false,
    },
    component: {
      isContainer: true,
      nestingRule: { parentWhitelist: ['FieldLayout'] },
      disableBehaviors: ['remove'],
    },
  },
};
const snippets = [
  {
    title: '布局',
    screenshot: `${ScreenshotPrefix}/date.svg`,
    // schema: {
    //   componentName: 'FieldLayoutCol',
    //   props: {},
    // },
    schema: {
      // componentName: 'FieldLayoutCol',
      // props: {},
      // children: [
      //   {
      //     componentName: 'FieldLayoutColCol',
      //     props: {
      //       span: 8,
      //     },
      //   },
      //   {
      //     componentName: 'FieldLayoutColCol',
      //     props: {
      //       span: 8,
      //     },
      //   },
      //   {
      //     componentName: 'FieldLayoutColCol',
      //     props: {
      //       span: 8,
      //     },
      //   },
      // ],
    },
  },
];

export default {
  ...FieldLayoutColMeta,
  // snippets,
};
