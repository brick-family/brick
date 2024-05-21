import { ESettingType, TSettingMenu, TSettingType } from '@brick/types';

/**
 * setting menu map
 */
export const SETTING_MENU_MAP: Record<TSettingType, TSettingMenu> = {
  rename: { label: '修改名称', value: ESettingType.rename },
  copy: { label: '复制', value: ESettingType.copy },
  move: { label: '移动', value: ESettingType.move },
  delete: { label: '删除', value: ESettingType.delete },
  createGroup: { label: '添加子分组', value: ESettingType.createGroup },
  createDept: { label: '添加子部门', value: ESettingType.createDept },
  line: { label: '分割线', value: ESettingType.line },
};
