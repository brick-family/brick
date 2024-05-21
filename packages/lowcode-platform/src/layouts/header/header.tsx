import { Col, Row } from 'antd';
import React, { FC } from 'react';
import s from './header.less';
import { Logo } from './logo';
import { RightInfo } from './right-info';

export interface IHeaderProps {}

export const Header: FC<IHeaderProps> = (props) => {
  return (
    <div className={s.header}>
      <Row style={{ width: '100%' }}>
        <Col span={8}>
          <Logo />
        </Col>
        <Col span={8}></Col>
        <Col className={s.flex} span={8}>
          <RightInfo />
        </Col>
      </Row>
    </div>
  );
};
