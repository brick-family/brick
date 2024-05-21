import React, { FC, useMemo, useState } from 'react';
import { history } from 'umi';

import { PageContainer, ProLayout, ProLayoutProps, ProSettings } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';

import s from './adminLayout.less';

export interface IAdminLayoutProps {
  /**
   * 跳转前基础path
   */
  basePath?: string;
  config: ProLayoutProps;
  children?: React.ReactNode;
}

export const AdminLayout: FC<IAdminLayoutProps> = (props) => {
  const { config, children, basePath } = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: 'side',
  });

  const location = useLocation();

  const pathname = useMemo(() => {
    return location.pathname.replace(basePath || '', '');
  }, [location.pathname, basePath]);
  // console.log('q=>pathName', basePath, pathname);
  return (
    <div className={s.container}>
      <ProLayout
        title=""
        siderWidth={256}
        logo={false}
        {...config}
        location={{
          pathname,
        }}
        menu={{
          type: 'group',
        }}
        menuItemRender={(item: any, dom: any) => (
          <div
            onClick={() => {
              console.log('q=>pathName-item', item);
              const path = basePath ? `${basePath}${item.path}` : item.path;
              // setPathname(item.path);
              history.push(path);
              // history.push(`/admin/${currTenant.id}${item.path}`)
            }}
          >
            {dom}
          </div>
        )}
        {...settings}
      >
        <PageContainer>{children}</PageContainer>
      </ProLayout>
    </div>
  );
};

export default AdminLayout;
