import React from 'react';
import loadable from '@loadable/component';
// export const BaseFieldInputNumberLazy = React.lazy(() => import('./BaseFieldInputNumber'));

export const BaseFieldInputNumberLazy = loadable(
  () => import(/* webpackChunkName: "BaseFieldInputNumber" */ './BaseFieldInputNumber')
);
