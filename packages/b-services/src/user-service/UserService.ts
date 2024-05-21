import { IUserEntity, IUserInfoVo, IUserLoginDto } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 登录
 * @param
 * @returns
 */
export async function login(params: IUserLoginDto) {
  return Request.post<IUserInfoVo>('/user/login', params);
}

/**
 * 登出
 * @param
 * @returns
 */
export async function logout() {
  return Request.post('/user/logout');
}

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfo(appId: string) {
  let url = '/user/getUserInfo';
  if (appId) {
    url += '?appId=' + appId;
  }
  return Request.get<IUserInfoVo>(url);
}

/**
 * 分页查询参数
 */
export interface IQueryUserParams extends IQueryPage {
  /**
   * 搜索关键字，支持用户名、邮箱、手机号码
   */
  keywords?: string;

  /**
   * 查询部门下的用户
   */
  deptId?: string;

  /**
   * 分页查询
   */
  page?: number;

  /**
   *  查询角色下的用户
   */
  roleId?: string;
}

/**
 * 分页用户信息
 * @returns
 */
export async function queryUser(params: IQueryUserParams) {
  return Request.get<IResponse<IUserEntity>>('/user/page', { params });
}

/**
 * 创建用户信息
 * @returns
 */
export async function createUser(useEntity: IUserEntity) {
  return Request.post(`/user`, useEntity);
}

export interface IDistributeDeptParams {
  userIds: string[];
  deptIds: string[];
}
/**
 * 绑定部门
 * @returns
 */
export async function distributeDept(distributeDeptParams: IDistributeDeptParams) {
  return Request.post<boolean>(`/user/distribute/dept`, distributeDeptParams);
}

export interface IDistributeRoleParams {
  userIds: string[];
  roleIds: string[];
}
/**
 * 绑定角色
 * @returns
 */
export async function distributeRole(distributeRoleParams: IDistributeRoleParams) {
  return Request.post<boolean>(`/user/distribute/role`, distributeRoleParams);
}

/**
 * 解绑部门
 * @returns
 */
export async function unDistributeDept(userIds: string[]) {
  return Request.post<boolean>(`/user/undistribute/dept`, { userIds });
}

/**
 * 解绑角色
 * @returns
 */
export async function unDistributeRole(userIds: string[]) {
  return Request.post<boolean>(`/user/undistribute/dept`, { userIds });
}

/**
 * 修改用户信息
 * @returns
 */
export async function updateUser(useEntity: IUserEntity) {
  return Request.put(`/user`, useEntity);
}

/**
 * 删除用户信息
 * @returns
 */
export async function deleteUser(id: string) {
  return Request.delete(`/user/${id}`);
}
