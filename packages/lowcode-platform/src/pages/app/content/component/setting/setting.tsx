import { Dropdown, MenuProps } from 'antd';
import React, { FC } from 'react';
import { useParams, history } from 'umi';

export interface ISettingProps {
  // 应用id
  aId?: string;
  // 资源id
  resourceId?: string;
}

export const SettingButton: FC<ISettingProps> = ({}) => {
  const { aId, resourceId } = useParams();
  const items: MenuProps['items'] = [
    {
      label: '表单设计',
      key: '1',
    },
    {
      label: '页面设计',
      key: '2',
    },
  ];

  const goToEdit = () => {
    location.href = `/app/${aId}/${resourceId}/design`;
    // history.push(`/app/${aId}/${resourceId}/design`);
    // location.reload();
  };
  return (
    <Dropdown.Button type="primary" menu={{ items }} onClick={goToEdit}>
      编辑表单
    </Dropdown.Button>
  );
};
