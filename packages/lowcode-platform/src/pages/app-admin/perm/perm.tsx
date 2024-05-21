import React, { FC, memo } from 'react';

import { PermProvider } from './perm-processor';
import { PermSet } from './perm-set';
import { Resource } from './resource';

import s from './perm.less';
import { ProCard } from '@ant-design/pro-components';

export interface IPermProps {}

export const Perm: FC<IPermProps> = memo((props) => {
  return (
    <ProCard>
      <PermProvider>
        <div className={s.perm}>
          <Resource />
          <PermSet />
        </div>
      </PermProvider>
    </ProCard>
  );
});

export default Perm;
