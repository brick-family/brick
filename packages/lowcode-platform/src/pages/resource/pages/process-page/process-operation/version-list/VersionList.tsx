import { Select } from 'antd';
import React, { FC } from 'react';
import { useProcessPageSelector } from '../../process-page-processor';

export interface IVersionListProps {}

export const VersionList: FC<IVersionListProps> = (props) => {
  const [versionList, selectVersion] = useProcessPageSelector((s) => [
    s.versionList,
    s.selectVersion,
  ]);

  return (
    <div>
      <Select value={selectVersion?.id} style={{ width: 150 }}>
        {versionList?.map((item) => {
          return (
            <Select.Option key={item.id} value={item.id}>
              流程版本V{item.version}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};
