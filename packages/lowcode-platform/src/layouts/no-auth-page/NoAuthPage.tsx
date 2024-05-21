import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { useGlobalSelector } from '@/global-processor';
import { history } from 'umi';

export interface INoAuthPageProps {
  children?: React.ReactNode;
}

export const NoAuthPage: FC<INoAuthPageProps> = (props) => {
  const [showAuthPage] = useGlobalSelector((s) => [s.showAuthPage]);

  const goBack = () => {
    history.push('/');
  };

  if (showAuthPage) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="没有权限访问该页面，请联系管理员！"
        extra={
          <Button type="primary" onClick={goBack}>
            返回主页
          </Button>
        }
      />
    );
  }
  return <>{props.children}</>;
};
