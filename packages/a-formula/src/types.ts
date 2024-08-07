/**
 * 函数类型
 */
export interface IFunctionData {
  id: string;
  name: string;
  type: string;
  info?: string;
  enableCache?: boolean;
  reqCont?: number;
  jvsParamType?: string;
  param: any;
}
