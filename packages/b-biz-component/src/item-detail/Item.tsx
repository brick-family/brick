import React, { FC } from 'react';
import { EOpenType, useItemDetailSelector } from './processor';
import { ItemModal } from './components';

export interface IItemProps {}

export const Item: FC<IItemProps> = (props) => {
  const [openType, mode] = useItemDetailSelector((s) => [s.openType, s.mode]);

  return <>{openType === EOpenType.modal && <ItemModal />}</>;
};
