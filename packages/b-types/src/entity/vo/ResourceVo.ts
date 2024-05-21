import { TSortMap } from '@brick/types';
import { IResourceEntity } from '../resource';

export interface IResourceListVo {
  /**
   * 资源列表
   */
  list: IResourceEntity[];

  /**
   * 排序
   */
  sortMap: TSortMap;
}
