import { IResourceEntity, IWorkflowEntity } from '@brick/types';

/**
 *  工作流分组列表
 */
export interface IWorkflowGroupList {
  // refId: string;
  refData: IResourceEntity;
  children: IWorkflowEntity[];
}
