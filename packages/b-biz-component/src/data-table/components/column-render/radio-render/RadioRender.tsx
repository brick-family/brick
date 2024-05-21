import React, { FC, useMemo } from 'react';
import { EFieldType } from '@brick/types';
import { Space, Tag, Tooltip } from 'antd';
import { getColor } from '@brick/component';
import { IDataRenderProps } from '../types';
import s from './radioRender.module.less';

export const RadioRender: FC<IDataRenderProps<string, EFieldType.RADIO>> = ({ value, column }) => {
  // 获取data数据
  const data = useMemo(() => {
    const splits = value?.split?.(',') || [];
    if (splits.length === 0) {
      return [];
    }
    return column.columnConfig?.options?.filter((f) => splits.includes(f.value));
  }, [value]);

  const hasColor = column?.columnConfig?.hasColor;

  const tooltip = useMemo(() => {
    return data?.map((item) => item.label).join(',');
  }, [data]);

  const content = (
    <Space className={s.radio} size={4}>
      {data?.map((item) => {
        return (
          <Tag key={item.value} color={hasColor ? getColor(item.color!) : undefined}>
            {item.label}
          </Tag>
        );
      })}
    </Space>
  );
  if (data?.length > 1) {
    return <Tooltip title={tooltip}>{content}</Tooltip>;
  }
  return <>{content}</>;
};
