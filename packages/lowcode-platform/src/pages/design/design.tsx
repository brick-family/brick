import { LowcodeEditor } from '@brick/lowcode-editor';
import { useParams } from '@umijs/max';

import React, { FC } from 'react';

export interface ITableProps {}

const DesignContent: FC<ITableProps> = (props) => {
  const { resourceId, aId } = useParams();

  return <LowcodeEditor resourceId={resourceId!} appId={aId!} />;
};

export interface IDesignProps {}

export const Design: FC<IDesignProps> = (props) => {
  return <DesignContent />;
};

export default Design;
