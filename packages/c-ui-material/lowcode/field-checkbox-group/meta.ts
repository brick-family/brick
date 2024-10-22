import { ScreenshotPrefix } from '../_utils/util';
import {
  getComponentNameProps,
  getDescriptionProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { SegmentedSetter } from '../_setters';
import { EColumnRadioDirection } from '@brick/types';
import { OptionsSetter } from '../_setters/options-setter';
import { DefaultOptionsConstant } from '@brick/utils';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldCheckboxGroupMeta = {
  componentName: 'FieldCheckboxGroup',
  title: '复选框组',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 95,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldCheckboxGroup',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldCheckboxGroup'),
      getTitleProps('复选框组'),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: '排列方式',
        },
        name: 'columnConfig.direction',
        display: 'none', // TODO 测试display noe是否OK
        supportVariable: false,
        setter: {
          componentName: SegmentedSetter,
          props: {
            options: [
              {
                label: '水平',
                value: EColumnRadioDirection?.horizontal,
              },
              {
                label: '垂直',
                value: EColumnRadioDirection?.vertical,
              },
            ],
          },
          initialValue: EColumnRadioDirection?.horizontal,
        },
      },
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
                type: 'checkbox',
              },
              // 默认选项数据
              initialValue: DefaultOptionsConstant,
            },
            // 更改其它选项
            // extraProps: OptionsSetterExtraProps,
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
    title: '复选框组',
    screenshot: `${ScreenshotPrefix}/checkbox-group.svg`,
    schema: {
      componentName: 'FieldCheckboxGroup',
      props: {},
    },
  },
];

export default {
  ...FieldCheckboxGroupMeta,
  snippets,
};
