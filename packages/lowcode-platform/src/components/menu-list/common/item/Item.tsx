import React, { FC, memo } from 'react';
import { Space } from 'antd';

import s from './item.less';
import { Setting } from '../../setting/Setting';
import { TSettingMenu } from '@brick/types';
import { ISettingMenuCallback, useSettingMenu } from '../../hooks';

export interface IItemProps<T extends Record<string, any> = any> {
  name: string;
  data: T;

  /**
   * 渲染item的设置项
   * @param itemData
   */
  renderItemSetting?: (itemData: any) => React.ReactNode;

  settingMenu?: {
    items?: TSettingMenu[];
    getItems?: (nodeData: T) => TSettingMenu[];
    operationCallback?: ISettingMenuCallback<T>;
  };
}

export const Item: FC<IItemProps> = memo((props) => {
  const { settingMenu, data, renderItemSetting } = props;

  // console.log('settingMenu111', settingMenu);

  const itemList = settingMenu?.getItems?.(data);
  // console.log('itemList', itemList);

  const items = useSettingMenu(
    settingMenu?.items! || itemList,
    data,
    settingMenu?.operationCallback!
  );
  // console.log('q=>itemsitems', items, settingMenu);
  return (
    <div className={s.item}>
      <div className={s.title} title={props.name}>
        {/* {props.name} */}
        <div className={s.text}>{props.name}</div>
      </div>
      <div className={s.toolbar} onClick={(e: any) => e.stopPropagation()}>
        <Space>{renderItemSetting?.(data) || <Setting settingMenuItems={items} />}</Space>
      </div>
    </div>
  );
});
