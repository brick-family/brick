import React, { FC, useMemo } from 'react';
import s from './appTableCaseCadeSelect.module.less';
import { BizAppSelect } from '../../select/app-select';
import { getAppId } from '@brick/utils';
import { Form, Space } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { BizTableSelect } from '../../select';

export interface IAppTableCaseCadeSelectProps {
  appNameKey?: NamePath;
  tableNameKey?: NamePath;
}

export const AppTableCaseCadeSelect: FC<IAppTableCaseCadeSelectProps> = (props) => {
  const { appNameKey = ['appId'], tableNameKey = ['tableId'] } = props;

  const { getFieldValue } = Form.useFormInstance();

  const defaultAppId = useMemo(() => {
    return getAppId();
  }, []);

  const currentAppId = Form.useWatch(appNameKey) || getFieldValue(appNameKey);

  return (
    <div className={s.casecade}>
      <Space>
        <Form.Item noStyle name={appNameKey}>
          <BizAppSelect style={{ width: 150 }} disabled defaultValue={defaultAppId} />
        </Form.Item>

        <Form.Item noStyle name={tableNameKey}>
          <BizTableSelect style={{ width: 180 }} appId={currentAppId} />
        </Form.Item>
      </Space>
    </div>
  );
};
