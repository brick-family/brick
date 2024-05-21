import { DataTable, useAppAdmin } from '@brick/biz-component';
import { useParams } from '@umijs/max';
import React, { FC, useEffect } from 'react';
import { useImmer } from 'use-immer';
import s from './content.less';
import { Empty } from 'antd';
import { AdminHeader } from '@/pages/app/content/component/admin-header';
import classNames from 'classnames';

export interface IContentProps {}

export interface IContentDataTable {
  tableId: string;
}

const ContentDataTable = ({ tableId }: IContentDataTable) => {
  const [header, setHeader] = useImmer({
    tabKey: '1',
  });

  const { isAppAdmin } = useAppAdmin();

  console.log('q=>isAppAdmin', isAppAdmin);

  useEffect(() => {
    // 可以从这里获取资源名称
    // const resource = getResource(tableId);
  }, []);

  return (
    <div className={s.content}>
      <AdminHeader />
      <div className={classNames(s.box)}>
        <div
          className={classNames(s.main, {
            [s.table]: true,
          })}
        >
          <DataTable tableId={tableId} className={s.common} />
        </div>
      </div>
    </div>
  );
};

export const Content: FC<IContentProps> = (props) => {
  const { aId, resourceId } = useParams();
  if (resourceId === 'home') {
    return (
      <div
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Empty description="暂无内容，请去创建"></Empty>
      </div>
    );
  }
  return <ContentDataTable tableId={resourceId!} />;
};
