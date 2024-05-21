import React, { FC } from 'react';
import { BIcon, BTagLabel } from '@brick/component';

export interface IRoleLabelProps {
  name?: string;
}

export const RoleLabel: FC<IRoleLabelProps> = ({ name }) => {
  return (
    <BTagLabel
      avatarProps={{
        icon: <BIcon style={{ fontSize: 18, color: '#f0a800' }} type={`icon-jurassic_role`} />,
      }}
    >
      {name}
    </BTagLabel>
  );
};
