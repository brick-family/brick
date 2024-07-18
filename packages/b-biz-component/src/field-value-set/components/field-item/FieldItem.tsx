import React, { FC } from 'react';
import { IFieldValue, TFieldValueType } from '../../types';
import { IColumnEntity } from '@brick/types';
import { FieldValueType } from './FieldValueType';
import { FieldValueComponent } from './FieldValueComponent';
import { Button, Space, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useFieldValueSetSelector } from '../../processor';
import s from './fieldItem.module.less';

export interface IFieldItemProps {
  data: IFieldValue;
  config: IColumnEntity;
  style?: React.CSSProperties;
  className?: string;
}

export const FieldItem: FC<IFieldItemProps> = (props) => {
  const { data, config, style, className } = props;

  const [removeField, updateFieldValue] = useFieldValueSetSelector((s) => [
    s.removeField,
    s.updateFieldValue,
  ]);

  const handleFieldValueTypeChange = (value: TFieldValueType) => {
    updateFieldValue?.({ ...data, type: value });
  };

  const handleRemove = () => {
    removeField?.(data.fieldId);
  };

  const handleValueChange = (value: any) => {
    updateFieldValue?.({ ...data, data: value });
  };

  return (
    <div style={style} className={className}>
      <Space size={10}>
        <Tooltip title={config?.title}>
          <div className={s.title}> {config?.title}</div>
        </Tooltip>
        <FieldValueType
          style={{ width: 100 }}
          value={data?.type}
          onChange={handleFieldValueTypeChange}
        />
        <FieldValueComponent
          style={{ width: 250 }}
          config={config}
          value={data?.data}
          onChange={handleValueChange}
        />
        <Button icon={<DeleteOutlined />} onClick={handleRemove}></Button>
      </Space>
    </div>
  );
};
