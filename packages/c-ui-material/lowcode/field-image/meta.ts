import { ScreenshotPrefix } from '../_utils/util';
import { getDescriptionProps, getRequireProps, getStatusProps, getTitleProps } from '../common';
import { NumberSetter, SegmentedSetter, SelectTypeSetter, StringSetter } from '../_setters';
import { EColumnUploadType } from '@brick/types';
import { FieldParentWhitelist } from '../common/CommonRule';

const FieldImageMeta = {
  componentName: 'FieldImage',
  title: '图片',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  group: '基础组件',
  category: '高级',
  priority: 79,
  npm: {
    package: 'contain-ui-material',
    version: '0.1.3',
    exportName: 'FieldImage',
    main: 'src/index.ts',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      getTitleProps('图片'),
      getDescriptionProps(),
      getStatusProps(),
      {
        type: 'group',
        name: '上传详情设置',
        description: '上传详情设置',
        display: 'accordion',
        items: [
          {
            title: {
              label: '上传类型',
            },
            name: 'columnConfig.uploadType',
            supportVariable: false,
            setter: {
              componentName: SegmentedSetter,
              props: {
                options: [
                  {
                    label: '点击',
                    value: EColumnUploadType.click,
                  },
                  {
                    label: '托拽',
                    value: EColumnUploadType.drag,
                  },
                  {
                    label: '卡片',
                    value: EColumnUploadType.card,
                  },
                ],
              },
              initialValue: EColumnUploadType.click,
            },
          },
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
            title: {
              label: '按钮内容',
            },
            name: 'columnConfig.uploadText',
            supportVariable: false,
            setter: {
              componentName: StringSetter,
              props: {},
              initialValue: '图片上传',
            },
          },
          {
            title: {
              label: '最大上传数量',
            },
            name: 'columnConfig.maxCount',
            supportVariable: false,
            setter: {
              componentName: NumberSetter,
              props: {},
            },
          },
          {
            title: {
              label: '单文件最大大小(MB)',
            },
            name: 'columnConfig.maxSize',
            supportVariable: false,
            setter: {
              componentName: NumberSetter,
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
    title: '图片',
    screenshot: `${ScreenshotPrefix}/input.svg`,
    schema: {
      componentName: 'FieldImage',
      props: {},
    },
  },
];

export default {
  ...FieldImageMeta,
  snippets,
};
