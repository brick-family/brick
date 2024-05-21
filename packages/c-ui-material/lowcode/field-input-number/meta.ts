import { BoolSetter, DefaultValueSetterNew, NumberSetter, SelectSetter } from '../_setters';
import { ScreenshotPrefix } from '../_utils/util';
import {
  getDefaultValueTypeData,
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { EFieldType } from '@brick/types';
import { NumberRangeSetter } from './_setters/number-range-setter';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldInputNumberMeta = {
  componentName: 'FieldInputNumber',
  title: '数字',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  priority: 98,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldInputNumber',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getTitleProps('数字'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: {
            'type': 'i18n',
            'en-US': 'format',
            'zh-CN': '格式',
          },
        },
        name: 'columnConfig.format',
        supportVariable: false,
        setter: {
          componentName: SelectSetter,
          props: {
            changeReRenderEvent: true,
            // 格式的变动，需要刷新下默认值的状态
            // onChangeEvent: emitFormatEvent,
            options: [
              {
                label: '数值',
                value: 1,
              },
              {
                label: '百分比',
                value: 2,
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
            options: getDefaultValueTypeData(EFieldType.DECIMAL),
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
            fieldType: EFieldType.DECIMAL,
          },
          isRequired: false,
          initialValue: '',
        },
      },
      {
        title: {
          label: {
            'type': 'i18n',
            'en-US': '小数位',
            'zh-CN': '小数位',
          },
          tip: '最多保留四位小数',
        },
        name: 'columnConfig.decimalPlace',
        supportVariable: false,
        setter: {
          componentName: NumberSetter,
          isRequired: true,
          initialValue: '0',
          props: {
            min: 0,
            max: 4,
          },
        },
      },
      {
        title: {
          label: '千分位',
          tip: '是否显示千分位',
        },
        name: 'columnConfig.thousands',
        setter: BoolSetter, // ThousandsBoolSetter,
        supportVariable: false,
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
        items: [
          getRequireProps(),
          {
            title: {
              label: '数字范围',
            },
            name: 'validateConfig.numberRange',
            supportVariable: false,
            setter: {
              componentName: NumberRangeSetter,
            },
          },
        ],
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
    title: '数字',
    screenshot: `${ScreenshotPrefix}/number.svg`,
    schema: {
      componentName: 'FieldInputNumber',
      props: {},
    },
  },
];

export default {
  ...FieldInputNumberMeta,
  snippets,
};
