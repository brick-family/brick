import { Form } from 'antd';
import React, { FC } from 'react';
import s from './SettingFormItem.module.less';
import { FormItemProps } from 'antd/es/form/FormItem';

export interface ISettingFormItemProps {
  /**
   * 标题
   */
  title: string;

  formItemProps: FormItemProps;

  children: React.ReactNode;
}

export const SettingFormItem: FC<ISettingFormItemProps> = (props) => {
  const { formItemProps, title, children } = props;
  return (
    <div className={s.item}>
      <div className={s.title}>{title}</div>
      <Form.Item noStyle {...formItemProps}>
        {children}
      </Form.Item>
    </div>
  );
};
