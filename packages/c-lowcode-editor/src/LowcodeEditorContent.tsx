import React, { FC, useEffect, useState } from 'react';
import { common, config, plugins } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import EditorInitPlugin from './plugins/plugin-editor-init';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import CodeEditorPlugin from '@alilc/lowcode-plugin-code-editor';
import ManualPlugin from '@alilc/lowcode-plugin-manual';
import InjectPlugin from '@alilc/lowcode-plugin-inject';
import ComponentPanelPlugin from './plugins/plugin-component-panel';
import DefaultSettersRegistryPlugin from './plugins/plugin-default-setters-registry';
// import LoadIncrementalAssetsWidgetPlugin from './plugins/plugin-load-incremental-assets-widget';
// import CustomSetterSamplePlugin from './plugins/plugin-custom-setter-sample';
// import SetRefPropPlugin from '@alilc/lowcode-plugin-set-ref-prop';
// import LogoSamplePlugin from './plugins/plugin-logo-sample';
// import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
// import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
// import SaveSamplePlugin from './plugins/plugin-save-sample';
// import PreviewSamplePlugin from './plugins/plugin-preview-sample';
// import SimulatorResizerPlugin from '@alilc/lowcode-plugin-simulator-select';
// 我们自己写的插件
import { topAreaPlugin } from './my-plugins/top-area';

import { SimulatorPlugin, UndoRedoPlugin } from './my-plugins/toolbar-area';
import s from './global.less';

/**
 * 注册插件
 */
async function registerPlugins() {
  await plugins.register(InjectPlugin);

  await plugins.register(EditorInitPlugin, {
    // scenarioName: 'basic-antd',
    // displayName: '基础 AntD 组件',
    // info: {
    //   urls: [
    //     {
    //       key: '设计器',
    //       value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-basic-antd',
    //     },
    //     {
    //       "key": "antd 物料",
    //       "value": "https://github.com/alibaba/lowcode-materials/tree/main/packages/antd-lowcode-materials"
    //     }
    //   ],
    // },
  });

  // 注册我们自定义插件
  await plugins.register(topAreaPlugin);

  // toolbar 插件
  await plugins.register(SimulatorPlugin as any);
  await plugins.register(UndoRedoPlugin as any); // 注册回退/前进

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(DefaultSettersRegistryPlugin);

  // await plugins.register(LogoSamplePlugin);

  await plugins.register(ComponentPanelPlugin);

  await plugins.register(SchemaPlugin as any);

  await plugins.register(ManualPlugin as any);
  // 注册回退/前进
  // await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  // await plugins.register(ZhEnPlugin);

  // await plugins.register(SetRefPropPlugin);

  // 展示模式
  // await plugins.register(SimulatorResizerPlugin);

  // 异步加载资源
  // await plugins.register(LoadIncrementalAssetsWidgetPlugin);

  await plugins.register(CodeEditorPlugin as any);

  // 注册出码插件
  // await plugins.register(CodeGenPlugin);

  // 注册保存面板
  // await plugins.register(SaveSamplePlugin);

  // 注册预览面板
  // await plugins.register(PreviewSamplePlugin);

  // await plugins.register(CustomSetterSamplePlugin);

  // 插件参数声明 & 传递，参考：https://lowcode-engine.cn/site/docs/api/plugins#设置插件参数版本示例
  // await plugins.register(DataSourcePanePlugin, {
  //   importPlugins: [],
  //   dataSourceTypes: [
  //     {
  //       type: 'fetch',
  //     },
  //     {
  //       type: 'jsonp',
  //     }
  //   ]
  // });
}

(async function main() {
  await registerPlugins();
  config.setConfig({
    // locale: 'zh-CN',
    // device: 'phone',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler(),
    },
  });
})();

export interface ILowcodeEditorContentProps {}

export const LowcodeEditorContent: FC<ILowcodeEditorContentProps> = (props) => {
  /** 插件是否已初始化成功，因为必须要等插件初始化后才能渲染 Workbench */
  const [hasPluginInited, setHasPluginInited] = useState(false);

  useEffect(() => {
    plugins
      .init({})
      .then(() => {
        setTimeout(() => {
          setHasPluginInited(true);
        }, 0);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!hasPluginInited) {
    return null;
  }
  const Workbench = common.skeletonCabin.Workbench;

  return (
    <div id="engine-container" className={s.content} style={{ width: '100%', height: '100%' }}>
      <Workbench />
    </div>
  );
};
