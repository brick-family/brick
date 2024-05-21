import React, { FC } from 'react';
import { Button } from 'antd';

export interface IAntDAddGroupActionProps {}

export const AntDAddGroupAction: FC<IAntDAddGroupActionProps> = (props) => {
  return <Button {...props}>组</Button>;
};
