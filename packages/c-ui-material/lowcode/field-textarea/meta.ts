import { ScreenshotPrefix } from '../_utils/util';
import {
  getComponentNameProps,
  getDefaultValueTypeData,
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { DefaultValueSetterNew, SelectSetter } from '../_setters';
import { EFieldType } from '@brick/types';
import { FieldParentWhitelist } from '../common/CommonRule';

const FiledTextareaMeta = {
  componentName: 'FieldTextarea',
  title: '多行文本',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 99,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.10',
    exportName: 'FieldTextarea',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldTextarea'),
      getTitleProps('多行文本'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: '默认值',
        },
        name: 'columnConfig.defaultValueType',
        supportVariable: false,
        setter: {
          componentName: SelectSetter,
          props: {
            options: getDefaultValueTypeData(EFieldType.TEXT),
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
            fieldType: EFieldType.TEXT,
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
        items: [getRequireProps()],
      },
    ],
    supports: {
      style: true,
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
    title: '多行文本',
    screenshot: `${ScreenshotPrefix}/textarea.svg`,
    schema: {
      componentName: 'FieldTextarea',
      props: {},
    },
  },
];

export default {
  ...FiledTextareaMeta,
  snippets,
};
