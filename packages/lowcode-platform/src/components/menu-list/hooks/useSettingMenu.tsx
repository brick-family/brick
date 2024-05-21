import { ESettingType, TSettingMenu, TSettingType } from '@brick/types';
import { MenuProps } from 'antd';
import { useMemo } from 'react';

export interface ISettingMenuCallback<T> {
  onReNameCallback?: (nodeData: T, item: TSettingMenu) => void;
  onCopyCallback?: (nodeData: T, item: TSettingMenu) => void;
  onCreateGroupCallback?: (nodeData: T, item: TSettingMenu) => void;
  onDeleteCallback?: (nodeData: T, item: TSettingMenu) => void;
  onCreateDeptCallback?: (nodeData: T, item: TSettingMenu) => void;
  onMoveCallback?: (nodeData: T, item: TSettingMenu) => void;
}

/**
 * 根据settingMenu获取menu数据
 * @param menuData
 * @param param1
 * @returns
 */
export const useSettingMenu = <T extends Record<string, any>>(
  menuData: Array<TSettingMenu>,
  nodeData: T,
  cbk: ISettingMenuCallback<T>
) => {
  const {
    onReNameCallback,
    onCopyCallback,
    onCreateGroupCallback,
    onCreateDeptCallback,
    onDeleteCallback,
    onMoveCallback,
  } = cbk || {};
  const items = useMemo(() => {
    if (!Array.isArray(menuData)) {
      return [];
    }

    return menuData?.map((item) => {
      if (item.value === ESettingType.line) {
        return {
          type: 'divider',
        };
      }
      return {
        key: item.value,
        label: item.label,
        danger: ESettingType.delete === item.value, // 删除样式
        onClick: (info: { key: TSettingType; domEvent: any }) => {
          info?.domEvent?.stopPropagation();
          switch (info.key) {
            case ESettingType.rename:
              onReNameCallback?.(nodeData, item);
              break;
            case ESettingType.copy:
              onCopyCallback?.(nodeData, item);
              break;
            case ESettingType.createGroup:
              onCreateGroupCallback?.(nodeData, item);
              break;
            case ESettingType.createDept:
              onCreateDeptCallback?.(nodeData, item);
              break;
            case ESettingType.delete:
              onDeleteCallback?.(nodeData, item);
              break;
            case ESettingType.move:
              onMoveCallback?.(nodeData, item);
              break;

            default:
              break;
          }
        },
      };
    }) as MenuProps['items'];
  }, [menuData, nodeData]);

  return items;
};
