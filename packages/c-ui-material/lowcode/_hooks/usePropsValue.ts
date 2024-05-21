import { useMemoizedFn } from 'ahooks';

export const usePropsValue = (props: any) => {
  /**
   * 获取当前字段的属性值
   * @param key
   * @returns
   */

  const getPropValue = useMemoizedFn((key: string) => {
    const propsField = props?.field?.parent;
    // 获取同级其他属性 showJump 的值
    return propsField.getPropValue(key);
  });

  const setPropsValue = useMemoizedFn((key: string, value: any) => {
    const propsField = props?.field?.parent;
    // 获取同级其他属性 showJump 的值
    propsField.setPropValue(key, value);
  });

  return {
    getPropValue,
    setPropsValue,
  };
};
