import { project } from '@alilc/lowcode-engine';
import { IPublicTypeProjectSchema } from '@alilc/lowcode-types';
import { EFieldType, IColumnEntity } from '@brick/types';
import { EFieldTypeByComponentType, TFieldTypeByComponentType, TSchema } from '../types';

/**
 * 获取schema中指定columns的data
 * @param schema
 * @param columns
 */
export const getColumnDataBySchema = (schema: TSchema, columns: IColumnEntity[]) => {
  const resultColumns: IColumnEntity[] = [];
  const columnsMap: Map<string, IColumnEntity> = new Map(columns.map((item) => [item.id!, item]));

  const loop = (dataList: TSchema) => {
    dataList.forEach((item) => {
      const currFiledType = EFieldTypeByComponentType[
        item.componentName as TFieldTypeByComponentType
      ] as unknown as EFieldType;

      const id = item.id;
      if (item?.children && item.children.length > 0) {
        loop(item.children);
      }
      // 代表是column 类型
      if (currFiledType) {
        const currColumn: IColumnEntity = {
          id,
          title: item?.props.title,
          // isRequired: item?.props.isRequired,
          // isRepeat: item?.props.isRepeat,
          fieldType: currFiledType,
          columnConfig: { ...item?.props?.columnConfig, fieldType: currFiledType },
          validateConfig: item?.props?.validateConfig,
        };
        const originColum = columnsMap.get(id);
        if (originColum) {
          // 执行深度合并
          resultColumns.push(Object.assign(originColum, currColumn));
        } else {
          resultColumns.push(currColumn);
        }
      }
    });
  };

  loop(schema);

  return resultColumns;
};

export const handlePageSchema = () => {};

/**
 * 获取schema string
 */
export const getSchemaString = (schema: any) => {
  if (schema) {
    return JSON.stringify(schema);
  }
  return '';
};

/**
 * 通过schema字符串获取schema对象
 * @param schemaStr
 * @returns
 */
export const getSchemaObject = (schemaStr: string) => {
  let result = {} as any;
  if (schemaStr) {
    result = JSON.parse(schemaStr);
  }

  return result;
};

/**
 * 更新schema，并重新渲染
 * @param schema
 */
export const updateSchema = (schema: IPublicTypeProjectSchema) => {
  project?.importSchema(schema);
  project?.simulatorHost?.rerender();
  // 加载 schema
  // project?.openDocument(defaultSchema);
};
