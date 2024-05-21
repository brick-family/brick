import { Button, Result } from 'antd';
import React, { FC, memo } from 'react';
import { history } from 'umi';

export interface INotFoundProps {
  title?: string;
}

export const NotFound: FC<INotFoundProps> = memo(({ title = '页面不存在' }) => {
  const goBack = () => {
    history.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle={title}
      extra={
        <Button type="primary" onClick={goBack}>
          返回主页
        </Button>
      }
    />
  );
});

export default NotFound;
