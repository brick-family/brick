import { Form, Tooltip } from 'antd';
import React, { FC } from 'react';
import s from './SettingFormItem.module.less';
import { FormItemProps } from 'antd/es/form/FormItem';
import { InfoCircleOutlined } from '@ant-design/icons';

/**
 * 表单值
 */
export interface IFromItemValue<T extends any = any> {
  value?: T;
  onChange?: (value: T) => void;
}

export interface ISettingFormItemProps {
  /**
   * 标题
   */
  title: string;

  formItemProps?: FormItemProps;

  children: React.ReactNode;

  tips?: string;
}

export const SettingFormItem: FC<ISettingFormItemProps> = (props) => {
  const { formItemProps, title, children, tips } = props;
  return (
    <div className={s.item}>
      <div className={s.title}>
        {title}
        {tips && (
          <Tooltip title={tips}>
            <InfoCircleOutlined style={{ marginLeft: 8 }} />
          </Tooltip>
        )}
      </div>
      {formItemProps ? (
        <Form.Item noStyle {...formItemProps}>
          {children}
        </Form.Item>
      ) : (
        children
      )}
    </div>
  );
};
