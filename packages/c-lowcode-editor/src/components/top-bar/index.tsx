import React, { FC, useEffect, useRef } from 'react';

import { Left } from './left';
import { Center } from './center';
import { Right } from './right';

import styles from './index.less';

export const TopBar = () => {
  const topAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topAreaRef.current?.parentElement) {
      topAreaRef.current.parentElement.style.width = '100%';
    }
  }, []);
  return (
    <div ref={topAreaRef} className={`${styles.topArea}`}>
      <Left />
      <Center />
      <Right />
    </div>
  );
};
