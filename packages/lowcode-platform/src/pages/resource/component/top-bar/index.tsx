import React, { FC, useEffect, useRef } from 'react';

import { Left } from './left';
import { Center } from './center';
import { Right } from './right';

import styles from './index.less';
import { Flex } from 'antd';

export const TopBar = () => {
  return (
    <Flex className="b-layout-header" align="center">
      <Flex flex={1} align="center">
        <Left />
      </Flex>
      <Flex flex={1} justify="center">
        <Center />
      </Flex>
      <Flex flex={1} justify={'flex-end'}>
        <Right />
      </Flex>
    </Flex>
  );
};
