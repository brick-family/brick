import React, { FC, useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
import {
  Breakpoint,
  Card,
  Col,
  Dropdown,
  Grid,
  MenuProps,
  message,
  Modal,
  Row,
  Typography,
} from 'antd';
import { history } from 'umi';

import { BEmpty, BSearch, BSpin } from '@brick/component';

import { AppListAuthWrapper, IconSelect, useAppListAuth } from '@brick/biz-component';
import { useGlobalSelector } from '@/global-processor';
import { deleteApplication } from '@brick/services';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useMainSelector } from '../main-processor';
import { UpdateApp } from './components/update-app';
import { Create } from './components';

import styles from './app.less';
import { IAppEntity } from '@brick/types';

const { Meta } = Card;
const { useBreakpoint } = Grid;

function getColSpan(breakpointMap: Partial<Record<Breakpoint, boolean>>) {
  if (breakpointMap.xxl) {
    //≥ 1600px
    return 4;
  }
  if (breakpointMap.xl) {
    // ≥ 1200px
    return 6;
  }
  if (breakpointMap.lg) {
    // ≥ 992px
    return 8;
  }
  if (breakpointMap.md) {
    return 12;
  }
  if (breakpointMap.sm) {
    return 12;
  }
  if (breakpointMap.xs) {
    return 24;
  }
}

export interface IAppProps {}

export const App: FC<IAppProps> = (props) => {
  const screens = useBreakpoint();
  const span = getColSpan(screens);

  const [setUserInfoApp] = useGlobalSelector((s) => [s.setUserInfoApp]);
  const [appList, requestApp, changeRequestAppParams, appDataRequestParams] = useMainSelector(
    (s) => [s.appList, s.requestApp, s.changeRequestAppParams, s.appDataRequestParams]
  );
  const currTenant = useGlobalSelector((s) => s.currTenant);

  // 是否有app list权限
  const hasAuth = useAppListAuth();

  console.log('q=>hasAuth', hasAuth);
  useEffect(() => {
    if (currTenant.id) {
      requestApp();
    }
  }, [currTenant.id]);
  const data = appList?.data?.records;

  const hasEmpty = !appList.loading && data?.length == 0;

  const handleSearch = (value: string) => {
    changeRequestAppParams({ search: value });
  };

  const generatorItems = useMemoizedFn((appId) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        disabled: true,
        icon: <CopyOutlined style={{ fontSize: 16 }} />,
        label: ' 复制应用',
      },
      {
        key: '4',
        danger: true,
        icon: <DeleteOutlined style={{ fontSize: 16 }} />,
        label: '删除应用',
        onClick: (e) => {
          e.domEvent.stopPropagation();
          Modal.confirm({
            title: '确定要删除吗？',
            onOk: async (close) => {
              try {
                await deleteApplication({
                  appId,
                });
                message.success('删除成功！');
                requestApp();
                close();
              } catch (error) {
                return false;
              }
            },
          });
        },
      },
    ];
    return items;
  });

  const handleSetting = (id: string) => {
    history.push(`/app/${id}/setting`);
  };

  const goToApp = (app: IAppEntity) => {
    setUserInfoApp(app);
    history.push(`/app/${app.id}/home`);
  };

  return (
    <div className={styles.app}>
      <Row className={styles.top} gutter={[16, 24]} align="middle">
        <Col span={12}>
          <BSearch style={{ width: 300 }} placeholder="请输入" onSearch={handleSearch} />
        </Col>
        <Col className={styles.topRight} span={12}>
          <AppListAuthWrapper>
            <Create />
          </AppListAuthWrapper>
        </Col>
      </Row>

      <div className={styles.list}>
        {hasEmpty && !appDataRequestParams.search && <BEmpty description="暂无数据，请去创建" />}
        {hasEmpty && appDataRequestParams.search && <BEmpty description="没有搜索到结果" />}
        {appList.loading && <BSpin style={{ marginTop: 50, margin: 'auto' }} />}
        <Row gutter={[16, 24]}>
          {!appList.loading &&
            data?.map((app) => {
              return (
                <Col key={app.id} span={span}>
                  <Card
                    style={{ width: '100%' }}
                    actions={
                      !hasAuth
                        ? []
                        : [
                            <SettingOutlined
                              key="setting"
                              onClick={() => handleSetting(app.id!)}
                            />,
                            <UpdateApp data={app}>
                              <EditOutlined key="edit" />
                            </UpdateApp>,
                            <Dropdown
                              trigger={['click', 'hover']}
                              menu={{ items: generatorItems(app.id) }}
                            >
                              <EllipsisOutlined size={20} key="ellipsis" />
                            </Dropdown>,
                          ]
                    }
                  >
                    <div
                      className={styles.item}
                      onClick={() => {
                        goToApp(app);
                      }}
                    >
                      <Meta
                        avatar={
                          <IconSelect
                            defaultSelectFirst={false}
                            readonly
                            type="app"
                            data={app?.extraParam?.icon}
                          />
                        }
                        title={app.name}
                        description={
                          <Typography.Text
                            ellipsis={{
                              tooltip: app?.extraParam?.description || app.name,
                            }}
                          >
                            {app?.extraParam?.description || app.name}
                          </Typography.Text>
                        }
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>

      {/* <Button onClick={handleNext}>下一页</Button> */}
    </div>
  );
};
