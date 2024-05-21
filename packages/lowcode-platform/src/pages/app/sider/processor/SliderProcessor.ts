import {
  createModalProcessor,
  createResourceProcessor,
  globalProcessor,
  ModalProcessor,
  ResourceProcessor,
} from '@brick/processor';
import { IResourceEntity, ITableEntity, TMenuData } from '@brick/types';
import { selectFirstMenu } from '@brick/utils';
import { Observable, observable } from '@legendapp/state';

export interface ICreateGroupData {
  open: boolean;
  // 默认数据
  data: Partial<ITableEntity>;
}

export class SliderProcessor {
  /**
   * 资源Processor
   */
  resourceProcessor: ResourceProcessor;

  resourceId: Observable<string>;

  /**
   * 弹框processor
   */
  modalProcessor: ModalProcessor<TMenuData<IResourceEntity>>;

  self: SliderProcessor;

  constructor() {
    this.resourceProcessor = createResourceProcessor().processor;
    this.resourceId = observable('');
    this.modalProcessor = createModalProcessor().processor;
    this.listeners();
    this.self = this;

    //@ts-ignore
    window.c = this.resourceProcessor;
  }

  /**
   * 开启监听器
   */
  listeners = () => {
    this.resourceProcessor?.resourcesTree?.onChange(
      (resourceList) => {
        // 处理menu
        // const menus = convertResourceToMenu(resourceList.value);
        // this.menus.set(menus);
        // 选中第一级菜单
        console.log('q=>selectFirstMenu', resourceList);
        selectFirstMenu(resourceList.value, this.resourceId.peek());
      }
      // {
      //   initial: true, //是否立即使用当前值运行回调
      // }
    );

    this.resourceId.onChange((changeData) => {
      const resourceTree = this.resourceProcessor?.resourcesTree?.get();
      if (resourceTree.length) {
        selectFirstMenu(resourceTree, changeData.value);
      }
    });

    // 资源同步到全局
    this.resourceProcessor.resources.onChange((changeData) => {
      globalProcessor.setResources(changeData.value.data);
    });
  };

  setResourceId = (resourceId: string) => {
    this.resourceId.set(resourceId);
  };
}

export const createSliderProcessor = () => {
  let processor: null | SliderProcessor = new SliderProcessor();

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

export const sliderProcessor = new SliderProcessor();
