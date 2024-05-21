import * as React from 'react';
import { FC } from 'react';
import { BaseWrapper, BaseWrapperProps } from '../base';
import { useFormContainerSelector } from '../../form-container';
import { EColumnSelectType, EFieldStatus, EFieldType } from '@brick/types';
import { DataSelect } from '@brick/biz-component';
import { useCreation } from 'ahooks';

export interface IFieldRelationProps extends BaseWrapperProps<EFieldType.RELATION> {}

export const FieldRelation: FC<IFieldRelationProps> = (props) => {
  const { value, onChange, columnConfig, ...otherProps } = props;
  const [readonly] = useFormContainerSelector((s) => [s.readonly]);

  const { relationTableId, selectType } = columnConfig || {};
  const isMutil = columnConfig?.selectType === EColumnSelectType.multiple;
  // 关联字段去配置的默认值
  const currValue = useCreation(() => {
    return (
      value?.map?.((item: any) => {
        return item?.id;
      }) || value
    );
  }, [value]);
  // console.log('q=>value-relation', value, currValue);

  return (
    <BaseWrapper {...props}>
      <DataSelect
        disabled={readonly || columnConfig?.status === EFieldStatus.disable}
        isMutil={isMutil}
        labelKey={columnConfig.labelFieldId}
        tableId={relationTableId}
        {...props}
        value={currValue}
      />
    </BaseWrapper>
  );
};
