import { EFieldType, IColumnUserConfig } from '@brick/types';
import { BaseWrapper, BaseWrapperProps } from '../base/BaseWrapper';
import { BaseFieldUserSelect } from '@brick/biz-component';
import React, { FC } from 'react';

export interface IFieldUserProps extends BaseWrapperProps<EFieldType.USER>, IColumnUserConfig {}

export const FieldUserSelect: FC<IFieldUserProps> = (props) => {
  const { columnConfig } = props;

  console.log('columnConfig', columnConfig);

  return (
    <BaseWrapper {...props}>
      <BaseFieldUserSelect
        columnConfig={columnConfig}
        value={props.value}
        onChange={props.onChange}
      />
    </BaseWrapper>
  );
};
