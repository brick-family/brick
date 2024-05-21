import React, { FC } from 'react';
import { BTagLabel } from '@brick/component';

export interface IAppLabelProps {
  name?: string;
}

export const AppLabel: FC<IAppLabelProps> = ({ name }) => {
  return (
    <BTagLabel
      avatarProps={{
        style: { backgroundColor: 'transparent', verticalAlign: 'middle' },
        // icon: <BIcon style={{ fontSize: 18, color: '#f0a800' }} type={`icon-jurassic_child`} />,
      }}
    >
      {name}
    </BTagLabel>
  );
};
