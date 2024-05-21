import React, { FC } from 'react';
import { BaseFieldUpload } from '../common';
import { IBaseFieldProps } from '../types';
import { EFieldType } from '@brick/types';
import { UploadProps } from 'antd';

export interface IBaseFieldFileProps extends IBaseFieldProps<EFieldType.IMAGE> {
  uploadProps: UploadProps;
}
export const BaseFieldFile: FC<IBaseFieldFileProps> = (props) => {
  return <BaseFieldUpload type={'file'} {...props} />;
};
