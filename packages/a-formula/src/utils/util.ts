/**
 * 获取标签类型
 * @param type
 * @returns
 */
export const getLabelType = (type: string) => {
  let str = '';
  switch (type) {
    case 'text':
      str = '文字';
      break;
    case 'number':
      str = '数字';
      break;
    case 'date':
      str = '时间';
      break;
    case 'array':
      str = '数组';
      break;
    case 'object':
      str = '对象';
      break;
    case 'unknown':
      str = '未知';
      break;
    default:
      break;
  }
  return str;
};
