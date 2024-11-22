import { useMatch, useParams, history } from '@umijs/max';
import React, { FC, useEffect } from 'react';
import { TopBar } from '../component';
import { Outlet } from 'umi';
import { Flex } from 'antd';
import { ResourcePageProvider, useResourcePageSelector } from '../resource-page-processor';

export interface IContentProps {
  children: React.ReactNode;
}

const Content: FC<IContentProps> = (props) => {
  const { resourceId, aId } = useParams();
  // 如果没有访问到自路由，默认给切换过去
  const match = useMatch('/app/:aId/:resourceId');
  useEffect(() => {
    if (match) {
      history.push(`${match.pathnameBase}/design`);
    }
  }, [match]);

  const [setId] = useResourcePageSelector((s) => [s.setId]);

  useEffect(() => {
    if (resourceId && aId) {
      setId(aId, resourceId);
    }
  }, [resourceId, aId]);

  return (
    <Flex style={{ height: '100%' }} gap={0} vertical>
      <TopBar />
      <Flex flex={1}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export interface IResourceLayoutProps {
  children: React.ReactNode;
}

export const ResourceLayout: FC<IResourceLayoutProps> = (props) => {
  return (
    <ResourcePageProvider>
      <Content>
        <Outlet />
      </Content>
    </ResourcePageProvider>
  );
};

export default ResourceLayout;
