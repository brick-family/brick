import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { AppsLogoPopover, TabsMenu } from './components';

import s from './headerDesign.less';
import { RightInfo } from '@/layouts/header/right-info';
import { HeaderDesignProvider } from './header-design-processor';
import { useGlobalSelector } from '@brick/processor';
import { ResourceName } from '@/layouts/components';

export interface IHeaderDesignProps {}

export const HeaderDesign: FC<IHeaderDesignProps> = (props) => {
  const [isAppAdmin] = useGlobalSelector((s) => [s.isAppAdmin]);

  const renderAppAdmin = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Col span={8}>
          <div className={s.left}>
            <AppsLogoPopover />
          </div>
        </Col>
        <Col span={8}>
          <div className={s.center}>
            <TabsMenu />
          </div>
        </Col>
        <Col className={s.flex} span={8}>
          <RightInfo showTenant={false} />
        </Col>
      </Row>
    );
  };

  const renderDefault = () => {
    return (
      <>
        <Row style={{ width: '100%' }}>
          <Col span={12}>
            <div className={s.left}>
              <AppsLogoPopover />
              <ResourceName className={s.resource} />
            </div>
          </Col>

          <Col className={s.flex} span={12}>
            <RightInfo showTenant={false} />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div className={s.header}>
      <HeaderDesignProvider>{isAppAdmin ? renderAppAdmin() : renderDefault()}</HeaderDesignProvider>
    </div>
  );
};
