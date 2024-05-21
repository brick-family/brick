import React, { FC } from 'react';
import s from './colorSetting.module.less';
import { Switch } from 'antd';
import { usePropsValue } from '../../../../_hooks';

export const hasColorKey = 'columnConfig.hasColor';

export interface IColorSettingProps {
  parentProps: any;
  /**
   * 重新渲染组件
   */
  update: () => void;
}

export const ColorSetting: FC<IColorSettingProps> = ({ parentProps, update }) => {
  const { getPropValue, setPropsValue } = usePropsValue(parentProps);
  const checked = getPropValue(hasColorKey);

  const handleChange = (check: boolean) => {
    setPropsValue(hasColorKey, check);
    update();
  };
  return (
    <div className={s.color}>
      <span>彩色</span>
      <Switch size={'small'} checked={checked} onChange={handleChange} />
    </div>
  );
};
