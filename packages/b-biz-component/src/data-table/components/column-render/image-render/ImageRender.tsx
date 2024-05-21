import React, { FC } from 'react';
import { EFieldType, IFileEntity } from '@brick/types';
import { IDataRenderProps } from '../types';
import { Image, Space } from 'antd';

export const ImageRender: FC<IDataRenderProps<IFileEntity[], EFieldType.IMAGE>> = ({
  value,
  column,
}) => {
  console.log('q=>value', value);
  return (
    <Space>
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        {/*<Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />*/}
        {/*<Image*/}
        {/*  width={200}*/}
        {/*  src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"*/}
        {/*/>*/}
        {/*{value?.map((item) => {*/}
        {/*  return <img src={item.url} alt={item.name} key={item.id} />;*/}
        {/*})}*/}
      </Image.PreviewGroup>
    </Space>
  );
};
