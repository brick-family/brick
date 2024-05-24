import { ScreenshotPrefix } from '../_utils/util';
import { FieldParentWhitelist } from '../common/CommonRule';
import {
  getComponentNameProps,
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { OptionsSetter } from '../_setters/options-setter';
import { DefaultOptionsConstant } from '@brick/utils';

const FieldInputMeta = {
  componentName: 'FieldSelect',
  title: '下拉框',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 94,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldSelect',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldSelect'),
      getTitleProps('下拉框'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: '自定义选项',
        },
        type: 'group',
        name: 'options',
        description: '校验',
        display: 'accordion',
        items: [
          {
            title: {
              label: '',
            },
            display: 'plain',
            name: 'columnConfig.options',
            supportVariable: false,
            setter: {
              componentName: OptionsSetter,
              props: {
                type: 'radio',
              },
              // 默认选项数据
              initialValue: DefaultOptionsConstant,
            },
          },
        ],
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
    title: '下拉框',
    screenshot: `${ScreenshotPrefix}/select.svg`,
    schema: {
      componentName: 'FieldSelect',
      props: {},
    },
  },
];

export default {
  ...FieldInputMeta,
  snippets,
};
