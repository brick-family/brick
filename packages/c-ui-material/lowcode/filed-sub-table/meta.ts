import { ScreenshotPrefix } from '../_utils/util';
import { getDescriptionProps, getRequireProps, getStatusProps, getTitleProps } from '../common';
import { FilterSetter, SortSetter } from '../_setters';
import { DataSourceSelectSetter, SubTableColumnSelectSetter } from './_setters';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldSubTableMeta = {
  componentName: 'FieldSubTable',
  title: '关联数据',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '基础字段',
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldSubTable',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getTitleProps('子表单'),
      getDescriptionProps(),
      getStatusProps(),
      {
        type: 'group',
        name: '关联属性',
        description: '关联属性',
        display: 'accordion',
        items: [
          {
            title: {
              label: '数据源',
            },
            name: 'columnConfig.subTableId',
            supportVariable: false,
            setter: {
              componentName: DataSourceSelectSetter,
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
              componentName: SubTableColumnSelectSetter,
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
    title: '子表单',
    screenshot: `${ScreenshotPrefix}/sub-table.svg`,
    schema: {
      componentName: 'FieldSubTable',
      props: {},
    },
  },
];

export default {
  ...FieldSubTableMeta,
  snippets,
};
