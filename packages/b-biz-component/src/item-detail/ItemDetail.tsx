import React, { FC } from 'react';
import { ItemDetailProcessor, ItemDetailProvider } from './processor';
import { Item } from './Item';

export interface IItemDetailProps {
  itemDetailProcessor?: ItemDetailProcessor;
}

export const ItemDetail: FC<IItemDetailProps> = ({ itemDetailProcessor }) => {
  return (
    <ItemDetailProvider itemDetailProcessor={itemDetailProcessor}>
      <Item />
    </ItemDetailProvider>
  );
};
