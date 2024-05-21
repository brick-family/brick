import React, { FC } from 'react';
import { IResourcePermListVo } from '@brick/services';
import { DeptLabel, RoleLabel, UserLabel } from '@/components/label';
import s from './tagList.less';
import { Space } from 'antd';

export interface ITagListProps {
  data: IResourcePermListVo;
}

export const TagList: FC<ITagListProps> = ({ data }) => {
  return (
    <div className={s.list}>
      <Space wrap>
        {data.roleList?.map((item) => (
          <RoleLabel key={item.id} name={item.name} />
        ))}
        {data.deptList?.map((item) => (
          <DeptLabel key={item.id} name={item.name} />
        ))}
        {data.useList?.map((item) => (
          <UserLabel key={item.id} name={item.name} />
        ))}
      </Space>
    </div>
  );
};
