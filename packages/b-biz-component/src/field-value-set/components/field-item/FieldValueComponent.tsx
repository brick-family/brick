import { EFieldType, IColumnEntity } from '@brick/types';
import React, { FC, useMemo } from 'react';
import { Input } from 'antd';
import { BRichEditor } from '@brick/component';
import { BaseFieldDate } from '../../../base-fields/base-field-date/BaseFieldData';
import { FIELD_MAP } from '../../../base-fields/FieldMap';

export interface IFieldValueComponentProps {
  value: any;
  config: IColumnEntity;
}

export const FieldValueComponent: FC<IFieldValueComponentProps> = (props) => {
  const { value, config } = props;

  const Component = useMemo(() => {
    const CurrComponent = FIELD_MAP[config.fieldType];
    return CurrComponent;
  }, [config]);

  const handleChange = (value: any) => {
    console.log('handleChange', value);
  };

  return (
    <div>
      <Component value={value} columnConfig={config} onChange={handleChange} />
    </div>
  );
};
