import { BoolSetter, SegmentedSetter, StringSetter } from '../_setters';

// 获取标题方法
export const getTitleProps = (title: string) => {
  return {
    title: {
      label: {
        'type': 'i18n',
        'en-US': 'title',
        'zh-CN': '标题',
      },
      // tip: '属性：title',
    },
    name: 'title',
    description: '标题',
    supportVariable: false,
    setter: {
      componentName: StringSetter,
      isRequired: true,
      initialValue: title,
      props: {
        placeholder: '请输入标题',
      },
    },
  };
};

// 占位提示

export const getPlaceholderProps = () => {
  return {
    title: {
      label: {
        'type': 'i18n',
        'en-US': '占位提示',
        'zh-CN': '占位提示',
      },
      // tip: '属性：placeholder',
    },
    name: 'columnConfig.placeholder',
    supportVariable: false,
    setter: {
      componentName: StringSetter,
      isRequired: true,
      props: {
        placeholder: '请输入',
      },
    },
  };
};

// 描述
export const getDescriptionProps = () => {
  return {
    title: {
      label: {
        'type': 'i18n',
        'en-US': 'description',
        'zh-CN': '描述',
      },
      // tip: '属性：description',
    },
    name: 'columnConfig.description',
    description: '描述',
    supportVariable: false,
    setter: {
      componentName: StringSetter,
      isRequired: false,
      props: {
        placeholder: '请输入描述',
      },
    },
  };
};

// 状态
export const getStatusProps = () => {
  return {
    title: {
      label: {
        'type': 'i18n',
        'en-US': 'status',
        'zh-CN': '状态',
      },
    },
    name: 'columnConfig.status',
    supportVariable: false,
    setter: {
      componentName: SegmentedSetter,
      props: {
        options: [
          {
            label: '普通',
            value: '1',
          },
          {
            label: '禁用',
            value: '2',
          },
          {
            label: '只读',
            value: '3',
          },
        ],
      },
      isRequired: true,
      initialValue: '1',
    },
  };
};

/**
 * 校验
 */

// 是否必填
export const getRequireProps = () => {
  return {
    title: {
      label: {
        'type': 'i18n',
        'en-US': 'isRequired',
        'zh-CN': '是否必填',
      },
      // tip: 'isRequired | 是否必填',
    },
    name: 'isRequired',
    description: '是否必填',
    setter: BoolSetter,
    supportVariable: false,
  };
};

// 是否重复
export const getRepeatProps = () => ({
  name: 'isRepeat',
  title: {
    label: {
      type: 'i18n',
      zh_CN: '不允许重复值',
      en_US: 'Name',
    },
    // tip: 'isRepeat | 不允许重复值',
  },
  supportVariable: false,
  setter: BoolSetter,
});

// 列数
export const getColsProps = () => {
  return {
    name: 'cols',
    title: {
      label: {
        type: 'i18n',
        zh_CN: '列数',
        en_US: 'cols',
      },
      // tip: 'cols | 不允许重复值',
    },
    supportVariable: false,
    setter: {
      title: '列数',
      componentName: SegmentedSetter,
      isRequired: true,
      props: {
        options: [
          {
            label: '1列',
            value: 1,
          },
          {
            label: '2列',
            value: 2,
          },
        ],
      },
      initialValue: 1,
    },
  };
};
