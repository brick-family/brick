import React, { FC } from 'react';
import { ENodeType } from '@brick/types';
import { ISettingComponentProps, SettingFormItem } from '../../common';
import { Alert } from 'antd';
import { useWorkflowAppSelector } from '../../../processor';

const Setting: FC<ISettingComponentProps<ENodeType.TableEvent>> = (props) => {
  const { nodeData } = props;

  const [workflowData] = useWorkflowAppSelector((s) => [s.workflowData]);

  return (
    <div>
      <SettingFormItem title="">
        <Alert message={`当前触发的表单：${workflowData?.refData?.title}`} type="info" showIcon />
      </SettingFormItem>
    </div>
  );
};

export default Setting;
