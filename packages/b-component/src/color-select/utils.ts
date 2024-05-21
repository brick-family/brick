import {
  blue,
  cyan,
  geekblue,
  gold,
  green,
  grey,
  lime,
  magenta,
  purple,
  red,
  volcano,
  yellow,
} from '@ant-design/colors';

export const colorList = [
  'blue-5',
  'red-5',
  'volcano-5',
  'gold-5',
  'yellow-5',
  'geekblue-5',
  'lime-5',
  'green-5',
  'cyan-5',
  'purple-5',
  'magenta-5',
  'grey-5',
];

export const baseColorMap = {
  blue: blue,
  red: red,
  volcano: volcano,
  gold: gold,
  yellow: yellow,
  geekblue: geekblue,
  lime: lime,
  green: green,
  cyan: cyan,
  purple: purple,
  magenta: magenta,
  grey: grey,
};

/**
 * 获取具体的颜色值
 * @param color
 */
export const getColor = (color: string) => {
  if (isCustomerColor(color)) return color;
  const [prefix, number] = color?.split?.('-');

  return baseColorMap?.[prefix as unknown as keyof typeof baseColorMap]?.[
    number as unknown as number
  ];
};

/**
 * 判断是否是自定义颜色
 * @param color
 */
export const isCustomerColor = (color: string) => {
  return color?.startsWith?.('#');
};
