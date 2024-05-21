import React, { useEffect, useState } from 'react';
import type { TransferProps } from 'antd';
import { Transfer } from 'antd';
import { IRoleEntity } from '@brick/types';
import { useTransferSelectSelector } from '../transfer-select-processor';

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

export const RoleSelect: React.FC = () => {
  const [roleList, queryRoleList, targetKeys, setTargetKeys] = useTransferSelectSelector((s) => [
    s.roleProcessor.roleList,
    s.roleProcessor.requestRoleListAll,
    s.targetKeys,
    s.setTargetKeys,
  ]);
  // const [mockData, setMockData] = useState<RecordType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState([] as any);
  // const getMock = () => {
  //   const tempTargetKeys = [];
  //   const tempMockData = [];
  //   for (let i = 0; i < 20; i++) {
  //     const data = {
  //       key: i.toString(),
  //       title: `content${i + 1}`,
  //       description: `description of content${i + 1}`,
  //       chosen: i % 2 === 0,
  //     };
  //     if (data.chosen) {
  //       tempTargetKeys.push(data.key);
  //     }
  //     tempMockData.push(data);
  //   }
  //   setMockData(tempMockData);
  //   setTargetKeys(tempTargetKeys);
  // };

  // useEffect(() => {
  //   getMock();
  // }, []);
  useEffect(() => {
    queryRoleList();
  }, []);

  console.log('roleList', roleList);

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const filterOption = (inputValue: string, option: IRoleEntity) =>
    option?.name?.indexOf(inputValue) > -1 || option?.title?.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };
  console.log('setTargetKeys', targetKeys);

  return (
    <Transfer
      dataSource={roleList.data || []}
      showSearch
      style={{ height: '90%' }}
      listStyle={() => {
        return { height: '100%' };
      }}
      rowKey={(record: any) => record.id}
      filterOption={filterOption}
      targetKeys={targetKeys}
      onSelectChange={onSelectChange}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      render={(item: any) => item.name}
    />
  );
};
