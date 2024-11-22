import React, { FC, useEffect, useRef } from 'react';

import { Left } from './left';
import { Center } from './center';
import { Right } from './right';

import styles from './index.less';

export const TopBar = () => {
  return (
    <div className={`${styles.topArea}`}>
      {/* <Left /> */}
      <Center />
      <Right />
    </div>
  );
};
