import { EFieldType } from '@brick/types';

const currDate = {
  value: '4',
  label: '填写当时',
  disabled: false,
};
const data = [
  {
    value: '1',
    label: '自定义',
    disabled: false,
  },
  {
    value: '2',
    label: '公式',
    disabled: false,
  },
  {
    value: '3',
    label: '数据联动',
    disabled: true,
  },
];

/**
 * 获取默认值类型数据
 * @param fieldType
 */
export const getDefaultValueTypeData = (fieldType: EFieldType) => {
  switch (fieldType) {
    case EFieldType.STRING:
    case EFieldType.TEXT:
    case EFieldType.DECIMAL:
      return data;
    case EFieldType.DATE:
      return [currDate, ...data];
    // case EFieldType.SELECT:
    //   return [data[0], data[1]];
    case EFieldType.USER:
      return [data[0]];

    default:
      return data;
  }
};

/**
 * 间距数据内容
 */

export const LayoutSpace = [
  {
    label: '16px',
    value: 16,
  },
  {
    label: '20px',
    value: 20,
  },
  {
    label: '25px',
    value: 25,
  },
];
