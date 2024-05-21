import React, { FC } from 'react';
import { BTagLabel } from '@brick/component';

export interface IUserLabelProps {
  name: string;
}

export const UserLabel: FC<IUserLabelProps> = ({ name }) => {
  return (
    <BTagLabel
      avatarProps={{
        // icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_company`} />,
        children: name?.substring?.(0, 1),
      }}
    >
      {name}
    </BTagLabel>
  );
};
