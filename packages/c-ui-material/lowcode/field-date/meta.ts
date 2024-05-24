import { ScreenshotPrefix } from '../_utils/util';
import { DefaultValueSetterNew, SelectSetter } from '../_setters';
import {
  getComponentNameProps,
  getDefaultValueTypeData,
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { EFieldType } from '@brick/types';
import { DateFormatConstant } from '@brick/utils';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldDateMeta = {
  componentName: 'FieldDate',
  title: '日期',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 97,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldDate',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getComponentNameProps('FieldDate'),
      getTitleProps('日期'),
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
            options: DateFormatConstant,
            changeReRenderEvent: true,
          },
          initialValue: 2,
        },
      },
      {
        title: {
          label: '默认值',
        },
        supportVariable: false,
        name: 'columnConfig.defaultValueType',
        setter: {
          componentName: SelectSetter,
          props: {
            options: getDefaultValueTypeData(EFieldType.DATE),
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
            fieldType: EFieldType.DATE,
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
    title: '日期',
    screenshot: `${ScreenshotPrefix}/date.svg`,
    schema: {
      componentName: 'FieldDate',
      props: {},
    },
  },
];

export default {
  ...FieldDateMeta,
  snippets,
};
