import React, { FC } from 'react';
import { SelectProps } from 'antd/es/select';
import { Select } from 'antd';
import { useAppOptionsData } from './hooks';

export interface IBizAppSelectProps extends SelectProps {}

export const BizAppSelect: FC<IBizAppSelectProps> = (props) => {
  const { ...otherProps } = props;
  const { options } = useAppOptionsData();

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      showSearch
      placeholder="请选择应用"
      optionFilterProp="children"
      filterOption={filterOption as any}
      {...otherProps}
      options={options}
    />
  );
};
