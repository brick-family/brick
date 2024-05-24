import { ScreenshotPrefix } from '../_utils/util';
import {
  getComponentNameProps,
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { RichDefaultValueSetter } from './_setters';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldRichMeta = {
  componentName: 'FieldRich',
  title: '富文本',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldRich',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldRich'),
      getTitleProps('富文本'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: {
            'type': 'i18n',
            'en-US': 'format',
            'zh-CN': '默认值',
          },
        },
        name: 'columnConfig.defaultValue',
        supportVariable: false,
        setter: {
          componentName: RichDefaultValueSetter,
        },
      },
      {
        title: {
          label: {
            'type': 'i18n',
            'en-US': 'isRequired',
            'zh-CN': '校验',
          },
        },
        type: 'group',
        name: 'valid',
        description: '校验',
        display: 'accordion',
        items: [getRequireProps()],
      },
    ],
    supports: {
      style: false,
    },
    component: {
      nestingRule: {
        // // 允许拖入的组件白名单
        // childWhitelist: ['Table', 'Button'],
        // 同理也可以设置该组件允许被拖入哪些父组件里
        parentWhitelist: [...FieldParentWhitelist],
      },
    },
  },
};
const snippets = [
  {
    title: '富文本',
    screenshot: `${ScreenshotPrefix}/rich.svg`,
    schema: {
      componentName: 'FieldRich',
      props: {},
    },
  },
];

export default {
  ...FieldRichMeta,
  snippets,
};
