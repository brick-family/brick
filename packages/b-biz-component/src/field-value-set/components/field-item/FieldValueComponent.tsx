import { BaseProps, IColumnEntity } from '@brick/types';
import React, { FC, useMemo } from 'react';
import { FIELD_MAP } from '../../../base-fields/FieldMap';

export interface IFieldValueComponentProps extends BaseProps {
  value: any;
  onChange?: (value: any) => void;
  config: IColumnEntity;
}

export const FieldValueComponent: FC<IFieldValueComponentProps> = (props) => {
  const { value, config, style, className, onChange } = props;

  const Component = useMemo(() => {
    const CurrComponent = FIELD_MAP[config.fieldType];
    return CurrComponent;
  }, [config]);

  return (
    <div style={style} className={className}>
      <Component value={value} columnConfig={config?.columnConfig} onChange={onChange} />
    </div>
  );
};
