import React, { FC } from 'react';
import s from './appTableCaseCadeSelect.module.less';
import { BizAppSelect } from '../../select/app-select';
import { BizTableSelect } from '@brick/biz-component';

export interface IAppTableCaseCadeSelectProps {}

export const AppTableCaseCadeSelect: FC<IAppTableCaseCadeSelectProps> = (props) => {
  return (
    <div className={s.casecade}>
      <BizAppSelect />
      <BizTableSelect />
    </div>
  );
};
