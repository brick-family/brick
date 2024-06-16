import React, { FC, useState } from 'react';
import s from './appTableCaseCadeSelect.module.less';
import { BizAppSelect } from '../../select/app-select';
import { BizTableSelect } from '@brick/biz-component';
import { getAppId } from '@brick/utils';

export interface IAppTableCaseCadeSelectProps {}

export const AppTableCaseCadeSelect: FC<IAppTableCaseCadeSelectProps> = (props) => {
  const [appId, setAppId] = useState(getAppId());

  return (
    <div className={s.casecade}>
      <BizAppSelect value={appId} onChange={setAppId} />
      <BizTableSelect appId={appId} />
    </div>
  );
};
