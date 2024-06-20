import React, { FC, useEffect, useRef } from 'react';
import s from './minMap.module.less';
import { useWorkflowAppSelector } from '../../../processor';
import classNames from 'classnames';

export interface IMinMapProps {
  className?: string;
  style?: React.CSSProperties;
}

export const MinMap: FC<IMinMapProps> = (props) => {
  const { className, style } = props;

  const [setMinMapElement] = useWorkflowAppSelector((s) => [s.graphProcessor.setMinMapElement]);
  const minMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (minMapRef.current) {
      setMinMapElement(minMapRef.current);
    }
  }, []);

  return <div ref={minMapRef} style={style} className={classNames(s.minmap, className)}></div>;
};
