import { history } from '@umijs/max';
import React, { FC } from 'react';

import s from './logo.less';
export interface ILogoProps {}

export const Logo: FC<ILogoProps> = (props) => {
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div onClick={handleClick} className={s.logo} key="logo" id="logo">
      Logo
    </div>
  );
};
