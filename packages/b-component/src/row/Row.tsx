import React, { FC } from 'react';

import classNames from 'classnames';

import styles from './row.less';

export interface IBRowProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const BRow: FC<IBRowProps> = ({ style, className, children }) => {
  const cls = classNames(styles.row, className);
  return (
    <div style={style} className={cls}>
      {/* {React.Children.map(children, (item) => {

      })} */}
    </div>
  );
};
