import React, { FC } from 'react';
import { useQueryBuilderSelector } from '../processor';
import s from './footer.module.less';

export interface IFooterProps {}

export const Footer: FC<IFooterProps> = (props) => {
  // const ref = useRef<HTMLDivElement>(null);
  const [footerRef] = useQueryBuilderSelector((s) => [s.footerRef]);
  return <div className={s.footer} ref={footerRef}></div>;
};
