export enum ESettingType {
  // 修改名称
  'rename' = 'rename',
  // 复制
  'copy' = 'copy',
  // 移动到
  'move' = 'move',

  // 删除
  'delete' = 'delete',

  // 创建分组
  'createGroup' = 'createGroup',

  // 添加子部门
  'createDept' = 'createDept',

  // 分割线
  'line' = 'line',
}

// setting 类型
export type TSettingType = keyof typeof ESettingType;

export type TSettingMenu = { label: string; value: TSettingType };
