import React, { FC } from 'react';
import { Segmented } from 'antd';
import { SetterHoc } from '../../common';

export interface ISegmentedSetterProps {
  onChange: (value: string) => void;
  value?: any;
  defaultValue?: any;
  options: any[];
}

const SegmentedSetterFun: FC<ISegmentedSetterProps> = ({
  options = [{ label: '-', value: '' }],
  onChange,
  value,
}) => {
  return (
    <Segmented
      value={value}
      block
      style={{ width: '100%' }}
      size={'small'}
      options={options}
      onChange={(val) => {
        onChange?.(val as any);
      }}
    />
  );
};

// export const SegmentedSetter = SegmentedSetterFun;
export const SegmentedSetter = SetterHoc(SegmentedSetterFun);
