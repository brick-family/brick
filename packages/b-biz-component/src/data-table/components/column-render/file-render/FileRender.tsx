import React, { FC } from 'react';
import { IDataRenderProps } from '../types';
import { EFieldType, IFileEntity } from '@brick/types';

export const FileRender: FC<IDataRenderProps<IFileEntity[], EFieldType.FILE>> = (props) => {
  return <div></div>;
};
