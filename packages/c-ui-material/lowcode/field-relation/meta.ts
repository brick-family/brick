import { ScreenshotPrefix } from '../_utils/util';
import {
  getDescriptionProps,
  getPlaceholderProps,
  getRequireProps,
  getStatusProps,
  getTitleProps,
} from '../common';
import { AppSelectSetter, FilterSetter, SelectTypeSetter, SortSetter } from '../_setters';
import { FieldParentWhitelist } from '../common/CommonRule';
import { RelationColumnSelectSetter } from './_setters/relation-column-select-setter';
import { LabelSelectSetter } from './_setters/label-select-setter';

const FieldRelationMeta = {
  componentName: 'FieldRelation',
  title: '关联数据',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldRelation',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getTitleProps('关联数据'),
      getPlaceholderProps(),
      getDescriptionProps(),
      getStatusProps(),
      {
        title: {
          label: '多选',
        },
        name: 'columnConfig.selectType',
        supportVariable: false,
        setter: {
          componentName: SelectTypeSetter,
          props: {},
        },
      },
      {
        type: 'group',
        name: '关联属性',
        description: '关联属性',
        display: 'accordion',
        items: [
          {
            title: {
              label: '关联表单',
            },
            name: 'columnConfig.relationTableId',
            supportVariable: false,
            setter: {
              componentName: AppSelectSetter,
              props: {},
            },
          },
          {
            title: {
              label: '主标题',
            },
            name: 'columnConfig.labelFieldId',
            supportVariable: false,
            setter: {
              componentName: LabelSelectSetter,
              props: {},
            },
          },
          {
            title: {
              label: '显示设置',
            },
            name: 'columnConfig.displayFieldIds',
            supportVariable: false,
            setter: {
              componentName: RelationColumnSelectSetter,
              props: {},
            },
          },
          {
            title: {
              label: '筛选',
            },
            name: 'columnConfig.filter',
            supportVariable: false,
            setter: {
              componentName: FilterSetter,
              props: {},
            },
          },
          {
            title: {
              label: '排序',
            },
            name: 'columnConfig.sort',
            supportVariable: false,
            setter: {
              componentName: SortSetter,
              props: {},
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
    extraProps: {},
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
    title: '关联数据',
    screenshot: `${ScreenshotPrefix}/relation.svg`,
    schema: {
      componentName: 'FieldRelation',
      props: {},
    },
  },
];

export default {
  ...FieldRelationMeta,
  snippets,
};
