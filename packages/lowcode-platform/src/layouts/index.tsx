import { matchPath, Outlet } from 'umi';
import { useLocation } from '@umijs/max';
import { SimpleLayout } from './simple-layout';
import { MainLayout } from './main-layout';
import { ELayoutType, routes } from '@/routes';
import { useCreation } from 'ahooks';
import { useSetAppId, useUserInfo } from './hooks';

/**
 * 获取router layout type
 * @param currRoutes
 * @param layoutType
 * @returns
 */
function getRouterType(currRoutes: typeof routes) {
  let resultType: string | undefined;

  function findRouterType(currRoutes: typeof routes, layoutType?: string) {
    if (resultType) {
      // console.log('q=>type-match', resultType);
      return;
    }
    for (const routerLayout of currRoutes) {
      if (resultType) {
        return;
      }
      const match = matchPath(routerLayout.path, window?.location?.pathname);
      // console.log('q=>type-match', match, routerLayout.path, location?.pathname);
      const resultLayoutType = layoutType || routerLayout.type;
      if (match) {
        // console.log('q=>type-match1', resultLayoutType, routerLayout.path);
        resultType = resultLayoutType;
      }
      if (routerLayout.routes) {
        findRouterType(routerLayout.routes as any, resultLayoutType);
      }
    }
  }
  findRouterType(currRoutes);
  return resultType;
}

export default function LayoutContainer() {
  const location = useLocation();

  const { isLogin, hasUserInfo } = useUserInfo();
  // 设置app id
  useSetAppId();
  const type = useCreation(() => {
    const type = getRouterType(routes);
    return type;
  }, [location?.pathname]);

  const renderLayout = () => {
    console.log('q=>type', type);
    if (type === ELayoutType.simple) {
      return (
        <SimpleLayout>
          <Outlet />
        </SimpleLayout>
      );
    }

    if (type === ELayoutType.main) {
      return (
        <MainLayout>
          <Outlet />
        </MainLayout>
      );
    }
    return <Outlet />;
  };

  if (!isLogin) {
    return <></>;
  }

  return <>{hasUserInfo && renderLayout()}</>;
}
