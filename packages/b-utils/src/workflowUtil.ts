import { IProcessNode, IProcessXMLModel, IWorkflowEntity } from '@brick/types';

/**
 * 根据传入的参数获取流程XML模型
 * @param params
 * @returns
 */
export const getProcessXMLModel = (params: {
  modelId: string;
  workflowEntity: IWorkflowEntity;
  processNode: IProcessNode;
}) => {
  const { workflowEntity, processNode, modelId } = params;
  const processXMLModel: IProcessXMLModel = {
    process: processNode,
    id: modelId,
    name: workflowEntity.name,
    version: workflowEntity.version,
  };

  return processXMLModel;
};
