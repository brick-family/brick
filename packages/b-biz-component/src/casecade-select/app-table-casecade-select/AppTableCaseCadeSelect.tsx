import React, { FC, useMemo, useState } from 'react';
import s from './appTableCaseCadeSelect.module.less';
import { BizAppSelect } from '../../select/app-select';
import { BizTableSelect } from '@brick/biz-component';
import { getAppId } from '@brick/utils';
import { Form, Tooltip } from 'antd';
import { NamePath } from 'antd/es/form/interface';

export interface IAppTableCaseCadeSelectProps {
  appNameKey?: NamePath;
  tableNameKey?: NamePath;
}

export const AppTableCaseCadeSelect: FC<IAppTableCaseCadeSelectProps> = (props) => {
  const { appNameKey = ['appId'], tableNameKey = ['tableId'] } = props;

  const defaultAppId = useMemo(() => {
    return getAppId();
  }, []);

  const currentAppId = Form.useFormInstance()?.getFieldValue(appNameKey);
  console.log('q=>currentAppId-1', currentAppId, tableNameKey);
  return (
    <div className={s.casecade}>
      <Form.Item noStyle name={appNameKey}>
        <BizAppSelect defaultValue={defaultAppId} />
      </Form.Item>

      <Form.Item name={tableNameKey}>
        {/* {({getFieldValue}) => {
          const currentAppId = getFieldValue(appNameKey) || defaultAppId;

          console.log('q=>currentAppId',currentAppId);
          return <BizTableSelect appId={currentAppId} />
        }} */}

        {({ getFieldValue }) => {
          return <div>sdfsfsdf</div>;
        }}
      </Form.Item>
    </div>
  );
};
