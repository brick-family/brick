import { WorkflowAppProcessor } from './WorkflowAppProcessor';

const data: Record<string, any> = {};

export const getWorkflowProcessor = () => {
  return data['wp'] as WorkflowAppProcessor;
};

export const setWorkflowProcessor = (wp: WorkflowAppProcessor) => {
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
