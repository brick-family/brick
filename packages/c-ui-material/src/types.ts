import { FormInstance } from 'antd';

import { FormInstance as MobileFormInstance } from 'antd-mobile/es/components/form';
import React from 'react';

export interface IBaseFormRef {
  // 改变是否只读状态
  changeReadonly: (readonly: boolean) => void;
}

export interface IWebFormRef extends IBaseFormRef {
  formRef: FormInstance;
}

export interface IMobileFormRef extends IBaseFormRef {
  formRef: MobileFormInstance;
}

export interface IFormContainerProps {
  cols: number;
  children?: React.ReactNode;
}
