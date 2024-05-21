import React, { FC, useEffect, useMemo } from 'react';
import { Transfer } from '@douyinfe/semi-ui';
import { useTransferSelectSelector } from '../transfer-select-processor';

export interface IAppSelectProps {}

export const AppSelect: FC<IAppSelectProps> = (props) => {
  const [appListResponse, queryAppList, targetKeys, setTargetKeys] = useTransferSelectSelector(
    (s) => [
      s.appProcessor.queryAppListResponse,
      s.appProcessor.queryAppList,
      s.targetKeys,
      s.setTargetKeys,
    ]
  );

  useEffect(() => {
    queryAppList();
  }, []);

  const onChange = (values: (string | number)[], items: any) => {
    const newTargetKeys = items?.map((item: any) => item.id);
    console.log('values', newTargetKeys);
    setTargetKeys(newTargetKeys as string[]);
  };

  const customFilter = (sugInput: any, item: any) => {
    return item.value.includes(sugInput) || item.label.includes(sugInput);
  };

  const dataSource = useMemo(() => {
    console.log('dataSource', dataSource, appListResponse);
    return appListResponse?.data?.map((item) => {
      return { ...item, key: item.id!, label: item.name, value: item.id };
    });
  }, [JSON.stringify(appListResponse?.data)]);

  console.log('dataSource', dataSource, appListResponse);

  return (
    <Transfer
      style={{ width: 472 }}
      dataSource={dataSource}
      filter={customFilter}
      value={targetKeys}
      defaultValue={['xiakeman@example.com', 'shenyue@example.com']}
      inputProps={{ placeholder: '搜索姓名或邮箱' }}
      onChange={onChange}
    />
  );
};
