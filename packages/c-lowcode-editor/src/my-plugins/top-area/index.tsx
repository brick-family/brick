import React, { FC } from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { TopBar } from '@brick/lowcode-editor';

export const topAreaPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'topAreaPlugin',
    async init() {
      const { skeleton } = ctx;

      skeleton.add({
        name: 'topAreaPlugin',
        area: 'topArea',
        type: 'Widget', // Panel Widget
        props: {
          align: 'center',
          width: '100%',
        },
        panelProps: {},
        content: <TopBar />,
      });
    },
  };
};
topAreaPlugin.pluginName = 'topAreaPlugin';
