import React, { FC } from 'react';
import { BIcon, BTagLabel } from '@brick/component';

export interface IDeptLabelProps {
  name?: string;
}

export const DeptLabel: FC<IDeptLabelProps> = ({ name }) => {
  return (
    <BTagLabel
      avatarProps={{
        style: { backgroundColor: 'transparent', verticalAlign: 'middle' },
        icon: <BIcon style={{ fontSize: 18, color: '#f0a800' }} type={`icon-jurassic_child`} />,
      }}
    >
      {name}
    </BTagLabel>
  );
};
