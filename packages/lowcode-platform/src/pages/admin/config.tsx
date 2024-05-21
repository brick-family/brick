import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import { BIcon } from '@brick/component';

export default {
  route: {
    // path: '/',
    routes: [
      {
        path: '/base',
        name: '基本信息',
        routes: [
          {
            path: 'info',
            name: '企业信息',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_company`} />,
          },
        ],
      },
      {
        path: '/address',
        name: '通讯录',
        routes: [
          {
            path: 'internal',
            name: '内部组织',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_child`} />,
          },
          {
            path: 'external',
            name: '外部组织',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_engineering`} />,
          },
        ],
      },
      {
        name: '权限中心',
        path: '/perm',
        routes: [
          {
            path: 'manager',
            name: '管理员',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_admin`} />,
          },
        ],
      },
      {
        name: '日志审计',
        path: '/audit',
        routes: [
          {
            path: 'login',
            name: '登录日志',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_last`} />,
          },
          {
            path: 'company',
            name: '企业日志',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_log`} />,
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
