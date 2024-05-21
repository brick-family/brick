import { IBaseEntity } from '../base';
import { ITableExtraParam } from '../common';
import { IColumnEntity } from './ColumnEntity';

export interface ITableEntity extends IBaseEntity {
  // appId
  applicationId?: string; // TODO: 这块需要去掉

  // 表名
  tableName?: string;

  // 数据库表名
  dbTableName?: string;

  // 列信息
  columns?: IColumnEntity[];

  // lowcode引擎内容
  schema?: string;

  // 扩展参数
  extraParam?: ITableExtraParam;

  // 列状态信息
  columnState?: Record<string, any>;
}
