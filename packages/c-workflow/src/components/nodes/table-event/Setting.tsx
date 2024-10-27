import React, { FC } from 'react';
import { ENodeType, ETableEventType } from '@brick/types';
import { ISettingComponentProps, SettingCheckboxGroup, SettingFormItem } from '../../common';
import { Alert, Checkbox, Divider } from 'antd';
import { useWorkflowAppSelector } from '../../../processor';

export const TableTriggerEventGroupData = [
  {
    label: '创建成功',
    value: ETableEventType.create,
  },
  {
    label: '修改成功',
    value: ETableEventType.update,
  },
  {
    label: '删除成功',
    value: ETableEventType.delete,
  },
];

const Setting: FC<ISettingComponentProps<ENodeType.TableEvent>> = (props) => {
  const { nodeData } = props;

  const [workflowData] = useWorkflowAppSelector((s) => [s.workflowData]);

  console.log('q=>node', nodeData, workflowData);

  return (
    <div>
      <SettingFormItem title="">
        <Alert message={`当前触发的表单：${workflowData?.refData?.title}`} type="info" showIcon />
      </SettingFormItem>
      <SettingFormItem
        title={'触发事件'}
        formItemProps={{
          name: ['config', 'triggerEvent'],
          rules: [{ required: true, message: '请选择触发事件' }],
        }}
      >
        <SettingCheckboxGroup options={TableTriggerEventGroupData} direction={'vertical'} />
      </SettingFormItem>
      <Divider />
      <SettingFormItem
        title={'触发方式'}
        tips={'其他流程执行满足此触发事件的节点时，会自动触发此流程'}
        formItemProps={{
          name: ['config', 'auto'],
          valuePropName: 'checked',
        }}
      >
        <Checkbox>允许自动触发</Checkbox>
      </SettingFormItem>
      <Divider />

      <SettingFormItem
        title={'数据过滤'}
        formItemProps={{
          name: ['config', 'filter'],
        }}
      >
        <div></div>
      </SettingFormItem>
    </div>
  );
};

export default Setting;
