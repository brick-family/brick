import React, { FC, useMemo } from 'react';
import { getTypeData } from '@/pages/workflow/create-and-update';
import { Select, Space } from 'antd';
import { BizTableSelect } from '@brick/biz-component';
import { useWorkflowPageSelector } from '@/pages/workflow/workflow-processor';
import { EWorkflowStatus, EWorkflowType } from '@brick/types';
import { BLinkList, BSearch } from '@brick/component';

import s from './header.less';
import { useCreation } from 'ahooks';

export const StatusOptions = [
  { label: '全部状态', value: '' },
  { label: '已开启', value: EWorkflowStatus.enable },
  { label: '已关闭', value: EWorkflowStatus.disable },
];

export interface IHeaderProps {}

export const Header: FC<IHeaderProps> = (props) => {
  const [setQueryWorkflowParamsObservable, queryWorkflowParams] = useWorkflowPageSelector((s) => [
    s.workflowProcessor.setQueryWorkflowParamsObservable,
    s.workflowProcessor.queryWorkflowParams,
  ]);

  const TypeData = useMemo(() => {
    return getTypeData();
  }, []);

  const linkData = useCreation(() => {
    return TypeData.map((type) => {
      return {
        name: type.title,
        value: type.id,
      };
    });
  }, [TypeData]);

  const onTableChange = (value: string) => {
    setQueryWorkflowParamsObservable((draft) => {
      draft.refId.set(value);
    });
  };

  const onTypeChange = (value: number) => {
    setQueryWorkflowParamsObservable((draft) => {
      draft.type.set(value);
    });
  };

  const onStatusChange = (value: number) => {
    setQueryWorkflowParamsObservable((draft) => {
      draft.status.set(value);
    });
  };

  const onSearch = (value: string) => {
    setQueryWorkflowParamsObservable((draft) => {
      draft.search.set(value);
    });
  };

  return (
    <div className={s.header}>
      <BLinkList data={linkData} active={queryWorkflowParams?.type!} onClick={onTypeChange} />
      <div className={s.right}>
        <Space>
          {queryWorkflowParams.type === EWorkflowType.table && (
            <BizTableSelect
              style={{ width: 200 }}
              value={queryWorkflowParams?.refId}
              onChange={onTableChange}
            />
          )}
          <Select
            value={(queryWorkflowParams.status || '') as any}
            placeholder={'请选择状态'}
            options={StatusOptions}
            onChange={onStatusChange}
            style={{ width: 120 }}
          ></Select>
          <BSearch onSearch={onSearch} placeholder={'请输入'} />
        </Space>
      </div>
    </div>
  );
};
