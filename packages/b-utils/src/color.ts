/**
 * 判断颜色是否为白色
 * @param color
 * @returns
 */
export const isWhite = (color: string) => {
  return ['#fff', 'rgb(255, 255, 255)', ''].includes(color.toLowerCase());
};
