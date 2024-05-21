import React, { FC } from 'react';
import { IBaseFieldProps } from '@brick/biz-component';
import { EFieldType } from '@brick/types';
import { UploadProps } from 'antd';
import { BaseFieldUpload } from '../common';

export interface IBaseFieldImageProps extends IBaseFieldProps<EFieldType.IMAGE> {
  uploadProps: UploadProps;
}

export const BaseFieldImage: FC<IBaseFieldImageProps> = (props) => {
  return <BaseFieldUpload type={'image'} {...props} />;
};
