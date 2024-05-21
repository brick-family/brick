import { ITenantGroupEntity, ITenantGroupUserAppVo } from '@brick/types';
import { Request } from '@brick/utils';

/**
 * 创建租户权限组
 * @returns
 * @param tenantGroup
 */
export async function createTenantGroup(tenantGroup: ITenantGroupEntity) {
  return Request.post<boolean>('/tenant/group', tenantGroup);
}

/**
 * 修改租户权限组
 * @returns
 * @param tenantGroup
 */
export async function updateTenantGroup(tenantGroup: Partial<ITenantGroupEntity>) {
  return Request.put<boolean>('/tenant/group', tenantGroup);
}

/**
 * 修改租户权限组
 * @returns
 * @param tenantGroup
 */
export async function deleteTenantGroup(id: string) {
  return Request.delete<boolean>(`/tenant/group/${id}`);
}

/**
 * 获取租户组下的配置的用户和app
 * @param id 租户id
 */
export async function getTenantGroupUserApp(id: string) {
  return Request.get<ITenantGroupUserAppVo>(`/tenant/group/${id}/info`);
}

export interface ITenantGroupBindDto {
  tenantGroupId: string;
  type: 'user' | 'app';
  ids: string[];
}
/**
 * 租户权限组绑定用户和app
 * @returns
 * @param tenantGroupBindDto
 */
export async function bindTenantGroup(tenantGroupBindDto: ITenantGroupBindDto) {
  return Request.post<boolean>('/tenant/group/bind', tenantGroupBindDto);
}

/**
 * 获取租户下的权限资源组
 * @returns
 * @param tenantGroup
 */
export async function getAll() {
  return Request.get<Array<ITenantGroupEntity>>('/tenant/group/all');
}
