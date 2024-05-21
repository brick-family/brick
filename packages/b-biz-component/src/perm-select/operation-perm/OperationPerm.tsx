import React, { FC } from 'react';
import { Checkbox, Divider } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { usePermSelectSelector } from '@brick/biz-component';
import { OperatorCode, TOperatorCode } from '@brick/types';

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  { label: '创建', value: OperatorCode.CREATE },
  { label: '查看', value: OperatorCode.VIEW },
  { label: '复制', value: OperatorCode.COPY },
  { label: '编辑', value: OperatorCode.EDIT },
  { label: '删除', value: OperatorCode.DELETE },
  { label: '打印', value: OperatorCode.PRINT },
  { label: '导入', value: OperatorCode.IMPORT },
  { label: '导出', value: OperatorCode.EXPORT },
  { label: '批量编辑', value: OperatorCode.BATCH_UPDATE },
];

export interface IOperationPermProps {}

// operateCode
export const OperationPerm: FC<IOperationPermProps> = (props) => {
  const [data, setData] = usePermSelectSelector((s) => [s.data, s.setData]);
  const indeterminate =
    data?.operateCode?.length > 0 && data?.operateCode?.length < plainOptions.length;

  const checkAll = plainOptions.length === data?.operateCode?.length;

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setData({ ...data, operateCode: checkedValues as Array<TOperatorCode> });
  };

  const onCheckAllChange = (e: any) => {
    const operateCode = e.target.checked ? plainOptions.map((p) => p.value) : [];
    onChange(operateCode as unknown as Array<TOperatorCode>);
  };

  return (
    <div>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        全选
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={data.operateCode} onChange={onChange} />
    </div>
  );
};
