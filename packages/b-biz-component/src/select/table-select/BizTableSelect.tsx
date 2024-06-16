import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { useTableOptionsData } from './hooks';
import { useAsyncEffect } from 'ahooks';

export interface IBizTableSelectProps extends SelectProps {
  // 是否包含所有数据
  containAllData?: boolean;

  /**
   * 如果传入appid，会根据当前appId获取表
   */
  appId?: string;
}

export const BizTableSelect: FC<IBizTableSelectProps> = ({
  containAllData = true,
  appId,
  ...otherProps
}) => {
  const { queryOptions } = useTableOptionsData();
  const [data, setData] = useState<{ label: string; value: string }[]>();

  useAsyncEffect(async () => {
    const res = await queryOptions({ containAllData, appId });
    setData(res);
  }, [containAllData, appId]);

  // QueryFilter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      showSearch
      placeholder="请选择表格"
      optionFilterProp="children"
      filterOption={filterOption as any}
      {...otherProps}
      options={data}
    />
  );
};
