import React, { FC } from 'react';
import { SetterHoc } from '../../../common';
import { useRelationTableInfo } from '../../../_hooks/data-hooks';
import { SelectSetterFun } from '../../../_setters';
import { getUrlResourceId } from '@brick/utils';

export interface IDataSourceSelectSetterProps {
  value: string;
  onChange: (value: string) => void;
}

const DataSourceSelectSetterFun: FC<IDataSourceSelectSetterProps> = (props) => {
  // 获取tableId
  const tableId = getUrlResourceId();
  console.log('q=>tableId', tableId);

  const { options } = useRelationTableInfo(tableId!);

  return (
    <SelectSetterFun
      changeReRenderEvent
      onChange={props.onChange}
      options={options}
      value={props.value}
    />
  );
};

export const DataSourceSelectSetter = SetterHoc(DataSourceSelectSetterFun);
