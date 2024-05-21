import { BaseProcessor } from '@brick/core';
import {
  createModalProcessor,
  createWorkflowProcessor,
  ModalProcessor,
  WorkflowProcessor,
} from '@brick/processor';
import { IWorkflowEntity } from '@brick/types';
import { observable, Observable } from '@legendapp/state';
import { IWorkflowGroupList } from '@/pages/workflow/workflow-processor/types';

// 获取分组数据
const getWorkflowGroupList = (data: IWorkflowEntity[]): IWorkflowGroupList[] => {
  const workflowGroupList: IWorkflowGroupList[] = [];
  data?.forEach((item) => {
    const currGroupData = workflowGroupList?.find((f) => f.refData?.id === item.refId);
    if (currGroupData) {
      currGroupData.children.push(item);
    } else {
      workflowGroupList.push({
        refData: item.refData!,
        children: [item],
      });
    }
  });
  return workflowGroupList;
};

export class WorkflowPageProcessor extends BaseProcessor {
  modalProcessor: ModalProcessor;

  workflowProcessor: WorkflowProcessor;

  /**
   * 工作流分组数据
   */
  workflowGroupList: Observable<IWorkflowGroupList[]>;

  constructor() {
    super();
    this.modalProcessor = createModalProcessor().processor;
    this.workflowProcessor = createWorkflowProcessor().processor;
    this.workflowGroupList = observable<IWorkflowGroupList[]>([]);
    this.init();
  }
  private init = async () => {
    this.listeners();
  };

  /**
   * 保存和修改租户租
   */
  saveAndUpdateWorkflow = async (workflowEntity: IWorkflowEntity) => {
    const type = this.modalProcessor?.modalData?.get?.()?.type;
    let request = this.workflowProcessor.createWorkflow;
    if (type === 'rename') {
      request = this.workflowProcessor.updateWorkflow;
    }
    return request(workflowEntity);
  };

  updateWorkflowStatus = async (id: string, status: number) => {
    const res = await this.workflowProcessor.updateWorkflow({ id: id, status: status });
    if (res) {
      // 更新数据状态
      this.workflowProcessor.workflowList.data.set((value) => {
        return value.map((item) => {
          if (item.id === id) {
            return { ...item, status };
          }
          return item;
        });
      });
    }
  };
  /**
   * 开启监听器
   */
  private listeners = () => {
    this.workflowProcessor.workflowList.data.onChange((changeData) => {
      if (changeData?.value) {
        const groupList = getWorkflowGroupList(changeData?.value);
        this.workflowGroupList.set(groupList);
      }
    });
  };
}

export const createWorkflowPageProcessor = () => {
  let processor: null | WorkflowPageProcessor = new WorkflowPageProcessor();

  const getRoot = () => {
    return processor;
  };
  const destroy = () => {
    processor = null;
  };

  return {
    processor,
    getRoot,
    destroy,
  };
};
