import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EColumnSelectType, IColumnImageConfig } from '@brick/types';

export interface ICardContentProps {
  columnConfig: IColumnImageConfig;
  fileList: Array<any>;
}

export const CardContent: FC<ICardContentProps> = (props) => {
  const { columnConfig, fileList } = props;
  const [imageUrl, setImageUrl] = useState<string>();

  const isMutil = columnConfig?.selectType === EColumnSelectType.multiple;

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {/*{loading ? <LoadingOutlined /> : <PlusOutlined />}*/}
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{columnConfig?.uploadText}</div>
    </button>
  );

  if (isMutil) {
    return fileList?.length >= columnConfig?.maxCount ? null : uploadButton;
  }

  return (
    <>{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</>
  );
};
