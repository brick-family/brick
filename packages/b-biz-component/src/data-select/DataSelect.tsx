import React, { FC, useEffect, useMemo } from 'react';
import { Button, Divider, Select, Space } from 'antd';
import { DataSelectProvider, useDataSelectSelector } from './processor';
import { SelectProps } from 'antd/es/select';

export interface IDataSelectProps extends SelectProps {
  tableId: string;
  /**
   * 是否多选
   */
  isMutil?: boolean;

  /**
   * 是否有新增
   */
  isAdd?: boolean;

  labelKey?: string;
  valueKey?: string;
  value?: any;
  onChange?: (value: any) => void;
}

// 1. 获取数据 (支持搜索，筛选，排序，分页)

export const DataSelectContent: FC<IDataSelectProps> = ({
  tableId,
  labelKey,
  valueKey,
  isAdd,
  ...otherProps
}) => {
  const [queryDataResponse, setQueryDataParamsObservable] = useDataSelectSelector((s) => [
    s.dataProcessor.queryDataResponse,
    s.dataProcessor.setQueryDataParamsObservable,
  ]);

  const dataList = queryDataResponse?.data?.records || [];
  const addItem = () => {};

  useEffect(() => {
    if (!tableId) {
      return;
    }
    // 发送请求，没有app id
    setQueryDataParamsObservable((draft) => {
      console.log('q=>table', tableId);
      draft.tableId.set(tableId);
    });
  }, [tableId]);

  const options = useMemo(() => {
    return dataList.map((item) => {
      return {
        label: item[labelKey || 'label'],
        value: item.id || item[valueKey || ''],
      };
    });
  }, [dataList]);

  const onSearch = (value: string) => {
    setQueryDataParamsObservable((draft) => {
      draft.keywords.set(value);
    });
  };

  const renderAddJsx = () => {
    return (
      <>
        <Divider style={{ margin: '8px 0' }} />
        <Space style={{ padding: '0 8px 4px' }}>
          <Button type="text" onClick={addItem}>
            新增数据
          </Button>
        </Space>
      </>
    );
  };
  return (
    <div>
      <Select
        style={{ width: '100%' }}
        placeholder="请选择"
        onSearch={onSearch}
        dropdownRender={(menu) => (
          <>
            {menu}
            {isAdd && renderAddJsx()}
          </>
        )}
        options={options}
        {...otherProps}
      />
    </div>
  );
};

export const DataSelect: FC<IDataSelectProps> = (props) => {
  return (
    <DataSelectProvider>
      <DataSelectContent {...props} />
    </DataSelectProvider>
  );
};
