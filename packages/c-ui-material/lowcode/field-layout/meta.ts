import { ScreenshotPrefix } from '../_utils/util';
import { SelectSetter } from '../_setters';
import { getComponentNameProps, LayoutSpace } from '../common';
import { ProportionSetter } from './_setters';

const FieldLayoutMeta = {
  componentName: 'FieldLayout',
  title: '布局',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '高级',
  priority: 77,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldLayout',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldLayout'),
      {
        title: {},
        // 设置没有left内容
        display: 'plain',
        name: 'proportion',
        supportVariable: false,
        setter: {
          componentName: ProportionSetter,
          props: {},
          initialValue: { colNumber: 1, proportion: '12' },
        },
      },
      {
        title: {
          label: '行间距',
        },
        name: 'rowSpace',
        supportVariable: false,
        setter: {
          componentName: SelectSetter,
          props: {
            options: LayoutSpace,
          },
          initialValue: 16,
        },
      },
    ],
    supports: {
      style: false,
    },
    component: {
      // isContainer: true,
      nestingRule: { childWhitelist: ['FieldLayoutCol'] },
    },
  },
};
const snippets = [
  {
    title: '布局',
    screenshot: `${ScreenshotPrefix}/date.svg`,
    // schema: {
    //   componentName: 'FieldLayout',
    //   props: {},
    // },
    schema: {
      componentName: 'FieldLayout',
      props: {},
      children: [
        {
          componentName: 'FieldLayoutCol',
        },
        {
          componentName: 'FieldLayoutCol',
        },
        {
          componentName: 'FieldLayoutCol',
        },
        {
          componentName: 'FieldLayoutCol',
        },
        {
          componentName: 'FieldLayoutCol',
        },
        {
          componentName: 'FieldLayoutCol',
        },
      ],
    },
  },
];

export default {
  ...FieldLayoutMeta,
  snippets,
};
