import React, { FC } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { IColorSelectProps } from '../BColorSelect';
import s from '../colorSelect.module.less';
import { colorList, getColor } from '../utils';
import classNames from 'classnames';

export interface IBaseColorItemProps {
  color: string;
  active: boolean;
  onClick?: (color: string) => void;
  hasReset?: boolean;
  style?: React.CSSProperties;
  className?: string;
  size?: 'small' | 'middle' | 'large';
}

export const BaseColorItem: FC<IBaseColorItemProps> = ({
  color,
  active,
  onClick,
  hasReset = false,
  style,
  className,
  size = 'middle',
}) => {
  return (
    <div
      style={style}
      className={classNames(s.box, className, {
        [s.small]: size === 'small',
        [s.larget]: size === 'large',
      })}
    >
      <div
        onClick={() => onClick?.(color)}
        style={{
          background: color,
          border: hasReset ? '1px solid #eaeaea' : '1px solid #fff',
        }}
        className={s.item}
      >
        {active && (
          <CheckOutlined style={{ color: hasReset ? '#000' : '#fff', fontWeight: 'bold' }} />
        )}
      </div>
    </div>
  );
};

export const BaseColor: FC<IColorSelectProps> = ({ color, onSelect, hasReset, size }) => {
  // const colors = [
  //   'rgb(255, 255, 255)',
  //   'rgb(0, 137, 255)',
  //   'rgb(0, 184, 83)',
  //   'rgb(255, 162, 0)',
  //   'rgb(255, 115, 87)',
  //   'rgb(92, 114, 255)',
  //   'rgb(133, 199, 0)',
  //   'rgb(255, 197, 5)',
  //   // 'rgb(255, 107, 122)',
  //   'rgb(143, 102, 255)',
  //   'rgb(20, 169, 255)',
  // ];

  const colors = colorList;

  return (
    <div className={s.color}>
      {hasReset && (
        <BaseColorItem
          color={'#fff'}
          hasReset={hasReset}
          active={!color}
          onClick={() => onSelect('')}
        />
      )}
      {colors.map((item, index) => {
        const realColor = getColor(item);
        return (
          <BaseColorItem
            key={item + index}
            color={realColor}
            active={item === color}
            onClick={() => onSelect(item)}
          />
        );
      })}
    </div>
  );
};
