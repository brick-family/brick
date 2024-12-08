import { IDataEntity } from '@brick/types';
import { Request } from '@brick/utils';

export interface IStartProcessDto {
  tableId: string;
  data: IDataEntity;
}

/**
 * 保存流程定义模型
 * @param data
 */
export async function startProcess(data: IStartProcessDto) {
  return Request.post('/flow/process/start', data);
}
