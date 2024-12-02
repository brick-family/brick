import { EFlowModelStatus, IFlowModelVo } from '@brick/types';
import { Select, Tag } from 'antd';
import React, { FC } from 'react';
import { useProcessPageSelector } from '../../process-page-processor';

export interface IVersionListProps {
  onSelect?: (value: IFlowModelVo) => void;
}

const STATUS_MAP = {
  [EFlowModelStatus.DESIGNING]: {
    color: 'orange',
    label: '设计中',
  },
  [EFlowModelStatus.HISTORY]: {
    color: '',
    label: '历史版本',
  },
  [EFlowModelStatus.USING]: {
    color: 'green',
    label: '使用中',
  },
};

export const VersionList: FC<IVersionListProps> = (props) => {
  const { onSelect } = props;
  const [versionList, selectVersion] = useProcessPageSelector((s) => [
    s.versionList,
    s.selectVersion,
  ]);

  const renderItem = (item: IFlowModelVo) => {
    const status = STATUS_MAP[item.status];
    return (
      <>
        流程版本V{item.version}
        <Tag style={{ marginLeft: 8 }} bordered={false} color={status?.color}>
          {status?.label}
        </Tag>
      </>
    );
  };

  const handleSelect = (value: string) => {
    const currVersion = versionList?.find((f) => f.id === value);
    if (currVersion) {
      console.log('q=>111', currVersion.metaInfo);
      onSelect?.(currVersion);
    }
  };

  return (
    <div>
      <Select value={selectVersion?.id} style={{ width: 190 }} onSelect={handleSelect}>
        {versionList?.map((item) => {
          return (
            <Select.Option key={item.id} value={item.id}>
              {renderItem(item)}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};
