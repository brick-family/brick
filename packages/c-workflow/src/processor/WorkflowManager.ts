import { WorkflowProcessor } from './WorkflowProcessor';

const data: Record<string, any> = {};

export const getWorkflowProcessor = () => {
  return data['wp'] as WorkflowProcessor;
};

export const setWorkflowProcessor = (wp: WorkflowProcessor) => {
  data['wp'] = wp;
};

/**
 * 销毁
 */
export const destroy = () => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      delete data[key];
    }
  }
};
