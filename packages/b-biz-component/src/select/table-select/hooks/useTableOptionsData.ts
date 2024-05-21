import { queryResourceByResourceType } from '@brick/services';
import { EResourceType } from '@brick/types';
import { useMemoizedFn } from 'ahooks';

export const useTableOptionsData = () => {
  /**
   * 获取所有表格数据
   */
  const queryOptions = useMemoizedFn(async (containAllData?: boolean) => {
    const res = await queryResourceByResourceType(EResourceType.TABLE);

    let data = [];
    if (containAllData) {
      data.push({
        label: '全部表单',
        value: '',
      });
    }
    res?.forEach((item) => {
      data.push({
        label: item.title,
        value: item.id,
      });
    });
    return data;
  });

  return { queryOptions };
};
