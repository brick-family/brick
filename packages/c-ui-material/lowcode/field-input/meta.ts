import { ScreenshotPrefix } from '../_utils/util';
import {
  getColsProps,
  getComponentNameProps,
  getDefaultValueTypeData,
  getDescriptionProps,
  getPlaceholderProps,
  getRepeatProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { DefaultValueSetterNew, SelectSetter } from '../_setters';
import { EFieldType } from '@brick/types';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldInputMeta = {
  componentName: 'FieldInput',
  title: '单行文本',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 100,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldInput',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldInput'),
      getTitleProps('单行文本'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: '格式',
        },
        name: 'columnConfig.format',
        supportVariable: false,
        setter: {
          componentName: SelectSetter,
          props: {
            options: [
              {
                label: '默认',
                value: 1,
              },
              {
                label: '手机号',
                value: 2,
              },
              {
                label: '邮箱',
                value: 3,
              },
              {
                label: '身份证号码',
                value: 4,
              },
              {
                label: '密码',
                value: 5,
              },
            ],
          },
          isRequired: false,
          initialValue: 1,
        },
      },
      {
        title: {
          label: '默认值',
        },
        name: 'columnConfig.defaultValueType',
        supportVariable: false,
        setter: {
          componentName: SelectSetter,
          props: {
            options: getDefaultValueTypeData(EFieldType.STRING),
            changeReRenderEvent: true,
          },
          isRequired: false,
          initialValue: '1',
        },
      },
      {
        title: {
          label: '', //默认值具体的类型
        },
        name: 'columnConfig.defaultValue',
        supportVariable: false,
        setter: {
          componentName: DefaultValueSetterNew,
          props: {
            fieldType: EFieldType.STRING,
          },
          isRequired: false,
          initialValue: '',
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
        items: [getRequireProps(), getRepeatProps(), getColsProps()],
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
    title: '单行文本',
    screenshot: `${ScreenshotPrefix}/input.svg`,
    schema: {
      componentName: 'FieldInput',
      props: {},
    },
  },
];

export default {
  ...FieldInputMeta,
  snippets,
};
