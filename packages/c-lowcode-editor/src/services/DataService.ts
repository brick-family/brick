// import { ILowcodeModel } from '@/models/lowcode';
import { ELowcodeType, LowcodeType } from '../types';
import { getPageSchema, getSchemaObject } from '../utils';
import { ITableEntity } from '@brick/types';
import { IPublicApiProject, IPublicEnumTransformStage } from '@alilc/lowcode-types';
import { project } from '@alilc/lowcode-engine';

export interface ILowcodeDataService {}
class DataService {
  private data: any | null; // TODO 类型问题
  public lowcodeManger: ILowcodeDataService;

  constructor() {
    this.data = null;

    this.lowcodeManger = {};
  }

  /**
   * 设置lowcode data
   * @param data
   */
  setData(data: any) {
    this.data = data;
  }

  /**
   * 获取表格数据
   */
  private getTableSchema = () => {
    if (!this) {
      return null;
    }
    return this.data?.tableData?.schema;
  };

  /**
   * 获取页面数据
   */
  private getPageData() {}

  /**
   * 获取schema data
   */
  getSchemaData = () => {
    if (this.data == null) {
      return null;
    }
    const logic = new Map<LowcodeType, () => void>([['TABLE', this.getTableSchema]]);

    const type = this.data?.type;
    if (!type) {
      console.warn('没有匹配到对应的类型');
      return null;
    }
    return logic.get(type)?.();
  };

  setLowCodePublicProjectApi = (projectApi: IPublicApiProject) => {};

  lowcodeSetSchema = async () => {
    let tableSchema = this.getSchemaData();
    if (tableSchema) {
      // 默认schema
      project?.importSchema(getSchemaObject(tableSchema));
      project?.simulatorHost?.rerender();
      return;
    }
    const defaultSchema = await getPageSchema();
    // 加载 schema
    project?.openDocument(defaultSchema);
  };
}

export const dataService = new DataService();

//@ts-ignore
window.lcs = dataService;
