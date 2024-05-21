import React from 'react';
import classNames from 'classnames';
import s from './colorSelect.module.less';
import { colorList, getColor } from './utils';
import { BaseColor, BaseColorItem } from './base-color';
import { CustomerColor } from './customer-color';
import { Popover } from 'antd';
import { BColorSelectPanel } from './BColorSelectPanel';

export interface IColorProps {
  onSelect: (color: string) => void;
  color?: string;
  hasReset?: boolean;
  size?: 'small' | 'middle' | 'large';
}

export interface IColorSelectProps extends IColorProps {
  style?: React.CSSProperties;
  className?: string;
  /**
   * 渲染显示的color块
   * @param color
   */
  renderDisplayColor?: (color?: string) => React.ReactNode;
}

export const BColorSelect = (props: IColorSelectProps) => {
  const { onSelect, color, style, className, renderDisplayColor, size = 'middle' } = props;

  const realColor = getColor(color || colorList[0]);

  return (
    <Popover
      content={<BColorSelectPanel {...props} />}
      arrow={false}
      placement={'bottom'}
      fresh={true}
      trigger={['click']}
    >
      <>
        {renderDisplayColor?.(color)}
        {!renderDisplayColor && (
          <BaseColorItem
            style={style}
            className={classNames(s.colorSelect, className)}
            active={false}
            size={size}
            color={realColor}
          />
        )}
      </>
    </Popover>
  );
};

BColorSelect.Recommand = BaseColor;
BColorSelect.Customer = CustomerColor;
