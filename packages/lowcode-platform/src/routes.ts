/**
 * 模版类型
 */
export enum ELayoutType {
  'simple' = 'simple',
  'main' = 'main',
  'none' = 'none',
}

export const routes = [
  { path: '/login', layout: false, component: '@/pages/login/login' },
  // { path: '/', component: '@/layouts/index', routes: [

  // ] },
  { path: '/', redirect: 'main' }, // 首页
  { path: '/main', type: ELayoutType.simple, name: '我的应用', component: '@/pages/main/main' },
  {
    path: '/admin/:tenantId',
    type: ELayoutType.simple,
    component: '@/pages/admin/admin',
    routes: [
      {
        path: '/admin/:tenantId/base/info',
        component: '@/pages/admin/base/info/info',
      },
      {
        path: '/admin/:tenantId/address/external', // 外部组织
        component: '@/pages/admin/address/external/external',
      },
      {
        path: '/admin/:tenantId/address/internal', // 内部组织
        component: '@/pages/admin/address/internal/internal',
      },
      {
        path: '/admin/:tenantId/perm/manager', // 管理员
        component: '@/pages/admin/perm/manager/manager',
      },
      {
        path: '/admin/:tenantId/audit/login', // 登录日志
        component: '@/pages/admin/audit/login-log/loginLog',
      },
      {
        path: '/admin/:tenantId/audit/company', // 企业日志
        component: '@/pages/admin/audit/company-log/companyLog',
      },
    ],
  },
  {
    path: '/app/:aId/:resourceId/design',
    type: ELayoutType.none,
    component: '@/pages/design/design',
  },
  {
    path: '/app/:aId/workflow/:wId/design',
    type: ELayoutType.none,
    component: '@/pages/workflow-design/WorkflowDesign',
  },
  {
    path: '/app/:aId',
    type: ELayoutType.main,
    // component: '@/layouts/main-container/MainContainer',
    routes: [
      {
        path: '/app/:aId/workflow',
        component: '@/pages/workflow',
      },
      {
        // 应用后台
        path: '/app/:aId/setting',
        component: '@/pages/app-admin/AppAdmin',
        routes: [
          {
            path: '/app/:aId/setting/perm',
            component: '@/pages/app-admin/perm/perm',
          },
          {
            path: '/app/:aId/setting/info',
            component: '@/pages/app-admin/info/info',
          },
          {
            path: '/app/:aId/setting/nav',
            component: '@/pages/app-admin/nav/nav',
          },
          {
            path: '/app/:aId/setting/aggregation',
            component: '@/pages/app-admin/aggregation/aggregation',
          },
          {
            path: '/app/:aId/setting/intelligent',
            component: '@/pages/app-admin/intelligent/intelligent',
          },
        ],
      },
      {
        path: '/app/:aId/:resourceId',
        component: '@/pages/app/app',
      },
    ],
  },
  { path: '/table/:id', type: ELayoutType.main, component: '@/pages/view/table/TableView' },
  { path: '/demo', type: ELayoutType.none, component: '@/pages/demo' },
  { path: '/demo1', type: ELayoutType.none, component: '@/pages/demo/demo1' },
  { path: '/rich', type: ELayoutType.none, component: '@/pages/rich' },
  { path: '/workflow', type: ELayoutType.simple, component: '@/pages/workflow' },
  { path: '/testUserSelect', type: ELayoutType.simple, component: '@/pages/test-user-select' },
  { path: '/*', component: '@/pages/404' },
];
