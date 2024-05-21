import { TOperatorCode } from '@brick/types';

export interface IPermSelectData {
  operateCode: Array<TOperatorCode>;
  dataCodeIds: any; // TODO 后续确定
  fieldPerm: {
    // 可查看的field ids
    viewFiledIds: Array<string>;
    // 可编辑的field ids
    editFiledIds: Array<string>;
  };
}
