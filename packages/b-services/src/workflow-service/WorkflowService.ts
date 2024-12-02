import { IProcessXMLModel, IWorkflowEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

export interface IWorkflowCreateAndUpdateDto extends Partial<IWorkflowEntity> {
  /**
   * xml模型数据
   */
  processXMLModel: IProcessXMLModel;
  /**
   * 是否是新版本
   */
  newVersion: boolean;
}

/**
 * 返回的内容
 */
export type IWorkflowResponse = IResponse<IWorkflowEntity>;

/**
 * 创建工作流
 * @returns
 * @param workflow
 */
export async function createWorkflow(workflow: IWorkflowCreateAndUpdateDto) {
  return Request.post<IWorkflowEntity>('/workflow', workflow);
}

export interface IQueryWorkflowParams {
  /**
   * 工作流类型
   */
  type?: number;

  /**
   * 引用字段id
   */
  refId?: string;

  /**
   * 状态
   */
  status?: number;

  /**
   * 搜索关键字
   */
  search?: string;
}

/**
 * 分页查询参数
 */
export interface IQueryWorkflowPageParams extends IQueryPage, IQueryWorkflowParams {}

/**
 * 分页查询role
 * @param param0
 * @returns
 */

export async function queryWorkflow({ ...params }: IQueryWorkflowPageParams) {
  return Request.get<IWorkflowResponse>(`/workflow/page`, { params });
}

/**
 * 获取所有角色
 * @returns
 */
export async function queryWorkflowAll(queryParams: IQueryWorkflowParams) {
  return Request.get<Array<IWorkflowEntity>>('/workflow/all', { params: queryParams });
}

/**
 *
 * @param 修改
 * @param workflowEntity
 * @returns
 */
export async function updateWorkflow(params: IWorkflowCreateAndUpdateDto) {
  return Request.put<boolean>(`/workflow`, params);
}

/**
 *
 * @param id 删除
 * @returns
 */
export async function deleteWorkflow(id: string) {
  return Request.delete<boolean>(`/workflow/${id}`);
}

/**
 *
 * @param id id
 * @returns
 */
export async function getWorkflow(id: string) {
  return Request.get<IWorkflowEntity>(`/workflow/${id}`);
}
