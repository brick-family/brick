import { EFieldType, IDataEntity, IFileEntity, ITableEntity } from '@brick/types';
import { arrayToMap } from '@brick/utils';
import { IPreviewRef } from '@brick/lowcode-editor';
import _ from 'lodash';

type TFormValues = Record<string, any>;
/**
 *
 *  form values 转换 item data
 * @param values
 * @param tableColumns
 * @returns
 */
export const convertFormValuesToItemData = (
  values: TFormValues,
  tableColumns: ITableEntity['columns']
) => {
  const newValues: TFormValues = {};
  const tableColumnsMap = arrayToMap(tableColumns!, 'id');
  Object.entries(values).forEach(([key, value]) => {
    const currColumnConfig = tableColumnsMap[key];
    const fieldKey = currColumnConfig.dbFieldName!;
    newValues[fieldKey] = value;

    // 文件类型字段，需要特殊处理
    if ([EFieldType.FILE, EFieldType.IMAGE].includes(currColumnConfig.fieldType as any)) {
      if (Array.isArray(value)) {
        newValues[fieldKey] = value.map((item: IFileEntity) => item.id)?.join(',');
      }
    }

    // 处理单选按钮组
    if (
      [EFieldType.RADIO, EFieldType.SELECT].includes(currColumnConfig.fieldType as any) &&
      Array.isArray(value)
    ) {
      newValues[fieldKey] = value?.join(',');
    }

    // 处理关联字段
    if (currColumnConfig.fieldType === EFieldType.RELATION && _.isObject(value)) {
      // @ts-ignore
      newValues[fieldKey] = value?.id;
    }
  });
  return newValues;
};

/**
 * item data 转换为 form values
 * @param itemData
 * @param tableColumns
 * @returns
 */
export const convertItemDataToFormValues = (
  itemData: IDataEntity,
  tableColumns: ITableEntity['columns']
): TFormValues => {
  const newValues: TFormValues = {};
  const tableColumnsMap = arrayToMap(tableColumns!, 'dbFieldName');
  Object.entries(itemData).forEach(([key, value]) => {
    const fieldKey = tableColumnsMap?.[key]?.id!;
    newValues[fieldKey] = value;
  });

  return newValues;
};

/**
 * 获取form values
 * @param formRef
 * @returns
 */
export const getFormValues = async (formRef: React.MutableRefObject<IPreviewRef>) => {
  const formInstance = await formRef?.current?.getFormInstance();
  return formInstance?.getFieldsValue();
};

/**
 * 获取前一条和后一条的itemId
 * @param currItemId
 * @param dataList
 * @param type
 * @returns
 */
export const getItemId = (
  currItemId: string,
  dataList: IDataEntity[],
  type: 'prev' | 'next' = 'prev'
) => {
  if (!dataList) {
    return { itemId: currItemId, isFirst: false, isEnd: false };
  }

  const index = dataList.findIndex((item) => item.id == currItemId);
  const endIndex = type === 'prev' ? index - 1 : index + 1;

  if (endIndex < 0 || endIndex >= dataList.length) {
    return { itemId: currItemId, isFirst: endIndex < 0, isEnd: endIndex >= dataList.length };
  }
  return { itemId: dataList[endIndex].id, isFirst: false, isEnd: false };
};
