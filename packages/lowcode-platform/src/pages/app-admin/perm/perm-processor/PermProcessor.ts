import {
  resourcePermProcessor,
  ResourcePermProcessor,
  resourceProcessor,
  ResourceProcessor,
} from '@brick/processor';
import { IModalData, IResourceEntity, IResourcePermEntity } from '@brick/types';
import { Observable, observable } from '@legendapp/state';

export class PermProcessor {
  resourceProcessor: ResourceProcessor;

  /**
   * 资源权限处理器
   */
  resourcePermProcessor: ResourcePermProcessor;

  currSelectResource: Observable<IResourceEntity>;

  /**
   * 资源dialog是否打开
   */
  modalData: Observable<IModalData<IResourcePermEntity>>;

  constructor() {
    this.resourceProcessor = resourceProcessor;
    this.resourcePermProcessor = resourcePermProcessor;
    this.currSelectResource = observable();
    this.modalData = observable({
      open: false,
      type: 'create',
      data: null as any,
    });
    this.init();
  }

  private init = async () => {
    this.listeners();
  };

  /**
   * 请求所有资源
   */
  get requestResourceAll() {
    return this.resourceProcessor.requestResourceAll.bind(this.resourceProcessor);
  }

  /**
   * resource资源树
   */
  get resourceTree() {
    return this.resourceProcessor.resourcesTree;
  }

  get resourcePermList() {
    return this.resourcePermProcessor.resourcePermList;
  }

  requestResourcePermList = async () => {
    return this.resourcePermProcessor.getListByResourceId(this.currSelectResource?.id?.peek(), {
      onSuccess: () => {
        // console.log('q=>prams-success');
      },
    });
  };

  /**
   *  当前选中的资源
   * @param resource
   */
  setCurrResource = (resource: IResourceEntity) => {
    this.currSelectResource.set(resource);
  };

  setModalData = (modalData: IModalData) => {
    this.modalData.set(modalData);
  };

  savePermGroup = (data: IResourcePermEntity) => {
    const type = this.modalData.get().type;
    let request = this.resourcePermProcessor.createResourcePerm;
    if (type === 'update') {
      request = this.resourcePermProcessor.updateResourcePerm;
    }
    return request(data);
  };

  /**
   * 开启监听器
   */
  private listeners = () => {
    this.currSelectResource.onChange(async (resource) => {
      if (resource.value) {
        await this.requestResourcePermList();
      }
    }, {});

    // 删除资源后重新刷新
    this.resourcePermProcessor?.deleteResourcePermResponse.onChange(async (response) => {
      if (response.value.data) {
        console.log('q=>delete-response', response);
        await this.requestResourcePermList();
      }
    });
  };
}

export const createPermProcessor = () => {
  let processor: null | PermProcessor = new PermProcessor();

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
