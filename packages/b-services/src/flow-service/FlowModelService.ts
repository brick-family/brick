import { IFlowModelDto, IFlowModelEntity, IRelationDataEntity } from '@brick/types';
import { Request } from '@brick/utils';
import { IQueryPage, IResponse } from '../types';

/**
 * 保存流程定义模型
 * @param data
 */
export async function saveFlowModel(data: IFlowModelDto) {
  return Request.post('/flow/save', data);
}

/**
 * 根据key查询所有流程定义模型
 * @param key 流程定义key
 * @returns
 */
export async function queryFlowModelByKey(key: string) {
  return Request.get<IFlowModelEntity[]>(`/flow/queryByKey/${key}`);
}

/**
 *
 * @param 发布流程
 * @returns
 */
export async function deployFlowModel(modelId: string) {
  return Request.post<boolean>(`/flow/deploy/${modelId}`);
}
