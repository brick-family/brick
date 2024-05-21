import { CrownFilled } from '@ant-design/icons';
import { BIcon } from '@brick/component';

export default {
  route: {
    // path: '/',
    routes: [
      {
        path: '/',
        name: '应用设置',
        routes: [
          {
            path: 'perm',
            name: '表单/仪表盘权限',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_quanxian`} />,
          },
          {
            path: 'info',
            name: '基础设置',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-shezhi`} />,
          },
          {
            path: 'nav',
            name: '导航设置',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_nav`} />,
          },
        ],
      },
      {
        path: '/',
        name: '高级功能',
        routes: [
          {
            path: 'aggregation',
            name: '聚合表',
            icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_statistical`} />,
          },
          // {
          //   path: 'intelligent',
          //   name: '智能助手',
          //   icon: <BIcon style={{ fontSize: 18 }} type={`icon-jurassic_apply`} />,
          // },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
