import { ProCard } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import React, { FC, memo, useState } from 'react';
import { Role } from './role';
import { useMemoizedFn } from 'ahooks';
import { Dept } from './dept';
import { User } from './user';
import { InternalProvider, useInternalSelector } from './internal-processor';
import s from './internal.less';

export interface IInternalContentProps {}

export const InternalContent: FC<IInternalContentProps> = memo((props) => {
  const options = [
    { label: '部门', value: 'dept' },
    { label: '角色', value: 'role' },
  ];
  const [value, setValue] = useState<'dept' | 'role'>('dept');

  const [selectData] = useInternalSelector((s) => [s.selectData]);

  const onChange = useMemoizedFn((v) => {
    setValue(v);
  });

  return (
    <ProCard split="vertical" className={s.internal}>
      <ProCard className={s.left} colSpan="30%">
        <Segmented value={value} options={options} block onChange={onChange} />
        {value === 'dept' ? <Dept /> : <Role />}
      </ProCard>
      <ProCard
        className={s.right}
        bodyStyle={{ padding: '0 !important' }}
        title={selectData?.name}
        headerBordered
      >
        <User type={value} />
      </ProCard>
    </ProCard>
  );
});

export interface IInternalProps {}

export const Internal: FC<IInternalProps> = (props) => {
  return (
    <InternalProvider>
      <InternalContent />
    </InternalProvider>
  );
};
export default Internal;
