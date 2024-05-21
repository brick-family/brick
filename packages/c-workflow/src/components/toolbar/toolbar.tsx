import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { useWorkflowSelector } from '../../processor';
import s from './toolbar.less';

export interface IToolbarProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Toolbar: FC<IToolbarProps> = memo((props) => {
  const { style, className } = props;
  const [graph] = useWorkflowSelector((s) => [s.graph]);

  const zoom = () => {
    console.log('q=>12');
    graph?.zoom(1); // 将画布缩放级别减少 0.2
  };

  return (
    <div style={style} className={classNames(s.toolbar, className)}>
      <button onClick={zoom}>放大</button>
      <button>缩小</button>
    </div>
  );
});
